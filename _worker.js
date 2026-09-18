export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders, status: 204 });
    }

    // 1. API: GET /api/unsubscribers
    if (request.method === 'GET' && url.pathname === '/api/unsubscribers') {
      try {
        let list = [];
        if (env.PURE_KV) {
          const kvList = await env.PURE_KV.list({ prefix: 'unsub:' });
          list = kvList.keys.map(k => k.name.replace('unsub:', ''));
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
        const email = (body.email || '').toLowerCase().trim();
        if (!email) {
          return new Response(JSON.stringify({ error: 'E-Mail fehlt' }), { status: 400, headers: corsHeaders });
        }

        if (env.PURE_KV) {
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
        const email = (body.email || '').toLowerCase().trim();
        if (email && env.PURE_KV) {
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
    return env.ASSETS.fetch(request);
  }
};
