import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import CaskSelectionTrust from './components/CaskSelectionTrust';
import BlogTeaser from './components/BlogTeaser';
import FAQSection from './components/FAQSection';
import NewsletterSection from './components/NewsletterSection';
import Footer from './components/Footer';

import ShopView from './components/ShopView';
import ProductDetailView from './components/ProductDetailView';
import AboutView from './components/AboutView';
import SustainabilityView from './components/SustainabilityView';
import BlogView from './components/BlogView';
import AdminView from './components/AdminView';
import UnsubscribeView from './components/UnsubscribeView';

import PhilosophyModal from './components/PhilosophyModal';
import BlogPostModal from './components/BlogPostModal';
import CartDrawer from './components/CartDrawer';
import LegalModal from './components/LegalModal';
import InvoiceModal from './components/InvoiceModal';

import { PRODUCTS, BLOG_POSTS } from './data/pureWhiskyFullData';
import initialCrmData from './data/initialCrmData.json';
import { 
  sendOrderConfirmationEmail, 
  sendInvoiceEmail,
  syncOrderToServer,
  fetchOrdersFromServer,
  deleteOrderFromServer
} from './services/orderService';
import { CheckCircle2 } from 'lucide-react';

function getTabFromUrl() {
  if (typeof window === 'undefined') return 'home';
  const path = window.location.pathname.toLowerCase().trim();
  const search = window.location.search.toLowerCase();
  if (path === '/admin' || path.startsWith('/admin') || search.includes('admin=true') || search.includes('tab=admin')) return 'admin';
  if (path === '/abmelden' || path.startsWith('/abmelden') || path === '/unsubscribe' || path.startsWith('/unsubscribe')) return 'unsubscribe';
  if (path === '/shop' || path.startsWith('/shop') || path.startsWith('/faesser')) return 'shop';
  if (path === '/about' || path.startsWith('/about') || path.startsWith('/ueber-uns') || path.startsWith('/ines-zager')) return 'about';
  if (path === '/sustainability' || path.startsWith('/sustainability') || path.startsWith('/nachhaltigkeit')) return 'sustainability';
  if (path === '/blog' || path.startsWith('/blog') || path.startsWith('/journal') || path.startsWith('/messen')) return 'blog';
  if (path === '/product' || path.startsWith('/product')) return 'product';
  return 'home';
}

