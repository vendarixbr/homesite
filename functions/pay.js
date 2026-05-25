const DUTTYFY_URL = 'https://www.pagamentos-seguros.app/api-pix/WA0Uv7S1zE7IiuoXBBoOL0JB5vi61sph6essiBrNdGD4eAEJCy3kYI6X2HZPqkDThFgIPJxbe0e6_csFbEkKLA';

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json',
};

export async function onRequestOptions() {
  return new Response(null, { status: 204, headers: CORS });
}

export async function onRequestPost(context) {
  try {
    const body = await context.request.json();
    const res = await fetch(DUTTYFY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    return new Response(JSON.stringify(data), { status: res.status, headers: CORS });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: CORS });
  }
}

export async function onRequestGet(context) {
  const url = new URL(context.request.url);
  const transactionId = url.searchParams.get('transactionId');
  if (!transactionId) {
    return new Response(JSON.stringify({ error: 'transactionId required' }), { status: 400, headers: CORS });
  }
  try {
    const res = await fetch(`${DUTTYFY_URL}?transactionId=${encodeURIComponent(transactionId)}`);
    const data = await res.json();
    return new Response(JSON.stringify(data), { status: res.status, headers: CORS });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: CORS });
  }
}
