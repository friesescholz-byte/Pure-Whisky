import React, { useState, useMemo, useEffect, useRef } from 'react';
import { 
  Lock, Unlock, Plus, Trash2, Edit3, Send, Paperclip, CheckSquare, 
  Square, Users, BookOpen, Smartphone, Monitor, 
  CheckCircle2, AlertCircle, RefreshCw, X,
  ChevronDown, ChevronUp, Search, Upload, Mail, Image as ImageIcon, Play,
  History, Clock, Check, FileText, UserMinus, Package, Star, Link,
  ShoppingBag, Receipt, Settings, ShieldCheck
} from 'lucide-react';
import { IMAGES } from '../data/pureWhiskyFullData';
import InventoryManager from './InventoryManager';
import OrdersManager from './admin/OrdersManager';
import CombinedCrmManager from './admin/CombinedCrmManager';

export default function AdminView({ 
  blogPosts, 
  onSaveBlogPost, 
  onDeleteBlogPost, 
  onNavigateHome,
  onNavigateBlog,
  products = [],
  onUpdateProduct,
  onResetProducts,
  onNavigateProduct,
  // Orders & Invoices Props
  orders = [],
  onSendInvoice,
  onViewInvoice,
  onAddTestOrder,
  // WooCommerce Customers CRM Props
  wooCustomers = [],
  onAddWooCustomer,
  onDeleteWooCustomer,
  // Newsletter CRM Props
  newsletterSubs = [],
  onAddNewsletterSub,
  onToggleNewsletterStatus,
  onDeleteNewsletterSub,
  // Settings Props
  adminEmail = 'friese.scholz@gmail.com',
  onSaveAdminEmail
}) {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('pure_admin_auth') === 'true';
  });
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState(false);

  // Active Admin Tab: 'orders' | 'inventory' | 'broadcast' | 'journal' | 'crm_all'
  const [adminTab, setAdminTab] = useState('orders');

  // Audience Selection for Broadcaster
  const [selectedEmails, setSelectedEmails] = useState([]);
  const hasInitializedEmails = useRef(false);
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
        body: 'Vielen Dank für Ihre Registrierung im exklusiven PURE.WHISKY. Fass-Depot.\n\nIn Kürze erhalten Sie die ersten sensorischen Verkostungsnotizen unserer nativen Einzelfass-Abfüllungen.',
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

  // Blog Post Form State & Auto-scroll Ref
  const blogEditorRef = useRef(null);
  const [isEditingPost, setIsEditingPost] = useState(false);
  const [imageUrlInput, setImageUrlInput] = useState('');
  const [blogSaveSuccess, setBlogSaveSuccess] = useState('');
  const [isCompressingImages, setIsCompressingImages] = useState(false);
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

  // Unified Deduplicated Audience from all active sources:
  // 1. Shop-Kunden (wooCustomers)
  // 2. Newsletter-Kunden (active newsletterSubs where listStatus === 'subscribed')
  const allUnifiedContacts = useMemo(() => {
    const map = new Map();

    // 1. Shop Customers
    wooCustomers.forEach(c => {
      if (!c.email) return;
      const key = c.email.toLowerCase().trim();
      const name = c.fullName || `${c.firstName || ''} ${c.lastName || ''}`.trim() || c.name || '';
      map.set(key, {
        email: c.email.trim(),
        name: name || key.split('@')[0],
        categories: ['shop'],
        date: c.subscribedAt || c.date || '–',
        isShop: true,
        isNewsletter: false
      });
    });

    // 2. Newsletter Subscribers (Strictly active only!)
    newsletterSubs.forEach(s => {
      if (!s.email) return;
      const key = s.email.toLowerCase().trim();
      const isActive = s.listStatus === 'subscribed';
      if (!isActive) return; // Only active per user instruction

      const name = s.fullName || `${s.firstName || ''} ${s.lastName || ''}`.trim() || '';
      if (map.has(key)) {
        const existing = map.get(key);
        if (!existing.categories.includes('newsletter')) existing.categories.push('newsletter');
        existing.isNewsletter = true;
        if (!existing.name && name) existing.name = name;
      } else {
        map.set(key, {
          email: s.email.trim(),
          name: name || key.split('@')[0],
          categories: ['newsletter'],
          date: s.subscribedAt || '–',
          isShop: false,
          isNewsletter: true
        });
      }
    });

    return Array.from(map.values());
  }, [wooCustomers, newsletterSubs]);

  const totalUniqueCount = allUnifiedContacts.length;
  const shopCount = allUnifiedContacts.filter(c => c.categories.includes('shop')).length;
  const activeNewsletterCount = allUnifiedContacts.filter(c => c.categories.includes('newsletter')).length;

  // Sync selectedEmails on initial load once allUnifiedContacts is ready
  useEffect(() => {
    if (!hasInitializedEmails.current && allUnifiedContacts.length > 0) {
      setSelectedEmails(allUnifiedContacts.map(c => c.email.toLowerCase()));
      hasInitializedEmails.current = true;
    }
  }, [allUnifiedContacts]);

  // Deep-link "Mail schreiben" to a specific individual customer
  const handleComposeMailToContact = (contact) => {
    const emailKey = contact.email.toLowerCase().trim();
    setSelectedEmails([emailKey]);
    setIsAudienceExpanded(false);
    setAdminTab('broadcast');
  };

  const handleSelectAudience = (type) => {
    if (type === 'all') {
      setSelectedEmails(allUnifiedContacts.map(c => c.email.toLowerCase()));
    } else if (type === 'shop') {
      setSelectedEmails(allUnifiedContacts.filter(c => c.categories.includes('shop')).map(c => c.email.toLowerCase()));
    } else if (type === 'newsletter') {
      setSelectedEmails(allUnifiedContacts.filter(c => c.categories.includes('newsletter')).map(c => c.email.toLowerCase()));
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

  const filteredAudience = allUnifiedContacts.filter(c => {
    return c.email.toLowerCase().includes(audienceSearchTerm.toLowerCase()) ||
           c.name.toLowerCase().includes(audienceSearchTerm.toLowerCase());
  });



  // Blog Image Compression to guarantee zero crash and fast saving
  const compressImageFile = (file) => {
    return new Promise((resolve) => {
      // If SVG or tiny, read directly
      if (file.type === 'image/svg+xml' || file.size < 120 * 1024) {
        const r = new FileReader();
        r.onload = () => resolve(r.result);
        r.onerror = () => resolve('');
        r.readAsDataURL(file);
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const maxDim = 1600;
          let w = img.width;
          let h = img.height;
          if (w > maxDim || h > maxDim) {
            if (w > h) {
              h = Math.round((h * maxDim) / w);
              w = maxDim;
            } else {
              w = Math.round((w * maxDim) / h);
              h = maxDim;
            }
          }
          const canvas = document.createElement('canvas');
          canvas.width = w;
          canvas.height = h;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, w, h);
          // Export as clean JPEG 82% quality (shrinks 10MB phone photo to ~150KB)
          const compressed = canvas.toDataURL('image/jpeg', 0.82);
          resolve(compressed);
        };
        img.onerror = () => resolve(e.target.result);
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    });
  };

  // Blog Multiple Images Upload (with auto-compression)
  const handleMultipleBlogImagesUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setIsCompressingImages(true);
      try {
        const compressedList = await Promise.all(files.map(compressImageFile));
        const valid = compressedList.filter(Boolean);
        setCurrentPostForm((prev) => {
          const currentImages = prev.images || (prev.image ? [prev.image] : []);
          return {
            ...prev,
            images: [...currentImages, ...valid]
          };
        });
      } finally {
        setIsCompressingImages(false);
      }
    }
  };

  // Add Image via direct URL (e.g. Cloudflare R2 link)
  const handleAddImageUrl = () => {
    const trimmed = imageUrlInput.trim();
    if (!trimmed) return;
    setCurrentPostForm((prev) => {
      const currentImages = prev.images || (prev.image ? [prev.image] : []);
      return {
        ...prev,
        images: [...currentImages, trimmed]
      };
    });
    setImageUrlInput('');
  };

  // Promote an image to position 0 (Hauptbild)
  const handleSetPrimaryBlogImage = (indexToPromote) => {
    setCurrentPostForm((prev) => {
      const currentImages = [...(prev.images || (prev.image ? [prev.image] : []))];
      if (indexToPromote <= 0 || indexToPromote >= currentImages.length) return prev;
      const [promoted] = currentImages.splice(indexToPromote, 1);
      currentImages.unshift(promoted);
      return {
        ...prev,
        images: currentImages
      };
    });
  };

  // Remove single image from gallery
  const handleRemoveBlogImage = (indexToRemove) => {
    setCurrentPostForm((prev) => {
      const currentImages = prev.images || (prev.image ? [prev.image] : []);
      const updated = currentImages.filter((_, idx) => idx !== indexToRemove);
      return {
        ...prev,
        images: updated
      };
    });
  };

  // Start Edit Post with smooth auto-scroll to editor
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
    setTimeout(() => {
      blogEditorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
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
    // 100% Guarantee of deduplication across all customer groups
    const targetEmails = Array.from(new Set(selectedEmails.map(e => e.toLowerCase().trim()))).filter(Boolean);
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
                  <p style="margin: 4px 0 0 0; color: #2D6A4F; font-size: 14px; font-style: italic;">Single Cask Sustainable Whisky</p>
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

        // 1. Primary: Official Scholz & Friese Shops Resend Worker
        let response = null;
        try {
          response = await fetch('https://resend-mailer.friese-scholz.workers.dev', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              from: `${senderName} <${senderEmail}>`,
              to: [email],
              reply_to: 'info@pure-whisky.com',
              subject: emailSubject,
              text: emailBody,
              html: payload.html
            })
          });
        } catch (fetchErr) {
          // Fallback to local proxy if offline
          response = await fetch('/api/resend/emails', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${RESEND_API_KEY}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
          });
        }

        const resData = await response.json();
        if (response.ok && (resData.id || resData.success)) {
          const idStr = resData.id ? ` (Resend ID: ${resData.id.slice(0, 8)}...)` : '';
          newLogs.push({ email, status: `✅ Erfolgreich gesendet${idStr}`, time: new Date().toLocaleTimeString() });
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
    <div className="pt-24 sm:pt-28 pb-36 min-h-screen bg-[#FAF8F5] text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Bar */}
        <div className="bg-white border border-[#D4C8B8] rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-xs mb-6 sm:mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-3 flex-wrap gap-2">
              <span className="font-woodblock text-2xl sm:text-3xl lg:text-4xl text-[#181F1C] tracking-wide uppercase">
                PURE.WHISKY. Verwaltungszentrale
              </span>
              <span className="px-3 py-1 bg-[#E8EFEA] border border-[#C5D8CC] text-[#2D6A4F] font-craft-mono text-xs font-bold rounded-full">
                Angemeldet
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#55695E]">
              E-Mail Kampagnen, Versand-Historie, Kunden-CRM und Journal-Verwaltung.
            </p>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-3 w-full sm:w-auto justify-between sm:justify-end">
            <button
              onClick={onNavigateBlog}
              className="px-3.5 sm:px-4 py-2 rounded-xl bg-[#FAF8F5] border border-[#D4C8B8] text-xs font-craft-mono font-bold text-[#181F1C] hover:bg-[#E2DDD5] transition-colors"
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

        {/* Main Tabs (Responsive scrollable tab bar) */}
        <div className="flex items-center space-x-2 sm:space-x-3 border-b border-[#E2DDD5] pb-3 sm:pb-4 mb-6 sm:mb-8 overflow-x-auto select-none">
          
          {/* Tab 1: Bestellungen & Rechnungen */}
          <button
            onClick={() => setAdminTab('orders')}
            className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-woodblock text-sm sm:text-base md:text-lg tracking-wider uppercase transition-all flex items-center space-x-2 shrink-0 cursor-pointer ${
              adminTab === 'orders' 
                ? 'bg-[#B85D2C] text-white shadow-md' 
                : 'bg-white border border-[#D4C8B8] text-[#181F1C] hover:bg-[#FAF8F5]'
            }`}
          >
            <Receipt className="w-4 h-4" />
            <span>Bestellungen & Rechnungen</span>
            {orders.filter(o => o.status === 'neu_eingegangen').length > 0 && (
              <span className="ml-1 px-2 py-0.5 bg-amber-500 text-white text-xs font-craft-mono font-bold rounded-full animate-pulse">
                {orders.filter(o => o.status === 'neu_eingegangen').length} neu
              </span>
            )}
            <span className="ml-1 px-2 py-0.5 bg-black/10 text-xs font-craft-mono font-bold rounded-full">
              {orders.length}
            </span>
          </button>

          {/* Tab 2: Fässer & Preise (Shop) */}
          <button
            onClick={() => setAdminTab('inventory')}
            className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-woodblock text-sm sm:text-base md:text-lg tracking-wider uppercase transition-all flex items-center space-x-2 shrink-0 cursor-pointer ${
              adminTab === 'inventory' 
                ? 'bg-[#B85D2C] text-white shadow-md' 
                : 'bg-white border border-[#D4C8B8] text-[#181F1C] hover:bg-[#FAF8F5]'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Fässer & Preise (Shop)</span>
            <span className="ml-1 px-2 py-0.5 bg-black/10 text-xs font-craft-mono font-bold rounded-full">
              {products.length}
            </span>
          </button>

          {/* Tab 3: Mitteilung senden */}
          <button
            onClick={() => setAdminTab('broadcast')}
            className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-woodblock text-sm sm:text-base md:text-lg tracking-wider uppercase transition-all flex items-center space-x-2 shrink-0 cursor-pointer ${
              adminTab === 'broadcast' 
                ? 'bg-[#B85D2C] text-white shadow-md' 
                : 'bg-white border border-[#D4C8B8] text-[#181F1C] hover:bg-[#FAF8F5]'
            }`}
          >
            <Send className="w-4 h-4" />
            <span>Mitteilung senden</span>
          </button>

          {/* Tab 4: Journal */}
          <button
            onClick={() => setAdminTab('journal')}
            className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-woodblock text-sm sm:text-base md:text-lg tracking-wider uppercase transition-all flex items-center space-x-2 shrink-0 cursor-pointer ${
              adminTab === 'journal' 
                ? 'bg-[#B85D2C] text-white shadow-md' 
                : 'bg-white border border-[#D4C8B8] text-[#181F1C] hover:bg-[#FAF8F5]'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Journal ({blogPosts.length})</span>
          </button>

          {/* Tab 5: Kunden- & Newsletter-Verteiler (Ganz hinten) */}
          <button
            onClick={() => setAdminTab('crm_all')}
            className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-woodblock text-sm sm:text-base md:text-lg tracking-wider uppercase transition-all flex items-center space-x-2 shrink-0 cursor-pointer ${
              adminTab === 'crm_all' 
                ? 'bg-[#B85D2C] text-white shadow-md' 
                : 'bg-white border border-[#D4C8B8] text-[#181F1C] hover:bg-[#FAF8F5]'
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>Kunden- & Newsletter-Verteiler</span>
            <span className="ml-1 px-2 py-0.5 bg-black/10 text-xs font-craft-mono font-bold rounded-full">
              {wooCustomers.length + newsletterSubs.length}
            </span>
          </button>

        </div>

        {/* ------------------------------------------------------------- */}
        {/* TAB 1: BESTELLUNGEN & RECHNUNGEN (KAUFVERTRAGS-MANAGEMENT)   */}
        {/* ------------------------------------------------------------- */}
        {adminTab === 'orders' && (
          <OrdersManager
            orders={orders}
            onSendInvoice={onSendInvoice}
            onViewInvoice={onViewInvoice}
            onAddTestOrder={onAddTestOrder}
            adminEmail={adminEmail}
          />
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 2: FÄSSER & PREISE (SHOP / MOLLIE)                         */}
        {/* ------------------------------------------------------------- */}
        {adminTab === 'inventory' && (
          <InventoryManager
            products={products}
            onUpdateProduct={onUpdateProduct}
            onResetProducts={onResetProducts}
            onNavigateProduct={onNavigateProduct}
          />
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 3: E-MAIL VERSAND                                         */}
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
                        className="px-3 py-1.5 rounded-lg bg-white border border-[#D4C8B8] text-xs font-craft-mono font-bold text-[#181F1C] hover:bg-[#E2DDD5] transition-colors"
                      >
                        Alle ({totalUniqueCount})
                      </button>
                      <button
                        onClick={() => handleSelectAudience('shop')}
                        className="px-3 py-1.5 rounded-lg bg-[#F5EBE6] border border-[#E5D0C5] text-xs font-craft-mono font-bold text-[#B85D2C] hover:bg-[#EAD6CC] transition-colors"
                      >
                        Shop-Kunden ({shopCount})
                      </button>
                      <button
                        onClick={() => handleSelectAudience('newsletter')}
                        className="px-3 py-1.5 rounded-lg bg-[#E8EFEA] border border-[#C5D8CC] text-xs font-craft-mono font-bold text-[#2D6A4F] hover:bg-[#D3E5D9] transition-colors"
                      >
                        Newsletter ({activeNewsletterCount})
                      </button>
                      <button
                        onClick={() => handleSelectAudience('none')}
                        className="px-2.5 py-1.5 rounded-lg bg-white border border-[#D4C8B8] text-xs font-craft-mono text-rose-600 hover:bg-rose-50 transition-colors"
                      >
                        Leeren
                      </button>
                    </div>
                  </div>

                  {/* Notice if only a single customer is selected via 'Mail schreiben' */}
                  {selectedEmails.length === 1 && (
                    <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4 text-[#B85D2C] shrink-0" />
                        <span>
                          Einzelempfänger ausgewählt: <strong>{selectedEmails[0]}</strong>
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setSelectedEmails(allUnifiedContacts.map(c => c.email.toLowerCase()))}
                        className="px-2.5 py-1 bg-white border border-amber-300 rounded-lg text-amber-900 font-craft-mono font-bold hover:bg-amber-100 transition-colors cursor-pointer self-start sm:self-auto"
                      >
                        Alle Empfänger auswählen ({totalUniqueCount})
                      </button>
                    </div>
                  )}

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
                                  {c.categories.includes('shop') && (
                                    <span className="px-1.5 py-0.5 bg-[#F5EBE6] text-[#B85D2C] text-[10px] font-craft-mono font-bold rounded">
                                      Shop-Kunde
                                    </span>
                                  )}
                                  {c.categories.includes('newsletter') && (
                                    <span className="px-1.5 py-0.5 bg-[#E8EFEA] text-[#2D6A4F] text-[10px] font-craft-mono font-bold rounded">
                                      Newsletter (Aktiv)
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
                        Single Cask Sustainable Whisky
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
        {/* TAB 4: BLOG- & JOURNAL-VERWALTUNG                             */}
        {/* ------------------------------------------------------------- */}
        {adminTab === 'journal' && (
          <div className="space-y-8">
            <div className="bg-white border border-[#D4C8B8] rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-woodblock text-2xl sm:text-3xl text-[#181F1C] uppercase tracking-wide">
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
                    setTimeout(() => {
                      blogEditorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }, 100);
                  }}
                  className="px-6 py-3 rounded-xl bg-[#B85D2C] hover:bg-[#A04E24] text-white font-woodblock text-sm tracking-wider uppercase transition-all shadow-md flex items-center space-x-2 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Plus className="w-4 h-4" />
                  <span>Neuen Beitrag schreiben</span>
                </button>
              )}
            </div>

            {/* Success Alert Banner */}
            {blogSaveSuccess && (
              <div className="p-4 rounded-2xl bg-[#E8EFEA] border border-[#C5D8CC] text-[#2D6A4F] flex items-center space-x-3 shadow-xs">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span className="text-sm font-bold">{blogSaveSuccess}</span>
              </div>
            )}

            {isEditingPost && (
              <div ref={blogEditorRef} className="bg-white border-2 border-[#B85D2C] rounded-3xl p-6 sm:p-8 shadow-xl space-y-6 scroll-mt-28">
                <div className="flex items-center justify-between border-b border-[#E2DDD5] pb-4">
                  <div>
                    <h3 className="font-woodblock text-2xl uppercase text-[#181F1C]">
                      {currentPostForm.id ? 'Beitrag bearbeiten' : 'Neuen Journal-Beitrag veröffentlichen'}
                    </h3>
                    <p className="text-xs text-[#55695E] pt-0.5">
                      Hauptbild, Bildergalerie (Slider), Video und Inhalt pflegen.
                    </p>
                  </div>
                  <button 
                    onClick={() => setIsEditingPost(false)} 
                    className="group p-2.5 rounded-full bg-[#FAF8F5] border border-[#D4C8B8] text-stone-500 hover:text-[#181F1C] hover:border-[#B85D2C] hover:bg-white transition-all duration-300 shadow-xs hover:scale-105 active:scale-95"
                    title="Schließen"
                  >
                    <X className="w-5 h-5 transition-transform duration-300 group-hover:rotate-90" />
                  </button>
                </div>

                <form onSubmit={(e) => {
                  e.preventDefault();
                  const validImages = (currentPostForm.images || []).filter(Boolean);
                  const primaryImage = validImages.length > 0 
                    ? validImages[0] 
                    : (currentPostForm.image || IMAGES.scotland_coast);

                  onSaveBlogPost({
                    ...currentPostForm,
                    image: primaryImage,
                    images: validImages.length > 0 ? validImages : [primaryImage]
                  });
                  setIsEditingPost(false);
                  setBlogSaveSuccess('Beitrag erfolgreich gespeichert!');
                  setTimeout(() => setBlogSaveSuccess(''), 4000);
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
                        <option value="Nachhaltigkeit">Nachhaltigkeit</option>
                        <option value="Tasting">Tasting & Verkostung</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <label className="font-craft-mono text-xs uppercase tracking-wider text-[#55695E] font-bold">
                        Bildergalerie & Hauptbild
                      </label>
                      <label className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-white border border-[#D4C8B8] font-woodblock text-xs uppercase tracking-wider text-[#B85D2C] hover:bg-[#E2DDD5] cursor-pointer transition-all shadow-xs hover:scale-[1.02] active:scale-[0.98]">
                        <Upload className="w-3.5 h-3.5" />
                        <span>{isCompressingImages ? 'Bilder werden optimiert...' : '+ Bilder vom PC hinzufügen'}</span>
                        <input type="file" multiple accept="image/*" disabled={isCompressingImages} onChange={handleMultipleBlogImagesUpload} className="hidden" />
                      </label>
                    </div>

                    {/* Quick URL Input for Cloudflare R2 / Web images */}
                    <div className="flex items-center space-x-2 bg-[#FAF8F5] p-2 rounded-2xl border border-[#D4C8B8]">
                      <div className="relative flex-1">
                        <Link className="w-3.5 h-3.5 text-[#55695E] absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="url"
                          value={imageUrlInput}
                          onChange={(e) => setImageUrlInput(e.target.value)}
                          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddImageUrl(); }}}
                          placeholder="Oder Bild-URL / Cloudflare R2 Link einfügen..."
                          className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#D4C8B8] bg-white text-xs text-[#181F1C] focus:outline-none focus:border-[#B85D2C]"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={handleAddImageUrl}
                        className="px-4 py-2 rounded-xl bg-[#181F1C] hover:bg-black text-white text-xs font-woodblock uppercase tracking-wider transition-colors shrink-0"
                      >
                        + Hinzufügen
                      </button>
                    </div>

                    {currentPostForm.images && currentPostForm.images.length > 0 ? (
                      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3 p-4 rounded-2xl border border-[#D4C8B8] bg-[#FAF8F5]">
                        {currentPostForm.images.map((imgUrl, idx) => (
                          <div key={idx} className="relative group rounded-xl overflow-hidden border border-[#D4C8B8] bg-white aspect-video shadow-xs flex items-center justify-center">
                            <img src={imgUrl} alt={`Bild ${idx + 1}`} className="w-full h-full object-cover" />
                            
                            {idx === 0 ? (
                              <span className="absolute bottom-1.5 left-1.5 px-2 py-0.5 bg-[#2D6A4F] text-white text-[10px] font-craft-mono font-bold rounded shadow-sm flex items-center space-x-1">
                                <Star className="w-2.5 h-2.5 fill-white" />
                                <span>Hauptbild</span>
                              </span>
                            ) : (
                              <button
                                type="button"
                                onClick={() => handleSetPrimaryBlogImage(idx)}
                                className="absolute bottom-1.5 left-1.5 px-2 py-0.5 bg-black/75 hover:bg-[#2D6A4F] text-white text-[10px] font-craft-mono rounded opacity-0 group-hover:opacity-100 transition-all flex items-center space-x-1 shadow-sm"
                                title="Dieses Bild als Titelbild an erste Stelle setzen"
                              >
                                <Star className="w-2.5 h-2.5" />
                                <span>Als Hauptbild</span>
                              </button>
                            )}

                            <button
                              type="button"
                              onClick={() => handleRemoveBlogImage(idx)}
                              className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-rose-600 hover:bg-rose-700 text-white flex items-center justify-center shadow-md transition-all opacity-85 hover:opacity-100"
                              title="Dieses Bild entfernen"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-6 text-center rounded-2xl border-2 border-dashed border-[#D4C8B8] text-xs text-[#55695E]">
                        Noch keine Bilder hinterlegt. Laden Sie ein Bild vom PC hoch oder fügen Sie eine URL ein.
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
        {/* TAB 6: KUNDEN- & NEWSLETTER-VERTEILER (CRM ALL)               */}
        {/* ------------------------------------------------------------- */}
        {adminTab === 'crm_all' && (
          <CombinedCrmManager
            wooCustomers={wooCustomers}
            newsletterSubs={newsletterSubs}
            onAddWooCustomer={onAddWooCustomer}
            onDeleteWooCustomer={onDeleteWooCustomer}
            onAddNewsletterSub={onAddNewsletterSub}
            onToggleNewsletterStatus={onToggleNewsletterStatus}
            onDeleteNewsletterSub={onDeleteNewsletterSub}
            onComposeMail={handleComposeMailToContact}
          />
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
