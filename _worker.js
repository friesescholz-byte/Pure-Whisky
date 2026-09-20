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
      return new Response('OK', { status: 200, headers: corsHeaders });
    }

    if (url.pathname.startsWith('/api/mollie')) {
      const molliePath = url.pathname.replace(/^\/api\/mollie/, '') + url.search;
      const targetUrl = 'https://api.mollie.com' + molliePath;

      const headers = new Headers();
      const authHeader = request.headers.get('Authorization');
      if (authHeader) headers.set('Authorization', authHeader);
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
