import React, { useState, useEffect } from 'react';
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
import { sendOrderConfirmationEmail, sendInvoiceEmail } from './services/orderService';

function getTabFromUrl() {
  if (typeof window === 'undefined') return 'home';
  const path = window.location.pathname.toLowerCase().trim();
  if (path === '/admin' || path.startsWith('/admin')) return 'admin';
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
    const saved = localStorage.getItem('pure_whisky_products_v2');
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
      localStorage.setItem('pure_whisky_products_v2', JSON.stringify(products));
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

  const handleResetProducts = () => {
    if (window.confirm('Möchten Sie alle Fässer, Preise und Verfügbarkeiten auf die Standardwerte zurücksetzen?')) {
      setProducts(PRODUCTS);
      try {
        localStorage.removeItem('pure_whisky_products_v2');
      } catch (e) {
        console.error(e);
      }
    }
  };

  // Persistent Blog Posts
  const [blogPosts, setBlogPosts] = useState(() => {
    try {
      const saved = localStorage.getItem('pure_whisky_posts_v3');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to parse blog posts from localStorage:', e);
    }
    return BLOG_POSTS;
  });

  useEffect(() => {
    try {
      localStorage.setItem('pure_whisky_posts_v3', JSON.stringify(blogPosts));
    } catch (e) {
      console.warn('LocalStorage limit exceeded when saving blog posts:', e);
    }
  }, [blogPosts]);

  // Cross-tab synchronization for blog posts & CRM
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'pure_whisky_posts_v3' && e.newValue) {
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



  // Persistent Orders (with Jürgen Eisner real order as seed)
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('pure_whisky_orders');
    if (saved) {
      try {
        return JSON.parse(saved);
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

  // Admin Notification Email Setting (default: friese.scholz@gmail.com)
  const [adminEmail, setAdminEmail] = useState(() => {
    return localStorage.getItem('pure_whisky_admin_email') || 'friese.scholz@gmail.com';
  });

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

  // Orders & Invoice Handlers
  const handleSendInvoice = async (orderId) => {
    const targetOrder = orders.find(o => o.orderId === orderId);
    const now = new Date();
    const dateStr = now.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });
    const timeStr = now.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });

    setOrders(prev => prev.map(o => {
      if (o.orderId === orderId) {
        return {
          ...o,
          status: 'rechnung_versendet',
          contractConcluded: true,
          invoiceSentAt: `${dateStr}, ${timeStr} Uhr`
        };
      }
      return o;
    }));

    if (targetOrder) {
      try {
        await sendInvoiceEmail({ order: { ...targetOrder, date: dateStr }, adminEmail });
      } catch (mailErr) {
        console.warn('Resend invoice dispatch notice:', mailErr);
      }
    }

    alert(`Rechnung zu Bestellung #${orderId} wurde erfolgreich per Resend übermittelt!\n\n• Absender: noreply@scholz-friese-webdesign.de\n• Antwort-Adresse: info@pure-whisky.com\n• Empfänger: ${targetOrder?.customer?.email}\n• Bcc an Admin: ${adminEmail}\n\nDer Kaufvertrag ist damit rechtswirksam geschlossen.`);
  };

  const handleOpenInvoice = (order) => {
    setInvoiceModalOrder(order);
    setIsInvoiceModalOpen(true);
  };

  const handleCloseInvoice = () => {
    setIsInvoiceModalOpen(false);
    setInvoiceModalOrder(null);
  };

  const handleCompleteOrder = async (newOrder) => {
    setOrders(prev => [newOrder, ...prev]);

    // Send order confirmation via Resend API
    try {
      await sendOrderConfirmationEmail({ order: newOrder, adminEmail });
    } catch (confErr) {
      console.warn('Resend order confirmation notice:', confErr);
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

    // Clear cart
    setCartItems([]);
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
            onResetProducts={handleResetProducts}
            onNavigateProduct={handleOpenProductDetail}
            // Orders & Invoices Props
            orders={orders}
            onSendInvoice={handleSendInvoice}
            onViewInvoice={handleOpenInvoice}
            onAddTestOrder={handleAddTestOrder}
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
    </div>
  );
}
