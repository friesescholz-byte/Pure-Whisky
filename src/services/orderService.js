/**
 * Order, Payment & Email Dispatch Service
 * Handles Mollie Test Gateway and Resend Email Dispatch
 */

import { generateInvoicePdfBase64 } from './invoicePdfGenerator.js';

export const DEFAULT_ADMIN_EMAIL = 'friese.scholz@gmail.com';
export const SENDER_EMAIL = 'PURE.WHISKY. <noreply@scholz-friese-webdesign.de>';
export const REPLY_TO_EMAIL = 'info@pure-whisky.com';

export const DEFAULT_MOLLIE_KEY = 'test_757rbjSksxgtDCCAps98ThDSgpxCaz';

export function getMollieKey() {
  const customKey = typeof window !== 'undefined' ? localStorage.getItem('pure_mollie_key') : null;
  if (customKey && customKey.trim()) {
    return customKey.trim();
  }
  return import.meta.env?.VITE_MOLLIE_API_KEY || DEFAULT_MOLLIE_KEY;
}

export function getResendKey() {
  return import.meta.env?.VITE_RESEND_API_KEY || localStorage.getItem('pure_resend_key') || '';
}

/**
 * Creates a Mollie Payment via /api/mollie/v2/payments proxy
 */
export async function createMolliePayment({ orderId, amount, description, redirectUrl, customerEmail }) {
  const apiKey = getMollieKey();
  const formattedAmount = Number(amount).toFixed(2);

  const payload = {
    amount: {
      currency: 'EUR',
      value: formattedAmount
    },
    description: description || `PURE.WHISKY. Bestellung #${orderId}`,
    redirectUrl: redirectUrl || `${window.location.origin}/?order_status=paid&order_id=${orderId}`,
    metadata: {
      orderId,
      customerEmail
    }
  };

  // Only pass webhookUrl on live public HTTPS domains (Mollie rejects localhost/http webhook URLs)
  if (typeof window !== 'undefined' && window.location.protocol === 'https:' && !window.location.hostname.includes('localhost')) {
    payload.webhookUrl = `${window.location.origin}/api/mollie/webhook`;
  }

  try {
    const response = await fetch('/api/mollie/v2/payments', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    if (response.ok && data.id && data._links?.checkout?.href) {
      return {
        success: true,
        paymentId: data.id,
        checkoutUrl: data._links.checkout.href,
        status: data.status,
        raw: data
      };
    } else {
      console.warn('Mollie API response error:', data);
      const errMsg = data.detail || data.title || (data.extra ? JSON.stringify(data.extra) : 'Zahlung konnte nicht initialisiert werden.');
      return {
        success: false,
        error: errMsg,
        raw: data
      };
    }
  } catch (err) {
    console.error('Failed to create Mollie payment:', err);
    return {
      success: false,
      error: err.message
    };
  }
}

/**
 * Generic email sender via Scholz & Friese Shops Resend Worker
 */
async function sendResendMail({ to, bcc, subject, html, attachments }) {
  const recipients = Array.isArray(to) ? [...to] : [to];
  if (bcc) {
    const bccList = Array.isArray(bcc) ? bcc : [bcc];
    bccList.forEach(b => {
      if (b && !recipients.includes(b)) recipients.push(b);
    });
  }

  const payload = {
    from: SENDER_EMAIL,
    to: recipients,
    reply_to: REPLY_TO_EMAIL,
    subject,
    html
  };

  if (attachments && attachments.length > 0) {
    payload.attachments = attachments;
  }

  let response = null;
  let resData = null;

  try {
    // 1. Primary: Official Scholz & Friese Shops Resend Worker (Active & Verified)
    response = await fetch('https://resend-mailer.friese-scholz.workers.dev', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    resData = await response.json();
  } catch (err) {
    // 2. Fallback: Local Vite proxy
    try {
      const apiKey = getResendKey();
      response = await fetch('/api/resend/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      resData = await response.json();
    } catch (fallbackErr) {
      console.warn('Email dispatch failed on both endpoints:', fallbackErr);
    }
  }

  return { ok: response?.ok || false, data: resData };
}

/**
 * Format currency helper
 */
const formatEur = (val) => Number(val || 0).toFixed(2).replace('.', ',') + ' €';

/**
 * Sync single order to Cloudflare KV for cross-device visibility
 */
export async function syncOrderToServer(order) {
  try {
    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order),
      keepalive: true
    });
    return await res.json();
  } catch (err) {
    console.warn('Could not sync order to server KV:', err);
    return null;
  }
}

