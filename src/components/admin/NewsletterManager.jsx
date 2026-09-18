import React, { useState } from 'react';
import { Mail, Search, Download, Plus, CheckCircle2, XCircle, Trash2, UserCheck, RefreshCw } from 'lucide-react';

export default function NewsletterManager({ 
  subscribers = [], 
  onAddSubscriber, 
  onToggleStatus, 
  onDeleteSubscriber 
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // 'all' | 'subscribed' | 'unsubscribed'
  const [showAddModal, setShowAddModal] = useState(false);
  const [newSub, setNewSub] = useState({ firstName: '', lastName: '', email: '' });

  const activeCount = subscribers.filter(s => s.listStatus === 'subscribed').length;
  const unsubCount = subscribers.filter(s => s.listStatus === 'unsubscribed').length;

  const filteredSubscribers = subscribers.filter(sub => {
    const matchesStatus = statusFilter === 'all' || sub.listStatus === statusFilter;
    const term = searchTerm.toLowerCase().trim();
    const matchesSearch = !term ||
      (sub.email && sub.email.toLowerCase().includes(term)) ||
      (sub.fullName && sub.fullName.toLowerCase().includes(term)) ||
      (sub.firstName && sub.firstName.toLowerCase().includes(term)) ||
      (sub.lastName && sub.lastName.toLowerCase().includes(term));
    return matchesStatus && matchesSearch;
  });

  const handleExportCsv = () => {
    const headers = ['ID', 'Vorname', 'Nachname', 'E-Mail', 'Anmelde-Datum', 'Bestaetigt-Am', 'Status', 'Liste'];
    const rows = filteredSubscribers.map(s => [
      s.id || '',
      s.firstName || '',
      s.lastName || '',
      s.email || '',
      s.subscribedAt || '',
      s.confirmedAt || '',
      s.listStatus || 'subscribed',
      s.listName || 'Newsletter Mailing List'
    ]);

    const csvContent = [headers.join(';'), ...rows.map(r => r.map(val => `"${String(val).replace(/"/g, '""')}"`).join(';'))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `pure_whisky_newsletter_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newSub.email) return;

    const created = {
      id: `crm_sub_${Date.now()}`,
      firstName: newSub.firstName.trim(),
      lastName: newSub.lastName.trim(),
      fullName: `${newSub.firstName.trim()} ${newSub.lastName.trim()}`.trim() || newSub.email.split('@')[0],
      email: newSub.email.trim(),
      subscribedAt: new Date().toISOString().replace('T', ' ').slice(0, 19),
      confirmedAt: new Date().toISOString().replace('T', ' ').slice(0, 19),
      listStatus: 'subscribed',
      globalStatus: 'subscribed',
      listName: 'Newsletter Mailing List'
    };

    if (onAddSubscriber) {
      onAddSubscriber(created);
    }
    setNewSub({ firstName: '', lastName: '', email: '' });
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6 text-left">
      
      {/* Header & Action Bar */}
      <div className="bg-white border border-[#D4C8B8] rounded-2xl p-6 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <Mail className="w-5 h-5 text-[#B85D2C]" />
            <h2 className="font-woodblock text-2xl sm:text-3xl text-[#181F1C] uppercase tracking-wide">
              Newsletter-Verteiler ({subscribers.length} Abonnenten)
            </h2>
          </div>
          <p className="text-xs text-[#55695E] mt-1">
            Live-Verwaltung der Newsletter-Abonnenten mit automatischer Echtzeit-Synchronisation bei Neuanmeldung im Shop.
          </p>
        </div>

        <div className="flex items-center space-x-3 shrink-0">
          <button
            onClick={() => setShowAddModal(true)}
            className="px-3.5 py-2 bg-white border border-[#D4C8B8] text-xs font-bold text-[#181F1C] hover:bg-[#FAF8F5] rounded-xl flex items-center space-x-1.5 transition-colors shadow-2xs"
          >
            <Plus className="w-3.5 h-3.5 text-[#B85D2C]" />
            <span>Abonnent hinzufügen</span>
          </button>

          <button
            onClick={handleExportCsv}
            className="px-4 py-2 bg-[#181F1C] hover:bg-[#2C3831] text-white text-xs font-bold uppercase tracking-wider rounded-xl flex items-center space-x-2 transition-colors shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>CSV Export ({filteredSubscribers.length})</span>
          </button>
        </div>
      </div>

      {/* Filter & Search */}
      <div className="bg-white border border-[#D4C8B8] rounded-2xl p-4 shadow-2xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Abonnenten nach Name oder E-Mail filtern..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-[#D4C8B8] text-xs text-[#181F1C] bg-[#FAF8F5] focus:outline-none focus:border-[#B85D2C]"
          />
        </div>

        <div className="flex items-center space-x-1.5 bg-[#FAF8F5] border border-[#D4C8B8] rounded-xl p-1 shrink-0 text-xs font-medium">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              statusFilter === 'all' 
                ? 'bg-white text-[#181F1C] font-bold shadow-2xs' 
                : 'text-[#55695E] hover:text-[#181F1C]'
            }`}
          >
            Alle ({subscribers.length})
          </button>

          <button
            onClick={() => setStatusFilter('subscribed')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              statusFilter === 'subscribed' 
                ? 'bg-emerald-100 text-emerald-900 font-bold shadow-2xs' 
                : 'text-[#55695E] hover:text-[#181F1C]'
            }`}
          >
            Aktiv ({activeCount})
          </button>

          <button
            onClick={() => setStatusFilter('unsubscribed')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              statusFilter === 'unsubscribed' 
                ? 'bg-stone-200 text-stone-800 font-bold shadow-2xs' 
                : 'text-[#55695E] hover:text-[#181F1C]'
            }`}
          >
            Abgemeldet ({unsubCount})
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-[#D4C8B8] rounded-2xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-[#E2DDD5] bg-[#FAF8F5] text-[#55695E] uppercase font-craft-mono text-[11px] font-bold">
                <th className="py-3 px-4">Name / Ansprechpartner</th>
                <th className="py-3 px-4">E-Mail-Adresse</th>
                <th className="py-3 px-4">Anmeldedatum</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Aktionen</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#FAF8F5]">
              {filteredSubscribers.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-12 text-center text-[#55695E]">
                    Keine Abonnenten gefunden.
                  </td>
                </tr>
              ) : (
                filteredSubscribers.map((sub, index) => {
                  const isSub = sub.listStatus === 'subscribed';
                  return (
                    <tr key={sub.id || index} className="hover:bg-[#FAF8F5]/80 transition-colors">
                      <td className="py-3 px-4 font-bold text-[#181F1C]">
                        {sub.fullName || `${sub.firstName || ''} ${sub.lastName || ''}`.trim() || 'Abonnent'}
                      </td>
                      <td className="py-3 px-4 font-mono text-[#55695E]">
                        {sub.email}
                      </td>
                      <td className="py-3 px-4 text-[#78887E] font-craft-mono">
                        {sub.subscribedAt || '–'}
                      </td>
                      <td className="py-3 px-4 text-center">
                        {isSub ? (
                          <span className="inline-flex items-center space-x-1 text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full text-[10px] font-bold">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            <span>Aktiv</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center space-x-1 text-stone-600 bg-stone-100 border border-stone-300 px-2 py-0.5 rounded-full text-[10px] font-medium">
                            <XCircle className="w-3 h-3 text-stone-400" />
                            <span>Abgemeldet</span>
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-right space-x-2">
                        {onToggleStatus && (
                          <button
                            onClick={() => onToggleStatus(sub.email)}
                            className="px-2 py-1 bg-[#FAF8F5] hover:bg-[#E2DDD5] border border-[#D4C8B8] text-[10px] font-semibold text-[#181F1C] rounded transition-colors"
                            title={isSub ? 'Auf Abgemeldet setzen' : 'Wieder aktivieren'}
                          >
                            {isSub ? 'Abmelden' : 'Aktivieren'}
                          </button>
                        )}
                        {onDeleteSubscriber && (
                          <button
                            onClick={() => {
                              if (confirm(`Abonnent "${sub.email}" wirklich löschen?`)) {
                                onDeleteSubscriber(sub.email);
                              }
                            }}
                            className="p-1 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors"
                            title="Löschen"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-[110] bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <form onSubmit={handleAddSubmit} className="bg-white border border-[#D4C8B8] rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 text-left">
            <h3 className="font-woodblock text-2xl text-[#181F1C] uppercase">
              Neuen Newsletter-Abonnenten anlegen
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-[#55695E] mb-1">Vorname</label>
                <input
                  type="text"
                  value={newSub.firstName}
                  onChange={(e) => setNewSub(prev => ({ ...prev, firstName: e.target.value }))}
                  placeholder="Martin"
                  className="w-full text-xs bg-white border border-[#D4C8B8] rounded-lg px-3 py-2 text-[#181F1C] focus:outline-none focus:border-[#B85D2C]"
                />
              </div>
              <div>
                <label className="block text-xs text-[#55695E] mb-1">Nachname</label>
                <input
                  type="text"
                  value={newSub.lastName}
                  onChange={(e) => setNewSub(prev => ({ ...prev, lastName: e.target.value }))}
                  placeholder="Weber"
                  className="w-full text-xs bg-white border border-[#D4C8B8] rounded-lg px-3 py-2 text-[#181F1C] focus:outline-none focus:border-[#B85D2C]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-[#55695E] mb-1">E-Mail-Adresse *</label>
              <input
                type="email"
                required
                value={newSub.email}
                onChange={(e) => setNewSub(prev => ({ ...prev, email: e.target.value }))}
                placeholder="m.weber@t-online.de"
                className="w-full text-xs bg-white border border-[#D4C8B8] rounded-lg px-3 py-2 text-[#181F1C] focus:outline-none focus:border-[#B85D2C]"
              />
            </div>

            <div className="flex items-center justify-end space-x-3 pt-3 border-t border-[#E2DDD5]">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 bg-[#FAF8F5] hover:bg-[#E2DDD5] border border-[#D4C8B8] text-xs font-semibold text-[#181F1C] rounded-lg transition-colors"
              >
                Abbrechen
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-[#B85D2C] hover:bg-[#A04E24] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-all shadow-md"
              >
                Eintragen
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}
