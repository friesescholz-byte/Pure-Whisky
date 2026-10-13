export async function onRequest(context) {
  const { request, params, env } = context;
  const url = new URL(request.url);

  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0'
  };

  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders, status: 204 });
  }

  // Webhook: Process payment status and update order in KV
  if (url.pathname === '/api/mollie/webhook') {
    try {
      if (request.method === 'POST') {
        const bodyText = await request.text();
        const params = new URLSearchParams(bodyText);
        const paymentId = params.get('id');

        const serverKey = (env?.MOLLIE_API_KEY || '').trim();
        if (paymentId && serverKey && env && env.PURE_KV) {
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

  const molliePath = url.pathname.replace(/^\/api\/mollie/, '') + url.search;
  const targetUrl = 'https://api.mollie.com' + molliePath;

  const apiKey = (env?.MOLLIE_API_KEY || '').trim();
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'MOLLIE_API_KEY Secret fehlt in Cloudflare Pages.' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }

  const headers = new Headers();
  headers.set('Authorization', `Bearer ${apiKey}`);
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