const INITIAL_ORDERS = [
  {
    orderId: '1268',
    invoiceNumber: 'A094010926',
    date: '01/09/2026',
    createdAt: '2026-09-01T19:32:59Z',
    customer: {
      firstName: 'Jürgen',
      lastName: 'Eisner',
      street: 'Stiegltzstr 6',
      zip: '83101',
      city: 'Rohrdorf',
      email: 'juergen_eisner@hotmail.com'
    },
    paymentMethod: 'PayPal – juergen_eisner@hotmail.com',
    items: [
      {
        id: 'tomatin-16',
        name: 'Tomatin 16 Jahre 53,2% Peated Expression',
        caskInfo: 'matured in an Bourbon Barrel 08/25',
        quantity: 1,
        price: 129.90
      }
    ],
    shipping: 6.90,
    total: 136.80,
    netTotal: 114.96,
    vatTotal: 21.84,
    status: 'rechnung_versendet',
    invoiceSentAt: '01.09.2026, 19:45 Uhr',
    contractConcluded: true
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState(getTabFromUrl);
  const [selectedProduct, setSelectedProduct] = useState(PRODUCTS[0]);
  const [cartItems, setCartItems] = useState([
    { product: PRODUCTS[4], quantity: 1 } // Tomatin 16
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isPhilosophyOpen, setIsPhilosophyOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [legalType, setLegalType] = useState(null);

  // Invoice Modal State
  const [invoiceModalOrder, setInvoiceModalOrder] = useState(null);
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);


  // Sync state on browser URL navigation
  useEffect(() => {
    const handleUrlSync = () => {
      const detected = getTabFromUrl();
      setActiveTab(detected);
    };

    handleUrlSync();
    window.addEventListener('popstate', handleUrlSync);
    return () => window.removeEventListener('popstate', handleUrlSync);
  }, []);

  // Persistent Products & Pricing
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('pure_whisky_products_v5');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved products:', e);
      }
    }
    return PRODUCTS;
  });

  useEffect(() => {
    try {
      localStorage.setItem('pure_whisky_products_v5', JSON.stringify(products));
    } catch (e) {
      console.warn('Could not save products to localStorage:', e);
    }
  }, [products]);

  const handleUpdateProduct = (updatedProduct) => {
    setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
    if (selectedProduct && selectedProduct.id === updatedProduct.id) {
      setSelectedProduct(updatedProduct);
    }
  };

  const handleCreateProduct = (newProduct) => {
    setProducts(prev => [newProduct, ...prev]);
  };

  const handleDeleteProduct = (productId) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
    if (selectedProduct && selectedProduct.id === productId) {
      setSelectedProduct(products.find(p => p.id !== productId) || PRODUCTS[0]);
    }
  };

  const handleResetProducts = () => {
    if (window.confirm('Möchten Sie alle Fässer, Preise und Verfügbarkeiten auf die Standardwerte zurücksetzen?')) {
      setProducts(PRODUCTS);
      try {
        localStorage.removeItem('pure_whisky_products_v5');
      } catch (e) {
        console.error(e);
      }
    }
  };

  // Persistent Blog Posts
  const [blogPosts, setBlogPosts] = useState(() => {
    try {
      const saved = localStorage.getItem('pure_whisky_posts_v4');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to parse blog posts from localStorage:', e);
    }
    return BLOG_POSTS;
  });

  useEffect(() => {
    try {
      localStorage.setItem('pure_whisky_posts_v4', JSON.stringify(blogPosts));
    } catch (e) {
      console.warn('LocalStorage limit exceeded when saving blog posts:', e);
    }
  }, [blogPosts]);

  // Cross-tab synchronization for blog posts & CRM
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'pure_whisky_posts_v4' && e.newValue) {
        try {
          setBlogPosts(JSON.parse(e.newValue));
        } catch (err) {
          console.error('Failed to sync blog posts from storage event:', err);
        }
      }
      if (e.key === 'pure_whisky_woo_customers' && e.newValue) {
        try {
          setWooCustomers(JSON.parse(e.newValue));
        } catch (err) {
          console.error(err);
        }
      }
      if (e.key === 'pure_whisky_newsletter_subs' && e.newValue) {
        try {
          setNewsletterSubs(JSON.parse(e.newValue));
        } catch (err) {
          console.error(err);
        }
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);



  // Persistent Orders (with Jürgen Eisner real order #1268 as baseline)
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('pure_whisky_orders');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          const cleaned = parsed.filter(o => !['1831', '1224', '1545'].includes(o.orderId));
          if (cleaned.length > 0) return cleaned;
        }
      } catch (e) {
        console.error('Failed to parse orders:', e);
      }
    }
    return INITIAL_ORDERS;
  });

  useEffect(() => {
    try {
      localStorage.setItem('pure_whisky_orders', JSON.stringify(orders));
    } catch (e) {
      console.warn('Could not save orders to localStorage:', e);
    }
  }, [orders]);

  // Persistent WooCommerce Customers CRM (48 real records)
  const [wooCustomers, setWooCustomers] = useState(() => {
    const saved = localStorage.getItem('pure_whisky_woo_customers');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse woo customers:', e);
      }
    }
    return initialCrmData.wooCommerceCustomers || [];
  });

  useEffect(() => {
    try {
      localStorage.setItem('pure_whisky_woo_customers', JSON.stringify(wooCustomers));
    } catch (e) {
      console.warn('Could not save wooCustomers:', e);
    }
  }, [wooCustomers]);

  // Persistent Newsletter Subscribers CRM (233 real records)
  const [newsletterSubs, setNewsletterSubs] = useState(() => {
    const saved = localStorage.getItem('pure_whisky_newsletter_subs');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse newsletter subs:', e);
      }
    }
    return initialCrmData.newsletterSubscribers || [];
  });

  useEffect(() => {
    try {
      localStorage.setItem('pure_whisky_newsletter_subs', JSON.stringify(newsletterSubs));
    } catch (e) {
      console.warn('Could not save newsletterSubs:', e);
    }
  }, [newsletterSubs]);

  // Admin Notification Email Setting (default: info@pure-whisky.com)
  const [adminEmail, setAdminEmail] = useState(() => {
    return localStorage.getItem('pure_whisky_admin_email') || 'info@pure-whisky.com';
  });

  const [paidConfirmationOrder, setPaidConfirmationOrder] = useState(null);

  const processingMollieOrdersRef = useRef(new Set());

  // Check URL query parameters for return from Mollie payment gateway
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const urlParams = new URLSearchParams(window.location.search);
    const orderStatus = urlParams.get('order_status');
    const orderIdParam = urlParams.get('order_id');

    if (orderStatus === 'paid' && orderIdParam) {
      // Clear cart
      setCartItems([]);
      try { localStorage.removeItem('pure_whisky_cart'); } catch {}

      // Clean query string from URL immediately to prevent re-triggering on refresh
      const cleanUrl = window.location.pathname;
      window.history.replaceState({}, document.title, cleanUrl);

      // Guard against duplicate execution in the same session
      if (processingMollieOrdersRef.current.has(orderIdParam)) {
        return;
      }
      processingMollieOrdersRef.current.add(orderIdParam);

      // Check persistent storage of already dispatched confirmations
      let alreadyConfirmedList = [];
      try {
        alreadyConfirmedList = JSON.parse(localStorage.getItem('pure_whisky_confirmed_orders') || '[]');
      } catch {}
      const isAlreadyDispatched = alreadyConfirmedList.includes(orderIdParam);

      (async () => {
        // Retrieve pending order if stored
        let target = null;
        try {
          const saved = localStorage.getItem('pure_whisky_pending_order');
          if (saved) {
            target = JSON.parse(saved);
            localStorage.removeItem('pure_whisky_pending_order');
          }
        } catch (err) {
          console.warn('Could not parse pending order:', err);
        }

        // If not in localStorage, fetch from server KV
        if (!target || !target.customer?.email) {
          try {
            const serverOrders = await fetchOrdersFromServer();
            const foundInServer = serverOrders?.find(o => o.orderId === orderIdParam);
            if (foundInServer) target = foundInServer;
          } catch (e) {
            console.warn('Could not fetch server orders on return:', e);
          }
        }

        if (!target) {
          target = {
            orderId: orderIdParam,
            invoiceNumber: `A09401${orderIdParam}`,
            date: new Date().toLocaleDateString('de-DE'),
            customer: { firstName: 'Kunde', lastName: '', email: '' },
            items: [],
            total: 0
          };
        }

        const updatedOrder = {
          ...target,
          orderId: orderIdParam,
          paymentStatus: 'Bezahlt (Online-Zahlung)',
          status: 'neu_eingegangen'
        };

        // Update local React state and localStorage
        setOrders(prev => {
          const exists = prev.some(o => o.orderId === orderIdParam);
          const next = exists 
            ? prev.map(o => o.orderId === orderIdParam ? updatedOrder : o)
            : [updatedOrder, ...prev];
          try { localStorage.setItem('pure_whisky_orders', JSON.stringify(next)); } catch {}
          return next;
        });

        setPaidConfirmationOrder(updatedOrder);

        // Sync to server KV so ALL devices see the paid order immediately
        await syncOrderToServer(updatedOrder);

        // Send order confirmation to customer (no attachments) and admin alert to info@pure-whisky.com
        // STRICT CHECK: Only send once per order ID!
        if (target.customer && target.customer.email && !isAlreadyDispatched && !target.confirmationEmailSent) {
          try {
            alreadyConfirmedList.push(orderIdParam);
            localStorage.setItem('pure_whisky_confirmed_orders', JSON.stringify(alreadyConfirmedList));
          } catch {}

          updatedOrder.confirmationEmailSent = true;
          try {
            await sendOrderConfirmationEmail({ order: updatedOrder, adminEmail });
            await syncOrderToServer(updatedOrder);
          } catch (e) {
            console.warn('Could not send confirmation email:', e);
          }
        }
      })();
    }
  }, [adminEmail]);

  const handleRefreshOrders = async () => {
    try {
      const serverOrders = await fetchOrdersFromServer();
      if (serverOrders && Array.isArray(serverOrders)) {
        // Exclude legacy test order IDs
        const cleaned = serverOrders.filter(o => !['1831', '1224', '1545'].includes(o.orderId));
        const finalOrders = cleaned.length > 0 ? cleaned : INITIAL_ORDERS;
        setOrders(finalOrders);
        try { localStorage.setItem('pure_whisky_orders', JSON.stringify(finalOrders)); } catch {}
      }
    } catch (e) {
      console.warn('Could not refresh orders from KV:', e);
    }
  };

  const handleDeleteOrder = async (orderId) => {
    const orderToDelete = orders.find(o => o.orderId === orderId);
    const orderLabel = orderToDelete 
      ? `#${orderId} (${orderToDelete.customer?.firstName || ''} ${orderToDelete.customer?.lastName || ''})` 
      : `#${orderId}`;
      
    if (orderId === '1268') {
      if (!window.confirm(`Achtung: Dies ist die Referenz-Bestellung #1268 (Jürgen Eisner). Möchten Sie diese wirklich dauerhaft löschen?`)) {
        return;
      }
    } else {
      if (!window.confirm(`Möchten Sie die Bestellung ${orderLabel} wirklich dauerhaft löschen?`)) {
        return;
      }
    }

    const updated = orders.filter(o => o.orderId !== orderId);
    const finalOrders = updated.length > 0 ? updated : INITIAL_ORDERS;
    setOrders(finalOrders);
    try { localStorage.setItem('pure_whisky_orders', JSON.stringify(finalOrders)); } catch {}
    await deleteOrderFromServer(orderId);
  };

  // Automatically sync orders from Cloudflare KV on mount and whenever navigating to admin
  useEffect(() => {
    handleRefreshOrders();
  }, [activeTab]);

  const handleSaveAdminEmail = (newEmail) => {
    setAdminEmail(newEmail);
    try {
      localStorage.setItem('pure_whisky_admin_email', newEmail);
    } catch (e) {
      console.warn(e);
    }
  };

  // Newsletter Handlers
  const handleAddNewsletterSubscriber = (sub) => {
    const emailLower = sub.email.toLowerCase().trim();
    setNewsletterSubs(prev => {
      if (prev.some(s => s.email.toLowerCase().trim() === emailLower)) {
        return prev;
      }
      const newEntry = {
        id: `crm_sub_${Date.now()}`,
        firstName: sub.firstName || '',
        lastName: sub.lastName || '',
        fullName: sub.name || `${sub.firstName || ''} ${sub.lastName || ''}`.trim() || sub.email.split('@')[0],
        email: sub.email,
        subscribedAt: new Date().toISOString().replace('T', ' ').slice(0, 19),
        confirmedAt: new Date().toISOString().replace('T', ' ').slice(0, 19),
        listStatus: 'subscribed',
        globalStatus: 'subscribed',
        listName: 'Newsletter Mailing List'
      };
      return [newEntry, ...prev];
    });
  };

  const handleAddContact = (contact) => {
    if (!contact || !contact.email) return;
    handleAddNewsletterSubscriber({
      email: contact.email,
      name: contact.name || '',
      firstName: contact.firstName || contact.name?.split(' ')[0] || '',
      lastName: contact.lastName || contact.name?.split(' ').slice(1).join(' ') || '',
      caskInterest: contact.caskInterest || 'Vorab-Reservierung',
      source: contact.source || 'vorab-reservierung'
    });
  };

  const handleToggleNewsletterStatus = (identifier) => {
    const term = (identifier || '').toLowerCase().trim();
    setNewsletterSubs(prev => prev.map(s => {
      const sEmail = (s.email || '').toLowerCase().trim();
      const sId = (s.id || '').toLowerCase().trim();
      if (sEmail === term || sId === term) {
        const nextStatus = s.listStatus === 'subscribed' ? 'unsubscribed' : 'subscribed';
        return { ...s, listStatus: nextStatus, globalStatus: nextStatus };
      }
      return s;
    }));
  };

  const handleDeleteNewsletterSubscriber = (identifier, secondaryId) => {
    const term = (identifier || '').toLowerCase().trim();
    const sec = (secondaryId || '').toLowerCase().trim();
    setNewsletterSubs(prev => prev.filter(s => {
      const sEmail = (s.email || '').toLowerCase().trim();
      const sId = (s.id || '').toLowerCase().trim();
      if (term && (sEmail === term || sId === term)) return false;
      if (sec && (sEmail === sec || sId === sec)) return false;
      return true;
    }));
  };

  // Synchronize unsubscribers globally from Cloudflare KV with real-time tab & focus sync
  useEffect(() => {
    const syncUnsubscribers = () => {
      const endpoint = typeof window !== 'undefined' && window.location.origin.includes('workers.dev')
        ? '/api/unsubscribers'
        : 'https://pure-whisky.friese-scholz.workers.dev/api/unsubscribers';

      fetch(endpoint, { cache: 'no-store' })
        .then(res => res.json())
        .then(data => {
          if (data && Array.isArray(data.unsubscribers)) {
            const unsubsSet = new Set(data.unsubscribers.map(e => e.toLowerCase().trim()));

            setNewsletterSubs(prev => {
              const knownEmails = new Set(prev.map(s => (s.email || '').toLowerCase().trim()));
              const updated = prev.map(s => {
                const sMail = (s.email || '').toLowerCase().trim();
                if (unsubsSet.has(sMail)) {
                  return { ...s, listStatus: 'unsubscribed', globalStatus: 'unsubscribed' };
                } else if (s.listStatus === 'unsubscribed') {
                  return { ...s, listStatus: 'subscribed', globalStatus: 'subscribed' };
                }
                return s;
              });

              // Add any unsubscribed email that wasn't in list yet
              data.unsubscribers.forEach(unsubEmail => {
                const clean = unsubEmail.toLowerCase().trim();
                if (clean && !knownEmails.has(clean)) {
                  updated.unshift({
                    id: `crm_kv_${clean}`,
                    email: clean,
                    fullName: clean.split('@')[0],
                    firstName: '',
                    lastName: '',
                    subscribedAt: '–',
                    confirmedAt: '',
                    listStatus: 'unsubscribed',
                    globalStatus: 'unsubscribed',
                    listName: 'Newsletter Mailing List'
                  });
                  knownEmails.add(clean);
                }
              });

              try { localStorage.setItem('pure_whisky_newsletter_subs', JSON.stringify(updated)); } catch {}
              return updated;
            });

            setWooCustomers(prev => {
              const updated = prev.map(c => {
                const cMail = (c.email || '').toLowerCase().trim();
                if (unsubsSet.has(cMail)) {
                  return { ...c, listStatus: 'unsubscribed', globalStatus: 'unsubscribed' };
                } else if (c.listStatus === 'unsubscribed') {
                  return { ...c, listStatus: 'subscribed', globalStatus: 'subscribed' };
                }
                return c;
              });
              try { localStorage.setItem('pure_whisky_woo_customers', JSON.stringify(updated)); } catch {}
              return updated;
            });
          }
        })
        .catch(err => console.warn('Could not sync unsubscribers from KV:', err));
    };

    syncUnsubscribers();

    // Re-sync automatically whenever user switches back to this browser tab
    window.addEventListener('focus', syncUnsubscribers);

    // Cross-tab real-time localStorage sync
    const handleStorage = (e) => {
      if (e.key === 'pure_whisky_newsletter_subs' && e.newValue) {
        try { setNewsletterSubs(JSON.parse(e.newValue)); } catch {}
      }
      if (e.key === 'pure_whisky_woo_customers' && e.newValue) {
        try { setWooCustomers(JSON.parse(e.newValue)); } catch {}
      }
      if (e.key === 'pure_whisky_sync_trigger') {
        syncUnsubscribers();
      }
    };
    window.addEventListener('storage', handleStorage);

    return () => {
      window.removeEventListener('focus', syncUnsubscribers);
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  const handleUnsubscribeEmail = (email) => {
    const clean = (email || '').toLowerCase().trim();
    if (!clean) return;

    setNewsletterSubs(prev => {
      const exists = prev.some(s => (s.email || '').toLowerCase().trim() === clean);
      let updated;
      if (exists) {
        updated = prev.map(s => {
          if ((s.email || '').toLowerCase().trim() === clean) {
            return { ...s, listStatus: 'unsubscribed', globalStatus: 'unsubscribed' };
          }
          return s;
        });
      } else {
        updated = [
          {
            id: `crm_unsub_${Date.now()}`,
            email: clean,
            fullName: clean.split('@')[0],
            firstName: '',
            lastName: '',
            subscribedAt: new Date().toLocaleDateString('de-DE'),
            confirmedAt: '',
            listStatus: 'unsubscribed',
            globalStatus: 'unsubscribed',
            listName: 'Newsletter Mailing List'
          },
          ...prev
        ];
      }
      try { localStorage.setItem('pure_whisky_newsletter_subs', JSON.stringify(updated)); } catch {}
      return updated;
    });

    setWooCustomers(prev => {
      const updated = prev.map(c => {
        if ((c.email || '').toLowerCase().trim() === clean) {
          return { ...c, listStatus: 'unsubscribed', globalStatus: 'unsubscribed' };
        }
        return c;
      });
      try { localStorage.setItem('pure_whisky_woo_customers', JSON.stringify(updated)); } catch {}
      return updated;
    });

    try { localStorage.setItem('pure_whisky_sync_trigger', Date.now().toString()); } catch {}
  };

  const handleReSubscribeEmail = (email) => {
    const clean = (email || '').toLowerCase().trim();
    if (!clean) return;

    setNewsletterSubs(prev => {
      const exists = prev.some(s => (s.email || '').toLowerCase().trim() === clean);
      let updated;
      if (exists) {
        updated = prev.map(s => {
          if ((s.email || '').toLowerCase().trim() === clean) {
            return { ...s, listStatus: 'subscribed', globalStatus: 'subscribed' };
          }
          return s;
        });
      } else {
        updated = [
          {
            id: `crm_resub_${Date.now()}`,
            email: clean,
            fullName: clean.split('@')[0],
            firstName: '',
            lastName: '',
            subscribedAt: new Date().toLocaleDateString('de-DE'),
            confirmedAt: new Date().toLocaleDateString('de-DE'),
            listStatus: 'subscribed',
            globalStatus: 'subscribed',
            listName: 'Newsletter Mailing List'
          },
          ...prev
        ];
      }
      try { localStorage.setItem('pure_whisky_newsletter_subs', JSON.stringify(updated)); } catch {}
      return updated;
    });

    setWooCustomers(prev => {
      const updated = prev.map(c => {
        if ((c.email || '').toLowerCase().trim() === clean) {
          return { ...c, listStatus: 'subscribed', globalStatus: 'subscribed' };
        }
        return c;
      });
      try { localStorage.setItem('pure_whisky_woo_customers', JSON.stringify(updated)); } catch {}
      return updated;
    });

    try { localStorage.setItem('pure_whisky_sync_trigger', Date.now().toString()); } catch {}
  };

  // WooCommerce Customers Handlers
  const handleAddWooCustomer = (cust) => {
    const emailLower = cust.email.toLowerCase().trim();
    setWooCustomers(prev => {
      if (prev.some(c => c.email.toLowerCase().trim() === emailLower)) {
        return prev;
      }
      return [cust, ...prev];
    });
  };

  const handleDeleteWooCustomer = (identifier, secondaryId) => {
    const term = (identifier || '').toLowerCase().trim();
    const sec = (secondaryId || '').toLowerCase().trim();
    setWooCustomers(prev => prev.filter(c => {
      const cEmail = (c.email || '').toLowerCase().trim();
      const cId = (c.id || '').toLowerCase().trim();
      if (term && (cEmail === term || cId === term)) return false;
      if (sec && (cEmail === sec || cId === sec)) return false;
      return true;
    }));
  };

  const invoiceSendingLockRef = useRef(new Set());

  // Orders & Invoice Handlers
  const handleSendInvoice = async (orderId) => {
    if (!orderId) return;
    if (invoiceSendingLockRef.current.has(orderId)) {
      console.warn('Invoice send already in progress for order:', orderId);
      return;
    }
    invoiceSendingLockRef.current.add(orderId);

    try {
      const targetOrder = orders.find(o => o.orderId === orderId);
      const now = new Date();
      const dateStr = now.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });
      const timeStr = now.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });

      const updatedOrder = {
        ...(targetOrder || {}),
        orderId,
        status: 'rechnung_versendet',
        contractConcluded: true,
        invoiceSentAt: `${dateStr}, ${timeStr} Uhr`
      };

      setOrders(prev => prev.map(o => o.orderId === orderId ? updatedOrder : o));
      syncOrderToServer(updatedOrder);

      if (targetOrder) {
        try {
          await sendInvoiceEmail({ order: { ...updatedOrder, date: dateStr }, adminEmail });
        } catch (mailErr) {
          console.warn('Resend invoice dispatch notice:', mailErr);
        }
      }

      alert(`Rechnung zu Bestellung #${orderId} wurde erfolgreich per E-Mail an ${targetOrder?.customer?.email || 'den Kunden'} übermittelt!\n\n• Bcc-Kopie an: info@pure-whisky.com\n\nDer Kaufvertrag ist damit rechtswirksam geschlossen.`);
    } finally {
      invoiceSendingLockRef.current.delete(orderId);
    }
  };

  const handleOpenInvoice = (order) => {
    setInvoiceModalOrder(order);
    setIsInvoiceModalOpen(true);
  };

  const handleCloseInvoice = () => {
    setIsInvoiceModalOpen(false);
    setInvoiceModalOrder(null);
  };

  const handleCompleteOrder = async (newOrder, options = {}) => {
    setOrders(prev => [newOrder, ...prev]);
    syncOrderToServer(newOrder);

    // Send order confirmation via Resend API (only if not waiting for external payment)
    if (!options.skipEmail) {
      try {
        await sendOrderConfirmationEmail({ order: newOrder, adminEmail });
      } catch (confErr) {
        console.warn('Resend order confirmation notice:', confErr);
      }
    }

    // Automatically add customer to WooCommerce customers CRM
    setWooCustomers(prev => {
      const emailLower = newOrder.customer.email.toLowerCase().trim();
      if (prev.some(c => c.email.toLowerCase().trim() === emailLower)) {
        return prev;
      }
      const newCust = {
        id: `crm_woo_${Date.now()}`,
        firstName: newOrder.customer.firstName,
        lastName: newOrder.customer.lastName,
        fullName: `${newOrder.customer.firstName} ${newOrder.customer.lastName}`.trim(),
        email: newOrder.customer.email,
        subscribedAt: new Date().toISOString().replace('T', ' ').slice(0, 19),
        confirmedAt: new Date().toISOString().replace('T', ' ').slice(0, 19),
        listStatus: 'subscribed',
        globalStatus: 'subscribed',
        listName: 'WooCommerce Customers'
      };
      return [newCust, ...prev];
    });

    if (!options.skipEmail) {
      setCartItems([]);
    }
  };

  const handleAddTestOrder = () => {
    const testId = (Math.floor(1300 + Math.random() * 700)).toString();
    const testOrder = {
      orderId: testId,
      invoiceNumber: `A09401${testId}`,
      date: new Date().toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' }),
      createdAt: new Date().toISOString(),
      customer: {
        firstName: 'Wasja',
        lastName: 'Brunotte',
        street: 'Hauptstraße 42',
        zip: '30159',
        city: 'Hannover',
        email: 'wasja.brunotte@gmx.de'
      },
      paymentMethod: 'PayPal – wasja.brunotte@gmx.de',
      items: [
        {
          id: 'glenburgie-11',
          name: 'Glenburgie 11 Jahre 59,2% vol.',
          caskInfo: '1st Fill Oloroso Sherry Butt',
          quantity: 1,
          price: 109.00
        }
      ],
      shipping: 6.90,
      total: 115.90,
      netTotal: 97.39,
      vatTotal: 18.51,
      status: 'neu_eingegangen',
      invoiceSentAt: null,
      contractConcluded: false
    };
    setOrders(prev => [testOrder, ...prev]);
  };

  // Blog Handlers
  const handleSaveBlogPost = (post) => {
    let updated;
    if (post.id) {
      updated = blogPosts.map(p => p.id === post.id ? post : p);
    } else {
      const newPost = { ...post, id: `post_${Date.now()}` };
      updated = [newPost, ...blogPosts];
    }
    setBlogPosts(updated);
    try {
      localStorage.setItem('pure_whisky_posts_v3', JSON.stringify(updated));
    } catch (e) {
      console.warn('LocalStorage limit exceeded when saving blog posts:', e);
    }
  };

  const handleDeleteBlogPost = (postId) => {
    const updated = blogPosts.filter(p => p.id !== postId);
    setBlogPosts(updated);
    try {
      localStorage.setItem('pure_whisky_posts_v3', JSON.stringify(updated));
    } catch (e) {
      console.warn('LocalStorage error deleting post:', e);
    }
  };

  // Cart Handlers
  const handleAddToCart = (product) => {
    if (product.isUpcoming) return;
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveItem(productId);
    } else {
      setCartItems((prev) =>
        prev.map((item) =>
          item.product.id === productId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const handleRemoveItem = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleNavClick = (tab) => {
    setActiveTab(tab);
    const targetPath = tab === 'home' ? '/' : `/${tab}`;
    if (window.location.pathname !== targetPath) {
      window.history.pushState({ tab }, '', targetPath);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenProductDetail = (product) => {
    setSelectedProduct(product);
    setActiveTab('product');
    if (window.location.pathname !== '/product') {
      window.history.pushState({ tab: 'product' }, '', '/product');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#181F1C] font-sans antialiased selection:bg-[#B85D2C] selection:text-white flex flex-col">
      
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleNavClick}
        onSelectProduct={handleOpenProductDetail}
        cartItemsCount={totalCartCount}
        setIsCartOpen={setIsCartOpen}
        products={products}
      />

      <main className="flex-grow">
        {activeTab === 'product' && (
          <ProductDetailView
            product={selectedProduct}
            onAddToCart={handleAddToCart}
            onPreReserve={handleAddContact}
            onNavigateShop={() => handleNavClick('shop')}
            onNavigateHome={() => handleNavClick('home')}
            onSelectOtherProduct={handleOpenProductDetail}
            products={products}
          />
        )}

        {activeTab === 'shop' && (
          <ShopView
            onOpenProduct={handleOpenProductDetail}
            onAddToCart={handleAddToCart}
            onPreReserve={handleAddContact}
            onNavigateHome={() => handleNavClick('home')}
            products={products}
          />
        )}

        {activeTab === 'about' && (
          <AboutView
            onNavigateShop={() => handleNavClick('shop')}
            onNavigateHome={() => handleNavClick('home')}
            onOpenSustainability={() => handleNavClick('sustainability')}
          />
        )}

        {activeTab === 'sustainability' && (
          <SustainabilityView
            onNavigateShop={() => handleNavClick('shop')}
            onNavigateHome={() => handleNavClick('home')}
            onOpenAbout={() => handleNavClick('about')}
          />
        )}

        {activeTab === 'blog' && (
          <BlogView
            posts={blogPosts}
            onOpenPost={setSelectedPost}
            onNavigateShop={() => handleNavClick('shop')}
            onNavigateHome={() => handleNavClick('home')}
          />
        )}

        {activeTab === 'admin' && (
          <AdminView
            blogPosts={blogPosts}
            onSaveBlogPost={handleSaveBlogPost}
            onDeleteBlogPost={handleDeleteBlogPost}
            onNavigateHome={() => handleNavClick('home')}
            onNavigateBlog={() => handleNavClick('blog')}
            products={products}
            onUpdateProduct={handleUpdateProduct}
            onCreateProduct={handleCreateProduct}
            onDeleteProduct={handleDeleteProduct}
            onResetProducts={handleResetProducts}
            onNavigateProduct={handleOpenProductDetail}
            // Orders & Invoices Props
            orders={orders}
            onSendInvoice={handleSendInvoice}
            onViewInvoice={handleOpenInvoice}
            onAddTestOrder={handleAddTestOrder}
            onRefreshOrders={handleRefreshOrders}
            onDeleteOrder={handleDeleteOrder}
            // WooCommerce Customers CRM Props
            wooCustomers={wooCustomers}
            onAddWooCustomer={handleAddWooCustomer}
            onDeleteWooCustomer={handleDeleteWooCustomer}
            // Newsletter CRM Props
            newsletterSubs={newsletterSubs}
            onAddNewsletterSub={handleAddNewsletterSubscriber}
            onToggleNewsletterStatus={handleToggleNewsletterStatus}
            onDeleteNewsletterSub={handleDeleteNewsletterSubscriber}
            // Admin Settings Props
            adminEmail={adminEmail}
            onSaveAdminEmail={handleSaveAdminEmail}
          />
        )}

        {activeTab === 'unsubscribe' && (
          <UnsubscribeView
            onUnsubscribe={handleUnsubscribeEmail}
            onResubscribe={handleReSubscribeEmail}
            onNavigateHome={() => handleNavClick('home')}
            onNavigateShop={() => handleNavClick('shop')}
          />
        )}

        {activeTab === 'home' && (
          <>
            <HeroSection
              onOpenShop={() => handleNavClick('shop')}
              onOpenAbout={() => handleNavClick('about')}
              onOpenProduct={handleOpenProductDetail}
              products={products}
            />
            <CaskSelectionTrust
              onOpenShop={() => handleNavClick('shop')}
              onOpenAbout={() => handleNavClick('about')}
              onOpenSustainability={() => handleNavClick('sustainability')}
            />
            <BlogTeaser
              posts={blogPosts}
              onOpenBlog={() => handleNavClick('blog')}
              onOpenPost={setSelectedPost}
              onOpenShop={() => handleNavClick('shop')}
            />
            <FAQSection />
            <NewsletterSection onSubscribe={handleAddNewsletterSubscriber} />
          </>
        )}
      </main>

      <Footer
        onOpenLegal={setLegalType}
        setActiveTab={handleNavClick}
      />

      <PhilosophyModal
        isOpen={isPhilosophyOpen}
        onClose={() => setIsPhilosophyOpen(false)}
      />

      <BlogPostModal
        post={selectedPost}
        onClose={() => setSelectedPost(null)}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCompleteOrder={handleCompleteOrder}
        onOpenLegal={setLegalType}
      />

      <InvoiceModal
        isOpen={isInvoiceModalOpen}
        onClose={handleCloseInvoice}
        order={invoiceModalOrder}
      />

      <LegalModal
        type={legalType}
        onClose={() => setLegalType(null)}
      />

      {/* Paid Confirmation Modal upon returning from Mollie */}
      {paidConfirmationOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm">
          <div className="bg-white border border-[#D4C8B8] rounded-3xl max-w-md w-full p-8 shadow-2xl space-y-6 text-center relative animate-in fade-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-[#2D6A4F]/10 text-[#2D6A4F] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h3 className="font-woodblock text-2xl sm:text-3xl uppercase text-[#181F1C]">
                Zahlung erfolgreich!
              </h3>
              <p className="text-xs text-[#55695E] leading-relaxed">
                Vielen Dank für Ihre Bestellung. Ihre Zahlung wurde bestätigt und die Bestelleingangsbestätigung wurde an <strong>{paidConfirmationOrder.customer?.email}</strong> übermittelt.
              </p>
            </div>

            <div className="bg-[#FAF8F5] border border-[#E2DDD5] rounded-xl p-4 text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-[#55695E]">Bestellnummer:</span>
                <span className="font-bold font-mono text-[#181F1C]">#{paidConfirmationOrder.orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#55695E]">Zahlungsstatus:</span>
                <span className="text-[#2D6A4F] font-bold font-craft-mono">🟢 Erfolgreich bezahlt</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#55695E]">Gesamtbetrag:</span>
                <span className="font-bold text-[#B85D2C]">{Number(paidConfirmationOrder.total || 0).toFixed(2)} €</span>
              </div>
            </div>

            <button
              onClick={() => setPaidConfirmationOrder(null)}
              className="w-full py-3.5 bg-[#B85D2C] hover:bg-[#A04E24] text-white rounded-xl text-xs uppercase tracking-widest font-bold transition-all shadow-md cursor-pointer"
            >
              Zurück zum Shop
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
