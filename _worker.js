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
            if (payment && payment.status === 'paid' && payment.metadata && payment.metadata.orderId) {
              const orderId = payment.metadata.orderId;
              const rawOrders = await env.PURE_KV.get('pure_orders');
              let orders = rawOrders ? JSON.parse(rawOrders) : [];
              if (Array.isArray(orders)) {
                const idx = orders.findIndex(o => o.orderId === orderId);
                if (idx >= 0) {
                  orders[idx].status = 'neu_eingegangen';
                  orders[idx].paymentStatus = `Bezahlt (${payment.method || 'Online-Zahlung'})`;
                  await env.PURE_KV.put('pure_orders', JSON.stringify(orders));
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
          } else if (body && body.orderId) {
            const idx = orders.findIndex(o => o.orderId === body.orderId);
            if (idx >= 0) {
              orders[idx] = { ...orders[idx], ...body };
            } else {
              orders.unshift(body);
            }

            // Keep track of highest consecutive order id
            const numId = parseInt(body.orderId, 10);
            if (!isNaN(numId) && numId >= 1268 && env && env.PURE_KV) {
              try {
                const currentLast = parseInt(await env.PURE_KV.get('pure_last_order_id') || '1268', 10);
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
    }

    // 0d. Consecutive Order Number API (starting after 1268 -> 1269...)
    if (url.pathname === '/api/orders/next-id') {
      let nextId = 1269;
      if (env && env.PURE_KV) {
        try {
          const storedLastId = await env.PURE_KV.get('pure_last_order_id');
          if (storedLastId && !isNaN(parseInt(storedLastId, 10))) {
            nextId = Math.max(1269, parseInt(storedLastId, 10) + 1);
          } else {
            nextId = 1269;
          }
          await env.PURE_KV.put('pure_last_order_id', nextId.toString());
        } catch (e) {
          console.warn('Could not increment next order id:', e);
        }
      }
      return new Response(JSON.stringify({ 
        orderId: nextId.toString(), 
        invoiceNumber: `A09401${nextId}` 
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