/**
 * Fetch all orders from Cloudflare KV
 */
export async function fetchOrdersFromServer() {
  try {
    const res = await fetch('/api/orders');
    const data = await res.json();
    if (data && Array.isArray(data.orders)) {
      return data.orders;
    }
    return [];
  } catch (err) {
    console.warn('Could not fetch orders from server KV:', err);
    return [];
  }
}

/**
 * Sends separate Admin Notification about new order to Ines Zager & admin
 */
export async function sendAdminNewOrderNotification({ order, adminEmail = DEFAULT_ADMIN_EMAIL }) {
  const itemsList = order.items?.map(item => `
    <tr>
      <td style="padding: 8px 10px; border-bottom: 1px solid #e5e5e5; font-size: 13px;">
        <strong>${item.name}</strong><br/>
        <span style="font-size: 11px; color: #666;">${item.caskInfo || 'Single Cask'}</span>
      </td>
      <td style="padding: 8px 10px; border-bottom: 1px solid #e5e5e5; text-align: center; font-size: 13px;">${item.quantity}</td>
      <td style="padding: 8px 10px; border-bottom: 1px solid #e5e5e5; text-align: right; font-size: 13px; font-weight: bold;">${formatEur(item.price * item.quantity)}</td>
    </tr>
  `).join('') || '';

  const html = `
    <!DOCTYPE html>
    <html lang="de">
    <head><meta charset="utf-8"></head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f4f4f5; margin: 0; padding: 25px;">
      <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e4e4e7; border-radius: 10px; overflow: hidden;">
        
        <div style="background: #181F1C; padding: 20px; text-align: center;">
          <h2 style="color: #ffffff; margin: 0; font-size: 18px; letter-spacing: 1px;">🔔 NEUE BESTELLUNG EINGEGANGEN</h2>
          <p style="color: #B85D2C; margin: 5px 0 0 0; font-size: 14px; font-weight: bold;">Bestellung #${order.orderId} · ${formatEur(order.total)}</p>
        </div>

        <div style="padding: 25px; color: #181F1C; font-size: 13px; line-height: 1.6;">
          <p style="font-size: 15px; margin-top: 0;">
            Hallo Ines, es ist soeben eine neue Bestellung im Shop eingegangen!
          </p>

          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 15px; margin: 15px 0;">
            <strong style="color: #0f172a; font-size: 14px;">Kundendaten:</strong><br/>
            <strong>Name:</strong> ${order.customer.firstName} ${order.customer.lastName}<br/>
            <strong>E-Mail:</strong> <a href="mailto:${order.customer.email}" style="color: #B85D2C;">${order.customer.email}</a><br/>
            <strong>Lieferadresse:</strong><br/>
            ${order.customer.street}<br/>
            ${order.customer.zip} ${order.customer.city}<br/>
            <strong>Zahlungsstatus:</strong> <span style="color: #15803d; font-weight: bold;">${order.paymentMethod || 'Online-Zahlung (Mollie)'}</span>
          </div>

          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <thead>
              <tr style="background: #f1f5f9; text-align: left;">
                <th style="padding: 8px 10px; font-size: 11px; text-transform: uppercase;">Artikel</th>
                <th style="padding: 8px 10px; font-size: 11px; text-transform: uppercase; text-align: center;">Menge</th>
                <th style="padding: 8px 10px; font-size: 11px; text-transform: uppercase; text-align: right;">Gesamt</th>
              </tr>
            </thead>
            <tbody>
              ${itemsList}
            </tbody>
          </table>

          <div style="text-align: right; font-size: 14px; font-weight: bold; margin-bottom: 20px;">
            Gesamtbetrag: <span style="color: #B85D2C; font-size: 17px;">${formatEur(order.total)}</span> (inkl. Versand & 19% MwSt.)
          </div>

          <div style="background: #fffbeb; border: 1px solid #fef3c7; border-radius: 8px; padding: 15px; text-align: center;">
            <p style="margin: 0 0 8px 0; color: #92400e; font-weight: bold;">Aktion im Admin-Dashboard erforderlich:</p>
            <p style="margin: 0; font-size: 12px; color: #78350f; line-height: 1.5;">
              Die Bestellung ist im Admin-Dashboard unter <strong>Bestellungen</strong> hinterlegt. Sobald Sie die Bestellung geprüft haben, versenden Sie dort mit einem Klick die offizielle Rechnung als PDF an den Kunden, um den Kaufvertrag rechtswirksam zu schließen.
            </p>
          </div>
        </div>

        <div style="background: #f8fafc; padding: 15px; text-align: center; font-size: 11px; color: #64748b; border-top: 1px solid #e2e8f0;">
          PURE.WHISKY. Bestellsystem · Automatische Benachrichtigung
        </div>

      </div>
    </body>
    </html>
  `;

  // Always deliver to both Ines Zager and adminEmail
  const recipients = ['info@pure-whisky.com'];
  if (adminEmail && !recipients.includes(adminEmail)) {
    recipients.push(adminEmail);
  }

  return sendResendMail({
    to: recipients,
    subject: `🔔 Neue Bestellung #${order.orderId} eingegangen (${formatEur(order.total)}) – ${order.customer.firstName} ${order.customer.lastName}`,
    html
  });
}

