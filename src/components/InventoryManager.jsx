import React, { useState } from 'react';
import { 
  Package, Tag, Check, Edit2, RotateCcw, Eye, 
  CheckCircle2, AlertCircle, Search, SlidersHorizontal, 
  Code, Sparkles, ArrowUpRight, DollarSign, Archive, Clock, Calendar
} from 'lucide-react';

export default function InventoryManager({ 
  products, 
  onUpdateProduct, 
  onResetProducts, 
  onNavigateProduct 
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [editingProduct, setEditingProduct] = useState(null);
  const [showMollieModal, setShowMollieModal] = useState(false);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState('');

  // Edit form state
  const [formState, setFormState] = useState({
    price: 0,
    originalPrice: '',
    stock: 0,
    status: 'available', // 'available' | 'upcoming' | 'soldout'
    releaseDate: '17. September 2026',
    badge: '',
    abv: '',
    caskType: '',
    bottleCount: ''
  });

  const handleOpenEdit = (p) => {
    const isSoldOut = p.soldOut === true || (p.isAvailable === false && !p.isUpcoming);
    const isUpcoming = p.isUpcoming === true;
    let initialStatus = 'available';
    if (isUpcoming) initialStatus = 'upcoming';
    else if (isSoldOut) initialStatus = 'soldout';

    const pReleaseDate = p.releaseDate || '17. September 2026';
    const remaining = p.stock !== undefined ? p.stock : (p.bottlesRemaining !== undefined ? p.bottlesRemaining : (isSoldOut ? 0 : 48));

    setEditingProduct(p);
    setFormState({
      price: p.price,
      originalPrice: p.originalPrice || '',
      stock: remaining,
      status: initialStatus,
      releaseDate: pReleaseDate,
      badge: p.badge || (isUpcoming ? `Release am ${pReleaseDate} · Vorabzugriff` : (isSoldOut ? 'Ausverkauft · Sammler-Archiv' : 'Sofort lieferbar')),
      abv: p.abv || '',
      caskType: p.caskType || '',
      bottleCount: p.bottleCount || (p.bottlesTotal ? `${p.bottlesTotal} Flaschen` : '')
    });
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editingProduct) return;

    const numericPrice = parseFloat(formState.price) || editingProduct.price;
    const numericStock = parseInt(formState.stock, 10) || 0;
    const isSoldOut = formState.status === 'soldout' || numericStock === 0;
    const isUpcoming = formState.status === 'upcoming';
    const isAvailable = !isSoldOut && !isUpcoming;
    const releaseDateVal = formState.releaseDate.trim() || '17. September 2026';

    const updated = {
      ...editingProduct,
      price: numericPrice,
      originalPrice: formState.originalPrice ? parseFloat(formState.originalPrice) : null,
      stock: numericStock,
      bottlesRemaining: isSoldOut ? 0 : numericStock,
      status: formState.status,
      isAvailable: isAvailable,
      isUpcoming: isUpcoming,
      soldOut: isSoldOut,
      releaseDate: releaseDateVal,
      badge: formState.badge.trim() || (isUpcoming ? `Release am ${releaseDateVal} · Vorabzugriff` : (isSoldOut ? 'Ausverkauft · Sammler-Archiv' : 'Sofort lieferbar')),
      abv: formState.abv.trim(),
      caskType: formState.caskType.trim(),
      bottleCount: formState.bottleCount.trim()
    };

    onUpdateProduct(updated);
    setEditingProduct(null);
    setSaveSuccessMsg(`"${updated.name}" erfolgreich aktualisiert! Status: ${isAvailable ? 'Sofort lieferbar' : isUpcoming ? `Vorab-Zugriff (ab ${releaseDateVal})` : 'Ausverkauft'}`);
    setTimeout(() => setSaveSuccessMsg(''), 4000);
  };

  // Quick Status Toggle directly from table row
  const handleQuickStatusChange = (product, newStatus) => {
    const isUpcoming = newStatus === 'upcoming';
    const isSoldOut = newStatus === 'soldout';
    const isAvailable = newStatus === 'available';
    const releaseDateVal = product.releaseDate || '17. September 2026';
    const remaining = isSoldOut ? 0 : (product.bottlesRemaining > 0 ? product.bottlesRemaining : (product.stock || 48));

    const updated = {
      ...product,
      status: newStatus,
      isAvailable: isAvailable,
      isUpcoming: isUpcoming,
      soldOut: isSoldOut,
      releaseDate: releaseDateVal,
      stock: remaining,
      bottlesRemaining: remaining,
      badge: isUpcoming 
        ? `Release am ${releaseDateVal} · Vorabzugriff` 
        : (isSoldOut ? 'Ausverkauft · Sammler-Archiv' : 'Sofort lieferbar')
    };

    onUpdateProduct(updated);
    setSaveSuccessMsg(`Status für "${product.name}" auf "${isAvailable ? 'Sofort lieferbar' : isUpcoming ? `Vorab-Zugriff (ab ${releaseDateVal})` : 'Ausverkauft'}" geändert!`);
    setTimeout(() => setSaveSuccessMsg(''), 3500);
  };

  // Filtered products
  const filteredProducts = products.filter(p => {
    const matchesSearch = 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.distillery.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.region.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (!matchesSearch) return false;

    const isSoldOut = p.soldOut === true || (p.isAvailable === false && !p.isUpcoming);
    const isUpcoming = p.isUpcoming === true;
    const isAvailable = !isSoldOut && !isUpcoming;

    if (statusFilter === 'available') return isAvailable;
    if (statusFilter === 'upcoming') return isUpcoming;
    if (statusFilter === 'soldout') return isSoldOut;
    return true;
  });

  // KPI Calculations
  const totalCount = products.length;
  const availableCount = products.filter(p => {
    const isSoldOut = p.soldOut === true || (p.isAvailable === false && !p.isUpcoming);
    const isUpcoming = p.isUpcoming === true;
    return !isSoldOut && !isUpcoming;
  }).length;
  const upcomingCount = products.filter(p => p.isUpcoming === true).length;
  const soldOutCount = products.filter(p => p.soldOut === true || (p.isAvailable === false && !p.isUpcoming)).length;
  const avgPrice = (products.reduce((acc, p) => acc + (p.price || 0), 0) / (totalCount || 1)).toFixed(2);

  // Mollie Orders API Payload Spec
  const activeProductsForMollie = products.filter(p => {
    const isSoldOut = p.soldOut === true || (p.isAvailable === false && !p.isUpcoming);
    return !isSoldOut && !p.isUpcoming;
  });

  const mollieSamplePayload = {
    amount: {
      currency: 'EUR',
      value: (activeProductsForMollie[0]?.price || 139).toFixed(2)
    },
    orderNumber: 'PW-ORD-839210',
    lines: activeProductsForMollie.map(p => ({
      type: 'physical',
      sku: 'SKU-' + p.id.toUpperCase(),
      name: p.fullName,
      quantity: 1,
      unitPrice: {
        currency: 'EUR',
        value: p.price.toFixed(2)
      },
      totalAmount: {
        currency: 'EUR',
        value: p.price.toFixed(2)
      },
      vatRate: '19.00',
      vatAmount: {
        currency: 'EUR',
        value: (p.price * 0.19 / 1.19).toFixed(2)
      }
    })),
    shippingAddress: {
      streetAndNumber: 'Musterstraße 12',
      postalCode: '10115',
      city: 'Berlin',
      country: 'DE'
    },
    redirectUrl: 'https://pure-whisky.com/bestaetigung',
    webhookUrl: 'https://pure-whisky.com/api/mollie/webhook'
  };

  return (
    <div className="space-y-8 text-left">
      {/* Top Header & Overview */}
      <div className="bg-white border border-[#D4C8B8] rounded-3xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#E2DDD5]">
          <div>
            <div className="flex items-center space-x-3">
              <h2 className="font-woodblock text-2xl sm:text-3xl text-[#181F1C] uppercase tracking-wide">
                Fass-Depot & Preisverwaltung
              </h2>
              <span className="px-3 py-1 bg-[#FAF8F5] border border-[#D4C8B8] text-[#B85D2C] font-craft-mono text-xs font-bold rounded-full">
                Mollie-Ready
              </span>
            </div>
            <p className="text-sm text-[#55695E] pt-1">
              Passen Sie Verkaufspreise, Streichpreise, Verfügbarkeiten, Release-Daten und Lagerbestände direkt an. Änderungen sind sofort live im Shop sichtbar.
            </p>
          </div>

          <div className="flex items-center space-x-3 flex-wrap gap-2">
            <button
              onClick={() => setShowMollieModal(true)}
              className="px-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#D4C8B8] text-xs font-craft-mono font-bold text-[#181F1C] hover:bg-[#E2DDD5] transition-colors flex items-center space-x-2"
            >
              <Code className="w-4 h-4 text-[#2D6A4F]" />
              <span>Mollie API Vorschau</span>
            </button>
            <button
              onClick={onResetProducts}
              className="px-4 py-2.5 rounded-xl bg-white border border-rose-200 text-xs font-craft-mono font-bold text-rose-700 hover:bg-rose-50 transition-colors flex items-center space-x-2"
              title="Alle Fässer auf Ausgangszustand zurücksetzen"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Success Alert Banner */}
        {saveSuccessMsg && (
          <div className="mt-4 p-4 rounded-2xl bg-[#E8EFEA] border border-[#C5D8CC] text-[#2D6A4F] flex items-center space-x-3">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <span className="text-sm font-bold">{saveSuccessMsg}</span>
          </div>
        )}

        {/* KPI Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
          <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#D4C8B8]">
            <span className="text-xs font-craft-mono uppercase text-[#55695E] block font-bold">
              Aktive Fässer
            </span>
            <span className="font-woodblock text-2xl sm:text-3xl text-[#181F1C] mt-1 block">
              {totalCount}
            </span>
            <span className="text-xs text-[#55695E] mt-0.5 block">
              Ø {avgPrice} € / Flasche
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200">
            <span className="text-xs font-craft-mono uppercase text-emerald-800 block font-bold">
              Sofort lieferbar
            </span>
            <span className="font-woodblock text-2xl sm:text-3xl text-emerald-900 mt-1 block">
              {availableCount}
            </span>
            <span className="text-xs text-emerald-700 mt-0.5 block">
              Kaufbar im Shop
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200">
            <span className="text-xs font-craft-mono uppercase text-amber-800 block font-bold">
              Vorab-Zugriff
            </span>
            <span className="font-woodblock text-2xl sm:text-3xl text-amber-900 mt-1 block">
              {upcomingCount}
            </span>
            <span className="text-xs text-amber-700 mt-0.5 block">
              Freies Release-Datum
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-stone-100 border border-stone-200">
            <span className="text-xs font-craft-mono uppercase text-stone-600 block font-bold">
              Ausverkauft
            </span>
            <span className="font-woodblock text-2xl sm:text-3xl text-stone-800 mt-1 block">
              {soldOutCount}
            </span>
            <span className="text-xs text-stone-500 mt-0.5 block">
              Archivierte Chargen
            </span>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white border border-[#D4C8B8] rounded-3xl p-6 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#55695E] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Fass suchen nach Name, Destillerie oder Region..."
            className="w-full pl-10 pr-4 py-2.5 bg-[#FAF8F5] border border-[#D4C8B8] rounded-xl text-sm focus:outline-none focus:border-[#B85D2C] text-[#181F1C]"
          />
        </div>

        <div className="flex items-center space-x-2 overflow-x-auto pb-1 md:pb-0">
          {[
            { key: 'all', label: `Alle (${totalCount})` },
            { key: 'available', label: `Sofort lieferbar (${availableCount})` },
            { key: 'upcoming', label: `Vorab-Zugriff (${upcomingCount})` },
            { key: 'soldout', label: `Ausverkauft (${soldOutCount})` }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setStatusFilter(tab.key)}
              className={`px-3.5 py-2 rounded-xl text-xs font-craft-mono font-bold whitespace-nowrap transition-colors ${
                statusFilter === tab.key
                  ? 'bg-[#181F1C] text-white'
                  : 'bg-[#FAF8F5] border border-[#D4C8B8] text-[#55695E] hover:text-[#181F1C]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Products List Table */}
      <div className="bg-white border border-[#D4C8B8] rounded-3xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-[#181F1C]">
            <thead className="bg-[#FAF8F5] border-b border-[#E2DDD5] text-xs font-craft-mono uppercase text-[#55695E] tracking-wider">
              <tr>
                <th className="py-4 px-6">Fass / Produkt</th>
                <th className="py-4 px-6">Region & Fass-Typ</th>
                <th className="py-4 px-6">Verkaufspreis</th>
                <th className="py-4 px-6">Status & Release-Datum</th>
                <th className="py-4 px-6">Lager / Flaschen</th>
                <th className="py-4 px-6 text-right">Aktionen</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2DDD5]">
              {filteredProducts.map((p) => {
                const isSoldOut = p.soldOut === true || (p.isAvailable === false && !p.isUpcoming);
                const isUpcoming = p.isUpcoming === true;
                const releaseDateVal = p.releaseDate || '17. September 2026';
                const remaining = p.stock !== undefined ? p.stock : (p.bottlesRemaining !== undefined ? p.bottlesRemaining : (isSoldOut ? 0 : 48));

                return (
                  <tr key={p.id} className="hover:bg-[#FAF8F5]/60 transition-colors group">
                    {/* Bottle thumbnail & Name */}
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3.5">
                        <div className="w-12 h-14 rounded-xl bg-[#FAF8F5] border border-[#D4C8B8] p-1 flex items-center justify-center shrink-0 overflow-hidden">
                          <img 
                            src={p.image} 
                            alt={p.name} 
                            className="h-full w-full object-contain" 
                          />
                        </div>
                        <div>
                          <div className="font-bold text-[#181F1C] text-base group-hover:text-[#B85D2C] transition-colors">
                            {p.name}
                          </div>
                          <div className="text-xs text-[#55695E] font-craft-mono">
                            {p.distillery} · {p.ageYears || p.age} · {p.abv}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Region & Cask */}
                    <td className="py-4 px-6">
                      <div className="text-xs text-[#181F1C] font-bold">{p.region}</div>
                      <div className="text-xs text-[#55695E] truncate max-w-xs" title={p.caskType}>
                        {p.caskType}
                      </div>
                    </td>

                    {/* Price */}
                    <td className="py-4 px-6">
                      <div className="flex items-baseline space-x-2">
                        <span className="font-woodblock text-xl text-[#181F1C]">
                          {p.price.toFixed(2)} €
                        </span>
                        {p.originalPrice && (
                          <span className="text-xs text-stone-400 line-through">
                            {p.originalPrice.toFixed(2)} €
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-[#55695E] block font-craft-mono">
                        inkl. 19% MwSt.
                      </span>
                    </td>

                    {/* Status Pill & Quick Change */}
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <select
                          value={isUpcoming ? 'upcoming' : (isSoldOut ? 'soldout' : 'available')}
                          onChange={(e) => handleQuickStatusChange(p, e.target.value)}
                          className={`px-2.5 py-1.5 rounded-lg text-xs font-craft-mono font-bold border focus:outline-none transition-colors cursor-pointer ${
                            isUpcoming
                              ? 'bg-amber-50 text-amber-900 border-amber-300'
                              : isSoldOut
                              ? 'bg-stone-100 text-stone-700 border-stone-300'
                              : 'bg-emerald-50 text-emerald-900 border-emerald-300'
                          }`}
                        >
                          <option value="available">🟢 Sofort lieferbar</option>
                          <option value="upcoming">🟡 Vorab-Zugriff ({p.releaseDate || '17.09.'})</option>
                          <option value="soldout">⚪ Ausverkauft</option>
                        </select>
                      </div>
                      {isUpcoming && (
                        <span className="text-[11px] text-[#B85D2C] block font-craft-mono mt-1 font-bold">
                          Release: {releaseDateVal}
                        </span>
                      )}
                      {p.badge && !isUpcoming && (
                        <span className="text-[11px] text-[#55695E] block font-craft-mono mt-1">
                          Badge: "{p.badge}"
                        </span>
                      )}
                    </td>

                    {/* Bottle count / stock */}
                    <td className="py-4 px-6">
                      <div className="text-xs font-craft-mono text-[#181F1C]">
                        {p.bottleCount || (p.bottlesTotal ? `${p.bottlesTotal} Flaschen` : 'Limitiert')}
                      </div>
                      <div className="text-[11px] text-[#55695E]">
                        {isSoldOut ? '0 Flaschen (Ausverkauft)' : `${remaining} Flaschen vorrätig`}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => handleOpenEdit(p)}
                          className="px-3 py-1.5 rounded-lg bg-[#FAF8F5] hover:bg-[#E2DDD5] border border-[#D4C8B8] text-xs font-craft-mono font-bold text-[#181F1C] transition-colors flex items-center space-x-1.5"
                          title="Preis, Release-Datum und Details bearbeiten"
                        >
                          <Edit2 className="w-3.5 h-3.5 text-[#B85D2C]" />
                          <span>Bearbeiten</span>
                        </button>

                        {onNavigateProduct && (
                          <button
                            onClick={() => onNavigateProduct(p)}
                            className="p-1.5 rounded-lg bg-[#FAF8F5] hover:bg-[#E2DDD5] border border-[#D4C8B8] text-xs text-[#55695E] hover:text-[#181F1C] transition-colors"
                            title="Im Shop ansehen"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Product Modal */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-[#D4C8B8] rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-6 my-8 text-left">
            
            <div className="flex items-start justify-between border-b border-[#E2DDD5] pb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-14 rounded-xl bg-[#FAF8F5] border border-[#D4C8B8] p-1 flex items-center justify-center shrink-0">
                  <img src={editingProduct.image} alt="" className="h-full w-full object-contain" />
                </div>
                <div>
                  <h3 className="font-woodblock text-2xl text-[#181F1C] uppercase">
                    {editingProduct.name}
                  </h3>
                  <p className="text-xs text-[#55695E] font-craft-mono">
                    {editingProduct.fullName}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setEditingProduct(null)}
                className="p-2 rounded-xl text-stone-400 hover:text-[#181F1C] hover:bg-[#FAF8F5] transition-colors"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-5">
              {/* Status & Stock */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-craft-mono uppercase text-[#55695E] font-bold mb-1.5">
                    Verfügbarkeits-Status *
                  </label>
                  <select
                    value={formState.status}
                    onChange={(e) => {
                      const newStatus = e.target.value;
                      let autoBadge = formState.badge;
                      if (newStatus === 'upcoming') autoBadge = `Release am ${formState.releaseDate || '17. September 2026'}`;
                      else if (newStatus === 'soldout') autoBadge = 'Ausverkauft';
                      else autoBadge = 'Sofort lieferbar';
                      setFormState({ ...formState, status: newStatus, badge: autoBadge });
                    }}
                    className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#D4C8B8] rounded-xl text-sm font-bold text-[#181F1C] focus:outline-none focus:border-[#B85D2C]"
                  >
                    <option value="available">🟢 Sofort lieferbar (Im Shop kaufbar)</option>
                    <option value="upcoming">🟡 Vorab-Zugriff (Newsletter-Reservierung)</option>
                    <option value="soldout">⚪ Ausverkauft (Archiviert)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-craft-mono uppercase text-[#55695E] font-bold mb-1.5">
                    Lagerbestand (Flaschenanzahl)
                  </label>
                  <input
                    type="number"
                    value={formState.stock}
                    onChange={(e) => setFormState({ ...formState, stock: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#D4C8B8] rounded-xl text-sm font-bold text-[#181F1C] focus:outline-none focus:border-[#B85D2C]"
                  />
                  <span className="text-[11px] text-[#55695E] mt-1 block">
                    Bei 0 Flaschen wird das Fass automatisch als ausverkauft markiert
                  </span>
                </div>
              </div>

              {/* DYNAMIC RELEASE DATE FIELD - FREI KONFIGURIERBAR */}
              <div className={`p-4 rounded-2xl border transition-colors ${formState.status === 'upcoming' ? 'bg-amber-50/60 border-amber-300' : 'bg-[#FAF8F5] border-[#D4C8B8]'}`}>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-craft-mono uppercase text-[#181F1C] font-bold flex items-center space-x-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#B85D2C]" />
                    <span>Freies Release-Datum für Vorabzugriff</span>
                  </label>
                  {formState.status === 'upcoming' && (
                    <span className="px-2 py-0.5 bg-[#B85D2C] text-white text-[10px] font-craft-mono font-bold rounded-md">
                      Aktiv
                    </span>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={formState.releaseDate}
                    onChange={(e) => {
                      const val = e.target.value;
                      setFormState({ 
                        ...formState, 
                        releaseDate: val,
                        badge: formState.status === 'upcoming' ? `Release am ${val}` : formState.badge
                      });
                    }}
                    placeholder="z.B. 17. September 2026 oder 25.10.2026"
                    className="flex-1 px-4 py-2.5 bg-white border border-[#D4C8B8] rounded-xl text-sm font-bold text-[#181F1C] focus:outline-none focus:border-[#B85D2C]"
                  />
                  <input
                    type="date"
                    onChange={(e) => {
                      if (e.target.value) {
                        const d = new Date(e.target.value);
                        const formatted = d.toLocaleDateString('de-DE', { day: 'numeric', month: 'long', year: 'numeric' });
                        setFormState({
                          ...formState,
                          releaseDate: formatted,
                          badge: formState.status === 'upcoming' ? `Release am ${formatted}` : formState.badge
                        });
                      }
                    }}
                    className="px-3 py-2.5 bg-white border border-[#D4C8B8] rounded-xl text-xs text-[#55695E] cursor-pointer"
                    title="Datum aus Kalender wählen"
                  />
                </div>

                {/* Quick Presets */}
                <div className="flex items-center space-x-2 mt-2 pt-2 border-t border-amber-200/50 flex-wrap gap-1.5">
                  <span className="text-[11px] font-craft-mono text-[#55695E]">Vorlagen:</span>
                  {[
                    '17. September 2026',
                    '1. Oktober 2026',
                    '15. November 2026',
                    'Herbst 2026'
                  ].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setFormState({
                        ...formState,
                        releaseDate: preset,
                        badge: formState.status === 'upcoming' ? `Release am ${preset}` : formState.badge
                      })}
                      className="px-2.5 py-1 rounded-lg bg-white border border-[#D4C8B8] text-[11px] font-craft-mono hover:bg-[#E2DDD5] text-[#181F1C] transition-colors"
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price & Original Price */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-craft-mono uppercase text-[#55695E] font-bold mb-1.5">
                    Verkaufspreis (€) *
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={formState.price}
                      onChange={(e) => setFormState({ ...formState, price: e.target.value })}
                      className="w-full pl-4 pr-10 py-2.5 bg-[#FAF8F5] border border-[#D4C8B8] rounded-xl text-base font-bold text-[#181F1C] focus:outline-none focus:border-[#B85D2C]"
                    />
                    <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-sm text-[#55695E] font-bold">
                      €
                    </span>
                  </div>
                  <span className="text-[11px] text-[#55695E] mt-1 block">
                    Wird live im Shop & Mollie angewendet (inkl. 19% MwSt.)
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-craft-mono uppercase text-[#55695E] font-bold mb-1.5">
                    Streichpreis (€, optional)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.01"
                      value={formState.originalPrice}
                      onChange={(e) => setFormState({ ...formState, originalPrice: e.target.value })}
                      placeholder="z.B. 149.00"
                      className="w-full pl-4 pr-10 py-2.5 bg-[#FAF8F5] border border-[#D4C8B8] rounded-xl text-base text-[#181F1C] focus:outline-none focus:border-[#B85D2C]"
                    />
                    <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-sm text-[#55695E] font-bold">
                      €
                    </span>
                  </div>
                  <span className="text-[11px] text-[#55695E] mt-1 block">
                    Erscheint durchgestrichen als unverbindliche Preisempfehlung
                  </span>
                </div>
              </div>

              {/* Badge & Limitierung */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-craft-mono uppercase text-[#55695E] font-bold mb-1.5">
                    Badge-Hinweistext
                  </label>
                  <input
                    type="text"
                    value={formState.badge}
                    onChange={(e) => setFormState({ ...formState, badge: e.target.value })}
                    placeholder="z.B. Release am 17. September 2026"
                    className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#D4C8B8] rounded-xl text-sm text-[#181F1C] focus:outline-none focus:border-[#B85D2C]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-craft-mono uppercase text-[#55695E] font-bold mb-1.5">
                    Flaschen-Limitierung
                  </label>
                  <input
                    type="text"
                    value={formState.bottleCount}
                    onChange={(e) => setFormState({ ...formState, bottleCount: e.target.value })}
                    placeholder="z.B. 248 Flaschen weltweit"
                    className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#D4C8B8] rounded-xl text-sm text-[#181F1C] focus:outline-none focus:border-[#B85D2C]"
                  />
                </div>
              </div>

              {/* ABV & Cask Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-craft-mono uppercase text-[#55695E] font-bold mb-1.5">
                    Alkoholgehalt (ABV)
                  </label>
                  <input
                    type="text"
                    value={formState.abv}
                    onChange={(e) => setFormState({ ...formState, abv: e.target.value })}
                    placeholder="z.B. 53,9% vol."
                    className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#D4C8B8] rounded-xl text-sm text-[#181F1C] focus:outline-none focus:border-[#B85D2C]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-craft-mono uppercase text-[#55695E] font-bold mb-1.5">
                    Fass-Typ (Cask)
                  </label>
                  <input
                    type="text"
                    value={formState.caskType}
                    onChange={(e) => setFormState({ ...formState, caskType: e.target.value })}
                    placeholder="z.B. 1st Fill Oloroso Sherry Hogshead"
                    className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#D4C8B8] rounded-xl text-sm text-[#181F1C] focus:outline-none focus:border-[#B85D2C]"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-[#E2DDD5] flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-5 py-2.5 rounded-xl border border-[#D4C8B8] text-xs font-craft-mono font-bold text-[#55695E] hover:text-[#181F1C] hover:bg-[#FAF8F5] transition-colors"
                >
                  Abbrechen
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#B85D2C] hover:bg-[#A04E24] text-white font-woodblock text-base tracking-wider uppercase transition-all shadow-md flex items-center space-x-2"
                >
                  <Check className="w-4 h-4" />
                  <span>Speichern & Live anwenden</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Mollie API Payload Preview Modal */}
      {showMollieModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-[#D4C8B8] rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl space-y-6 my-8 text-left">
            <div className="flex items-start justify-between border-b border-[#E2DDD5] pb-4">
              <div>
                <div className="flex items-center space-x-3">
                  <Code className="w-5 h-5 text-[#2D6A4F]" />
                  <h3 className="font-woodblock text-2xl text-[#181F1C] uppercase">
                    Mollie Orders API Payload Vorschau
                  </h3>
                </div>
                <p className="text-xs text-[#55695E] pt-1">
                  Diese Datenstruktur wird bei der Anbindung an die Mollie API per POST /v2/orders übertragen.
                </p>
              </div>
              <button
                onClick={() => setShowMollieModal(false)}
                className="p-2 rounded-xl text-stone-400 hover:text-[#181F1C] hover:bg-[#FAF8F5] transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-[#181F1C] text-[#E2DDD5] font-craft-mono text-xs overflow-x-auto max-h-96">
                <pre>{JSON.stringify(mollieSamplePayload, null, 2)}</pre>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#D4C8B8] text-xs text-[#55695E] space-y-2">
                <div className="font-bold text-[#181F1C]">Mollie Integration Checkliste:</div>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Preise werden automatisch formatiert als zweistelliger Dezimal-String (<code className="text-[#B85D2C]">139.00</code>).</li>
                  <li>Die 19% deutsche Mehrwertsteuer ist in jedem Posten vorkalkuliert.</li>
                  <li>SKUs sind eindeutig anhand der Fass-IDs zugeordnet.</li>
                  <li>Versandkostenpauschale (6,90 €) wird als separate Bestellzeile (<code className="text-[#B85D2C]">shipping_fee</code>) übergeben.</li>
                </ul>
              </div>
            </div>

            <div className="pt-2 border-t border-[#E2DDD5] flex justify-end">
              <button
                onClick={() => setShowMollieModal(false)}
                className="px-6 py-2.5 rounded-xl bg-[#181F1C] text-white font-woodblock text-sm tracking-wider uppercase hover:bg-black transition-colors"
              >
                Schließen
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
