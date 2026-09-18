import { jsPDF } from 'jspdf';

/**
 * Format currency helper
 */
const formatEur = (val) => Number(val || 0).toFixed(2).replace('.', ',') + ' €';

/**
 * Generates an official, high-end DIN A4 PDF invoice for Pure Whisky
 * Returns a jsPDF document instance
 */
export function buildInvoicePdf(order) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = 210;
  const margin = 15;
  const contentWidth = pageWidth - (margin * 2); // 180mm

  const invoiceNum = order.invoiceNumber || `A09401${order.orderId}`;
  const dateStr = order.date || new Date().toLocaleDateString('de-DE');
  const paymentMethod = order.paymentMethod || 'PayPal';

  const subtotal = order.items?.reduce((sum, item) => sum + (item.price * item.quantity), 0) || (order.total - (order.shipping ?? 6.90));
  const shipping = order.shipping ?? 6.90;
  const total = order.total || (subtotal + shipping);
  const net = order.netTotal || (total / 1.19);
  const vat = order.vatTotal || (total - net);

  // 1. BRAND HEADER
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(24, 31, 28); // #181F1C
  doc.text('PURE.WHISKY.', margin, 20);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(110, 110, 110);
  doc.text('PURE.WHISKY. - Am Urnenfeld 1c - 29339 Wathlingen - info@pure-whisky.com', margin, 27);

  doc.setDrawColor(226, 221, 213); // #E2DDD5
  doc.setLineWidth(0.3);
  doc.line(margin, 29.5, margin + contentWidth, 29.5);

  // 2. RECIPIENT ADDRESS & METADATA
  // Left: Customer Address
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(24, 31, 28);
  
  const customerName = `${order.customer?.firstName || ''} ${order.customer?.lastName || ''}`.trim() || 'Kunde';
  const customerStreet = order.customer?.street || '';
  const customerCity = `${order.customer?.zip || ''} ${order.customer?.city || ''}`.trim();
  
  let custY = 38;
  doc.text(customerName, margin, custY);
  if (customerStreet) {
    custY += 4.5;
    doc.text(customerStreet, margin, custY);
  }
  if (customerCity) {
    custY += 4.5;
    doc.text(customerCity, margin, custY);
  }
  custY += 4.5;
  doc.text('Deutschland', margin, custY);

  // Right: Metadata Box
  const metaX = margin + contentWidth;
  doc.setFontSize(8.5);
  doc.setTextColor(85, 105, 94); // #55695E

  let metaY = 38;
  doc.text(`Rechnungs-Nr.:`, metaX - 45, metaY);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(24, 31, 28);
  doc.text(invoiceNum, metaX, metaY, { align: 'right' });

  metaY += 4.5;
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(85, 105, 94);
  doc.text(`Bestell-Nr.:`, metaX - 45, metaY);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(24, 31, 28);
  doc.text(`#${order.orderId}`, metaX, metaY, { align: 'right' });

  metaY += 4.5;
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(85, 105, 94);
  doc.text(`Datum:`, metaX - 45, metaY);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(24, 31, 28);
  doc.text(dateStr, metaX, metaY, { align: 'right' });

  metaY += 4.5;
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(85, 105, 94);
  doc.text(`Zahlungsart:`, metaX - 45, metaY);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(24, 31, 28);
  const cleanPayment = paymentMethod.length > 22 ? paymentMethod.slice(0, 22) + '...' : paymentMethod;
  doc.text(cleanPayment, metaX, metaY, { align: 'right' });

  // 3. INVOICE TITLE
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(24, 31, 28);
  doc.text('RECHNUNG', margin, 65);

  // 4. ITEMS TABLE
  const tableTopY = 70;
  doc.setFillColor(244, 240, 234); // #F4F0EA
  doc.rect(margin, tableTopY, contentWidth, 7.5, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(24, 31, 28);
  doc.text('Pos.', margin + 2, tableTopY + 5.2);
  doc.text('Bezeichnung', margin + 14, tableTopY + 5.2);
  doc.text('Menge', margin + 105, tableTopY + 5.2, { align: 'center' });
  doc.text('Einzelpreis', margin + 140, tableTopY + 5.2, { align: 'right' });
  doc.text('Gesamt', margin + contentWidth - 2, tableTopY + 5.2, { align: 'right' });

  let curY = tableTopY + 7.5;
  const items = order.items || [];

  items.forEach((item, idx) => {
    curY += 6;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(24, 31, 28);
    doc.text(String(idx + 1), margin + 2, curY);
    doc.text(item.name || 'Whisky', margin + 14, curY);

    // Quantity & Price
    doc.setFont('helvetica', 'normal');
    doc.text(String(item.quantity), margin + 105, curY, { align: 'center' });
    doc.text(formatEur(item.price), margin + 140, curY, { align: 'right' });
    doc.setFont('helvetica', 'bold');
    doc.text(formatEur(item.price * item.quantity), margin + contentWidth - 2, curY, { align: 'right' });

    // Cask Info line
    curY += 4.2;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(100, 100, 100);
    const caskInfo = item.caskInfo || 'Single Cask Selection · PURE.WHISKY.';
    doc.text(caskInfo, margin + 14, curY);

    curY += 3;
    doc.setDrawColor(240, 240, 240);
    doc.setLineWidth(0.2);
    doc.line(margin, curY, margin + contentWidth, curY);
  });

  // 5. TOTALS BLOCK
  let totY = Math.max(curY + 8, 125);
  const totX = margin + contentWidth;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(50, 50, 50);

  doc.text('Zwischensumme:', totX - 50, totY);
  doc.text(formatEur(subtotal), totX, totY, { align: 'right' });

  totY += 5;
  doc.text('Versandkosten (DHL GoGreen):', totX - 50, totY);
  doc.text(formatEur(shipping), totX, totY, { align: 'right' });

  totY += 3;
  doc.setLineWidth(0.4);
  doc.setDrawColor(24, 31, 28);
  doc.line(totX - 60, totY, totX, totY);

  totY += 6;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(184, 93, 44); // #B85D2C
  doc.text('Gesamtbetrag:', totX - 60, totY);
  doc.text(formatEur(total), totX, totY, { align: 'right' });

  totY += 2;
  doc.setLineWidth(0.4);
  doc.line(totX - 60, totY, totX, totY);

  totY += 5;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(110, 110, 110);
  doc.text(`enthaltene 19% MwSt.: ${formatEur(vat)}`, totX, totY, { align: 'right' });
  totY += 4;
  doc.text(`Nettobetrag: ${formatEur(net)}`, totX, totY, { align: 'right' });

  // 6. BOTTOM FOOTER
  const footerY = 270;
  doc.setLineWidth(0.3);
  doc.setDrawColor(226, 221, 213);
  doc.line(margin, footerY, margin + contentWidth, footerY);

  doc.setFontSize(7.5);
  doc.setTextColor(110, 110, 110);

  // Col 1: Bank
  doc.setFont('helvetica', 'bold');
  doc.text('Bankverbindung', margin, footerY + 4.5);
  doc.setFont('helvetica', 'normal');
  doc.text('Inhaberin: Ines Zager\nIBAN: DE18 2707 0369 0056 5085 00', margin, footerY + 8.5);

  // Col 2: Kontakt
  doc.setFont('helvetica', 'bold');
  doc.text('Kontakt & Support', margin + 65, footerY + 4.5);
  doc.setFont('helvetica', 'normal');
  doc.text('E-Mail: info@pure-whisky.com\nWeb: pure-whisky.com', margin + 65, footerY + 8.5);

  // Col 3: Impressum
  doc.setFont('helvetica', 'bold');
  doc.text('PURE.WHISKY.', margin + 130, footerY + 4.5);
  doc.setFont('helvetica', 'normal');
  doc.text('Am Urnenfeld 1c\n29339 Wathlingen', margin + 130, footerY + 8.5);

  doc.text('Seite 1 von 1', margin + contentWidth, footerY + 18, { align: 'right' });

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
