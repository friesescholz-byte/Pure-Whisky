import React, { useState } from 'react';
import { 
  FileText, Send, CheckCircle2, Clock, Search, Filter, Printer, 
  AlertCircle, ChevronDown, ChevronUp, Eye, ShieldCheck, Plus, RefreshCw, 
  Mail, Package, User, MapPin, CreditCard, Truck, Calendar, ArrowUpRight, Trash2
} from 'lucide-react';

export default function OrdersManager({ 
  orders = [], 
  onSendInvoice, 
  onViewInvoice, 
  onAddTestOrder,
  onRefreshOrders,
  onDeleteOrder,
  adminEmail = 'info@pure-whisky.com'
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // 'all' | 'neu_eingegangen' | 'rechnung_versendet'
  const [confirmModalOrder, setConfirmModalOrder] = useState(null);
  const [isSendingInvoice, setIsSendingInvoice] = useState(false);
  
  // Accordion state: set of expanded order IDs. Default: first order expanded if available
  const [expandedOrderIds, setExpandedOrderIds] = useState(() => {
    return orders.length > 0 ? [orders[0].orderId] : [];
  });

  const toggleOrderExpand = (orderId) => {
    setExpandedOrderIds(prev => 
      prev.includes(orderId) 
        ? prev.filter(id => id !== orderId) 
        : [...prev, orderId]
    );
  };

  const expandAll = () => {
    setExpandedOrderIds(orders.map(o => o.orderId));
  };

  const collapseAll = () => {
    setExpandedOrderIds([]);
  };

  // Filtered orders
  const filteredOrders = orders.filter(order => {
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    const term = searchTerm.toLowerCase().trim();
    const matchesSearch = !term || 
      order.orderId.toLowerCase().includes(term) ||
      (order.invoiceNumber && order.invoiceNumber.toLowerCase().includes(term)) ||
      order.customer?.firstName?.toLowerCase().includes(term) ||
      order.customer?.lastName?.toLowerCase().includes(term) ||
      order.customer?.email?.toLowerCase().includes(term);
    return matchesStatus && matchesSearch;
  });

  // Metrics
  const totalRevenue = orders.reduce((sum, o) => sum + (Number(o.total) || 0), 0);
  const pendingCount = orders.filter(o => o.status === 'neu_eingegangen').length;
  const concludedCount = orders.filter(o => o.status === 'rechnung_versendet').length;

  const handleConfirmSend = async () => {
    if (confirmModalOrder && !isSendingInvoice) {
      setIsSendingInvoice(true);
      try {
        await onSendInvoice(confirmModalOrder.orderId);
      } finally {
        setIsSendingInvoice(false);
        setConfirmModalOrder(null);
      }
    }
  };

  return (
    <div className="space-y-6 text-left">
      
      {/* Top Banner & KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white border border-[#D4C8B8] rounded-2xl p-5 shadow-2xs">
          <span className="text-xs font-craft-mono text-[#55695E] uppercase tracking-wider block font-bold">
            Gesamt-Bestellungen
          </span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="font-woodblock text-3xl text-[#181F1C]">{orders.length}</span>
            <span className="text-xs text-[#2D6A4F] bg-[#E8EFEA] px-2.5 py-0.5 rounded-full font-medium">
              Echtzeit
            </span>
          </div>
        </div>

        <div className="bg-white border border-amber-200 rounded-2xl p-5 shadow-2xs bg-gradient-to-br from-white to-amber-50/50">
          <span className="text-xs font-craft-mono text-amber-800 uppercase tracking-wider block font-bold">
            Rechnung ausstehend
          </span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="font-woodblock text-3xl text-amber-800">{pendingCount}</span>
            <span className="text-xs text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
              <Clock className="w-3 h-3" />
              Rechnung offen
            </span>
          </div>
        </div>

        <div className="bg-white border border-emerald-200 rounded-2xl p-5 shadow-2xs bg-gradient-to-br from-white to-emerald-50/50">
          <span className="text-xs font-craft-mono text-emerald-800 uppercase tracking-wider block font-bold">
            Kaufverträge Gültig
          </span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="font-woodblock text-3xl text-emerald-800">{concludedCount}</span>
            <span className="text-xs text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              Rechnung versendet
            </span>
          </div>
        </div>

        <div className="bg-white border border-[#D4C8B8] rounded-2xl p-5 shadow-2xs">
          <span className="text-xs font-craft-mono text-[#55695E] uppercase tracking-wider block font-bold">
            Gesamtumsatz
          </span>
          <div className="flex items-baseline justify-between mt-2">
            <span className="font-woodblock text-3xl text-[#B85D2C]">
              {totalRevenue.toFixed(2).replace('.', ',')} €
            </span>
            <span className="text-xs text-[#55695E] font-craft-mono">inkl. 19% MwSt.</span>
          </div>
        </div>

      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white border border-[#D4C8B8] rounded-2xl p-4 shadow-2xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Nach Bestell-Nr., Rechnungs-Nr., Kunde oder E-Mail suchen..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-[#D4C8B8] text-xs text-[#181F1C] bg-[#FAF8F5] focus:bg-white focus:outline-none focus:border-[#B85D2C]"
          />
        </div>

        {/* Status Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 bg-[#FAF8F5] border border-[#D4C8B8] rounded-xl p-1 shrink-0 text-xs font-medium">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              statusFilter === 'all' 
                ? 'bg-white text-[#181F1C] font-bold shadow-2xs' 
                : 'text-[#55695E] hover:text-[#181F1C]'
            }`}
          >
            Alle ({orders.length})
          </button>
          
          <button
            onClick={() => setStatusFilter('neu_eingegangen')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              statusFilter === 'neu_eingegangen' 
                ? 'bg-amber-100 text-amber-900 font-bold shadow-2xs' 
                : 'text-[#55695E] hover:text-[#181F1C]'
            }`}
          >
            Rechnung offen ({pendingCount})
          </button>

          <button
            onClick={() => setStatusFilter('rechnung_versendet')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              statusFilter === 'rechnung_versendet' 
                ? 'bg-emerald-100 text-emerald-900 font-bold shadow-2xs' 
                : 'text-[#55695E] hover:text-[#181F1C]'
            }`}
          >
            Rechnung versendet ({concludedCount})
          </button>
        </div>

        {/* Accordion Controls (Expand All / Collapse All & Refresh) */}
        <div className="flex items-center space-x-2 text-xs shrink-0 self-end md:self-auto">
          {onRefreshOrders && (
            <button
              onClick={onRefreshOrders}
              className="px-2.5 py-1.5 rounded-lg bg-[#FAF8F5] hover:bg-[#E2DDD5] text-[#181F1C] font-craft-mono transition-colors flex items-center space-x-1.5 border border-[#D4C8B8] cursor-pointer"
              title="Bestellungen live von Cloudflare KV synchronisieren"
            >
              <RefreshCw className="w-3.5 h-3.5 text-[#B85D2C]" />
              <span>Live Synchronisieren</span>
            </button>
          )}
          <button
            onClick={expandAll}
            className="px-2.5 py-1.5 rounded-lg bg-[#FAF8F5] hover:bg-[#E2DDD5] text-[#55695E] hover:text-[#181F1C] font-craft-mono transition-colors cursor-pointer"
          >
            Alle aufklappen
          </button>
          <button
            onClick={collapseAll}
            className="px-2.5 py-1.5 rounded-lg bg-[#FAF8F5] hover:bg-[#E2DDD5] text-[#55695E] hover:text-[#181F1C] font-craft-mono transition-colors cursor-pointer"
          >
            Alle zuklappen
          </button>
        </div>

      </div>

      {/* Orders Accordion Cards List */}
      <div className="space-y-3">
        {filteredOrders.length === 0 ? (
          <div className="bg-white border border-[#D4C8B8] rounded-2xl p-12 text-center text-[#55695E] space-y-2">
            <Package className="w-8 h-8 text-stone-300 mx-auto" />
            <p className="font-woodblock text-lg text-[#181F1C] uppercase">Keine Bestellungen gefunden</p>
            <p className="text-xs">Es gibt keine Bestellungen, die den aktuellen Filterkriterien entsprechen.</p>
          </div>
        ) : (
          filteredOrders.map((order) => {
            const isConcluded = order.status === 'rechnung_versendet';
            const isExpanded = expandedOrderIds.includes(order.orderId);
            const itemsCount = order.items?.reduce((sum, item) => sum + (item.quantity || 1), 0) || 0;

            return (
              <div 
                key={order.orderId}
                className={`bg-white border rounded-2xl transition-all duration-200 shadow-2xs overflow-hidden ${
                  isExpanded ? 'border-[#B85D2C]/40 ring-1 ring-[#B85D2C]/20' : 'border-[#D4C8B8] hover:border-stone-400'
                }`}
              >
                
                {/* Accordion Summary / Header Row (Clickable) */}
                <div 
                  onClick={() => toggleOrderExpand(order.orderId)}
                  className={`p-4 sm:p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4 cursor-pointer transition-colors ${
                    isExpanded ? 'bg-[#FAF8F5]/60' : 'hover:bg-[#FAF8F5]/40'
                  }`}
                >
                  
                  {/* Left: Status & Order Identity */}
                  <div className="flex items-start sm:items-center space-x-3 sm:space-x-4">
                    {/* Expand Chevron Icon */}
                    <div className="p-2 rounded-xl bg-white border border-[#D4C8B8] text-[#181F1C] shrink-0 mt-0.5 sm:mt-0 shadow-2xs">
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-[#B85D2C]" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-stone-500" />
                      )}
                    </div>

                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono font-bold text-base text-[#181F1C]">
                          #{order.orderId}
                        </span>

                        {/* Status Badge */}
                        {isConcluded ? (
                          <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-bold flex items-center space-x-1">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Rechnung versendet</span>
                          </span>
                        ) : (
                          <span className="px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-[11px] font-bold flex items-center space-x-1">
                            <Clock className="w-3.5 h-3.5 text-amber-600" />
                            <span>Rechnung ausstehend</span>
                          </span>
                        )}

                        {order.invoiceNumber && (
                          <span className="text-[11px] font-mono text-[#55695E] bg-[#FAF8F5] px-2 py-0.5 rounded border border-[#E2DDD5]">
                            Rechnungs-Nr: {order.invoiceNumber}
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-3 text-xs text-[#55695E]">
                        <span className="flex items-center space-x-1 font-craft-mono">
                          <Calendar className="w-3 h-3 text-stone-400" />
                          <span>{order.date}</span>
                        </span>
                        <span>•</span>
                        <span className="font-medium text-[#181F1C]">
                          {order.customer?.firstName} {order.customer?.lastName}
                        </span>
                        <span className="text-stone-400 hidden sm:inline">({order.customer?.email})</span>
                        <span>•</span>
                        <span className="text-stone-600">
                          {itemsCount} Flasche{itemsCount !== 1 ? 'n' : ''}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Total Price & Quick Action Buttons */}
                  <div className="flex items-center justify-between lg:justify-end space-x-3 pt-3 lg:pt-0 border-t lg:border-t-0 border-[#E2DDD5]/60">
                    
                    {/* Price */}
                    <div className="text-left lg:text-right pr-2">
                      <div className="font-woodblock text-xl sm:text-2xl text-[#B85D2C]">
                        {Number(order.total).toFixed(2).replace('.', ',')} €
                      </div>
                      <span className="text-[10px] text-[#55695E] font-craft-mono block">
                        inkl. 19% MwSt.
                      </span>
                    </div>

                    {/* Action buttons (click stopPropagation so it doesn't just toggle accordion) */}
                    <div className="flex items-center space-x-2 shrink-0">
                      
                      {/* View / Print Invoice Button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onViewInvoice(order);
                        }}
                        className="px-3 py-2 rounded-xl bg-white hover:bg-[#FAF8F5] border border-[#D4C8B8] text-[#181F1C] text-xs font-semibold transition-colors flex items-center space-x-1.5 shadow-2xs"
                        title="Offizielle A4-Rechnung öffnen oder ausdrucken"
                      >
                        <Printer className="w-3.5 h-3.5 text-[#55695E]" />
                        <span className="hidden sm:inline">Rechnung</span>
                      </button>

                      {/* Send Invoice Button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setConfirmModalOrder(order);
                        }}
                        className={`px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center space-x-1.5 ${
                          isConcluded
                            ? 'bg-[#FAF8F5] hover:bg-[#E2DDD5] border border-[#D4C8B8] text-stone-700'
                            : 'bg-[#B85D2C] hover:bg-[#A04E24] text-white shadow-xs hover:scale-105 active:scale-95'
                        }`}
                        title={isConcluded ? 'Rechnung erneut per Resend an Kunden senden' : 'Rechnung per Resend senden und Kaufvertrag rechtswirksam schließen'}
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>{isConcluded ? 'Erneut senden' : 'Rechnung senden'}</span>
                      </button>

                      {/* Delete Button */}
                      {onDeleteOrder && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onDeleteOrder(order.orderId);
                          }}
                          className="p-2 rounded-xl bg-white hover:bg-rose-50 border border-[#D4C8B8] hover:border-rose-300 text-stone-400 hover:text-rose-600 transition-colors shadow-2xs cursor-pointer"
                          title="Bestellung dauerhaft löschen"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}

                    </div>

                  </div>

                </div>

                {/* Accordion Expanded Detail Body */}
                {isExpanded && (
                  <div className="border-t border-[#E2DDD5] p-5 sm:p-6 bg-white space-y-6 animate-fadeIn">
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      
                      {/* 1. Ordered Products & Bottles */}
                      <div className="lg:col-span-2 space-y-3">
                        <div className="flex items-center space-x-2 border-b border-[#E2DDD5] pb-2">
                          <Package className="w-4 h-4 text-[#B85D2C]" />
                          <h4 className="font-woodblock text-sm uppercase text-[#181F1C] tracking-wide">
                            Bestellte Einzelfass-Abfüllungen ({itemsCount} Stück)
                          </h4>
                        </div>

                        <div className="divide-y divide-[#FAF8F5] bg-[#FAF8F5] border border-[#E2DDD5] rounded-xl overflow-hidden">
                          {order.items?.map((item, idx) => (
                            <div key={idx} className="p-3.5 flex items-center justify-between gap-3 text-xs">
                              <div className="flex items-center space-x-3 min-w-0">
                                <span className="w-7 h-7 rounded-lg bg-white border border-[#D4C8B8] flex items-center justify-center font-mono font-bold text-[#181F1C] shrink-0">
                                  {item.quantity}x
                                </span>
                                <div className="truncate">
                                  <div className="font-bold text-[#181F1C] truncate" title={item.name}>
                                    {item.name}
                                  </div>
                                  <div className="text-[11px] text-[#55695E] font-craft-mono mt-0.5 flex flex-wrap gap-2">
                                    {item.cask && <span>Fass: {item.cask}</span>}
                                    {item.abv && <span>· {item.abv}</span>}
                                    {item.volume && <span>· {item.volume}</span>}
                                  </div>
                                </div>
                              </div>

                              <div className="text-right shrink-0">
                                <div className="font-bold text-[#181F1C]">
                                  {Number(item.price * (item.quantity || 1)).toFixed(2).replace('.', ',')} €
                                </div>
                                {item.quantity > 1 && (
                                  <div className="text-[10px] text-[#55695E]">
                                    ({Number(item.price).toFixed(2).replace('.', ',')} € / Flasche)
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}

                          {/* Shipping row */}
                          <div className="p-3.5 flex items-center justify-between text-xs bg-white/70">
                            <div className="flex items-center space-x-2 text-[#55695E]">
                              <Truck className="w-3.5 h-3.5 text-[#2D6A4F]" />
                              <span>Klimaneutraler Versand (DHL GoGreen Versichert)</span>
                            </div>
                            <span className="font-bold text-[#181F1C]">6,90 €</span>
                          </div>
                        </div>

                        {/* Price Breakdown */}
                        <div className="bg-[#FAF8F5] border border-[#E2DDD5] rounded-xl p-4 space-y-1.5 text-xs">
                          <div className="flex justify-between text-[#55695E]">
                            <span>Nettobetrag (Warenwert + Versand):</span>
                            <span>{Number(order.netTotal || order.total / 1.19).toFixed(2).replace('.', ',')} €</span>
                          </div>
                          <div className="flex justify-between text-[#55695E]">
                            <span>19% Mehrwertsteuer:</span>
                            <span>{Number(order.vatTotal || order.total - order.total / 1.19).toFixed(2).replace('.', ',')} €</span>
                          </div>
                          <div className="flex justify-between text-sm font-bold text-[#181F1C] pt-2 border-t border-[#E2DDD5]">
                            <span>Gesamtbetrag (inkl. MwSt.):</span>
                            <span className="text-[#B85D2C] font-woodblock text-base">
                              {Number(order.total).toFixed(2).replace('.', ',')} €
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* 2. Customer & Delivery Address */}
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2 border-b border-[#E2DDD5] pb-2">
                          <User className="w-4 h-4 text-[#B85D2C]" />
                          <h4 className="font-woodblock text-sm uppercase text-[#181F1C] tracking-wide">
                            Kunde & Lieferadresse
                          </h4>
                        </div>

                        <div className="bg-[#FAF8F5] border border-[#E2DDD5] rounded-xl p-4 text-xs space-y-3 text-[#181F1C]">
                          <div>
                            <span className="text-[10px] uppercase font-craft-mono text-[#55695E] block font-bold">
                              Empfänger
                            </span>
                            <div className="font-bold text-sm text-[#181F1C] mt-0.5">
                              {order.customer?.firstName} {order.customer?.lastName}
                            </div>
                            <div className="font-mono text-[#55695E] mt-0.5">
                              {order.customer?.email}
                            </div>
                            {order.customer?.phone && (
                              <div className="text-[#55695E] mt-0.5">
                                Tel: {order.customer.phone}
                              </div>
                            )}
                          </div>

                          <div className="pt-2 border-t border-[#E2DDD5]">
                            <span className="text-[10px] uppercase font-craft-mono text-[#55695E] block font-bold">
                              Lieferadresse
                            </span>
                            <div className="mt-0.5 text-stone-700 leading-relaxed">
                              {order.customer?.street || 'Dürerring 1'}<br />
                              {order.customer?.zip || '31582'} {order.customer?.city || 'Nienburg'}<br />
                              {order.customer?.country || 'Deutschland'}
                            </div>
                          </div>

                          <div className="pt-2 border-t border-[#E2DDD5]">
                            <span className="text-[10px] uppercase font-craft-mono text-[#55695E] block font-bold">
                              Zahlungsart & Gateway
                            </span>
                            <div className="mt-1 flex items-center space-x-1.5 text-stone-800">
                              <CreditCard className="w-3.5 h-3.5 text-[#B85D2C]" />
                              <span className="font-medium">{order.paymentMethod || 'Mollie Gateway (Test)'}</span>
                            </div>
                          </div>

                          {order.invoiceSentAt && (
                            <div className="pt-2 border-t border-[#E2DDD5] text-emerald-800 bg-emerald-50/60 p-2 rounded-lg text-[11px]">
                              <span className="font-bold flex items-center space-x-1">
                                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                                <span>Kaufvertrag geschlossen:</span>
                              </span>
                              <span className="text-[10px] font-craft-mono text-emerald-700 block mt-0.5">
                                Rechnung versendet am {order.invoiceSentAt}
                              </span>
                            </div>
                          )}
                        </div>

                      </div>

                    </div>

                    {/* Action Bar inside expanded card */}
                    <div className="pt-4 border-t border-[#E2DDD5] flex flex-col sm:flex-row items-center justify-between gap-3">
                      <div className="flex items-center space-x-3 text-xs text-[#55695E] font-craft-mono">
                        <div>Bestell-ID: <span className="font-mono text-[#181F1C] font-bold">#{order.orderId}</span> · Erstellt: {order.date}</div>
                        {onDeleteOrder && (
                          <button
                            type="button"
                            onClick={() => onDeleteOrder(order.orderId)}
                            className="text-xs text-rose-600 hover:text-rose-700 hover:underline flex items-center space-x-1 cursor-pointer font-craft-mono ml-2 transition-colors"
                            title="Bestellung dauerhaft löschen"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Löschen</span>
                          </button>
                        )}
                      </div>

                      <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
                        <button
                          type="button"
                          onClick={() => onViewInvoice(order)}
                          className="px-4 py-2.5 rounded-xl bg-white hover:bg-[#FAF8F5] border border-[#D4C8B8] text-xs font-bold text-[#181F1C] transition-colors flex items-center space-x-2 shadow-2xs"
                        >
                          <Printer className="w-4 h-4 text-[#55695E]" />
                          <span>Rechnung anzeigen & drucken</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setConfirmModalOrder(order)}
                          className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center space-x-2 shadow-sm ${
                            isConcluded 
                              ? 'bg-[#181F1C] hover:bg-[#2A3530] text-white' 
                              : 'bg-[#B85D2C] hover:bg-[#A04E24] text-white hover:scale-105 active:scale-95'
                          }`}
                        >
                          <Send className="w-4 h-4" />
                          <span>{isConcluded ? 'Rechnung erneut per Resend versenden' : 'Rechnung versenden (Kaufvertrag schließen)'}</span>
                        </button>
                      </div>
                    </div>

                  </div>
                )}

              </div>
            );
          })
        )}
      </div>

      {/* Confirmation Modal for Concluding Contract & Sending Invoice */}
      {confirmModalOrder && (
        <div className="fixed inset-0 z-[110] bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-[#D4C8B8] rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 text-left">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-[#B85D2C]/10 text-[#B85D2C] flex items-center justify-center">
                <Send className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-woodblock text-2xl text-[#181F1C] uppercase">
                  Rechnung versenden
                </h3>
                <span className="text-xs text-[#55695E]">
                  Bestellung #{confirmModalOrder.orderId}
                </span>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 text-xs text-amber-900 leading-relaxed space-y-1">
              <p className="font-bold flex items-center space-x-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-700" />
                <span>Rechtlicher Hinweis zum Kaufvertragsabschluss:</span>
              </p>
              <p>
                Mit dem Absenden der Rechnung an <strong>{confirmModalOrder.customer?.email}</strong> kommt der Kaufvertrag zwischen PURE.WHISKY. und dem Kunden <strong>rechtswirksam zustande</strong>.
              </p>
            </div>

            <div className="bg-[#FAF8F5] border border-[#E2DDD5] rounded-xl p-3 text-xs space-y-1 text-[#3A4A40]">
              <div className="flex justify-between">
                <span className="text-[#55695E]">Empfänger (Kunde):</span>
                <span className="font-semibold text-[#181F1C]">{confirmModalOrder.customer?.firstName} {confirmModalOrder.customer?.lastName} ({confirmModalOrder.customer?.email})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#55695E]">Kopie / Benachrichtigung an:</span>
                <span className="font-mono text-[#181F1C]">{adminEmail}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#55695E]">Rechnungsbetrag:</span>
                <span className="font-bold text-[#B85D2C]">{Number(confirmModalOrder.total).toFixed(2).replace('.', ',')} €</span>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 pt-3 border-t border-[#E2DDD5]">
              <button
                onClick={() => setConfirmModalOrder(null)}
                disabled={isSendingInvoice}
                className="px-4 py-2 bg-[#FAF8F5] hover:bg-[#E2DDD5] border border-[#D4C8B8] text-xs font-semibold text-[#181F1C] rounded-lg transition-colors disabled:opacity-50"
              >
                Abbrechen
              </button>
              
              <button
                onClick={handleConfirmSend}
                disabled={isSendingInvoice}
                className="px-5 py-2 bg-[#B85D2C] hover:bg-[#A04E24] disabled:opacity-50 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-all shadow-md flex items-center space-x-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{isSendingInvoice ? 'Wird versendet...' : 'Kaufvertrag schließen & senden'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