/**
 * Sends order entry confirmation to customer (NO PDF INVOICE ATTACHED)
 * Explicitly states that the purchase contract will only be concluded when the official invoice is sent from the admin panel.
 */
export async function sendOrderConfirmationEmail({ order, adminEmail = DEFAULT_ADMIN_EMAIL }) {
  const itemsHtml = order.items?.map(item => `
    <tr>
      <td style="padding: 10px 12px; border-bottom: 1px solid #f0ede6; font-size: 13px; color: #181F1C;">
        <strong>${item.name}</strong><br/>
        <span style="font-size: 11px; color: #55695E;">${item.caskInfo || 'Single Cask Selection'}</span>
      </td>
      <td style="padding: 10px 12px; border-bottom: 1px solid #f0ede6; font-size: 13px; text-align: center; color: #181F1C;">${item.quantity}</td>
      <td style="padding: 10px 12px; border-bottom: 1px solid #f0ede6; font-size: 13px; text-align: right; color: #181F1C;">${formatEur(item.price * item.quantity)}</td>
    </tr>
  `).join('') || '';

  const html = `
    <!DOCTYPE html>
    <html lang="de">
    <head>
      <meta charset="utf-8">
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #FAF8F5; margin: 0; padding: 30px 15px;">
      <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #E2DDD5; border-radius: 12px; overflow: hidden;">
        
        <div style="background: #181F1C; padding: 24px 30px; text-align: center;">
          <img src="https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/Pure-Whisky/logo-pure-whisky.png" alt="PURE.WHISKY." style="width: 70px; height: 70px; object-fit: contain; margin-bottom: 8px;" />
          <h1 style="color: #FAF8F5; font-size: 20px; margin: 0; font-weight: normal; letter-spacing: 1px;">PURE.WHISKY.</h1>
          <p style="color: #C5BCB0; font-size: 11px; margin: 4px 0 0 0; text-transform: uppercase; letter-spacing: 2px;">Bestelleingangsbestätigung</p>
        </div>

        <div style="padding: 30px;">
          <p style="font-size: 15px; color: #181F1C; margin-top: 0;">
            Guten Tag ${order.customer.firstName} ${order.customer.lastName},
          </p>
          <p style="font-size: 13px; color: #55695E; line-height: 1.6;">
            vielen Dank für Ihre Bestellung bei <strong>PURE.WHISKY.</strong>! Ihre Bestellung ist unter der Bestellnummer <strong>#${order.orderId}</strong> erfolgreich bei mir eingegangen und wird nun von mir persönlich geprüft.
          </p>

          <div style="background: #FAF8F5; border: 1px solid #E2DDD5; border-radius: 8px; padding: 14px 16px; margin: 20px 0; font-size: 12px; color: #55695E; line-height: 1.5;">
            <strong style="color: #181F1C;">Wichtiger Hinweis zum Kaufvertrag:</strong><br/>
            Diese E-Mail bestätigt lediglich den Eingang Ihrer Bestellung. Die Verfügbarkeitsprüfung Ihrer handverlesenen Einzelflaschen erfolgt persönlich durch mich. Nach erfolgreicher Prüfung erhalten Sie in Kürze Ihre offizielle Rechnung in einer separaten E-Mail. Erst mit Zusendung dieser Rechnung kommt der Kaufvertrag rechtswirksam zustande.
          </div>

          <table style="width: 100%; border-collapse: collapse; margin: 24px 0;">
            <thead>
              <tr style="background: #F4F0EA; text-align: left;">
                <th style="padding: 8px 12px; font-size: 11px; color: #181F1C; text-transform: uppercase;">Artikel</th>
                <th style="padding: 8px 12px; font-size: 11px; color: #181F1C; text-transform: uppercase; text-align: center;">Menge</th>
                <th style="padding: 8px 12px; font-size: 11px; color: #181F1C; text-transform: uppercase; text-align: right;">Gesamt</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
            </tbody>
          </table>

          <div style="text-align: right; margin-top: 15px; font-size: 13px; color: #181F1C;">
            <p style="margin: 4px 0;">Zwischensumme: <strong>${formatEur(order.total - (order.shipping ?? 6.90))}</strong></p>
            <p style="margin: 4px 0;">Versand (DHL GoGreen): <strong>${formatEur(order.shipping ?? 6.90)}</strong></p>
            <p style="margin: 8px 0 0 0; font-size: 17px; color: #B85D2C; font-weight: bold; border-top: 2px solid #181F1C; padding-top: 8px;">
              Gesamtbetrag: ${formatEur(order.total)}
            </p>
            <p style="margin: 4px 0 0 0; font-size: 11px; color: #78887E;">inkl. 19% MwSt.</p>
          </div>

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #E2DDD5; font-size: 12px; color: #78887E; line-height: 1.6;">
            <p style="margin: 0 0 4px 0; font-weight: bold; color: #181F1C;">Lieferadresse:</p>
            ${order.customer.firstName} ${order.customer.lastName}<br/>
            ${order.customer.street}<br/>
            ${order.customer.zip} ${order.customer.city}
          </div>
        </div>

        <div style="background: #F4F0EA; padding: 18px 30px; text-align: center; font-size: 11px; color: #78887E;">
          PURE.WHISKY. · Inhaberin Ines Zager · Am Urnenfeld 1c · 29339 Wathlingen · Deutschland<br/>
          E-Mail: <a href="mailto:info@pure-whisky.com" style="color: #B85D2C; text-decoration: none;">info@pure-whisky.com</a>
        </div>

      </div>
    </body>
    </html>
  `;

  // 1. Send customer confirmation email (WITHOUT attachments)
  const customerPromise = sendResendMail({
    to: order.customer.email,
    subject: `Bestelleingangsbestätigung #${order.orderId} – PURE.WHISKY.`,
    html
  });

  // 2. Send dedicated Admin Notification to Ines Zager and adminEmail
  const adminPromise = sendAdminNewOrderNotification({ order, adminEmail });

  return Promise.allSettled([customerPromise, adminPromise]);
}

