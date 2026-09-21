import React, { useRef, useEffect } from 'react';
import { Printer, X, Download } from 'lucide-react';
import { downloadInvoicePdf } from '../services/invoicePdfGenerator';

export default function InvoiceModal({ isOpen, onClose, order }) {
  const printContentRef = useRef(null);

  // Toggle invoice-modal-open class on body when open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('invoice-modal-open');
    } else {
      document.body.classList.remove('invoice-modal-open');
    }
    return () => {
      document.body.classList.remove('invoice-modal-open');
    };
  }, [isOpen]);

  if (!isOpen || !order) return null;

  // Isolated 1-Page PDF Print using fixed A4 iframe (Prevents background page bleed & coordinate shifting)
  const handlePrint = () => {
    let iframe = document.getElementById('invoice-print-frame');
    if (iframe) {
      iframe.remove();
    }

    iframe = document.createElement('iframe');
    iframe.id = 'invoice-print-frame';
    // Exact A4 dimensions off-screen to guarantee browser layout engine computes 1:1 A4 proportions
    iframe.style.position = 'fixed';
    iframe.style.left = '-9999px';
    iframe.style.top = '0';
    iframe.style.width = '210mm';
    iframe.style.height = '297mm';
    iframe.style.border = '0';
    document.body.appendChild(iframe);

    const doc = iframe.contentWindow.document;
    doc.open();
    doc.write(`<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="utf-8" />
  <title>Rechnung_${order.invoiceNumber || order.orderId}</title>
  <style>
    @page {
      size: A4 portrait;
      margin: 10mm;
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    html, body {
      width: 190mm;
      max-width: 190mm;
      margin: 0 auto !important;
      padding: 0 !important;
      background: #ffffff !important;
      color: #000000 !important;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif !important;
      font-size: 9.75pt;
      line-height: 1.4;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    .sheet {
      width: 190mm;
      max-width: 190mm;
      margin: 0 auto;
      box-sizing: border-box;
      background: #ffffff;
      min-height: 275mm;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .logo {
      width: 28.5mm;
      height: 28.5mm;
      object-fit: contain;
      margin-bottom: 6mm;
      display: block;
    }
    .sender-line {
      font-size: 7.5pt;
      color: #777777;
      margin-bottom: 5mm;
      letter-spacing: 0.01em;
    }
    .recipient {
      font-size: 9.75pt;
      line-height: 1.35;
      color: #000000;
      margin-bottom: 12mm;
    }
    .title {
      font-size: 18.75pt;
      font-weight: 700;
      color: #000000;
      text-transform: uppercase;
      letter-spacing: -0.01em;
      margin-bottom: 7mm;
    }
    .meta-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 8mm;
      font-size: 9.75pt;
      line-height: 1.45;
    }
    .meta-table td {
      vertical-align: top;
      padding: 0;
    }
    .items-table {
      width: 100%;
      border-collapse: collapse;
      table-layout: fixed;
      margin-bottom: 6mm;
    }
    .items-table th {
      background-color: #F2F2F2 !important;
      font-size: 9.75pt;
      font-weight: 700;
      color: #000000;
      padding: 6px 8px;
      text-align: left;
      border: none;
    }
    .items-table td {
      padding: 8px 8px;
      font-size: 9.75pt;
      color: #000000;
      vertical-align: top;
      border-bottom: 1px solid #EEEEEE;
    }
    .totals-wrapper {
      width: 100%;
      display: flex;
      justify-content: flex-end;
      margin-bottom: 15mm;
    }
    .totals-table {
      width: 75mm;
      border-collapse: collapse;
      font-size: 9.75pt;
    }
    .totals-table td {
      padding: 3px 0;
    }
    .totals-table .amount {
      text-align: right;
      white-space: nowrap;
    }
    .totals-table tr.total-row td {
      font-size: 12pt;
      font-weight: 700;
      padding: 6px 0;
      border-top: 1.5pt solid #000000;
      border-bottom: 0.5pt solid #000000;
    }
    .totals-table tr.tax-row td {
      font-size: 8.25pt;
      color: #777777;
      padding: 2px 0;
    }
    .footer-wrapper {
      margin-top: auto;
      padding-top: 5mm;
      font-size: 8.25pt;
      color: #777777;
      line-height: 1.45;
    }
    .page-num {
      text-align: right;
      font-size: 8.5pt;
      color: #333333;
      margin-bottom: 2mm;
    }
    .footer-line {
      border: 0;
      border-top: 0.5pt solid #CCCCCC;
      margin-bottom: 3mm;
    }
    .footer-grid {
      display: flex;
      justify-content: space-between;
      text-align: left;
    }
    .footer-col {
      width: 32%;
    }
    .footer-col-title {
      font-weight: 700;
      color: #555555;
      margin-bottom: 1.5mm;
    }
  </style>
</head>
<body>
  <div class="sheet">
    <div>
      <img src="https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/Pure-Whisky/logo-pure-whisky.png" alt="PURE.WHISKY." class="logo" />
      
      <div class="sender-line">
        PURE.WHISKY. – Dürerring 1 – 31582 Nienburg – info@pure-whisky.com
      </div>

      <div class="recipient">
        <div>${order.customer?.firstName || ''} ${order.customer?.lastName || ''}</div>
        ${order.customer?.street ? `<div>${order.customer.street}</div>` : ''}
        <div>${order.customer?.zip || ''} ${order.customer?.city || ''}</div>
        <div>${order.customer?.country || 'Deutschland'}</div>
      </div>

      <div class="title">RECHNUNG</div>

      <table class="meta-table">
        <tr>
          <td>
            <div>Rechnungsnummer: ${order.invoiceNumber || `A09401${order.orderId}`}</div>
            <div>Bestellnummer: ${order.orderId}</div>
            <div>Zahlungsart: ${order.paymentMethod || 'PayPal'}</div>
          </td>
          <td style="text-align: right;">
            <div>Datum: ${order.date || new Date().toLocaleDateString('de-DE')}</div>
          </td>
        </tr>
      </table>

      <table class="items-table">
        <thead>
          <tr>
            <th style="width: 54%;">Bezeichnung</th>
            <th style="width: 12%; text-align: center;">Anzahl</th>
            <th style="width: 17%; text-align: right;">Preis</th>
            <th style="width: 17%; text-align: right;">Gesamt</th>
          </tr>
        </thead>
        <tbody>
          ${(order.items || []).map(item => `
            <tr>
              <td>
                <div style="font-weight: 500; color: #000000;">${item.name}</div>
                ${item.caskInfo ? `<div style="font-size: 8.5pt; color: #555555; margin-top: 2px;">${item.caskInfo}</div>` : ''}
                <div style="font-size: 7.5pt; color: #777777; letter-spacing: 0.05em; text-transform: uppercase; margin-top: 2px;">PURE.WHISKY.</div>
              </td>
              <td style="text-align: center;">${item.quantity}</td>
              <td style="text-align: right;">${formatPrice(item.price)}</td>
              <td style="text-align: right; color: #000000;">${formatPrice(item.price * item.quantity)}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>

      <div class="totals-wrapper">
        <table class="totals-table">
          <tr>
            <td>Zwischensumme / Subtotal</td>
            <td class="amount">${formatPrice(subtotal)}</td>
          </tr>
          <tr>
            <td>Versand / Shipping</td>
            <td class="amount">${formatPrice(shipping)}</td>
          </tr>
          <tr class="total-row">
            <td>Gesamt</td>
            <td class="amount">${formatPrice(total)}</td>
          </tr>
          <tr class="tax-row">
            <td>Netto / net value</td>
            <td class="amount">${formatPrice(net)}</td>
          </tr>
          <tr class="tax-row">
            <td>MwSt. / VAT 19 %</td>
            <td class="amount">${formatPrice(vat)}</td>
          </tr>
        </table>
      </div>
    </div>

    <div class="footer-wrapper">
      <div class="page-num">Seite 1 von 1</div>
      <hr class="footer-line" />
      <div class="footer-grid">
        <div class="footer-col">
          <div class="footer-col-title">Bankverbindung</div>
          <div>Kontoinhaber: Ines Zager</div>
          <div style="font-family: monospace; font-size: 7.5pt;">IBAN: DE18 2707 0369 0056 5085 00</div>
        </div>
        <div class="footer-col">
          <div class="footer-col-title">Kontaktiere uns</div>
          <div>Email: info@pure-whisky.com</div>
        </div>
        <div class="footer-col">
          <div class="footer-col-title">PURE.WHISKY.</div>
          <div>Dürerring 1</div>
          <div>31582 Nienburg</div>
        </div>
      </div>
    </div>
  </div>
</body>
</html>`);
    doc.close();

    // Trigger print once DOM is ready
    setTimeout(() => {
      try {
        iframe.contentWindow.focus();
        iframe.contentWindow.print();
      } catch (err) {
        console.warn('Iframe print error:', err);
        window.print();
      }
      setTimeout(() => {
        if (iframe && iframe.parentNode) {
          iframe.parentNode.removeChild(iframe);
        }
      }, 2500);
    }, 300);
  };

  // Safe formatting helpers
  const subtotal = order.items?.reduce((sum, item) => sum + (item.price * item.quantity), 0) || (order.total - (order.shipping ?? 6.90));
  const shipping = order.shipping ?? 6.90;
  const total = order.total || (subtotal + shipping);
  const net = order.netTotal || (total / 1.19);
  const vat = order.vatTotal || (total - net);

  const formatPrice = (val) => Number(val || 0).toFixed(2).replace('.', ',') + ' €';

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto bg-black/70 backdrop-blur-xs flex flex-col items-center justify-start p-2 sm:p-6 print:p-0 print:bg-white print:static print:overflow-visible">
      
      {/* Embedded print style to hide everything outside invoice if Ctrl+P is used */}
      <style>{`
        @media print {
          body > #root > *:not([data-invoice-modal-root="true"]) {
            display: none !important;
          }
          body {
            background: #ffffff !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          header, nav, footer {
            display: none !important;
          }
          @page {
            size: A4 portrait;
            margin: 10mm 12mm;
          }
        }
      `}</style>

      {/* Top Action Toolbar (Hidden in Print) */}
      <div className="w-full max-w-[210mm] bg-[#181F1C] text-white px-5 py-3 rounded-t-xl flex flex-wrap items-center justify-between gap-3 shadow-xl print:hidden">
        <div className="flex items-center space-x-3">
          <span className="font-serif text-lg tracking-wide text-[#E8DCC4]">PURE.WHISKY.</span>
          <span className="text-xs text-neutral-400">
            Rechnung #{order.invoiceNumber || `A09401${order.orderId}`}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => downloadInvoicePdf(order)}
            className="flex items-center space-x-1.5 px-3 py-2 bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold rounded-lg transition-all shadow-sm hover:scale-105 active:scale-95 cursor-pointer"
            title="Offizielle Rechnung als PDF herunterladen"
          >
            <Download className="w-3.5 h-3.5 text-[#B85D2C]" />
            <span>PDF herunterladen</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center space-x-1.5 px-3 py-2 bg-[#B85D2C] hover:bg-[#A04E24] text-white text-xs font-semibold rounded-lg transition-all shadow-sm hover:scale-105 active:scale-95 cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Drucken</span>
          </button>
          
          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer"
            title="Schließen"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* DIN A4 Container (1:1 Exact Match to Ines Zager PDF Template) */}
      <div 
        id="invoice-printable-sheet"
        ref={printContentRef}
        className="w-full max-w-[210mm] min-h-[297mm] bg-white text-black p-[10mm] shadow-2xl rounded-b-xl flex flex-col justify-between"
        style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}
      >
        <div>
          {/* Header Row: Official Round Logo (Top-Left) */}
          <div className="pb-4">
            <img 
              src="https://pub-b33108412309406a9a941ddc51e9a5b9.r2.dev/Pure-Whisky/logo-pure-whisky.png" 
              alt="PURE.WHISKY." 
              className="w-[28.5mm] h-[28.5mm] object-contain block"
            />
          </div>

          {/* SENDER LINE */}
          <div className="text-[7.5pt] text-neutral-500 mb-5 tracking-normal">
            PURE.WHISKY. – Dürerring 1 – 31582 Nienburg – info@pure-whisky.com
          </div>

          {/* RECIPIENT ADDRESS */}
          <div className="mb-10 text-[9.75pt] leading-snug text-black">
            <div className="font-normal text-[10pt]">
              {order.customer?.firstName} {order.customer?.lastName}
            </div>
            {order.customer?.street && <div>{order.customer.street}</div>}
            <div>
              {order.customer?.zip} {order.customer?.city}
            </div>
            <div>
              {order.customer?.country || 'Deutschland'}
            </div>
          </div>

          {/* DOCUMENT TITLE & METADATA GRID */}
          <div className="mb-6">
            <h1 className="text-[18.75pt] font-bold tracking-tight text-black mb-5 uppercase">
              RECHNUNG
            </h1>

            <div className="flex justify-between items-start text-[9.75pt] text-black leading-relaxed">
              <div className="space-y-0.5">
                <div>
                  <span className="font-normal">Rechnungsnummer: </span>
                  <span className="font-normal">{order.invoiceNumber || `A09401${order.orderId}`}</span>
                </div>
                <div>
                  <span className="font-normal">Bestellnummer: </span>
                  <span className="font-normal">{order.orderId}</span>
                </div>
                <div>
                  <span className="font-normal">Zahlungsart: </span>
                  <span className="font-normal">
                    {order.paymentMethod || `PayPal – ${order.customer?.email || 'info@pure-whisky.com'}`}
                  </span>
                </div>
              </div>
              
              <div className="text-right">
                <div>
                  <span className="font-normal">Datum: </span>
                  <span className="font-normal">{order.date || new Date().toLocaleDateString('de-DE')}</span>
                </div>
              </div>
            </div>
          </div>

          {/* POSITIONS TABLE */}
          <div className="mb-5">
            <table className="w-full text-left border-collapse table-fixed">
              <thead>
                <tr className="bg-[#F2F2F2] text-[9.75pt] font-bold text-black">
                  <th className="py-1.5 px-2 w-[54%]">Bezeichnung</th>
                  <th className="py-1.5 px-2 text-center w-[12%]">Anzahl</th>
                  <th className="py-1.5 px-2 text-right w-[17%]">Preis</th>
                  <th className="py-1.5 px-2 text-right w-[17%]">Gesamt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 text-[9.75pt] text-black">
                {order.items?.map((item, idx) => (
                  <tr key={idx} className="align-top">
                    <td className="py-2 px-2">
                      <div className="font-medium text-black leading-snug">{item.name}</div>
                      {item.caskInfo && (
                        <div className="text-[8.5pt] text-neutral-600 mt-0.5">{item.caskInfo}</div>
                      )}
                      <div className="text-[7.5pt] text-neutral-500 tracking-wider uppercase mt-0.5">
                        PURE.WHISKY.
                      </div>
                    </td>
                    <td className="py-2 px-2 text-center font-normal">{item.quantity}</td>
                    <td className="py-2 px-2 text-right font-normal">{formatPrice(item.price)}</td>
                    <td className="py-2 px-2 text-right font-normal text-black">
                      {formatPrice(item.price * item.quantity)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* TOTALS CALCULATION BLOCK */}
          <div className="flex justify-end mb-12">
            <table className="w-[75mm] text-[9.75pt] text-black">
              <tbody>
                <tr>
                  <td className="py-0.5">Zwischensumme / Subtotal</td>
                  <td className="py-0.5 text-right">{formatPrice(subtotal)}</td>
                </tr>
                <tr>
                  <td className="py-0.5">Versand / Shipping</td>
                  <td className="py-0.5 text-right">{formatPrice(shipping)}</td>
                </tr>
                <tr>
                  <td colSpan="2" className="pt-1 border-t-[1.5pt] border-black"></td>
                </tr>
                <tr className="text-[12pt] font-bold text-black">
                  <td className="py-1">Gesamt</td>
                  <td className="py-1 text-right">{formatPrice(total)}</td>
                </tr>
                <tr>
                  <td colSpan="2" className="pb-1 border-b-[0.5pt] border-black"></td>
                </tr>
                <tr className="text-[8.25pt] text-neutral-500">
                  <td className="py-0.5">Netto / net value</td>
                  <td className="py-0.5 text-right">{formatPrice(net)}</td>
                </tr>
                <tr className="text-[8.25pt] text-neutral-500">
                  <td className="py-0.5">MwSt. / VAT 19 %</td>
                  <td className="py-0.5 text-right">{formatPrice(vat)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 3-COLUMN FOOTER (1:1 Exact Match to Ines Zager PDF template) */}
        <div className="pt-4 mt-auto text-[8.25pt] text-neutral-500 leading-relaxed">
          <div className="text-right text-[8.5pt] text-neutral-700 mb-1.5 font-normal">
            Seite 1 von 1
          </div>
          
          <div className="border-t border-neutral-300 pt-2.5 grid grid-cols-3 gap-6 text-left">
            {/* Col 1: Bank */}
            <div>
              <div className="font-bold text-neutral-700 text-[8.25pt] mb-1">
                Bankverbindung
              </div>
              <div>Kontoinhaber: Ines Zager</div>
              <div className="font-mono text-[7.5pt]">IBAN: DE18 2707 0369 0056 5085 00</div>
            </div>

            {/* Col 2: Contact */}
            <div>
              <div className="font-bold text-neutral-700 text-[8.25pt] mb-1">
                Kontaktiere uns
              </div>
              <div>Email: info@pure-whisky.com</div>
            </div>

            {/* Col 3: Company Address */}
            <div>
              <div className="font-bold text-neutral-700 text-[8.25pt] mb-1">
                PURE.WHISKY.
              </div>
              <div>Dürerring 1</div>
              <div>31582 Nienburg</div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
