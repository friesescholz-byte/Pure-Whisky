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
