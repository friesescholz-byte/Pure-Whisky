import React, { useState } from 'react';
import { Users, Search, Download, Plus, Mail, ShoppingBag, CheckCircle2, Trash2 } from 'lucide-react';

export default function CustomersManager({ 
  customers = [], 
  onAddCustomer, 
  onDeleteCustomer 
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCust, setNewCust] = useState({
    firstName: '',
    lastName: '',
    email: '',
    notes: ''
  });

  const filteredCustomers = customers.filter(c => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) return true;
    return (
      (c.fullName && c.fullName.toLowerCase().includes(term)) ||
      (c.firstName && c.firstName.toLowerCase().includes(term)) ||
      (c.lastName && c.lastName.toLowerCase().includes(term)) ||
      (c.email && c.email.toLowerCase().includes(term))
    );
  });

  const handleExportCsv = () => {
    const headers = ['ID', 'Vorname', 'Nachname', 'Vollstaendiger Name', 'E-Mail', 'Registrierungs-Datum', 'Status', 'Segment'];
    const rows = filteredCustomers.map(c => [
      c.id || '',
      c.firstName || '',
      c.lastName || '',
      c.fullName || `${c.firstName || ''} ${c.lastName || ''}`.trim(),
      c.email || '',
      c.subscribedAt || c.date || '',
      c.listStatus || 'subscribed',
      c.listName || 'WooCommerce Customers'
    ]);

    const csvContent = [headers.join(';'), ...rows.map(r => r.map(val => `"${String(val).replace(/"/g, '""')}"`).join(';'))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `pure_whisky_kunden_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newCust.email) return;

    const created = {
      id: `crm_woo_${Date.now()}`,
      firstName: newCust.firstName.trim(),
      lastName: newCust.lastName.trim(),
      fullName: `${newCust.firstName.trim()} ${newCust.lastName.trim()}`.trim() || newCust.email.split('@')[0],
      email: newCust.email.trim(),
      subscribedAt: new Date().toISOString().replace('T', ' ').slice(0, 19),
      confirmedAt: new Date().toISOString().replace('T', ' ').slice(0, 19),
      listStatus: 'subscribed',
      globalStatus: 'subscribed',
      listName: 'WooCommerce Customers'
    };

    if (onAddCustomer) {
      onAddCustomer(created);
    }
    setNewCust({ firstName: '', lastName: '', email: '', notes: '' });
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6 text-left">
      
      {/* KPI & Summary Header */}
      <div className="bg-white border border-[#D4C8B8] rounded-2xl p-6 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <ShoppingBag className="w-5 h-5 text-[#B85D2C]" />
            <h2 className="font-woodblock text-2xl sm:text-3xl text-[#181F1C] uppercase tracking-wide">
              Shop-Kunden (WooCommerce CRM)
            </h2>
          </div>
          <p className="text-xs text-[#55695E] mt-1">
            Reale Bestandskunden und Käufer aus dem Online-Shop ({customers.length} Kunden erfasst).
          </p>
        </div>

        <div className="flex items-center space-x-3 shrink-0">
          <button
            onClick={() => setShowAddModal(true)}
            className="px-3.5 py-2 bg-white border border-[#D4C8B8] text-xs font-bold text-[#181F1C] hover:bg-[#FAF8F5] rounded-xl flex items-center space-x-1.5 transition-colors shadow-2xs"
          >
            <Plus className="w-3.5 h-3.5 text-[#B85D2C]" />
            <span>Kunde anlegen</span>
          </button>

          <button
            onClick={handleExportCsv}
            className="px-4 py-2 bg-[#181F1C] hover:bg-[#2C3831] text-white text-xs font-bold uppercase tracking-wider rounded-xl flex items-center space-x-2 transition-colors shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>CSV Export ({filteredCustomers.length})</span>
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white border border-[#D4C8B8] rounded-2xl p-4 shadow-2xs">
        <div className="relative">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Kunden nach Name oder E-Mail-Adresse durchsuchen..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-[#D4C8B8] text-xs text-[#181F1C] bg-[#FAF8F5] focus:outline-none focus:border-[#B85D2C]"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-[#D4C8B8] rounded-2xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-[#E2DDD5] bg-[#FAF8F5] text-[#55695E] uppercase font-craft-mono text-[11px] font-bold">
                <th className="py-3 px-4">Kundenname</th>
                <th className="py-3 px-4">E-Mail-Adresse</th>
                <th className="py-3 px-4">Registrierung / Kauf</th>
                <th className="py-3 px-4">Segment</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Aktionen</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#FAF8F5]">
              {filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-12 text-center text-[#55695E]">
                    Keine Kunden gefunden.
                  </td>
                </tr>
              ) : (
                filteredCustomers.map((customer, index) => (
                  <tr key={customer.id || index} className="hover:bg-[#FAF8F5]/80 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-[#181F1C]">
                      {customer.fullName || `${customer.firstName || ''} ${customer.lastName || ''}`.trim() || 'Kunde'}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[#55695E]">
                      {customer.email}
                    </td>
                    <td className="py-3.5 px-4 text-[#78887E] font-craft-mono">
                      {customer.subscribedAt || customer.date || '–'}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded-full bg-[#FAF8F5] border border-[#D4C8B8] text-[10px] text-[#3A4A40] font-medium">
                        WooCommerce
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className="inline-flex items-center space-x-1 text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full text-[10px] font-bold">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>Aktiv</span>
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      {onDeleteCustomer && (
                        <button
                          onClick={() => {
                            if (confirm(`Kunde "${customer.email}" wirklich entfernen?`)) {
                              onDeleteCustomer(customer.email);
                            }
                          }}
                          className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                          title="Löschen"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Add Customer */}
      {showAddModal && (
        <div className="fixed inset-0 z-[110] bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <form onSubmit={handleAddSubmit} className="bg-white border border-[#D4C8B8] rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 text-left">
            <h3 className="font-woodblock text-2xl text-[#181F1C] uppercase">
              Neuen Shop-Kunden anlegen
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-[#55695E] mb-1">Vorname</label>
                <input
                  type="text"
                  value={newCust.firstName}
                  onChange={(e) => setNewCust(prev => ({ ...prev, firstName: e.target.value }))}
                  placeholder="Max"
                  className="w-full text-xs bg-white border border-[#D4C8B8] rounded-lg px-3 py-2 text-[#181F1C] focus:outline-none focus:border-[#B85D2C]"
                />
              </div>
              <div>
                <label className="block text-xs text-[#55695E] mb-1">Nachname</label>
                <input
                  type="text"
                  value={newCust.lastName}
                  onChange={(e) => setNewCust(prev => ({ ...prev, lastName: e.target.value }))}
                  placeholder="Mustermann"
                  className="w-full text-xs bg-white border border-[#D4C8B8] rounded-lg px-3 py-2 text-[#181F1C] focus:outline-none focus:border-[#B85D2C]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-[#55695E] mb-1">E-Mail-Adresse *</label>
              <input
                type="email"
                required
                value={newCust.email}
                onChange={(e) => setNewCust(prev => ({ ...prev, email: e.target.value }))}
                placeholder="kunde@beispiel.de"
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
                Speichern
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}
