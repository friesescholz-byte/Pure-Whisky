export async function onRequest(context) {
  const { request, params } = context;
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

  // Webhook return OK
  if (url.pathname === '/api/mollie/webhook') {
    return new Response('OK', { status: 200, headers: corsHeaders });
  }

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
