export async function onRequest(context) {
  const { request, env } = context;
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0'
  };

  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders, status: 204 });
  }

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

  return new Response('Method not allowed', { status: 405, headers: corsHeaders });
}
