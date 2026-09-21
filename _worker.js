export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
      'Pragma': 'no-cache',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders, status: 204 });
    }

    // 0. Mollie API Proxy & Webhook
    if (url.pathname === '/api/mollie/webhook') {
      try {
        if (request.method === 'POST') {
          const bodyText = await request.text();
          const params = new URLSearchParams(bodyText);
          const paymentId = params.get('id');

          if (paymentId && env && env.PURE_KV) {
            let serverKey = await env.PURE_KV.get('mollie_api_key') || env?.MOLLIE_API_KEY || 'live_U9khRJeSJzhqTfNJmBAWprDreve6fv';
            const mollieRes = await fetch(`https://api.mollie.com/v2/payments/${paymentId}`, {
              headers: { 'Authorization': `Bearer ${serverKey}` }
            });
            const payment = await mollieRes.json();
            if (payment && payment.status === 'paid') {
              const rawOrders = await env.PURE_KV.get('pure_orders');
              let orders = rawOrders ? JSON.parse(rawOrders) : [];
              if (Array.isArray(orders)) {
                // 1. Check if already recorded by frontend return handler or previous webhook
                const existing = orders.find(o => 
                  (o.paymentId && o.paymentId === paymentId) ||
                  (typeof o.paymentMethod === 'string' && o.paymentMethod.includes(paymentId))
                );
                if (existing) {
                  existing.paymentId = paymentId;
                  existing.status = existing.status === 'rechnung_versendet' ? 'rechnung_versendet' : 'neu_eingegangen';
                  existing.paymentStatus = `Bezahlt (${payment.method || 'Online-Zahlung'})`;
                  await env.PURE_KV.put('pure_orders', JSON.stringify(orders));
                } else {
                  // Lock to prevent race condition with frontend redirect
                  const lockKey = `pure_order_lock:${paymentId}`;
                  const isLocked = await env.PURE_KV.get(lockKey);
                  if (!isLocked) {
                    await env.PURE_KV.put(lockKey, '1', { expirationTtl: 120 });

                    // 2. If frontend didn't record yet (e.g. mobile tab closed), finalize from pending KV
                    const rawPending = await env.PURE_KV.get(`pure_pending:${paymentId}`);
                    if (rawPending) {
                      const pendingData = JSON.parse(rawPending);
                      let storedLastId = parseInt(await env.PURE_KV.get('pure_last_order_id') || '1277', 10);
                      const nextId = Math.max(1277, storedLastId + 1);
                      await env.PURE_KV.put('pure_last_order_id', nextId.toString());

                      const autoOrder = {
                        orderId: nextId.toString(),
                        invoiceNumber: `A09401${nextId}`,
                        paymentId: paymentId,
                        date: new Date().toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' }),
                        createdAt: new Date().toISOString(),
                        customer: pendingData.customer,
                        items: pendingData.items || [],
                        shipping: pendingData.shipping || 0,
                        total: pendingData.total,
                        netTotal: pendingData.total / 1.19,
                        vatTotal: pendingData.total - (pendingData.total / 1.19),
                        status: 'neu_eingegangen',
                        paymentStatus: `Bezahlt (${payment.method || 'Online-Zahlung'})`,
                        paymentMethod: `Online-Zahlung (${paymentId}) – ${pendingData.customer?.email || ''}`,
                        invoiceSentAt: null,
                        contractConcluded: false,
                        confirmationEmailSent: false
                      };
                      orders.unshift(autoOrder);
                      await env.PURE_KV.put('pure_orders', JSON.stringify(orders));
                      await env.PURE_KV.delete(`pure_pending:${paymentId}`);
                    }
                  }
                }
              }
            }
          }
        }
      } catch (err) {
        console.warn('Webhook exception:', err);
      }
      return new Response('OK', { status: 200, headers: corsHeaders });
    }

    // 0b. Settings API for Mollie Key Sync
    if (request.method === 'GET' && url.pathname === '/api/settings/mollie') {
      let key = null;
      if (env && env.PURE_KV) {
        try { key = await env.PURE_KV.get('mollie_api_key'); } catch {}
      }
      return new Response(JSON.stringify({ key: key || '' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    if (request.method === 'POST' && url.pathname === '/api/settings/mollie') {
      try {
        const body = await request.json();
        const newKey = (body.key || '').trim();
        if (env && env.PURE_KV && newKey) {
          await env.PURE_KV.put('mollie_api_key', newKey);
        }
        return new Response(JSON.stringify({ success: true, key: newKey }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: corsHeaders });
      }
    }

    // 0c. Orders API for Cross-Device Synchronization
    if (url.pathname === '/api/orders') {
      if (request.method === 'GET') {
        let orders = [];
        if (env && env.PURE_KV) {
          try {
            const raw = await env.PURE_KV.get('pure_orders');
            if (raw) orders = JSON.parse(raw);
          } catch (e) {
            console.warn('Could not read pure_orders from KV:', e);
          }
        }
        return new Response(JSON.stringify({ orders: Array.isArray(orders) ? orders : [] }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      if (request.method === 'POST') {
        try {
          const body = await request.json();
          let orders = [];
          if (env && env.PURE_KV) {
            try {
              const raw = await env.PURE_KV.get('pure_orders');
              if (raw) orders = JSON.parse(raw);
            } catch (e) {}
          }
          if (!Array.isArray(orders)) orders = [];

          if (Array.isArray(body)) {
            orders = body;
          } else if (body && (body.orderId || body.paymentId)) {
            const paymentId = body.paymentId || (typeof body.paymentMethod === 'string' ? body.paymentMethod.match(/tr_[a-zA-Z0-9]+/)?.[0] : null);
            
            const idx = orders.findIndex(o => 
              (body.orderId && o.orderId === body.orderId) || 
              (paymentId && (
                (o.paymentId && o.paymentId === paymentId) || 
                (typeof o.paymentMethod === 'string' && o.paymentMethod.includes(paymentId))
              ))
            );

            if (idx >= 0) {
              orders[idx] = { 
                ...orders[idx], 
                ...body, 
                orderId: orders[idx].orderId || body.orderId,
                invoiceNumber: orders[idx].invoiceNumber || body.invoiceNumber,
                paymentId: paymentId || orders[idx].paymentId
              };
            } else {
              orders.unshift({
                ...body,
                paymentId: paymentId || body.paymentId
              });
            }

            // Keep track of highest consecutive order id
            const numId = parseInt(body.orderId, 10);
            if (!isNaN(numId) && numId >= 1268 && env && env.PURE_KV) {
              try {
                const currentLast = parseInt(await env.PURE_KV.get('pure_last_order_id') || '1277', 10);
                if (numId > currentLast) {
                  await env.PURE_KV.put('pure_last_order_id', numId.toString());
                }
              } catch {}
            }
          }

          if (env && env.PURE_KV) {
            await env.PURE_KV.put('pure_orders', JSON.stringify(orders));
          }

          return new Response(JSON.stringify({ success: true, orders }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        } catch (err) {
          return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: corsHeaders });
        }
      }

      if (request.method === 'DELETE') {
        try {
          const deleteId = url.searchParams.get('id');
          let orders = [];
          if (env && env.PURE_KV) {
            try {
              const raw = await env.PURE_KV.get('pure_orders');
              if (raw) orders = JSON.parse(raw);
            } catch (e) {}
          }
          if (!Array.isArray(orders)) orders = [];

          if (deleteId) {
            orders = orders.filter(o => o.orderId !== deleteId);
          }
          if (env && env.PURE_KV) {
            await env.PURE_KV.put('pure_orders', JSON.stringify(orders));
          }
          return new Response(JSON.stringify({ success: true, orders }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        } catch (err) {
          return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: corsHeaders });
        }
      }
    }

    // 0c-2. Pending Checkouts API (Temporary session storage before Mollie payment confirmation - never shown in Admin!)
    if (url.pathname === '/api/orders/pending') {
      if (request.method === 'POST') {
        try {
          const body = await request.json();
          if (body && env && env.PURE_KV) {
            if (body.paymentId) {
              await env.PURE_KV.put(`pure_pending:${body.paymentId}`, JSON.stringify(body.checkoutData || body), {
                expirationTtl: 86400
              });
            }
            if (body.sessionId) {
              await env.PURE_KV.put(`pure_pending_sess:${body.sessionId}`, JSON.stringify({ paymentId: body.paymentId, checkoutData: body.checkoutData || body }), {
                expirationTtl: 86400
              });
            }
          }
          return new Response(JSON.stringify({ success: true }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        } catch (e) {
          return new Response(JSON.stringify({ error: e.message }), { status: 500, headers: corsHeaders });
        }
      }

      if (request.method === 'GET') {
        const paymentId = url.searchParams.get('paymentId');
        const sessionId = url.searchParams.get('sessionId');
        let data = null;
        let resolvedPaymentId = paymentId;
        if (env && env.PURE_KV) {
          try {
            if (paymentId) {
              const raw = await env.PURE_KV.get(`pure_pending:${paymentId}`);
              if (raw) data = JSON.parse(raw);
            } else if (sessionId) {
              const raw = await env.PURE_KV.get(`pure_pending_sess:${sessionId}`);
              if (raw) {
                const parsed = JSON.parse(raw);
                data = parsed.checkoutData;
                resolvedPaymentId = parsed.paymentId;
              }
            }
          } catch (e) {}
        }
        return new Response(JSON.stringify({ checkoutData: data, paymentId: resolvedPaymentId }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      if (request.method === 'DELETE') {
        const paymentId = url.searchParams.get('paymentId');
        const sessionId = url.searchParams.get('sessionId');
        if (env && env.PURE_KV) {
          try {
            if (paymentId) await env.PURE_KV.delete(`pure_pending:${paymentId}`);
            if (sessionId) await env.PURE_KV.delete(`pure_pending_sess:${sessionId}`);
          } catch (e) {}
        }
        return new Response(JSON.stringify({ success: true }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
    }

    // 0d. Consecutive Order Number API
    if (url.pathname === '/api/orders/next-id') {
      const paymentId = url.searchParams.get('paymentId');

      // If a paymentId was passed, check if an order already exists for this payment!
      if (paymentId && env && env.PURE_KV) {
        try {
          const rawOrders = await env.PURE_KV.get('pure_orders');
          if (rawOrders) {
            const orders = JSON.parse(rawOrders);
            const existing = orders.find(o => 
              (o.paymentId && o.paymentId === paymentId) ||
              (typeof o.paymentMethod === 'string' && o.paymentMethod.includes(paymentId))
            );
            if (existing) {
              return new Response(JSON.stringify({ 
                orderId: existing.orderId, 
                invoiceNumber: existing.invoiceNumber,
                isExisting: true,
                order: existing
              }), {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' }
              });
            }
          }
        } catch (e) {}
      }

      let nextId = 1278;
      if (env && env.PURE_KV) {
        try {
          const storedLastId = await env.PURE_KV.get('pure_last_order_id');
          if (storedLastId && !isNaN(parseInt(storedLastId, 10))) {
            nextId = Math.max(1278, parseInt(storedLastId, 10) + 1);
          } else {
            nextId = 1278;
          }
          await env.PURE_KV.put('pure_last_order_id', nextId.toString());
        } catch (e) {
          console.warn('Could not increment next order id:', e);
        }
      }
      return new Response(JSON.stringify({ 
        orderId: nextId.toString(), 
        invoiceNumber: `A09401${nextId}`,
        isExisting: false
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    if (request.method === 'POST' && url.pathname === '/api/settings/last-order-id') {
      try {
        const body = await request.json();
        const lastId = parseInt(body.lastOrderId, 10);
        if (env && env.PURE_KV && !isNaN(lastId)) {
          await env.PURE_KV.put('pure_last_order_id', lastId.toString());
        }
        return new Response(JSON.stringify({ success: true, lastOrderId: lastId }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      } catch (e) {
        return new Response(JSON.stringify({ error: e.message }), { status: 500, headers: corsHeaders });
      }
    }

    // 0e. Products & Pricing API (Cross-device Cloudflare KV Sync)
    if (url.pathname === '/api/products') {
      const EXCLUDED_LEGACY_IDS = new Set(['glenturret-14', 'benrinnes-12', 'ledaig-10', 'craigellachie-13']);
      if (request.method === 'GET') {
        let products = null;
        if (env && env.PURE_KV) {
          try {
            const raw = await env.PURE_KV.get('pure_products');
            if (raw) {
              const parsed = JSON.parse(raw);
              if (Array.isArray(parsed)) {
                products = parsed.filter(p => !EXCLUDED_LEGACY_IDS.has(p.id));
              }
            }
          } catch (e) {
            console.warn('Could not read pure_products from KV:', e);
          }
        }
        return new Response(JSON.stringify({ products: Array.isArray(products) ? products : null }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      if (request.method === 'POST') {
        try {
          const body = await request.json();
          let products = Array.isArray(body) ? body : (body?.products || []);
          if (Array.isArray(products)) {
            products = products.filter(p => !EXCLUDED_LEGACY_IDS.has(p.id));
          }
          if (env && env.PURE_KV && Array.isArray(products)) {
            await env.PURE_KV.put('pure_products', JSON.stringify(products));
          }
          return new Response(JSON.stringify({ success: true, count: products.length }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        } catch (err) {
          return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: corsHeaders });
        }
      }
    }

    // 0f. Blog Posts API (Cross-device Cloudflare KV Sync)
    if (url.pathname === '/api/blog') {
      if (request.method === 'GET') {
        let posts = null;
        if (env && env.PURE_KV) {
          try {
            const raw = await env.PURE_KV.get('pure_blog_posts');
            if (raw) posts = JSON.parse(raw);
          } catch (e) {}
        }
        return new Response(JSON.stringify({ posts: Array.isArray(posts) ? posts : null }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      if (request.method === 'POST') {
        try {
          const body = await request.json();
          const posts = Array.isArray(body) ? body : (body?.posts || []);
          if (env && env.PURE_KV && Array.isArray(posts)) {
            await env.PURE_KV.put('pure_blog_posts', JSON.stringify(posts));
          }
          return new Response(JSON.stringify({ success: true, count: posts.length }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        } catch (err) {
          return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: corsHeaders });
        }
      }
    }

    // 0g. CRM Customers API (Cross-device Cloudflare KV Sync)
    if (url.pathname === '/api/crm/customers') {
      if (request.method === 'GET') {
        let customers = null;
        if (env && env.PURE_KV) {
          try {
            const raw = await env.PURE_KV.get('pure_crm_customers');
            if (raw) customers = JSON.parse(raw);
          } catch (e) {}
        }
        return new Response(JSON.stringify({ customers: Array.isArray(customers) ? customers : null }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      if (request.method === 'POST') {
        try {
          const body = await request.json();
          const customers = Array.isArray(body) ? body : (body?.customers || []);
          if (env && env.PURE_KV && Array.isArray(customers)) {
            await env.PURE_KV.put('pure_crm_customers', JSON.stringify(customers));
          }
          return new Response(JSON.stringify({ success: true, count: customers.length }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        } catch (err) {
          return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: corsHeaders });
        }
      }
    }

    // 0h. Newsletter Subscribers API (Cross-device Cloudflare KV Sync)
    if (url.pathname === '/api/crm/newsletter') {
      if (request.method === 'GET') {
        let subs = null;
        if (env && env.PURE_KV) {
          try {
            const raw = await env.PURE_KV.get('pure_crm_newsletter');
            if (raw) subs = JSON.parse(raw);
          } catch (e) {}
        }
        return new Response(JSON.stringify({ subscribers: Array.isArray(subs) ? subs : null }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      if (request.method === 'POST') {
        try {
          const body = await request.json();
          const subs = Array.isArray(body) ? body : (body?.subscribers || []);
          if (env && env.PURE_KV && Array.isArray(subs)) {
            await env.PURE_KV.put('pure_crm_newsletter', JSON.stringify(subs));
          }
          return new Response(JSON.stringify({ success: true, count: subs.length }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        } catch (err) {
          return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: corsHeaders });
        }
      }
    }

    // 0i. Sent Campaigns History API (Cross-device Cloudflare KV Sync)
    if (url.pathname === '/api/campaigns') {
      if (request.method === 'GET') {
        let campaigns = null;
        if (env && env.PURE_KV) {
          try {
            const raw = await env.PURE_KV.get('pure_campaigns');
            if (raw) campaigns = JSON.parse(raw);
          } catch (e) {}
        }
        return new Response(JSON.stringify({ campaigns: Array.isArray(campaigns) ? campaigns : null }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      if (request.method === 'POST') {
        try {
          const body = await request.json();
          const campaigns = Array.isArray(body) ? body : (body?.campaigns || []);
          if (env && env.PURE_KV && Array.isArray(campaigns)) {
            await env.PURE_KV.put('pure_campaigns', JSON.stringify(campaigns));
          }
          return new Response(JSON.stringify({ success: true }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        } catch (err) {
          return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: corsHeaders });
        }
      }
    }

    if (url.pathname.startsWith('/api/mollie')) {
      const molliePath = url.pathname.replace(/^\/api\/mollie/, '') + url.search;
      const targetUrl = 'https://api.mollie.com' + molliePath;

      const headers = new Headers();
      let authHeader = request.headers.get('Authorization');
      if (!authHeader || authHeader.trim() === 'Bearer' || authHeader.trim() === 'Bearer null' || authHeader.trim() === 'Bearer undefined') {
        let fallbackKey = null;
        if (env && env.PURE_KV) {
          try { fallbackKey = await env.PURE_KV.get('mollie_api_key'); } catch {}
        }
        fallbackKey = fallbackKey || env?.MOLLIE_API_KEY || 'live_U9khRJeSJzhqTfNJmBAWprDreve6fv';
        authHeader = `Bearer ${fallbackKey}`;
      }
      headers.set('Authorization', authHeader);

      const contentType = request.headers.get('Content-Type');
      if (contentType) headers.set('Content-Type', contentType);
      headers.set('Accept', 'application/json');

      try {
        let bodyContent = undefined;
        if (request.method !== 'GET' && request.method !== 'HEAD') {
          bodyContent = await request.text();
        }

        const mollieResponse = await fetch(targetUrl, {
          method: request.method,
          headers,
          body: bodyContent
        });

        const resText = await mollieResponse.text();
        return new Response(resText, {
          status: mollieResponse.status,
          headers: {
            ...corsHeaders,
            'Content-Type': mollieResponse.headers.get('Content-Type') || 'application/json'
          }
        });
      } catch (err) {
        return new Response(JSON.stringify({ error: 'Mollie proxy error: ' + err.message }), {
          status: 502,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
    }

    // 1. API: GET /api/unsubscribers
    if (request.method === 'GET' && url.pathname === '/api/unsubscribers') {
      try {
        let list = [];
        if (env.PURE_KV) {
          const raw = await env.PURE_KV.get('unsub_list');
          if (raw) {
            try { list = JSON.parse(raw); } catch {}
          }
          if (!Array.isArray(list) || list.length === 0) {
            const kvList = await env.PURE_KV.list({ prefix: 'unsub:' });
            if (kvList && kvList.keys) {
              list = kvList.keys.map(k => k.name.replace('unsub:', ''));
            }
          }
        }
        return new Response(JSON.stringify({ unsubscribers: list }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      } catch (err) {
        return new Response(JSON.stringify({ unsubscribers: [], error: err.message }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
    }

    // 2. API: POST /api/unsubscribe
    if (request.method === 'POST' && url.pathname === '/api/unsubscribe') {
      try {
        const body = await request.json();
        let rawEmail = body.email || '';
        try { rawEmail = decodeURIComponent(rawEmail); } catch {}
        const email = rawEmail.toLowerCase().trim();
        if (!email) {
          return new Response(JSON.stringify({ error: 'E-Mail fehlt' }), { status: 400, headers: corsHeaders });
        }

        if (env.PURE_KV) {
          let list = [];
          try {
            const raw = await env.PURE_KV.get('unsub_list');
            if (raw) list = JSON.parse(raw);
          } catch {}
          if (!Array.isArray(list)) list = [];
          if (!list.includes(email)) {
            list.push(email);
            await env.PURE_KV.put('unsub_list', JSON.stringify(list));
          }
          await env.PURE_KV.put('unsub:' + email, JSON.stringify({
            email,
            unsubscribedAt: new Date().toISOString()
          }));
        }

        return new Response(JSON.stringify({ success: true, email }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: corsHeaders });
      }
    }

    // 3. API: POST /api/resubscribe
    if (request.method === 'POST' && url.pathname === '/api/resubscribe') {
      try {
        const body = await request.json();
        let rawEmail = body.email || '';
        try { rawEmail = decodeURIComponent(rawEmail); } catch {}
        const email = rawEmail.toLowerCase().trim();
        if (email && env.PURE_KV) {
          let list = [];
          try {
            const raw = await env.PURE_KV.get('unsub_list');
            if (raw) list = JSON.parse(raw);
          } catch {}
          if (Array.isArray(list)) {
            list = list.filter(e => e !== email);
            await env.PURE_KV.put('unsub_list', JSON.stringify(list));
          }
          await env.PURE_KV.delete('unsub:' + email);
        }
        return new Response(JSON.stringify({ success: true, email }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: corsHeaders });
      }
    }

    // 4. Default: Serve static assets
    if (env.ASSETS) {
      try {
        const assetResponse = await env.ASSETS.fetch(request);
        if (assetResponse.status === 404 && !url.pathname.startsWith('/assets/')) {
          return await env.ASSETS.fetch(new URL('/', request.url));
        }
        return assetResponse;
      } catch (err) {
        try {
          return await env.ASSETS.fetch(new URL('/', request.url));
        } catch {
          return new Response('Asset fetch failed: ' + err.message, { status: 500 });
        }
      }
    }

    return new Response('Pure Whisky worker running, but ASSETS binding is missing.', { status: 500 });
  }
};
