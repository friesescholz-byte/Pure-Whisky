/**
 * Order, Payment & Email Dispatch Service
 * Handles Mollie Test Gateway and Resend Email Dispatch
 */

export const MOLLIE_TEST_API_KEY = 'test_757rbjSksxgtDCCAps98ThDSgpxCaz';
export const DEFAULT_ADMIN_EMAIL = 'friese.scholz@gmail.com';
export const SENDER_EMAIL = 'PURE.WHISKY. <noreply@scholz-friese-webdesign.de>';
export const REPLY_TO_EMAIL = 'info@pure-whisky.com';

export function getMollieKey() {
  return localStorage.getItem('pure_mollie_key') || MOLLIE_TEST_API_KEY;
}

export function getResendKey() {
  return localStorage.getItem('pure_resend_key') || (import.meta.env?.VITE_RESEND_API_KEY || '');
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
    webhookUrl: 'https://pure-whisky.com/api/mollie/webhook',
    metadata: {
      orderId,
      customerEmail
    }
  };

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
    if (response.ok && data.id) {
      return {
        success: true,
        paymentId: data.id,
        checkoutUrl: data._links?.checkout?.href || null,
        status: data.status,
        raw: data
      };
    } else {
      console.warn('Mollie API response error:', data);
      return {
        success: false,
        error: data.detail || data.title || 'Mollie API Error',
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
async function sendResendMail({ to, bcc, subject, html }) {
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
 * Sends order entry confirmation to customer with BCC to admin
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
    <html>
    <head><meta charset="utf-8"></head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #FAF8F5; margin: 0; padding: 30px 15px;">
      <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #E2DDD5; border-radius: 12px; overflow: hidden;">
        
        <div style="background: #181F1C; padding: 24px 30px; text-align: center;">
          <img src="https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/Pure-Whisky/logo-pure-whisky.png" alt="PURE.WHISKY." style="width: 70px; height: 70px; object-fit: contain; margin-bottom: 8px;" />
          <h1 style="color: #FAF8F5; font-size: 20px; margin: 0; font-weight: normal; letter-spacing: 1px;">PURE.WHISKY.</h1>
          <p style="color: #C5BCB0; font-size: 11px; margin: 4px 0 0 0; text-transform: uppercase; letter-spacing: 2px;">Bestelleingangsbest?tigung</p>
        </div>

        <div style="padding: 30px;">
          <p style="font-size: 15px; color: #181F1C; margin-top: 0;">
            Guten Tag ${order.customer.firstName} ${order.customer.lastName},
          </p>
          <p style="font-size: 13px; color: #55695E; line-height: 1.6;">
            vielen Dank f?r Ihre Bestellung bei <strong>PURE.WHISKY.</strong>! Ihre Bestellung ist unter der Bestellnummer <strong>#${order.orderId}</strong> erfolgreich bei uns eingegangen und wird nun von Ines Zager pers?nlich gepr?ft.
          </p>

          <div style="background: #FAF8F5; border: 1px solid #E2DDD5; border-radius: 8px; padding: 14px 16px; margin: 20px 0; font-size: 12px; color: #55695E; line-height: 1.5;">
            <strong style="color: #181F1C;">Hinweis zum Kaufvertrag:</strong><br/>
            Diese E-Mail best?tigt den Eingang Ihrer Bestellung. Der Kaufvertrag kommt rechtswirksam durch die gesonderte Zusendung der offiziellen Rechnung zustande.
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
          PURE.WHISKY. ? Inhaberin Ines Zager ? D?rerring 1 ? 31582 Nienburg ? Deutschland<br/>
          E-Mail: <a href="mailto:info@pure-whisky.com" style="color: #B85D2C; text-decoration: none;">info@pure-whisky.com</a>
        </div>

      </div>
    </body>
    </html>
  `;

  return sendResendMail({
    to: order.customer.email,
    bcc: adminEmail,
    subject: `Bestelleingangsbest?tigung #${order.orderId} ? PURE.WHISKY.`,
    html
  });
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
    <html>
    <head><meta charset="utf-8"></head>
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

  return sendResendMail({
    to: order.customer.email,
    bcc: adminEmail,
    subject: `Rechnung ${invoiceNum} zu Ihrer Bestellung #${order.orderId} ? PURE.WHISKY.`,
    html
  });
}