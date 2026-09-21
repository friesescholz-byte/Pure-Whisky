import { jsPDF } from 'jspdf';
import { PURE_WHISKY_LOGO_BASE64 } from '../assets/logoBase64.js';

/**
 * Format currency helper
 */
const formatEur = (val) => Number(val || 0).toFixed(2).replace('.', ',') + ' €';

/**
 * Generates an official, high-end DIN A4 PDF invoice for Pure Whisky
 * 100% 1:1 Pixel-Consistent with the Admin Invoice Modal & Ines Zager Template
 */
export function buildInvoicePdf(order) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = 210;
  const margin = 12;
  const contentWidth = pageWidth - (margin * 2); // 186mm

  const invoiceNum = order.invoiceNumber || `A09401${order.orderId}`;
  const dateStr = order.date || new Date().toLocaleDateString('de-DE');
  const paymentMethod = order.paymentMethod || 'PayPal';

  const subtotal = order.items?.reduce((sum, item) => sum + (item.price * item.quantity), 0) || (order.total - (order.shipping ?? 6.90));
  const shipping = order.shipping ?? 6.90;
  const total = order.total || (subtotal + shipping);
  const net = order.netTotal || (total / 1.19);
  const vat = order.vatTotal || (total - net);

  // 1. OFFICIAL ROUND LOGO (Top-Left, 28.5mm x 28.5mm exactly as in Admin Modal)
  try {
    doc.addImage(PURE_WHISKY_LOGO_BASE64, 'PNG', margin, 12, 28.5, 28.5);
  } catch (imgErr) {
    console.warn('Could not render logo to PDF:', imgErr);
  }

  // 2. SENDER LINE
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(119, 119, 119); // #777777
  doc.text('PURE.WHISKY. – Dürerring 1 – 31582 Nienburg – info@pure-whisky.com', margin, 46);

  // 3. RECIPIENT ADDRESS
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.75);
  doc.setTextColor(0, 0, 0);

  const customerName = `${order.customer?.firstName || ''} ${order.customer?.lastName || ''}`.trim() || 'Kunde';
  const customerStreet = order.customer?.street || '';
  const customerCity = `${order.customer?.zip || ''} ${order.customer?.city || ''}`.trim();
  const customerCountry = order.customer?.country || 'Deutschland';

  let custY = 54;
  doc.text(customerName, margin, custY);
  if (customerStreet) {
    custY += 4.5;
    doc.text(customerStreet, margin, custY);
  }
  if (customerCity) {
    custY += 4.5;
    doc.text(customerCity, margin, custY);
  }
  if (customerCountry) {
    custY += 4.5;
    doc.text(customerCountry, margin, custY);
  }

  // 4. DOCUMENT TITLE: RECHNUNG
  let titleY = custY + 12;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18.75);
  doc.setTextColor(0, 0, 0);
  doc.text('RECHNUNG', margin, titleY);

  // 5. METADATA GRID (Left & Right)
  let metaY = titleY + 8;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.75);
  doc.setTextColor(0, 0, 0);

  // Left: Numbers & Payment
  doc.text(`Rechnungsnummer: ${invoiceNum}`, margin, metaY);
  doc.text(`Bestellnummer: ${order.orderId}`, margin, metaY + 4.8);
  doc.text(`Zahlungsart: ${paymentMethod}`, margin, metaY + 9.6);

  // Right: Date
  const rightX = margin + contentWidth;
  doc.text(`Datum: ${dateStr}`, rightX, metaY, { align: 'right' });

  // 6. POSITIONS TABLE
  const tableTopY = metaY + 16;
  doc.setFillColor(242, 242, 242); // #F2F2F2
  doc.rect(margin, tableTopY, contentWidth, 7, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.75);
  doc.setTextColor(0, 0, 0);
  doc.text('Bezeichnung', margin + 3, tableTopY + 4.8);
  doc.text('Anzahl', margin + 105, tableTopY + 4.8, { align: 'center' });
  doc.text('Preis', margin + 145, tableTopY + 4.8, { align: 'right' });
  doc.text('Gesamt', rightX - 3, tableTopY + 4.8, { align: 'right' });

  let curY = tableTopY + 7;
  const items = order.items || [];

  items.forEach((item) => {
    curY += 6;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.75);
    doc.setTextColor(0, 0, 0);
    doc.text(item.name || 'Whisky', margin + 3, curY);

    // Quantity, Price & Total
    doc.setFont('helvetica', 'normal');
    doc.text(String(item.quantity || 1), margin + 105, curY, { align: 'center' });
    doc.text(formatEur(item.price), margin + 145, curY, { align: 'right' });
    doc.text(formatEur(item.price * item.quantity), rightX - 3, curY, { align: 'right' });

    // Cask Info line
    curY += 4.2;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(85, 85, 85); // #555555
    if (item.caskInfo) {
      doc.text(item.caskInfo, margin + 3, curY);
      curY += 3.8;
    }

    // Brand sub-tag
    doc.setFontSize(7.5);
    doc.setTextColor(119, 119, 119); // #777777
    doc.text('PURE.WHISKY.', margin + 3, curY);

    curY += 3;
    doc.setDrawColor(238, 238, 238); // #EEEEEE
    doc.setLineWidth(0.2);
    doc.line(margin, curY, rightX, curY);
  });

  // 7. TOTALS CALCULATION BLOCK (Right aligned, width 75mm)
  let totY = Math.max(curY + 8, 175);
  const totBoxWidth = 75;
  const totLeftX = rightX - totBoxWidth;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.75);
  doc.setTextColor(0, 0, 0);

  doc.text('Zwischensumme / Subtotal', totLeftX, totY);
  doc.text(formatEur(subtotal), rightX, totY, { align: 'right' });

  totY += 4.8;
  doc.text('Versand / Shipping', totLeftX, totY);
  doc.text(formatEur(shipping), rightX, totY, { align: 'right' });

  // Black Top Line for Total
  totY += 2.5;
  doc.setDrawColor(0, 0, 0);
  doc.setLineWidth(0.5); // 1.5pt ~ 0.5mm
  doc.line(totLeftX, totY, rightX, totY);

  totY += 5.5;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text('Gesamt', totLeftX, totY);
  doc.text(formatEur(total), rightX, totY, { align: 'right' });

  // Black Bottom Line for Total
  totY += 2.5;
  doc.setLineWidth(0.2); // 0.5pt
  doc.line(totLeftX, totY, rightX, totY);

  totY += 4.5;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.25);
  doc.setTextColor(119, 119, 119); // #777777
  doc.text('Netto / net value', totLeftX, totY);
  doc.text(formatEur(net), rightX, totY, { align: 'right' });

  totY += 4;
  doc.text('MwSt. / VAT 19 %', totLeftX, totY);
  doc.text(formatEur(vat), rightX, totY, { align: 'right' });

  // 8. 3-COLUMN FOOTER (Page 1 von 1, Divider & 3 Columns)
  const footerY = 268;

  // Page num
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(51, 51, 51);
  doc.text('Seite 1 von 1', rightX, footerY - 2, { align: 'right' });

  // Divider line
  doc.setDrawColor(204, 204, 204); // #CCCCCC
  doc.setLineWidth(0.2);
  doc.line(margin, footerY, rightX, footerY);

  const colWidth = contentWidth / 3;

  // Col 1: Bank
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.25);
  doc.setTextColor(85, 85, 85);
  doc.text('Bankverbindung', margin, footerY + 5);
  doc.setFont('helvetica', 'normal');
  doc.text('Kontoinhaber: Ines Zager', margin, footerY + 9);
  doc.setFont('courier', 'normal');
  doc.setFontSize(7.5);
  doc.text('IBAN: DE18 2707 0369 0056 5085 00', margin, footerY + 13);

  // Col 2: Contact
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.25);
  doc.text('Kontaktiere uns', margin + colWidth, footerY + 5);
  doc.setFont('helvetica', 'normal');
  doc.text('Email: info@pure-whisky.com', margin + colWidth, footerY + 9);

  // Col 3: Company
  doc.setFont('helvetica', 'bold');
  doc.text('PURE.WHISKY.', margin + (colWidth * 2), footerY + 5);
  doc.setFont('helvetica', 'normal');
  doc.text('Dürerring 1\n31582 Nienburg', margin + (colWidth * 2), footerY + 9);

  return doc;
}

/**
 * Returns raw base64 string for Resend attachments
 */
export function generateInvoicePdfBase64(order) {
  const doc = buildInvoicePdf(order);
  const dataUri = doc.output('datauristring');
  return dataUri.split(',')[1];
}

/**
 * Direct file download helper for client
 */
export function downloadInvoicePdf(order) {
  const doc = buildInvoicePdf(order);
  const invoiceNum = order.invoiceNumber || `A09401${order.orderId}`;
  doc.save(`Rechnung_${invoiceNum}.pdf`);
}
