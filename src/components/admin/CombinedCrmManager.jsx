import React, { useState, useMemo } from 'react';
import { 
  Users, Mail, ShoppingBag, Search, Download, Plus, CheckCircle2, 
  XCircle, Trash2, Send, Filter, RefreshCw, X 
} from 'lucide-react';

export default function CombinedCrmManager({
  wooCustomers = [],
  newsletterSubs = [],
  onAddWooCustomer,
  onDeleteWooCustomer,
  onAddNewsletterSub,
  onToggleNewsletterStatus,
  onDeleteNewsletterSub,
  onComposeMail
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all'); // 'all' | 'shop' | 'newsletter' | 'subscribed' | 'unsubscribed'
  const [showAddModal, setShowAddModal] = useState(false);
  
  const [newEntry, setNewEntry] = useState({
    type: 'newsletter', // 'shop' | 'newsletter'
    firstName: '',
    lastName: '',
    email: '',
    status: 'subscribed'
  });

  // Combine and deduplicate records
  const combinedList = useMemo(() => {
    const list = [];
    const seenEmails = new Set();

    // 1. Process Woo Customers
    wooCustomers.forEach(c => {
      const email = (c.email || '').trim().toLowerCase();
      if (!email) return;
      seenEmails.add(email);

      // Check if this customer is also in newsletter subs
      const matchingSub = newsletterSubs.find(s => (s.email || '').trim().toLowerCase() === email);

      list.push({
        id: c.id || `woo_${email}`,
        originalId: c.id,
        email: c.email.trim(),
        firstName: c.firstName || '',
        lastName: c.lastName || '',
        fullName: c.fullName || `${c.firstName || ''} ${c.lastName || ''}`.trim() || email.split('@')[0],
        date: c.subscribedAt || c.date || '–',
        isShop: true,
        isNewsletter: !!matchingSub,
        newsletterStatus: matchingSub ? matchingSub.listStatus : null,
        source: 'shop'
      });
    });

    // 2. Process Newsletter Subscribers not yet added
    newsletterSubs.forEach(s => {
      const email = (s.email || '').trim().toLowerCase();
      if (!email) return;

      if (seenEmails.has(email)) {
        // Already merged in Woo loop
        return;
      }

      list.push({
        id: s.id || `sub_${email}`,
        originalId: s.id,
        email: s.email.trim(),
        firstName: s.firstName || '',
        lastName: s.lastName || '',
        fullName: s.fullName || `${s.firstName || ''} ${s.lastName || ''}`.trim() || email.split('@')[0],
        date: s.subscribedAt || s.date || '–',
        isShop: false,
        isNewsletter: true,
        newsletterStatus: s.listStatus || 'subscribed',
        source: 'newsletter'
      });
    });

    return list;
  }, [wooCustomers, newsletterSubs]);

  // Metrics
  const totalCount = combinedList.length;
  const shopCount = combinedList.filter(c => c.isShop).length;
  const newsletterActiveCount = combinedList.filter(c => c.isNewsletter && c.newsletterStatus === 'subscribed').length;
  const unsubscribedCount = combinedList.filter(c => c.isNewsletter && c.newsletterStatus === 'unsubscribed').length;

  // Filtered List
  const filteredList = combinedList.filter(item => {
    // Category filter
    let matchesCategory = true;
    if (categoryFilter === 'shop') matchesCategory = item.isShop;
    else if (categoryFilter === 'newsletter') matchesCategory = item.isNewsletter;
    else if (categoryFilter === 'subscribed') matchesCategory = item.isNewsletter && item.newsletterStatus === 'subscribed';
    else if (categoryFilter === 'unsubscribed') matchesCategory = item.isNewsletter && item.newsletterStatus === 'unsubscribed';

    // Search filter
    const term = searchTerm.toLowerCase().trim();
    const matchesSearch = !term ||
      item.email.toLowerCase().includes(term) ||
      item.fullName.toLowerCase().includes(term) ||
      item.firstName.toLowerCase().includes(term) ||
      item.lastName.toLowerCase().includes(term);

    return matchesCategory && matchesSearch;
  });

  // CSV Export
  const handleExportCsv = () => {
    const headers = ['ID', 'Vorname', 'Nachname', 'Name', 'E-Mail', 'Datum', 'Shop-Kunde', 'Newsletter-Status'];
    const rows = filteredList.map(c => [
      c.id || '',
      c.firstName || '',
      c.lastName || '',
      c.fullName || '',
      c.email || '',
      c.date || '',
      c.isShop ? 'Ja' : 'Nein',
      c.isNewsletter ? (c.newsletterStatus || 'subscribed') : 'Kein Newsletter'
    ]);

    const csvContent = [
      headers.join(';'),
      ...rows.map(r => r.map(val => `"${String(val).replace(/"/g, '""')}"`).join(';'))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `pure_whisky_kunden_newsletter_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Add Contact Handler
  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newEntry.email) return;

    const email = newEntry.email.trim();
    const firstName = newEntry.firstName.trim();
    const lastName = newEntry.lastName.trim();
    const fullName = `${firstName} ${lastName}`.trim() || email.split('@')[0];
    const now = new Date().toISOString().replace('T', ' ').slice(0, 19);

    if (newEntry.type === 'shop') {
      if (onAddWooCustomer) {
        onAddWooCustomer({
          id: `crm_woo_${Date.now()}`,
          firstName,
          lastName,
          fullName,
          email,
          subscribedAt: now,
          confirmedAt: now,
          listStatus: 'subscribed',
          listName: 'WooCommerce Customers'
        });
      }
    } else {
      if (onAddNewsletterSub) {
        onAddNewsletterSub({
          id: `crm_sub_${Date.now()}`,
          firstName,
          lastName,
          fullName,
          email,
          subscribedAt: now,
          confirmedAt: now,
          listStatus: newEntry.status,
          globalStatus: newEntry.status,
          listName: 'Newsletter Mailing List'
        });
      }
    }

    setNewEntry({ type: 'newsletter', firstName: '', lastName: '', email: '', status: 'subscribed' });
    setShowAddModal(false);
  };

  // Delete Handler
  const handleDeleteItem = (item) => {
    if (confirm(`Möchten Sie "${item.email}" wirklich aus dem CRM & Verteiler entfernen?`)) {
      if (item.isShop && onDeleteWooCustomer) {
        onDeleteWooCustomer(item.email);
      }
      if (item.isNewsletter && onDeleteNewsletterSub) {
        onDeleteNewsletterSub(item.originalId || item.id);
      }
    }
  };

  return (
    <div className="space-y-6 text-left">
      
      {/* Top Banner & KPI Header */}
      <div className="bg-white border border-[#D4C8B8] rounded-2xl p-5 sm:p-6 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <Users className="w-5 h-5 text-[#B85D2C]" />
            <h2 className="font-woodblock text-2xl sm:text-3xl text-[#181F1C] uppercase tracking-wide">
              Kunden- & Newsletter-Verteiler
            </h2>
          </div>
          <p className="text-xs text-[#55695E] mt-1">
            Zentrale Übersicht aller Shop-Käufer ({shopCount}) und Newsletter-Abonnenten ({newsletterActiveCount} aktiv).
          </p>
        </div>

        <div className="flex items-center space-x-3 shrink-0">
          <button
            onClick={() => setShowAddModal(true)}
            className="px-3.5 py-2 bg-white border border-[#D4C8B8] text-xs font-bold text-[#181F1C] hover:bg-[#FAF8F5] rounded-xl flex items-center space-x-1.5 transition-colors shadow-2xs"
          >
            <Plus className="w-3.5 h-3.5 text-[#B85D2C]" />
            <span>Kontakt hinzufügen</span>
          </button>

          <button
            onClick={handleExportCsv}
            className="px-4 py-2 bg-[#181F1C] hover:bg-[#2C3831] text-white text-xs font-bold uppercase tracking-wider rounded-xl flex items-center space-x-2 transition-colors shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>CSV Export ({filteredList.length})</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white border border-[#D4C8B8] rounded-2xl p-4 shadow-2xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Nach Name oder E-Mail-Adresse durchsuchen..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-[#D4C8B8] text-xs text-[#181F1C] bg-[#FAF8F5] focus:bg-white focus:outline-none focus:border-[#B85D2C]"
          />
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 bg-[#FAF8F5] border border-[#D4C8B8] rounded-xl p-1 shrink-0 text-xs font-medium">
          <button
            onClick={() => setCategoryFilter('all')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              categoryFilter === 'all' 
                ? 'bg-white text-[#181F1C] font-bold shadow-2xs' 
                : 'text-[#55695E] hover:text-[#181F1C]'
            }`}
          >
            Alle ({totalCount})
          </button>

          <button
            onClick={() => setCategoryFilter('shop')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              categoryFilter === 'shop' 
                ? 'bg-[#F5EBE6] text-[#B85D2C] font-bold shadow-2xs' 
                : 'text-[#55695E] hover:text-[#181F1C]'
            }`}
          >
            Shop-Kunden ({shopCount})
          </button>

          <button
            onClick={() => setCategoryFilter('subscribed')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              categoryFilter === 'subscribed' 
                ? 'bg-emerald-100 text-emerald-900 font-bold shadow-2xs' 
                : 'text-[#55695E] hover:text-[#181F1C]'
            }`}
          >
            Newsletter Aktiv ({newsletterActiveCount})
          </button>

          {unsubscribedCount > 0 && (
            <button
              onClick={() => setCategoryFilter('unsubscribed')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                categoryFilter === 'unsubscribed' 
                  ? 'bg-stone-200 text-stone-800 font-bold shadow-2xs' 
                  : 'text-[#55695E] hover:text-[#181F1C]'
              }`}
            >
              Abgemeldet ({unsubscribedCount})
            </button>
          )}
        </div>

      </div>

      {/* Contacts Table */}
      <div className="bg-white border border-[#D4C8B8] rounded-2xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-[#E2DDD5] bg-[#FAF8F5] text-[#55695E] uppercase font-craft-mono text-[11px] font-bold">
                <th className="py-3 px-4">Kundenname</th>
                <th className="py-3 px-4">E-Mail-Adresse</th>
                <th className="py-3 px-4">Kategorie / Segment</th>
                <th className="py-3 px-4">Erfasst am</th>
                <th className="py-3 px-4 text-center">Newsletter Status</th>
                <th className="py-3 px-4 text-right">Aktionen</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#FAF8F5]">
              {filteredList.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-12 text-center text-[#55695E]">
                    Keine Kontakte gefunden.
                  </td>
                </tr>
              ) : (
                filteredList.map((item) => (
                  <tr key={item.id} className="hover:bg-[#FAF8F5]/80 transition-colors">
                    
                    {/* Name */}
                    <td className="py-3.5 px-4 font-bold text-[#181F1C]">
                      {item.fullName || 'Kunde'}
                    </td>

                    {/* Email */}
                    <td className="py-3.5 px-4 font-mono text-[#55695E]">
                      {item.email}
                    </td>

                    {/* Category Tags */}
                    <td className="py-3.5 px-4">
                      <div className="flex flex-wrap items-center gap-1.5">
                        {item.isShop && (
                          <span className="px-2 py-0.5 rounded-full bg-[#F5EBE6] border border-[#E5D0C5] text-[10px] text-[#B85D2C] font-craft-mono font-bold flex items-center space-x-1">
                            <ShoppingBag className="w-2.5 h-2.5" />
                            <span>Shop-Käufer</span>
                          </span>
                        )}
                        {item.isNewsletter && (
                          <span className="px-2 py-0.5 rounded-full bg-[#E8EFEA] border border-[#C5D8CC] text-[10px] text-[#2D6A4F] font-craft-mono font-bold flex items-center space-x-1">
                            <Mail className="w-2.5 h-2.5" />
                            <span>Newsletter</span>
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Date */}
                    <td className="py-3.5 px-4 text-[#78887E] font-craft-mono">
                      {item.date}
                    </td>

                    {/* Newsletter Status & Toggle */}
                    <td className="py-3.5 px-4 text-center">
                      {item.isNewsletter ? (
                        item.newsletterStatus === 'subscribed' ? (
                          <button
                            onClick={() => onToggleNewsletterStatus && onToggleNewsletterStatus(item.originalId || item.id)}
                            className="inline-flex items-center space-x-1 text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-2 py-0.5 rounded-full text-[10px] font-bold transition-colors cursor-pointer"
                            title="Klicken, um Abzumelden"
                          >
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            <span>Aktiv</span>
                          </button>
                        ) : (
                          <button
                            onClick={() => onToggleNewsletterStatus && onToggleNewsletterStatus(item.originalId || item.id)}
                            className="inline-flex items-center space-x-1 text-stone-600 bg-stone-100 hover:bg-stone-200 border border-stone-200 px-2 py-0.5 rounded-full text-[10px] font-bold transition-colors cursor-pointer"
                            title="Klicken, um wieder zu Aktivieren"
                          >
                            <XCircle className="w-3 h-3 text-stone-400" />
                            <span>Abgemeldet</span>
                          </button>
                        )
                      ) : (
                        <span className="text-[10px] text-stone-400 font-craft-mono">–</span>
                      )}
                    </td>

                    {/* Action buttons */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        {/* Direct "Mail schreiben" button */}
                        <button
                          type="button"
                          onClick={() => onComposeMail && onComposeMail(item)}
                          className="px-2.5 py-1.5 bg-[#FAF8F5] hover:bg-[#E2DDD5] border border-[#D4C8B8] text-[#B85D2C] hover:text-[#A04E24] rounded-lg text-xs font-bold transition-colors flex items-center space-x-1"
                          title={`E-Mail an ${item.email} verfassen`}
                        >
                          <Send className="w-3 h-3" />
                          <span className="hidden sm:inline">Mail schreiben</span>
                        </button>

                        {/* Delete button */}
                        <button
                          type="button"
                          onClick={() => handleDeleteItem(item)}
                          className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                          title="Kontakt löschen"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Contact Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-[110] bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <form onSubmit={handleAddSubmit} className="bg-white border border-[#D4C8B8] rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 text-left">
            <div className="flex items-center justify-between border-b border-[#E2DDD5] pb-3">
              <h3 className="font-woodblock text-2xl text-[#181F1C] uppercase">
                Neuen Kontakt anlegen
              </h3>
              <button 
                type="button" 
                onClick={() => setShowAddModal(false)}
                className="p-1 text-stone-400 hover:text-stone-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold font-craft-mono text-[#55695E] uppercase mb-1">
                  Kategorie / Zielgruppe
                </label>
                <select
                  value={newEntry.type}
                  onChange={(e) => setNewEntry({ ...newEntry, type: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-[#D4C8B8] text-xs bg-[#FAF8F5] focus:outline-none focus:border-[#B85D2C]"
                >
                  <option value="newsletter">Newsletter-Abonnent</option>
                  <option value="shop">Shop-Kunde (Bestandskunde)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold font-craft-mono text-[#55695E] uppercase mb-1">
                    Vorname
                  </label>
                  <input
                    type="text"
                    value={newEntry.firstName}
                    onChange={(e) => setNewEntry({ ...newEntry, firstName: e.target.value })}
                    placeholder="Vorname"
                    className="w-full px-3 py-2 rounded-xl border border-[#D4C8B8] text-xs bg-[#FAF8F5] focus:outline-none focus:border-[#B85D2C]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold font-craft-mono text-[#55695E] uppercase mb-1">
                    Nachname
                  </label>
                  <input
                    type="text"
                    value={newEntry.lastName}
                    onChange={(e) => setNewEntry({ ...newEntry, lastName: e.target.value })}
                    placeholder="Nachname"
                    className="w-full px-3 py-2 rounded-xl border border-[#D4C8B8] text-xs bg-[#FAF8F5] focus:outline-none focus:border-[#B85D2C]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold font-craft-mono text-[#55695E] uppercase mb-1">
                  E-Mail-Adresse *
                </label>
                <input
                  type="email"
                  required
                  value={newEntry.email}
                  onChange={(e) => setNewEntry({ ...newEntry, email: e.target.value })}
                  placeholder="kunde@example.com"
                  className="w-full px-3 py-2 rounded-xl border border-[#D4C8B8] text-xs bg-[#FAF8F5] focus:outline-none focus:border-[#B85D2C] font-mono"
                />
              </div>

              {newEntry.type === 'newsletter' && (
                <div>
                  <label className="block text-xs font-bold font-craft-mono text-[#55695E] uppercase mb-1">
                    Status
                  </label>
                  <select
                    value={newEntry.status}
                    onChange={(e) => setNewEntry({ ...newEntry, status: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#D4C8B8] text-xs bg-[#FAF8F5] focus:outline-none focus:border-[#B85D2C]"
                  >
                    <option value="subscribed">Aktiv (Subscribed)</option>
                    <option value="unsubscribed">Abgemeldet (Unsubscribed)</option>
                  </select>
                </div>
              )}
            </div>

            <div className="flex items-center justify-end space-x-2 pt-3 border-t border-[#E2DDD5]">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 bg-[#FAF8F5] text-xs font-bold text-[#181F1C] rounded-xl hover:bg-[#E2DDD5]"
              >
                Abbrechen
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-[#B85D2C] text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-[#A04E24]"
              >
                Speichern
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}
