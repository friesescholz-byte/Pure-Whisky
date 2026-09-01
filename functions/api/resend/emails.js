export async function onRequestPost(context) {
  const { request, env } = context;
  try {
    const body = await request.json();
    const apiKey = env.RESEND_API_KEY || (typeof process !== 'undefined' ? process.env.RESEND_API_KEY : '');

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0'
      },
      body: JSON.stringify(body)
    });

    const data = await res.text();
    return new Response(data, {
      status: res.status,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
