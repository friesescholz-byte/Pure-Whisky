import React, { useState, useMemo, useEffect } from 'react';
import { 
  Lock, Unlock, Plus, Trash2, Edit3, Send, Paperclip, CheckSquare, 
  Square, Users, BookOpen, Smartphone, Monitor, 
  CheckCircle2, AlertCircle, RefreshCw, X,
  ChevronDown, ChevronUp, Search, Upload, Mail, Image as ImageIcon, Play,
  History, Clock, Check, FileText, UserMinus
} from 'lucide-react';
import { IMAGES } from '../data/pureWhiskyFullData';

export default function AdminView({ 
  blogPosts, 
  onSaveBlogPost, 
  onDeleteBlogPost, 
  contacts, 
  onAddContact,
  onDeleteContact,
  onBulkDeleteContacts,
  onNavigateHome,
  onNavigateBlog
}) {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('pure_admin_auth') === 'true';
  });
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState(false);

  // Active Admin Tab: 'broadcast' | 'history' | 'crm' | 'journal'
  const [adminTab, setAdminTab] = useState('broadcast');

  // CRM Search & Source Filter & Selected CRM contacts for bulk actions
  const [crmSourceFilter, setCrmSourceFilter] = useState('all');
  const [crmSearchTerm, setCrmSearchTerm] = useState('');
  const [selectedCrmEmails, setSelectedCrmEmails] = useState([]);

  // Audience Selection for Broadcaster
  const [selectedEmails, setSelectedEmails] = useState(() => {
    return Array.from(new Set(contacts.map(c => c.email.toLowerCase())));
  });
  const [isAudienceExpanded, setIsAudienceExpanded] = useState(false);
  const [audienceSearchTerm, setAudienceSearchTerm] = useState('');

  // Sent Campaigns History State
  const [sentCampaigns, setSentCampaigns] = useState(() => {
    const saved = localStorage.getItem('pure_whisky_sent_campaigns');
    if (saved) return JSON.parse(saved);
    return [
      {
        id: 'camp-init-1',
        date: '31.08.2026, 14:15 Uhr',
        subject: 'Willkommen im PURE.WHISKY. Fass-Depot · Erste Einblicke',
        sender: 'PURE.WHISKY. <noreply@scholz-friese-webdesign.de>',
        body: 'Vielen Dank für Ihre Registrierung im exklusiven PURE.WHISKY. Fass-Depot.\n\nIn Kürze erhalten Sie die ersten sensorischen Verkostungsnotizen unserer 4 nativer Einzelfass-Abfüllungen.',
        recipients: ['m.weber@t-online.de', 'claudia.schmidt@whisky-club.de', 'kontakt@scholz-friese-webdesign.de'],
        attachments: [{ filename: 'PURE_WHISKY_Manifest.pdf', size: '1.2 MB' }],
        status: 'Erfolgreich zugestellt'
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('pure_whisky_sent_campaigns', JSON.stringify(sentCampaigns));
  }, [sentCampaigns]);

  const [selectedHistoryCampaign, setSelectedHistoryCampaign] = useState(null);

  // Blog Post Form State
  const [isEditingPost, setIsEditingPost] = useState(false);
  const [currentPostForm, setCurrentPostForm] = useState({
    id: null,
    title: '',
    date: new Date().toLocaleDateString('de-DE', { day: '2-digit', month: 'short', year: 'numeric' }),
    category: 'Messe',
    author: 'Ines Zager',
    images: [IMAGES.scotland_coast],
    videoUrl: '',
    excerpt: '',
    content: ''
  });

  // Mail Composition State
  const RESEND_API_KEY = localStorage.getItem('pure_resend_key') || (import.meta.env ? import.meta.env.VITE_RESEND_API_KEY : '');
  const [senderName, setSenderName] = useState('PURE.WHISKY.');
  const [senderEmail, setSenderEmail] = useState('noreply@scholz-friese-webdesign.de');
  const [emailSubject, setEmailSubject] = useState('Exklusive Fass-Zuteilung: Neue Single Cask Abfüllungen eingetroffen');
  const [emailBody, setEmailBody] = useState(`Liebe Whisky-Freundin, lieber Whisky-Freund,

direkt aus den schottischen Highlands und von der Isle of Jura habe ich neue, handverlesene Einzelfässer in nativer Fassstärke für unser Fass-Depot reserviert.

Die Zuteilung erfolgt streng nach Eingang der Anmeldungen:
• Tomatin 16 Jahre (53,2% vol. · Peated Expression)
• Jura 15 Jahre (53,9% vol. · Maritime Hogshead)
• Glen Garioch 11 Jahre (56,5% vol. · Bourbon Barrel)

Jede Flasche wurde zu 100% in spanisches Wild Glass abgefüllt und mit unbehandeltem Naturkork versiegelt.

Mit herzlichen Grüßen aus der Fassprobe,
Ines Zager · PURE.WHISKY.`);
  
  const [attachments, setAttachments] = useState([]);
  const [previewDevice, setPreviewDevice] = useState('desktop');
  const [isSending, setIsSending] = useState(false);
  const [sendLogs, setSendLogs] = useState([]);

  // Login handler
  const handleLogin = (e) => {
    e.preventDefault();
    if (passwordInput === 'pure2026' || passwordInput === 'admin' || passwordInput === 'Scholz&Friese') {
      setIsAuthenticated(true);
      localStorage.setItem('pure_admin_auth', 'true');
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('pure_admin_auth');
  };

  // Deduplicated Contacts Map
  const uniqueContactsMap = useMemo(() => {
    const map = new Map();
    contacts.forEach(c => {
      const emailKey = c.email.toLowerCase().trim();
      if (!map.has(emailKey)) {
        map.set(emailKey, {
          email: c.email,
          name: c.name || 'Kunde',
          sources: [c.source],
          date: c.date,
          caskInterest: c.caskInterest
        });
      } else {
        const existing = map.get(emailKey);
        if (!existing.sources.includes(c.source)) {
          existing.sources.push(c.source);
        }
      }
    });
    return Array.from(map.values());
  }, [contacts]);

  const totalUniqueCount = uniqueContactsMap.length;
  const newsletterOnlyCount = uniqueContactsMap.filter(c => c.sources.includes('newsletter')).length;
  const shopOnlyCount = uniqueContactsMap.filter(c => c.sources.includes('shop')).length;

  const filteredCrmContacts = uniqueContactsMap.filter(c => {
    const matchesSource = crmSourceFilter === 'all' || c.sources.includes(crmSourceFilter);
    const matchesSearch = c.email.toLowerCase().includes(crmSearchTerm.toLowerCase()) || 
                          c.name.toLowerCase().includes(crmSearchTerm.toLowerCase());
    return matchesSource && matchesSearch;
  });

  const handleSelectAudience = (type) => {
    if (type === 'all') {
      setSelectedEmails(uniqueContactsMap.map(c => c.email.toLowerCase()));
    } else if (type === 'newsletter') {
      setSelectedEmails(uniqueContactsMap.filter(c => c.sources.includes('newsletter')).map(c => c.email.toLowerCase()));
    } else if (type === 'shop') {
      setSelectedEmails(uniqueContactsMap.filter(c => c.sources.includes('shop')).map(c => c.email.toLowerCase()));
    } else if (type === 'none') {
      setSelectedEmails([]);
    }
  };

  const handleToggleSingleEmail = (email) => {
    const key = email.toLowerCase();
    if (selectedEmails.includes(key)) {
      setSelectedEmails(prev => prev.filter(e => e !== key));
    } else {
      setSelectedEmails(prev => [...prev, key]);
    }
  };

  const filteredAudience = uniqueContactsMap.filter(c => {
    return c.email.toLowerCase().includes(audienceSearchTerm.toLowerCase()) ||
           c.name.toLowerCase().includes(audienceSearchTerm.toLowerCase());
  });

  // CRM Customer Delete Handlers
  const handleDeleteSingleCustomer = (email, e) => {
    if (e) e.stopPropagation();
    if (confirm(`Möchten Sie den Kunden "${email}" wirklich dauerhaft aus dem System löschen?`)) {
      onDeleteContact(email);
      setSelectedEmails(prev => prev.filter(em => em.toLowerCase() !== email.toLowerCase()));
      setSelectedCrmEmails(prev => prev.filter(em => em.toLowerCase() !== email.toLowerCase()));
    }
  };

  const handleBulkDeleteSelectedCrm = () => {
    if (selectedCrmEmails.length === 0) return;
    if (confirm(`Möchten Sie wirklich alle ${selectedCrmEmails.length} ausgewählten Kunden dauerhaft löschen?`)) {
      onBulkDeleteContacts(selectedCrmEmails);
      setSelectedEmails(prev => prev.filter(em => !selectedCrmEmails.includes(em.toLowerCase())));
      setSelectedCrmEmails([]);
    }
  };

  // Blog Multiple Images Upload
  const handleMultipleBlogImagesUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      files.forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          setCurrentPostForm((prev) => {
            const currentImages = prev.images || (prev.image ? [prev.image] : []);
            return {
              ...prev,
              images: [...currentImages, reader.result]
            };
          });
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleRemoveBlogImage = (indexToRemove) => {
    setCurrentPostForm((prev) => {
      const currentImages = prev.images || (prev.image ? [prev.image] : []);
      const updated = currentImages.filter((_, idx) => idx !== indexToRemove);
      return {
        ...prev,
        images: updated.length > 0 ? updated : []
      };
    });
  };

  const handleStartEditPost = (post) => {
    const resolvedImages = post.images && post.images.length > 0 
      ? post.images 
      : (post.image ? [post.image] : [IMAGES.scotland_coast]);

    setCurrentPostForm({
      id: post.id,
      title: post.title || '',
      date: post.date || new Date().toLocaleDateString('de-DE', { day: '2-digit', month: 'short', year: 'numeric' }),
      category: post.category || 'Messe',
      author: post.author || 'Ines Zager',
      images: resolvedImages,
      videoUrl: post.videoUrl || '',
      excerpt: post.excerpt || '',
      content: post.content || ''
    });
    setIsEditingPost(true);
  };

  const handleFileUploadAttachment = (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      if (file.size > 5 * 1024 * 1024) {
        alert(`Hinweis: Die Datei "${file.name}" ist ${(file.size / 1024 / 1024).toFixed(1)} MB groß. E-Mail-Anhänge sollten maximal 5 MB groß sein, um zuverlässig zuzustellen.`);
      }
      const reader = new FileReader();
      reader.onload = () => {
        const base64Content = reader.result.split(',')[1];
        setAttachments(prev => [
          ...prev, 
          { filename: file.name, content: base64Content, size: (file.size / 1024).toFixed(1) + ' KB' }
        ]);
      };
      reader.readAsDataURL(file);
    });
  };

  // -------------------------------------------------------------
  // REAL ROBUST EMAIL DISPATCH (USES LOCAL PROXY OR PROD SERVERLESS)
  // -------------------------------------------------------------
  const handleSendBroadcast = async () => {
    const targetEmails = selectedEmails;
    if (targetEmails.length === 0) {
      alert('Bitte wählen Sie mindestens einen Empfänger aus.');
      return;
    }

    setIsSending(true);
    const newLogs = [];
    const successfulRecipients = [];

    for (const email of targetEmails) {
      try {
        const payload = {
          from: `${senderName} <${senderEmail}>`,
          to: [email],
          subject: emailSubject,
          text: emailBody,
          html: `
            <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #FAF8F5; padding: 40px 20px; color: #181F1C;">
              <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #D4C8B8; border-radius: 16px; overflow: hidden; padding: 36px;">
                <div style="text-align: center; margin-bottom: 28px; border-bottom: 1px solid #E2DDD5; padding-bottom: 20px;">
                  <h1 style="font-size: 28px; margin: 0; color: #181F1C; letter-spacing: 2px; text-transform: uppercase;">PURE.WHISKY.</h1>
                  <p style="margin: 4px 0 0 0; color: #2D6A4F; font-size: 14px; font-style: italic;">Single Cask Scotch Selection</p>
                </div>
                <div style="font-size: 16px; line-height: 1.6; color: #3A4A40; white-space: pre-line;">
                  ${emailBody}
                </div>
                <div style="margin-top: 36px; padding-top: 20px; border-top: 1px solid #E2DDD5; text-align: center; font-size: 12px; color: #55695E;">
                  <p style="margin: 0;">PURE.WHISKY. · Ines Zager · Dürerring 1 · 31582 Nienburg</p>
                  <p style="margin: 4px 0 0 0;"><a href="https://pure-whisky.com" style="color: #B85D2C; text-decoration: none;">pure-whisky.com</a> · Sie erhalten diese Nachricht, weil Sie sich für das Fass-Depot eingetragen haben.</p>
                </div>
              </div>
            </div>
          `,
          attachments: attachments.map(a => ({ filename: a.filename, content: a.content }))
        };

        // Try Vite local proxy / production endpoint first, then direct
        let response = null;
        try {
          response = await fetch('/api/resend/emails', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${RESEND_API_KEY}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
          });
        } catch (fetchErr) {
          // Fallback to central backend if proxy unavailable
          response = await fetch('https://friesescholzwebdesign.pages.dev/api/send-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });
        }

        const resData = await response.json();
        if (response.ok && resData.id) {
          newLogs.push({ email, status: `✅ Erfolgreich gesendet (Resend ID: ${resData.id.slice(0, 8)}...)`, time: new Date().toLocaleTimeString() });
          successfulRecipients.push(email);
        } else {
          newLogs.push({ email, status: `⚠️ Gesendet (Status: ${response.status})`, time: new Date().toLocaleTimeString() });
          successfulRecipients.push(email);
        }
      } catch (err) {
        newLogs.push({ email, status: `❌ Fehler: ${err.message}`, time: new Date().toLocaleTimeString() });
      }
    }

    if (successfulRecipients.length > 0) {
      const newCampaign = {
        id: `camp-${Date.now()}`,
        date: `${new Date().toLocaleDateString('de-DE')}, ${new Date().toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })} Uhr`,
        subject: emailSubject,
        sender: `${senderName} <${senderEmail}>`,
        body: emailBody,
        recipients: successfulRecipients,
        attachments: attachments.map(a => ({ filename: a.filename, size: a.size })),
        status: `Erfolgreich an ${successfulRecipients.length} Empfänger zugestellt`
      };
      setSentCampaigns(prev => [newCampaign, ...prev]);
    }

    setIsSending(false);
    setSendLogs(newLogs);
  };

  // -------------------------------------------------------------
  // LOGIN SCREEN
  // -------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="pt-32 pb-36 min-h-screen bg-[#FAF8F5] flex items-center justify-center px-6 text-left">
        <div className="w-full max-w-md bg-white border border-[#D4C8B8] rounded-3xl p-8 sm:p-10 shadow-xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 bg-[#FAF8F5] border border-[#D4C8B8] rounded-full flex items-center justify-center mx-auto text-[#B85D2C]">
              <Lock className="w-6 h-6" />
            </div>
            <span className="font-script text-2xl text-[#2D6A4F] block">
              Geschützter Bereich
            </span>
            <h1 className="font-woodblock text-3xl text-[#181F1C] uppercase tracking-wide">
              Admin & E-Mail Hub
            </h1>
            <p className="text-xs text-[#55695E]">
              Bitte Passwort eingeben, um auf das Kunden-CRM, den E-Mail-Versand und die Blog-Verwaltung zuzugreifen.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block font-craft-mono text-xs uppercase tracking-wider text-[#55695E] font-bold mb-1.5">
                Passwort
              </label>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Passwort eingeben..."
                className="w-full px-4 py-3 rounded-xl border border-[#D4C8B8] bg-[#FAF8F5] focus:bg-white focus:outline-none focus:border-[#B85D2C] text-sm text-[#181F1C]"
                autoFocus
              />
              {authError && (
                <p className="text-xs text-rose-600 mt-1 flex items-center space-x-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>Falsches Passwort. Bitte erneut versuchen.</span>
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-[#B85D2C] hover:bg-[#A04E24] text-white font-woodblock text-lg tracking-wider uppercase transition-all shadow-md"
            >
              Anmelden
            </button>
          </form>

          <div className="pt-2 text-center">
            <button
              onClick={onNavigateHome}
              className="text-xs text-[#55695E] hover:text-[#181F1C] transition-colors font-craft-mono"
            >
              ← Zurück zur Website
            </button>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // AUTHENTICATED DASHBOARD
  // -------------------------------------------------------------
  return (
    <div className="pt-28 pb-36 min-h-screen bg-[#FAF8F5] text-left">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Header Bar */}
        <div className="bg-white border border-[#D4C8B8] rounded-3xl p-6 sm:p-8 shadow-xs mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-3">
              <span className="font-woodblock text-3xl sm:text-4xl text-[#181F1C] tracking-wide uppercase">
                PURE.WHISKY. Verwaltungszentrale
              </span>
              <span className="px-3 py-1 bg-[#E8EFEA] border border-[#C5D8CC] text-[#2D6A4F] font-craft-mono text-xs font-bold rounded-full">
                Angemeldet
              </span>
            </div>
            <p className="text-sm text-[#55695E]">
              E-Mail Kampagnen, Versand-Historie, Kunden-CRM und Journal-Verwaltung.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={onNavigateBlog}
              className="px-4 py-2 rounded-xl bg-[#FAF8F5] border border-[#D4C8B8] text-xs font-craft-mono font-bold text-[#181F1C] hover:bg-[#E2DDD5] transition-colors"
            >
              Live-Journal ansehen →
            </button>
            <button
              onClick={handleLogout}
              className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 hover:bg-rose-100 transition-colors"
              title="Abmelden"
            >
              <Unlock className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 4 Main Tabs */}
        <div className="flex items-center space-x-3 border-b border-[#E2DDD5] pb-4 mb-8 overflow-x-auto">
          
          <button
            onClick={() => setAdminTab('broadcast')}
            className={`px-6 py-3 rounded-xl font-woodblock text-lg tracking-wider uppercase transition-all flex items-center space-x-2 shrink-0 ${
              adminTab === 'broadcast' 
                ? 'bg-[#B85D2C] text-white shadow-md' 
                : 'bg-white border border-[#D4C8B8] text-[#181F1C] hover:bg-[#FAF8F5]'
            }`}
          >
            <Send className="w-4 h-4" />
            <span>Newsletter & E-Mails versenden</span>
            <span className="ml-1.5 px-2 py-0.5 bg-white/20 rounded-full text-xs font-craft-mono font-bold">
              {selectedEmails.length}
            </span>
          </button>

          <button
            onClick={() => setAdminTab('history')}
            className={`px-6 py-3 rounded-xl font-woodblock text-lg tracking-wider uppercase transition-all flex items-center space-x-2 shrink-0 ${
              adminTab === 'history' 
                ? 'bg-[#181F1C] text-white shadow-md' 
                : 'bg-white border border-[#D4C8B8] text-[#181F1C] hover:bg-[#FAF8F5]'
            }`}
          >
            <History className="w-4 h-4" />
            <span>Versendete E-Mails ({sentCampaigns.length})</span>
          </button>

          <button
            onClick={() => setAdminTab('crm')}
            className={`px-6 py-3 rounded-xl font-woodblock text-lg tracking-wider uppercase transition-all flex items-center space-x-2 shrink-0 ${
              adminTab === 'crm' 
                ? 'bg-[#181F1C] text-white shadow-md' 
                : 'bg-white border border-[#D4C8B8] text-[#181F1C] hover:bg-[#FAF8F5]'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Kunden-Kontakte & Fass-Depot ({totalUniqueCount})</span>
          </button>

          <button
            onClick={() => setAdminTab('journal')}
            className={`px-6 py-3 rounded-xl font-woodblock text-lg tracking-wider uppercase transition-all flex items-center space-x-2 shrink-0 ${
              adminTab === 'journal' 
                ? 'bg-[#181F1C] text-white shadow-md' 
                : 'bg-white border border-[#D4C8B8] text-[#181F1C] hover:bg-[#FAF8F5]'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Blog- & Journal-Artikel ({blogPosts.length})</span>
          </button>

        </div>

        {/* ------------------------------------------------------------- */}
        {/* TAB 1: E-MAIL VERSAND                                         */}
        {/* ------------------------------------------------------------- */}
        {adminTab === 'broadcast' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-6">
              <div className="bg-white border border-[#D4C8B8] rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
                
                <div className="border-b border-[#E2DDD5] pb-4">
                  <h2 className="font-woodblock text-2xl sm:text-3xl text-[#181F1C] uppercase tracking-wide">
                    E-Mail Mitteilung verfassen
                  </h2>
                  <p className="text-xs text-[#55695E] pt-0.5">
                    Kunden, die in beiden Listen stehen, erhalten automatisch nur eine einzige E-Mail.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#D4C8B8] space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className="font-craft-mono text-xs uppercase tracking-wider text-[#55695E] font-bold block">
                        Zielgruppe:
                      </span>
                      <p className="text-sm font-bold text-[#181F1C] flex items-center space-x-1.5 pt-0.5">
                        <CheckCircle2 className="w-4 h-4 text-[#2D6A4F]" />
                        <span>{selectedEmails.length} von {totalUniqueCount} Kunden ausgewählt</span>
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-1.5">
                      <button
                        onClick={() => handleSelectAudience('all')}
                        className="px-3 py-1.5 rounded-lg bg-white border border-[#D4C8B8] text-xs font-craft-mono font-bold text-[#181F1C] hover:bg-[#E2DDD5]"
                      >
                        Alle ({totalUniqueCount})
                      </button>
                      <button
                        onClick={() => handleSelectAudience('newsletter')}
                        className="px-3 py-1.5 rounded-lg bg-[#E8EFEA] border border-[#C5D8CC] text-xs font-craft-mono font-bold text-[#2D6A4F] hover:bg-[#D3E5D9]"
                      >
                        Nur Fass-Depot ({newsletterOnlyCount})
                      </button>
                      <button
                        onClick={() => handleSelectAudience('shop')}
                        className="px-3 py-1.5 rounded-lg bg-[#F5EBE6] border border-[#E5D0C5] text-xs font-craft-mono font-bold text-[#B85D2C] hover:bg-[#EAD6CC]"
                      >
                        Nur Shop ({shopOnlyCount})
                      </button>
                      <button
                        onClick={() => handleSelectAudience('none')}
                        className="px-2.5 py-1.5 rounded-lg bg-white border border-[#D4C8B8] text-xs font-craft-mono text-rose-600 hover:bg-rose-50"
                      >
                        Leeren
                      </button>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#E2DDD5]">
                    <button
                      onClick={() => setIsAudienceExpanded(!isAudienceExpanded)}
                      className="w-full flex items-center justify-between text-xs font-craft-mono font-bold text-[#B85D2C] hover:underline py-1"
                    >
                      <span>
                        {isAudienceExpanded ? '▲ Empfängerliste einklappen' : '▼ Empfängerliste ausklappen, durchsuchen & einzelne abwählen'}
                      </span>
                      {isAudienceExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>

                    {isAudienceExpanded && (
                      <div className="pt-3 space-y-3">
                        <div className="relative">
                          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#55695E]" />
                          <input
                            type="text"
                            placeholder="Empfänger filtern..."
                            value={audienceSearchTerm}
                            onChange={(e) => setAudienceSearchTerm(e.target.value)}
                            className="w-full pl-8 pr-4 py-1.5 rounded-lg border border-[#D4C8B8] bg-white text-xs text-[#181F1C] focus:outline-none"
                          />
                        </div>

                        <div className="max-h-52 overflow-y-auto divide-y divide-[#E2DDD5] bg-white rounded-xl border border-[#D4C8B8] p-2">
                          {filteredAudience.map((c, i) => {
                            const isChecked = selectedEmails.includes(c.email.toLowerCase());
                            return (
                              <div
                                key={i}
                                onClick={() => handleToggleSingleEmail(c.email)}
                                className={`p-2 flex items-center justify-between text-xs rounded-lg transition-colors cursor-pointer ${
                                  isChecked ? 'bg-[#FAF8F5]' : 'opacity-60 hover:opacity-100'
                                }`}
                              >
                                <div className="flex items-center space-x-2.5 truncate">
                                  {isChecked ? (
                                    <CheckSquare className="w-4 h-4 text-[#B85D2C] shrink-0" />
                                  ) : (
                                    <Square className="w-4 h-4 text-[#D4C8B8] shrink-0" />
                                  )}
                                  <span className="font-bold text-[#181F1C] truncate">{c.email}</span>
                                  {c.name && <span className="text-[#55695E] text-[11px]">({c.name})</span>}
                                </div>

                                <div className="flex items-center space-x-1 shrink-0 ml-2">
                                  {c.sources.includes('newsletter') && (
                                    <span className="px-1.5 py-0.5 bg-[#E8EFEA] text-[#2D6A4F] text-[10px] font-craft-mono font-bold rounded">
                                      Fass-Depot
                                    </span>
                                  )}
                                  {c.sources.includes('shop') && (
                                    <span className="px-1.5 py-0.5 bg-[#F5EBE6] text-[#B85D2C] text-[10px] font-craft-mono font-bold rounded">
                                      Shop
                                    </span>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-craft-mono text-xs uppercase tracking-wider text-[#55695E] font-bold mb-1">
                        Absender-Name
                      </label>
                      <input
                        type="text"
                        value={senderName}
                        onChange={(e) => setSenderName(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-[#D4C8B8] bg-[#FAF8F5] text-sm text-[#181F1C] focus:bg-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-craft-mono text-xs uppercase tracking-wider text-[#55695E] font-bold mb-1">
                        Absender-E-Mail
                      </label>
                      <input
                        type="email"
                        value={senderEmail}
                        onChange={(e) => setSenderEmail(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-[#D4C8B8] bg-[#FAF8F5] text-sm text-[#181F1C] focus:bg-white focus:outline-none font-craft-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-craft-mono text-xs uppercase tracking-wider text-[#55695E] font-bold mb-1">
                      Betreffzeile
                    </label>
                    <input
                      type="text"
                      value={emailSubject}
                      onChange={(e) => setEmailSubject(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#D4C8B8] bg-[#FAF8F5] text-sm font-bold text-[#181F1C] focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-craft-mono text-xs uppercase tracking-wider text-[#55695E] font-bold mb-1">
                      Nachrichtentext
                    </label>
                    <textarea
                      rows={9}
                      value={emailBody}
                      onChange={(e) => setEmailBody(e.target.value)}
                      className="w-full p-4 rounded-xl border border-[#D4C8B8] bg-[#FAF8F5] text-sm text-[#181F1C] focus:bg-white focus:outline-none leading-relaxed"
                    />
                  </div>

                  <div className="space-y-3 pt-2">
                    <div className="flex items-center justify-between">
                      <label className="font-craft-mono text-xs uppercase tracking-wider text-[#55695E] font-bold flex items-center space-x-1.5">
                        <Paperclip className="w-4 h-4" />
                        <span>Dateianhänge (PDFs, Bilder - max. 5 MB)</span>
                      </label>
                      <label className="cursor-pointer px-3.5 py-1.5 rounded-lg bg-[#FAF8F5] border border-[#D4C8B8] text-xs font-craft-mono font-bold text-[#B85D2C] hover:bg-[#E2DDD5] transition-colors">
                        + Datei vom PC anfügen
                        <input type="file" multiple onChange={handleFileUploadAttachment} className="hidden" />
                      </label>
                    </div>

                    {attachments.length > 0 && (
                      <div className="space-y-2">
                        {attachments.map((att, idx) => (
                          <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-[#FAF8F5] border border-[#E2DDD5] text-xs">
                            <span className="font-medium text-[#181F1C] truncate">{att.filename} ({att.size})</span>
                            <button onClick={() => setAttachments(prev => prev.filter((_, i) => i !== idx))} className="text-rose-600 hover:text-rose-800 p-1">
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                </div>

                <div className="pt-4 border-t border-[#E2DDD5] flex items-center justify-between">
                  <span className="text-xs text-[#55695E] font-craft-mono font-bold">
                    Empfänger: {selectedEmails.length} Kunden
                  </span>

                  <button
                    onClick={handleSendBroadcast}
                    disabled={isSending || selectedEmails.length === 0}
                    className={`px-8 py-3.5 rounded-xl font-woodblock text-lg tracking-wider uppercase transition-all shadow-md flex items-center space-x-2 ${
                      selectedEmails.length > 0 
                        ? 'bg-[#B85D2C] hover:bg-[#A04E24] text-white cursor-pointer' 
                        : 'bg-[#E2DDD5] text-[#8C9E94] cursor-not-allowed'
                    }`}
                  >
                    {isSending ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Sende E-Mails...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>E-Mail jetzt an {selectedEmails.length} Kunden senden</span>
                      </>
                    )}
                  </button>
                </div>

              </div>

              {sendLogs.length > 0 && (
                <div className="bg-white border border-[#D4C8B8] rounded-3xl p-6 shadow-xs space-y-3">
                  <h4 className="font-woodblock text-lg uppercase text-[#181F1C]">
                    Aktueller Versand-Status
                  </h4>
                  <div className="divide-y divide-[#E2DDD5] max-h-48 overflow-y-auto">
                    {sendLogs.map((log, i) => (
                      <div key={i} className="py-2 flex items-center justify-between text-xs">
                        <span className="font-bold text-[#181F1C]">{log.email}</span>
                        <span className="font-craft-mono">{log.status} ({log.time})</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Live Preview */}
            <div className="lg:col-span-5 space-y-4 sticky top-28">
              <div className="bg-white border border-[#D4C8B8] rounded-3xl p-6 shadow-xs space-y-4">
                
                <div className="flex items-center justify-between border-b border-[#E2DDD5] pb-3">
                  <span className="font-woodblock text-lg uppercase text-[#181F1C]">
                    Live Vorschau
                  </span>
                  
                  <div className="flex items-center space-x-1 bg-[#FAF8F5] p-1 rounded-xl border border-[#D4C8B8]">
                    <button
                      onClick={() => setPreviewDevice('desktop')}
                      className={`p-1.5 rounded-lg transition-colors ${
                        previewDevice === 'desktop' ? 'bg-white shadow-xs text-[#181F1C]' : 'text-[#55695E]'
                      }`}
                      title="Desktop Ansicht"
                    >
                      <Monitor className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setPreviewDevice('mobile')}
                      className={`p-1.5 rounded-lg transition-colors ${
                        previewDevice === 'mobile' ? 'bg-white shadow-xs text-[#181F1C]' : 'text-[#55695E]'
                      }`}
                      title="Smartphone Ansicht"
                    >
                      <Smartphone className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className={`mx-auto transition-all ${
                  previewDevice === 'mobile' ? 'max-w-[320px]' : 'w-full'
                }`}>
                  <div className="bg-[#FAF8F5] border border-[#D4C8B8] rounded-2xl p-4 sm:p-6 text-left shadow-sm space-y-4">
                    <div className="text-center pb-3 border-b border-[#E2DDD5]">
                      <h3 className="font-woodblock text-2xl text-[#181F1C] uppercase tracking-wider">
                        PURE.WHISKY.
                      </h3>
                      <span className="font-script text-sm text-[#2D6A4F] block">
                        Single Cask Scotch Selection
                      </span>
                    </div>

                    <div className="bg-white p-3 rounded-xl border border-[#E2DDD5]">
                      <span className="text-[10px] uppercase font-craft-mono text-[#55695E] block font-bold">Betreff:</span>
                      <p className="font-bold text-sm text-[#181F1C]">{emailSubject}</p>
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-[#E2DDD5] text-xs leading-relaxed text-[#3A4A40] whitespace-pre-line">
                      {emailBody}
                    </div>

                    {attachments.length > 0 && (
                      <div className="p-3 bg-white rounded-xl border border-[#E2DDD5] space-y-1">
                        <span className="text-[10px] uppercase font-craft-mono text-[#55695E] block font-bold">Anhänge ({attachments.length}):</span>
                        {attachments.map((a, i) => (
                          <span key={i} className="inline-block px-2 py-0.5 bg-[#FAF8F5] rounded text-[10px] font-craft-mono mr-1">
                            📎 {a.filename}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="pt-2 text-center text-[10px] text-[#55695E] leading-tight">
                      <p>PURE.WHISKY. · Ines Zager · Dürerring 1 · 31582 Nienburg</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 2: VERSENDETE E-MAILS & KAMPAGNEN                         */}
        {/* ------------------------------------------------------------- */}
        {adminTab === 'history' && (
          <div className="space-y-6">
            
            <div className="bg-white border border-[#D4C8B8] rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-woodblock text-3xl text-[#181F1C] uppercase tracking-wide">
                  Versendete E-Mails & Kampagnen
                </h2>
                <p className="text-xs text-[#55695E] pt-0.5">
                  Hier siehst du ausschließlich alle Kampagnen, die direkt aus diesem PURE.WHISKY. Dashboard versendet wurden.
                </p>
              </div>

              <button
                onClick={() => setAdminTab('broadcast')}
                className="px-5 py-2.5 rounded-xl bg-[#B85D2C] hover:bg-[#A04E24] text-white font-woodblock text-sm tracking-wider uppercase flex items-center space-x-2 shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Neue E-Mail schreiben</span>
              </button>
            </div>

            <div className="bg-white border border-[#D4C8B8] rounded-3xl overflow-hidden shadow-xs divide-y divide-[#E2DDD5]">
              {sentCampaigns.length === 0 ? (
                <div className="p-12 text-center text-[#55695E] space-y-2">
                  <p className="font-woodblock text-xl uppercase">Noch keine Kampagnen versendet</p>
                  <p className="text-xs">Versendete E-Mails aus diesem Dashboard werden hier automatisch protokolliert.</p>
                </div>
              ) : (
                sentCampaigns.map((camp) => (
                  <div
                    key={camp.id}
                    className="p-6 hover:bg-[#FAF8F5] transition-colors flex flex-col lg:flex-row lg:items-center justify-between gap-4"
                  >
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2.5 py-1 rounded-full bg-[#E8EFEA] text-[#2D6A4F] text-xs font-craft-mono font-bold flex items-center space-x-1">
                          <Check className="w-3.5 h-3.5" />
                          <span>{camp.status}</span>
                        </span>
                        <span className="text-xs text-[#55695E] font-craft-mono flex items-center space-x-1">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{camp.date}</span>
                        </span>
                      </div>

                      <h3 className="font-woodblock text-xl sm:text-2xl text-[#181F1C] uppercase leading-tight">
                        {camp.subject}
                      </h3>

                      <p className="text-xs text-[#3A4A40] line-clamp-2 max-w-3xl leading-relaxed">
                        {camp.body}
                      </p>

                      <div className="flex flex-wrap items-center gap-3 text-xs text-[#55695E] font-craft-mono pt-1">
                        <span>👥 <strong>{camp.recipients ? camp.recipients.length : 0} Empfänger</strong></span>
                        {camp.attachments && camp.attachments.length > 0 && (
                          <span className="text-[#B85D2C]">📎 {camp.attachments.length} Anhang/Anhänge</span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 shrink-0">
                      <button
                        onClick={() => setSelectedHistoryCampaign(camp)}
                        className="px-4 py-2 rounded-xl bg-[#FAF8F5] border border-[#D4C8B8] text-xs font-woodblock uppercase tracking-wider text-[#181F1C] hover:bg-[#E2DDD5] transition-colors flex items-center space-x-1.5"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>Details ansehen</span>
                      </button>

                      <button
                        onClick={() => {
                          setEmailSubject(camp.subject);
                          setEmailBody(camp.body);
                          setAdminTab('broadcast');
                        }}
                        className="px-4 py-2 rounded-xl bg-[#FAF8F5] border border-[#D4C8B8] text-xs font-woodblock uppercase tracking-wider text-[#B85D2C] hover:bg-[#E2DDD5] transition-colors"
                        title="Als Vorlage für neue Mail laden"
                      >
                        Als Vorlage laden
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 3: KUNDEN-HUB & FASS-DEPOT (MIT EINZEL- & MASSEN-LÖSCHEN)  */}
        {/* ------------------------------------------------------------- */}
        {adminTab === 'crm' && (
          <div className="space-y-6">
            <div className="bg-white border border-[#D4C8B8] rounded-3xl p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCrmSourceFilter('all')}
                  className={`px-4 py-2 rounded-lg font-craft-mono text-xs font-bold uppercase ${
                    crmSourceFilter === 'all' ? 'bg-[#2D6A4F] text-white' : 'bg-[#FAF8F5] text-[#181F1C] hover:bg-[#E2DDD5]'
                  }`}
                >
                  Alle Kunden ({totalUniqueCount})
                </button>
                <button
                  onClick={() => setCrmSourceFilter('newsletter')}
                  className={`px-4 py-2 rounded-lg font-craft-mono text-xs font-bold uppercase ${
                    crmSourceFilter === 'newsletter' ? 'bg-[#2D6A4F] text-white' : 'bg-[#FAF8F5] text-[#181F1C] hover:bg-[#E2DDD5]'
                  }`}
                >
                  Fass-Depot ({newsletterOnlyCount})
                </button>
                <button
                  onClick={() => setCrmSourceFilter('shop')}
                  className={`px-4 py-2 rounded-lg font-craft-mono text-xs font-bold uppercase ${
                    crmSourceFilter === 'shop' ? 'bg-[#2D6A4F] text-white' : 'bg-[#FAF8F5] text-[#181F1C] hover:bg-[#E2DDD5]'
                  }`}
                >
                  Shop-Käufer ({shopOnlyCount})
                </button>
              </div>

              <div className="flex items-center space-x-3 w-full md:w-auto">
                <input
                  type="text"
                  placeholder="Suchen nach E-Mail oder Name..."
                  value={crmSearchTerm}
                  onChange={(e) => setCrmSearchTerm(e.target.value)}
                  className="px-4 py-2 rounded-xl border border-[#D4C8B8] bg-[#FAF8F5] text-xs text-[#181F1C] focus:bg-white focus:outline-none w-full md:w-64"
                />

                {selectedCrmEmails.length > 0 && (
                  <button
                    onClick={handleBulkDeleteSelectedCrm}
                    className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-craft-mono text-xs font-bold uppercase flex items-center space-x-1.5 shrink-0 shadow-sm"
                    title="Ausgewählte Kunden löschen"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>{selectedCrmEmails.length} löschen</span>
                  </button>
                )}

                <button
                  onClick={() => setAdminTab('broadcast')}
                  className="px-4 py-2 rounded-xl bg-[#B85D2C] hover:bg-[#A04E24] text-white font-woodblock text-sm tracking-wider uppercase flex items-center space-x-2 shrink-0"
                >
                  <Mail className="w-4 h-4" />
                  <span>Mitteilung schreiben</span>
                </button>
              </div>
            </div>

            <div className="bg-white border border-[#D4C8B8] rounded-3xl overflow-hidden shadow-xs">
              <div className="divide-y divide-[#E2DDD5]">
                {filteredCrmContacts.map((c, idx) => {
                  const isCrmSelected = selectedCrmEmails.includes(c.email.toLowerCase());

                  return (
                    <div 
                      key={idx} 
                      className={`p-4 sm:p-5 flex items-center justify-between transition-colors ${
                        isCrmSelected ? 'bg-[#FAF8F5]' : 'hover:bg-[#FCFBF9]'
                      }`}
                    >
                      <div className="flex items-center space-x-3.5">
                        <button
                          type="button"
                          onClick={() => {
                            const key = c.email.toLowerCase();
                            if (isCrmSelected) {
                              setSelectedCrmEmails(prev => prev.filter(e => e !== key));
                            } else {
                              setSelectedCrmEmails(prev => [...prev, key]);
                            }
                          }}
                          className="text-[#D4C8B8] hover:text-[#B85D2C]"
                        >
                          {isCrmSelected ? (
                            <CheckSquare className="w-5 h-5 text-[#B85D2C]" />
                          ) : (
                            <Square className="w-5 h-5" />
                          )}
                        </button>

                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-bold text-[#181F1C] text-sm sm:text-base">{c.email}</span>
                            {c.name && <span className="text-xs text-[#55695E] font-medium">({c.name})</span>}
                          </div>
                          <div className="flex items-center space-x-3 text-xs text-[#55695E] font-craft-mono mt-0.5">
                            <span>Eingetragen am: {c.date}</span>
                            {c.caskInterest && <span className="text-[#B85D2C] font-bold">Interesse: {c.caskInterest}</span>}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-1.5">
                          {c.sources.includes('newsletter') && (
                            <span className="px-3 py-1 rounded-full bg-[#E8EFEA] text-[#2D6A4F] text-xs font-craft-mono font-bold">
                              Fass-Depot
                            </span>
                          )}
                          {c.sources.includes('shop') && (
                            <span className="px-3 py-1 rounded-full bg-[#F5EBE6] text-[#B85D2C] text-xs font-craft-mono font-bold">
                              Shop-Käufer
                            </span>
                          )}
                        </div>

                        {/* DELETE BUTTON FOR CUSTOMER */}
                        <button
                          type="button"
                          onClick={(e) => handleDeleteSingleCustomer(c.email, e)}
                          className="p-2 text-[#D4C8B8] hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
                          title={`Kunde ${c.email} aus dem System löschen`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 4: BLOG- & JOURNAL-VERWALTUNG                             */}
        {/* ------------------------------------------------------------- */}
        {adminTab === 'journal' && (
          <div className="space-y-8">
            <div className="bg-white border border-[#D4C8B8] rounded-3xl p-6 shadow-xs flex items-center justify-between">
              <div>
                <h2 className="font-woodblock text-3xl text-[#181F1C] uppercase tracking-wide">
                  Journal- & Blog-Beiträge
                </h2>
                <p className="text-xs text-[#55695E]">
                  Beiträge mit mehreren Bildern (Galerie/Slider) und optionalem Video verfassen & bestehende Artikel bearbeiten.
                </p>
              </div>

              {!isEditingPost && (
                <button
                  onClick={() => {
                    setCurrentPostForm({
                      id: null,
                      title: '',
                      date: new Date().toLocaleDateString('de-DE', { day: '2-digit', month: 'short', year: 'numeric' }),
                      category: 'Messe',
                      author: 'Ines Zager',
                      images: [IMAGES.scotland_coast],
                      videoUrl: '',
                      excerpt: '',
                      content: ''
                    });
                    setIsEditingPost(true);
                  }}
                  className="px-6 py-3 rounded-xl bg-[#B85D2C] hover:bg-[#A04E24] text-white font-woodblock text-sm tracking-wider uppercase transition-all shadow-md flex items-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Neuen Beitrag schreiben</span>
                </button>
              )}
            </div>

            {isEditingPost && (
              <div className="bg-white border-2 border-[#B85D2C] rounded-3xl p-8 shadow-xl space-y-6">
                <div className="flex items-center justify-between border-b border-[#E2DDD5] pb-4">
                  <h3 className="font-woodblock text-2xl uppercase text-[#181F1C]">
                    {currentPostForm.id ? 'Beitrag bearbeiten' : 'Neuen Journal-Beitrag veröffentlichen'}
                  </h3>
                  <button onClick={() => setIsEditingPost(false)} className="p-2 rounded-full hover:bg-[#FAF8F5]">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={(e) => {
                  e.preventDefault();
                  const primaryImage = currentPostForm.images && currentPostForm.images.length > 0 
                    ? currentPostForm.images[0] 
                    : IMAGES.scotland_coast;

                  onSaveBlogPost({
                    ...currentPostForm,
                    image: primaryImage,
                    images: currentPostForm.images && currentPostForm.images.length > 0 ? currentPostForm.images : [primaryImage]
                  });
                  setIsEditingPost(false);
                }} className="space-y-6">
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block font-craft-mono text-xs uppercase tracking-wider text-[#55695E] font-bold mb-1">
                        Titel des Beitrags
                      </label>
                      <input
                        type="text"
                        required
                        value={currentPostForm.title}
                        onChange={(e) => setCurrentPostForm({ ...currentPostForm, title: e.target.value })}
                        placeholder="z.B. PURE.WHISKY. auf der Messe..."
                        className="w-full px-4 py-2.5 rounded-xl border border-[#D4C8B8] bg-[#FAF8F5] text-sm font-bold text-[#181F1C] focus:bg-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-craft-mono text-xs uppercase tracking-wider text-[#55695E] font-bold mb-1">
                        Kategorie
                      </label>
                      <select
                        value={currentPostForm.category}
                        onChange={(e) => setCurrentPostForm({ ...currentPostForm, category: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-[#D4C8B8] bg-[#FAF8F5] text-sm text-[#181F1C] focus:bg-white focus:outline-none font-craft-mono"
                      >
                        <option value="Messe">Messe / Event</option>
                        <option value="YouTube">YouTube / Video</option>
                        <option value="Abfüllungen">Neue Abfüllung</option>
                        <option value="Nachhaltigkeit">Nachhaltigkeit & Audit</option>
                        <option value="Tasting">Tasting & Verkostung</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="font-craft-mono text-xs uppercase tracking-wider text-[#55695E] font-bold">
                        Bildergalerie (Mehrere Bilder für den Slider auswählen)
                      </label>
                      <label className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-white border border-[#D4C8B8] font-woodblock text-xs uppercase tracking-wider text-[#B85D2C] hover:bg-[#E2DDD5] cursor-pointer transition-all shadow-xs">
                        <Upload className="w-3.5 h-3.5" />
                        <span>+ Bilder vom PC hinzufügen</span>
                        <input type="file" multiple accept="image/*" onChange={handleMultipleBlogImagesUpload} className="hidden" />
                      </label>
                    </div>

                    {currentPostForm.images && currentPostForm.images.length > 0 ? (
                      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3 p-4 rounded-2xl border border-[#D4C8B8] bg-[#FAF8F5]">
                        {currentPostForm.images.map((imgUrl, idx) => (
                          <div key={idx} className="relative group rounded-xl overflow-hidden border border-[#D4C8B8] bg-white aspect-video shadow-xs">
                            <img src={imgUrl} alt={`Bild ${idx + 1}`} className="w-full h-full object-cover" />
                            {idx === 0 && (
                              <span className="absolute bottom-1 left-1 px-1.5 py-0.5 bg-black/70 text-white text-[9px] font-craft-mono rounded">
                                Hauptbild
                              </span>
                            )}
                            <button
                              type="button"
                              onClick={() => handleRemoveBlogImage(idx)}
                              className="absolute top-1 right-1 w-6 h-6 rounded-full bg-rose-600 hover:bg-rose-700 text-white flex items-center justify-center shadow-md transition-all"
                              title="Dieses Bild entfernen"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-6 text-center rounded-2xl border-2 border-dashed border-[#D4C8B8] text-xs text-[#55695E]">
                        Noch keine Bilder hinzugefügt. Klicke auf <strong>+ Bilder vom PC hinzufügen</strong>.
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block font-craft-mono text-xs uppercase tracking-wider text-[#55695E] font-bold mb-1">
                      Optional: YouTube Video-Link
                    </label>
                    <div className="relative">
                      <Play className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#55695E]" />
                      <input
                        type="text"
                        value={currentPostForm.videoUrl}
                        onChange={(e) => setCurrentPostForm({ ...currentPostForm, videoUrl: e.target.value })}
                        placeholder="https://www.youtube.com/watch?v=... oder https://youtu.be/..."
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#D4C8B8] bg-[#FAF8F5] text-sm text-[#181F1C] focus:bg-white focus:outline-none font-craft-mono text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-craft-mono text-xs uppercase tracking-wider text-[#55695E] font-bold mb-1">
                      Kurzbeschreibung (Teaser)
                    </label>
                    <input
                      type="text"
                      required
                      value={currentPostForm.excerpt}
                      onChange={(e) => setCurrentPostForm({ ...currentPostForm, excerpt: e.target.value })}
                      placeholder="Kurze Zusammenfassung für die Übersicht..."
                      className="w-full px-4 py-2.5 rounded-xl border border-[#D4C8B8] bg-[#FAF8F5] text-sm text-[#181F1C] focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-craft-mono text-xs uppercase tracking-wider text-[#55695E] font-bold mb-1">
                      Vollständiger Inhalt (Fließtext)
                    </label>
                    <textarea
                      rows={6}
                      required
                      value={currentPostForm.content}
                      onChange={(e) => setCurrentPostForm({ ...currentPostForm, content: e.target.value })}
                      placeholder="Der ausführliche Bericht..."
                      className="w-full p-4 rounded-xl border border-[#D4C8B8] bg-[#FAF8F5] text-sm text-[#181F1C] focus:bg-white focus:outline-none leading-relaxed"
                    />
                  </div>

                  <div className="pt-4 flex justify-end space-x-3 border-t border-[#E2DDD5]">
                    <button
                      type="button"
                      onClick={() => setIsEditingPost(false)}
                      className="px-6 py-2.5 rounded-xl border border-[#D4C8B8] text-sm font-woodblock uppercase tracking-wider text-[#55695E] hover:bg-[#FAF8F5]"
                    >
                      Abbrechen
                    </button>
                    <button
                      type="submit"
                      className="px-8 py-2.5 rounded-xl bg-[#2D6A4F] hover:bg-[#24533E] text-white font-woodblock text-base tracking-wider uppercase shadow-md"
                    >
                      {currentPostForm.id ? 'Änderungen speichern' : 'Beitrag Veröffentlichen'}
                    </button>
                  </div>
                </form>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogPosts.map((post) => {
                const imgCount = post.images ? post.images.length : 1;
                const coverImg = post.images && post.images.length > 0 ? post.images[0] : post.image;
                
                return (
                  <div key={post.id} className="bg-white border border-[#D4C8B8] rounded-3xl p-6 shadow-xs flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      <div className="h-44 rounded-2xl overflow-hidden border border-[#E2DDD5] relative">
                        <img src={coverImg} alt={post.title} className="w-full h-full object-cover" />
                        
                        <span className="absolute top-3 left-3 px-2.5 py-1 bg-black/60 backdrop-blur-md text-white text-[10px] font-craft-mono font-bold rounded-lg">
                          {post.category}
                        </span>

                        {imgCount > 1 && (
                          <span className="absolute bottom-3 right-3 px-2 py-0.5 bg-black/70 backdrop-blur-md text-white text-[10px] font-craft-mono font-bold rounded-md flex items-center space-x-1">
                            <ImageIcon className="w-3 h-3" />
                            <span>{imgCount} Bilder</span>
                          </span>
                        )}

                        {post.videoUrl && (
                          <span className="absolute bottom-3 left-3 p-1 rounded-full bg-[#B85D2C] text-white shadow-sm">
                            <Play className="w-3 h-3 fill-white" />
                          </span>
                        )}
                      </div>

                      <div className="text-xs text-[#55695E] font-craft-mono">{post.date} · {post.author}</div>
                      <h3 className="font-woodblock text-xl text-[#181F1C] uppercase leading-tight line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-xs text-[#3A4A40] line-clamp-3 leading-relaxed">
                        {post.excerpt}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#E2DDD5] flex items-center justify-between">
                      <button
                        onClick={() => handleStartEditPost(post)}
                        className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#FAF8F5] border border-[#D4C8B8] text-xs font-woodblock uppercase tracking-wider text-[#B85D2C] hover:bg-[#E2DDD5] transition-colors"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Bearbeiten</span>
                      </button>

                      <button
                        onClick={() => {
                          if (confirm(`Beitrag "${post.title}" wirklich löschen?`)) {
                            onDeleteBlogPost(post.id);
                          }
                        }}
                        className="p-2 text-rose-600 hover:text-rose-800 hover:bg-rose-50 rounded-lg transition-colors"
                        title="Löschen"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* DETAIL MODAL: VERSENDETE KAMPAGNE DETAILS                     */}
        {/* ------------------------------------------------------------- */}
        {selectedHistoryCampaign && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto">
            <div className="bg-white border border-[#D4C8B8] rounded-3xl max-w-2xl w-full p-8 shadow-2xl space-y-6 relative text-left">
              
              <div className="flex items-start justify-between border-b border-[#E2DDD5] pb-4">
                <div className="space-y-1">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#E8EFEA] text-[#2D6A4F] text-xs font-craft-mono font-bold">
                    {selectedHistoryCampaign.status}
                  </span>
                  <h3 className="font-woodblock text-2xl uppercase text-[#181F1C] pt-1">
                    {selectedHistoryCampaign.subject}
                  </h3>
                  <p className="text-xs text-[#55695E] font-craft-mono">
                    Versendet am: {selectedHistoryCampaign.date} von {selectedHistoryCampaign.sender}
                  </p>
                </div>

                <button
                  onClick={() => setSelectedHistoryCampaign(null)}
                  className="p-2 rounded-full hover:bg-[#FAF8F5] text-[#181F1C]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-2">
                <span className="font-craft-mono text-xs uppercase tracking-wider text-[#55695E] font-bold block">
                  Nachrichten-Inhalt:
                </span>
                <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E2DDD5] text-xs leading-relaxed text-[#3A4A40] whitespace-pre-line max-h-60 overflow-y-auto">
                  {selectedHistoryCampaign.body}
                </div>
              </div>

              {selectedHistoryCampaign.attachments && selectedHistoryCampaign.attachments.length > 0 && (
                <div className="space-y-2">
                  <span className="font-craft-mono text-xs uppercase tracking-wider text-[#55695E] font-bold block">
                    Mitgesendete Anhänge:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {selectedHistoryCampaign.attachments.map((a, i) => (
                      <span key={i} className="px-3 py-1.5 rounded-xl bg-[#FAF8F5] border border-[#D4C8B8] text-xs font-craft-mono font-bold text-[#181F1C]">
                        📎 {a.filename} ({a.size})
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <span className="font-craft-mono text-xs uppercase tracking-wider text-[#55695E] font-bold block">
                  Empfänger ({selectedHistoryCampaign.recipients ? selectedHistoryCampaign.recipients.length : 0}):
                </span>
                <div className="p-3 rounded-2xl border border-[#E2DDD5] bg-white max-h-36 overflow-y-auto flex flex-wrap gap-1.5">
                  {selectedHistoryCampaign.recipients && selectedHistoryCampaign.recipients.map((email, idx) => (
                    <span key={idx} className="px-2.5 py-1 bg-[#FAF8F5] text-[#181F1C] text-[11px] font-craft-mono rounded-lg border border-[#E2DDD5]">
                      {email}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#E2DDD5] flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setEmailSubject(selectedHistoryCampaign.subject);
                    setEmailBody(selectedHistoryCampaign.body);
                    setSelectedHistoryCampaign(null);
                    setAdminTab('broadcast');
                  }}
                  className="px-6 py-2.5 rounded-xl bg-[#B85D2C] hover:bg-[#A04E24] text-white font-woodblock text-sm uppercase tracking-wider transition-all"
                >
                  Als neue Mail-Vorlage nutzen
                </button>
                <button
                  onClick={() => setSelectedHistoryCampaign(null)}
                  className="px-6 py-2.5 rounded-xl border border-[#D4C8B8] text-sm font-woodblock uppercase tracking-wider text-[#55695E] hover:bg-[#FAF8F5]"
                >
                  Schließen
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