/**
 * Sends official PDF-style Invoice email to customer with BCC to admin
 * This concludes the binding sales contract.
 */
export async function sendInvoiceEmail({ order, adminEmail = DEFAULT_ADMIN_EMAIL }) {
  const subtotal = order.items?.reduce((sum, item) => sum + (item.price * item.quantity), 0) || (order.total - (order.shipping ?? 6.90));
  const shipping = order.shipping ?? 6.90;
  const total = order.total || (subtotal + shipping);
  const net = order.netTotal || (total / 1.19);
  const vat = order.vatTotal || (total - net);
  const invoiceNum = order.invoiceNumber || `A09401${order.orderId}`;
  const dateStr = order.date || new Date().toLocaleDateString('de-DE');

  const itemsHtml = order.items?.map(item => `
    <tr>
      <td style="padding: 12px 10px; border-bottom: 1px solid #f0ede6; font-size: 13px; color: #000000; vertical-align: top;">
        <div style="font-weight: bold; color: #000000;">${item.name}</div>
        ${item.caskInfo ? `<div style="font-size: 11px; color: #666666; margin-top: 2px;">${item.caskInfo}</div>` : ''}
        <div style="font-size: 10px; color: #888888; text-transform: uppercase; margin-top: 2px;">PURE.WHISKY.</div>
      </td>
      <td style="padding: 12px 10px; border-bottom: 1px solid #f0ede6; font-size: 13px; text-align: center; color: #000000; vertical-align: top;">${item.quantity}</td>
      <td style="padding: 12px 10px; border-bottom: 1px solid #f0ede6; font-size: 13px; text-align: right; color: #000000; vertical-align: top;">${formatEur(item.price)}</td>
      <td style="padding: 12px 10px; border-bottom: 1px solid #f0ede6; font-size: 13px; text-align: right; font-weight: bold; color: #000000; vertical-align: top;">${formatEur(item.price * item.quantity)}</td>
    </tr>
  `).join('') || '';

  const html = `
    <!DOCTYPE html>
    <html lang="de">
    <head>
      <meta charset="utf-8">
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #FAFAFA; margin: 0; padding: 40px 15px;">
      <div style="max-width: 650px; margin: 0 auto; background: #ffffff; border: 1px solid #E5E5E5; box-shadow: 0 4px 20px rgba(0,0,0,0.05); padding: 40px;">
        
        <!-- Logo Top-Left -->
        <div style="margin-bottom: 24px;">
          <img src="https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/Pure-Whisky/logo-pure-whisky.png" alt="PURE.WHISKY." style="width: 90px; height: 90px; object-fit: contain;" />
        </div>

        <!-- Sender Subline -->
        <div style="font-size: 10px; color: #888888; margin-bottom: 20px;">
          PURE.WHISKY. – Am Urnenfeld 1c – 29339 Wathlingen – info@pure-whisky.com
        </div>

        <!-- Recipient Address -->
        <div style="font-size: 13px; line-height: 1.5; color: #000000; margin-bottom: 40px;">
          <div style="font-size: 14px;">${order.customer.firstName} ${order.customer.lastName}</div>
          ${order.customer.street ? `<div>${order.customer.street}</div>` : ''}
          <div>${order.customer.zip} ${order.customer.city}</div>
        </div>

        <!-- Heading -->
        <h1 style="font-size: 24px; font-weight: bold; color: #000000; margin: 0 0 24px 0; text-transform: uppercase; letter-spacing: 0.5px;">
          RECHNUNG
        </h1>

        <!-- Metadata -->
        <table style="width: 100%; font-size: 12px; color: #000000; line-height: 1.6; margin-bottom: 30px;">
          <tr>
            <td style="vertical-align: top;">
              <div>Rechnungsnummer: <strong>${invoiceNum}</strong></div>
              <div>Bestellnummer: <strong>${order.orderId}</strong></div>
              <div>Zahlungsart: <strong>${order.paymentMethod || 'PayPal'}</strong></div>
            </td>
            <td style="vertical-align: top; text-align: right;">
              <div>Datum: <strong>${dateStr}</strong></div>
            </td>
          </tr>
        </table>

        <!-- Table -->
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
          <thead>
            <tr style="background: #F2F2F2;">
              <th style="padding: 10px; font-size: 12px; font-weight: bold; color: #000000; text-align: left;">Bezeichnung</th>
              <th style="padding: 10px; font-size: 12px; font-weight: bold; color: #000000; text-align: center; width: 60px;">Anzahl</th>
              <th style="padding: 10px; font-size: 12px; font-weight: bold; color: #000000; text-align: right; width: 90px;">Preis</th>
              <th style="padding: 10px; font-size: 12px; font-weight: bold; color: #000000; text-align: right; width: 90px;">Gesamt</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml}
          </tbody>
        </table>

        <!-- Totals -->
        <div style="width: 280px; margin-left: auto; font-size: 12px; color: #000000; margin-bottom: 50px;">
          <div style="display: flex; justify-content: space-between; padding: 4px 0;">
            <span>Zwischensumme / Subtotal</span>
            <span>${formatEur(subtotal)}</span>
          </div>
          <div style="display: flex; justify-content: space-between; padding: 4px 0;">
            <span>Versand / Shipping</span>
            <span>${formatEur(shipping)}</span>
          </div>
          <div style="border-top: 1px solid #000000; border-bottom: 2px solid #000000; font-size: 15px; font-weight: bold; padding: 8px 0; margin: 4px 0; display: flex; justify-content: space-between;">
            <span>Gesamt</span>
            <span>${formatEur(total)}</span>
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 11px; color: #888888; padding: 2px 0;">
            <span>Netto / net value</span>
            <span>${formatEur(net)}</span>
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 11px; color: #888888; padding: 2px 0;">
            <span>MwSt. / VAT 19 %</span>
            <span>${formatEur(vat)}</span>
          </div>
        </div>

        <!-- Attachment Notice -->
        <div style="background: #F4F0EA; border: 1px solid #E2DDD5; border-radius: 8px; padding: 12px 16px; margin-bottom: 30px; font-size: 12px; color: #181F1C;">
          📄 Diese Rechnung liegt dieser E-Mail zusätzlich als offizielle <strong>PDF-Datei</strong> bei.
        </div>

        <!-- Footer -->
        <div style="border-top: 1px solid #E5E5E5; padding-top: 20px; font-size: 10px; color: #888888; line-height: 1.6;">
          <div style="text-align: right; margin-bottom: 12px; color: #000000;">Seite 1 von 1</div>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="vertical-align: top; width: 33%;">
                <strong style="color: #555555;">Bankverbindung</strong><br/>
                Kontoinhaber: Ines Zager<br/>
                IBAN: DE18 2707 0369 0056 5085 00
              </td>
              <td style="vertical-align: top; width: 33%;">
                <strong style="color: #555555;">Kontaktiere uns</strong><br/>
                Email: <a href="mailto:info@pure-whisky.com" style="color: #888888; text-decoration: none;">info@pure-whisky.com</a>
              </td>
              <td style="vertical-align: top; width: 34%;">
                <strong style="color: #555555;">PURE.WHISKY.</strong><br/>
                Am Urnenfeld 1c<br/>
                29339 Wathlingen<br/>
                Deutschland
              </td>
            </tr>
          </table>
        </div>

      </div>
    </body>
    </html>
  `;

  // Generate attached Invoice PDF
  const attachments = [];
  try {
    const pdfBase64 = generateInvoicePdfBase64(order);
    if (pdfBase64) {
      attachments.push({
        filename: `Rechnung_${invoiceNum}.pdf`,
        content: pdfBase64
      });
    }
  } catch (pdfErr) {
    console.warn('Could not generate PDF attachment for invoice email:', pdfErr);
  }

  const bccRecipients = ['info@pure-whisky.com'];
  if (adminEmail && !bccRecipients.includes(adminEmail)) {
    bccRecipients.push(adminEmail);
  }

  return sendResendMail({
    to: order.customer.email,
    bcc: bccRecipients,
    subject: `Rechnung ${invoiceNum} zu Ihrer Bestellung #${order.orderId} – PURE.WHISKY.`,
    html,
    attachments
  });
}