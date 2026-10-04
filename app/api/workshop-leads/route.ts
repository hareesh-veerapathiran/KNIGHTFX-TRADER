import { workshop } from '@/data/workshop';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type LeadBody = {
  fullName?: unknown;
  email?: unknown;
  mobileNumber?: unknown;
  telegramUsernameOrId?: unknown;
  couponCode?: unknown;
  consent?: unknown;
};

function response(status: number, body: Record<string, unknown>) {
  return Response.json(body, { status, headers: { 'Cache-Control': 'no-store' } });
}

function clean(value: unknown, max: number) {
  return typeof value === 'string' ? value.trim().replace(/[\u0000-\u001f\u007f]/g, '').slice(0, max) : '';
}

function validMobile(value: string) {
  const digits = value.replace(/\D/g, '');
  return /^\+?[\d\s().-]{7,22}$/.test(value) && digits.length >= 7 && digits.length <= 15;
}

export async function POST(request: Request) {
  const origin = request.headers.get('origin');
  if (!origin || origin !== new URL(request.url).origin) return response(403, { ok: false, error: 'Request could not be verified.' });
  if (request.headers.get('x-requested-with') !== 'XMLHttpRequest') return response(403, { ok: false, error: 'Request could not be verified.' });
  const length = Number(request.headers.get('content-length') ?? 0);
  if (length > 10_000) return response(413, { ok: false, error: 'The submitted form is too large.' });

  let body: LeadBody;
  try {
    const reader = request.body?.getReader();
    if (!reader) return response(400, { ok: false, error: 'Enter valid registration details.' });
    const chunks: Uint8Array[] = [];
    let total = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      total += value.byteLength;
      if (total > 10_000) {
        await reader.cancel();
        return response(413, { ok: false, error: 'The submitted form is too large.' });
      }
      chunks.push(value);
    }
    const bytes = new Uint8Array(total);
    let offset = 0;
    for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
    body = JSON.parse(new TextDecoder().decode(bytes)) as LeadBody;
  } catch {
    return response(400, { ok: false, error: 'Enter valid registration details.' });
  }

  const fullName = clean(body.fullName, 120);
  const email = clean(body.email, 254).toLowerCase();
  const mobileNumber = clean(body.mobileNumber, 30);
  const telegram = clean(body.telegramUsernameOrId, 40);
  const coupon = clean(body.couponCode, 40).toUpperCase();
  if (fullName.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) ||
    !validMobile(mobileNumber) || !(/^@[A-Za-z][A-Za-z0-9_]{4,31}$/.test(telegram) || /^\d{5,20}$/.test(telegram)) ||
    coupon !== workshop.coupon.code.toUpperCase() || body.consent !== true) {
    return response(400, { ok: false, error: 'Please check the required details, coupon code, and consent.' });
  }

  const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceKey) {
    console.error('[workshop-leads] Missing server-side Supabase configuration.');
    return response(503, { ok: false, code: 'configuration_missing' });
  }

  const forwarded = request.headers.get('x-forwarded-for')?.split(',').at(-1)?.trim();
  const clientIp = forwarded || request.headers.get('x-real-ip') || 'unknown';
  const ipDigest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(clientIp));
  const ipHash = Array.from(new Uint8Array(ipDigest), (byte) => byte.toString(16).padStart(2, '0')).join('');
  let limited: Response;
  try {
    limited = await fetch(`${supabaseUrl.replace(/\/$/, '')}/rest/v1/rpc/allow_workshop_lead`, {
      method: 'POST',
      headers: { apikey: serviceKey, Authorization: `Bearer ${serviceKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ p_ip_hash: ipHash }),
      cache: 'no-store',
      signal: AbortSignal.timeout(5000),
    });
  } catch {
    return response(503, { ok: false, code: 'unavailable' });
  }
  if (!limited.ok) {
    console.error('[workshop-leads] Rate-limit RPC rejected the request with status', limited.status);
    return response(503, { ok: false, code: 'unavailable' });
  }
  if (await limited.json().catch(() => false) !== true) return response(429, { ok: false, code: 'rate_limited' });

  const discountAmount = workshop.coupon.discount;
  const finalPrice = workshop.currentPrice - discountAmount;
  const endpoint = `${supabaseUrl.replace(/\/$/, '')}/rest/v1/workshop_leads`;
  let stored: Response;
  try {
    stored = await fetch(endpoint, {
      method: 'POST',
      headers: {
        apikey: serviceKey,
        Authorization: `Bearer ${serviceKey}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
      body: JSON.stringify({
        full_name: fullName,
        email,
        mobile_number: mobileNumber,
        telegram_username_or_id: telegram,
        coupon_code: workshop.coupon.code,
        discount_amount: discountAmount,
        regular_price: workshop.currentPrice,
        final_price: finalPrice,
        consent: true,
        source: 'KNIGHTFX Futures + CFD Workshop',
      }),
      cache: 'no-store',
      signal: AbortSignal.timeout(8000),
    });
  } catch {
    return response(503, { ok: false, code: 'unavailable' });
  }

  if (stored.status === 409) return response(409, { ok: false, code: 'duplicate' });
  if (!stored.ok) {
    console.error('[workshop-leads] Supabase insert failed with status', stored.status);
    return response(503, { ok: false, code: 'unavailable' });
  }

  return response(200, { ok: true, discountAmount, finalPrice });
}
