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
  deleteOrderFromServer,
  checkMolliePaymentStatus,
  getPendingCheckout,
  clearPendingCheckout,
  fetchProductsFromServer,
  syncProductsToServer,
  deductStockOnServer,
  fetchBlogPostsFromServer,
  syncBlogPostsToServer,
  fetchCrmCustomersFromServer,
  syncCrmCustomersToServer,
  fetchNewsletterSubsFromServer,
  syncNewsletterSubsToServer
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


  // 0. Canonical Redirect to pure-whisky.com
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hostname.includes('pure-whisky.friese-scholz.workers.dev')) {
      window.location.replace(`https://pure-whisky.com${window.location.pathname}${window.location.search}${window.location.hash}`);
    }
  }, []);

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

  // Persistent Products & Pricing with Cloudflare KV Sync
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('pure_whisky_products_v5');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
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

  const refreshProductsFromKV = async () => {
    try {
      const serverProducts = await fetchProductsFromServer();
      if (serverProducts && Array.isArray(serverProducts) && serverProducts.length > 0) {
        setProducts(serverProducts);
      }
    } catch (e) {
      console.warn('Could not sync products from KV:', e);
    }
  };

  const handleUpdateProduct = (updatedProduct) => {
    setProducts(prev => {
      const next = prev.map(p => p.id === updatedProduct.id ? updatedProduct : p);
      syncProductsToServer(next);
      return next;
    });
    if (selectedProduct && selectedProduct.id === updatedProduct.id) {
      setSelectedProduct(updatedProduct);
    }
  };

  const handleCreateProduct = (newProduct) => {
    setProducts(prev => {
      const next = [newProduct, ...prev];
      syncProductsToServer(next);
      return next;
    });
  };

  const handleDeleteProduct = (productId) => {
    setProducts(prev => {
      const next = prev.filter(p => p.id !== productId);
      syncProductsToServer(next);
      return next;
    });
    if (selectedProduct && selectedProduct.id === productId) {
      setSelectedProduct(products.find(p => p.id !== productId) || PRODUCTS[0]);
    }
  };

  const handleResetProducts = () => {
    if (window.confirm('Möchten Sie alle Fässer, Preise und Verfügbarkeiten auf die Standardwerte zurücksetzen?')) {
      setProducts(PRODUCTS);
      syncProductsToServer(PRODUCTS);
      try {
        localStorage.removeItem('pure_whisky_products_v5');
      } catch (e) {
        console.error(e);
      }
    }
  };

  // Persistent Blog Posts with Cloudflare KV Sync
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

  const refreshBlogPostsFromKV = async () => {
    try {
      const serverPosts = await fetchBlogPostsFromServer();
      if (serverPosts && Array.isArray(serverPosts) && serverPosts.length > 0) {
        setBlogPosts(serverPosts);
      }
    } catch (e) {
      console.warn('Could not sync blog posts from KV:', e);
    }
  };

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
          const cleaned = parsed.filter(o => 
            (!['1831', '1224', '1545', '1270', '1274', '1276'].includes(o.orderId) || o.contractConcluded || o.status === 'rechnung_versendet') &&
            o.status !== 'zahlung_ausstehend'
          );
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
    const hasOrderReturn = urlParams.has('order_return') || urlParams.get('order_status') === 'paid';
    const paymentIdFromUrl = urlParams.get('payment_id');
    const sessionIdFromUrl = urlParams.get('session_id');

    if (hasOrderReturn) {
      // Clean query string from URL immediately to prevent re-triggering on refresh
      const cleanUrl = window.location.pathname;
      window.history.replaceState({}, document.title, cleanUrl);

      (async () => {
        // Retrieve pending checkout (by paymentId or sessionId)
        let resolved = await getPendingCheckout(paymentIdFromUrl, sessionIdFromUrl);
        let pendingPaymentId = paymentIdFromUrl || resolved?.paymentId;
        let checkoutData = resolved?.checkoutData;

        if (!pendingPaymentId) {
          try {
            const raw = localStorage.getItem('pure_whisky_pending_checkout');
            if (raw) {
              const localData = JSON.parse(raw);
              pendingPaymentId = localData.paymentId;
              checkoutData = checkoutData || localData.checkoutData;
            }
          } catch (e) {}
        }

        if (!pendingPaymentId) {
          console.warn('No payment ID found for order return');
          return;
        }

        // Guard against duplicate execution in the same session
        if (processingMollieOrdersRef.current.has(pendingPaymentId)) {
          return;
        }
        processingMollieOrdersRef.current.add(pendingPaymentId);

        // Check persistent storage of already confirmed payments
        let confirmedPayments = [];
        try {
          confirmedPayments = JSON.parse(localStorage.getItem('pure_whisky_confirmed_payments') || '[]');
        } catch {}
        if (confirmedPayments.includes(pendingPaymentId)) {
          return;
        }

        // 1. STRICT VERIFICATION WITH MOLLIE API DIRECTLY
        const checkResult = await checkMolliePaymentStatus(pendingPaymentId);
        
        if (!checkResult.paid) {
          // The customer aborted, cancelled, or the payment is not completed!
          console.log('Mollie payment status is not paid:', checkResult.status);
          await clearPendingCheckout(pendingPaymentId, sessionIdFromUrl);
          if (checkResult.status === 'canceled') {
            alert('Der Bezahlvorgang bei Mollie wurde abgebrochen. Es wurde kein Betrag eingezogen und keine Bestellung ausgelöst. Ihr Warenkorb ist weiterhin unverändert vorhanden.');
          } else if (checkResult.status === 'failed') {
            alert('Die Zahlung konnte leider nicht durchgeführt werden. Es wurde kein Betrag abgebucht. Bitte versuchen Sie es mit einer anderen Zahlungsmethode erneut.');
          }
          return;
        }

        // 2. PAYMENT IS 100% CONFIRMED AS PAID BY MOLLIE!
        confirmedPayments.push(pendingPaymentId);
        try {
          localStorage.setItem('pure_whisky_confirmed_payments', JSON.stringify(confirmedPayments));
        } catch {}

        if (!checkoutData || !checkoutData.customer) {
          try {
            const legacyPending = localStorage.getItem('pure_whisky_pending_order');
            if (legacyPending) checkoutData = JSON.parse(legacyPending);
          } catch {}
        }

        if (!checkoutData || !checkoutData.customer) {
          console.warn('Paid order missing checkout details:', pendingPaymentId);
          return;
        }

        // 3. Fetch official consecutive order ID from Cloudflare KV (idempotent per paymentId)
        let orderId = null;
        let invoiceNumber = null;
        let existingServerOrder = null;
        try {
          const idRes = await fetch(`/api/orders/next-id?paymentId=${encodeURIComponent(pendingPaymentId)}`);
          if (idRes.ok) {
            const idData = await idRes.json();
            if (idData.orderId) {
              orderId = idData.orderId.toString();
              invoiceNumber = idData.invoiceNumber || `A09401${orderId}`;
              if (idData.isExisting && idData.order) {
                existingServerOrder = idData.order;
              }
            }
          }
        } catch (idErr) {
          console.warn('Could not fetch next-id from KV:', idErr);
        }

        if (!orderId) {
          const localLast = parseInt(localStorage.getItem('pure_last_order_id') || '1277', 10);
          const nextLocal = localLast + 1;
          orderId = nextLocal.toString();
          invoiceNumber = `A09401${orderId}`;
          try { localStorage.setItem('pure_last_order_id', orderId); } catch {}
        }

        const todayStr = new Date().toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });

        const finalizedOrder = {
          ...(existingServerOrder || {}),
          orderId,
          invoiceNumber,
          paymentId: pendingPaymentId,
          date: existingServerOrder?.date || todayStr,
          createdAt: existingServerOrder?.createdAt || new Date().toISOString(),
          customer: checkoutData.customer || existingServerOrder?.customer,
          paymentMethod: `Online-Zahlung (${pendingPaymentId}) – ${checkoutData.customer?.email || ''}`,
          paymentStatus: `Bezahlt (${checkResult.method || 'Online-Zahlung'})`,
          items: checkoutData.items || existingServerOrder?.items || [],
          shipping: checkoutData.shipping ?? existingServerOrder?.shipping ?? 0,
          total: checkoutData.total || existingServerOrder?.total,
          netTotal: (checkoutData.total || existingServerOrder?.total) / 1.19,
          vatTotal: (checkoutData.total || existingServerOrder?.total) - ((checkoutData.total || existingServerOrder?.total) / 1.19),
          status: existingServerOrder?.status || 'neu_eingegangen',
          invoiceSentAt: existingServerOrder?.invoiceSentAt || null,
          contractConcluded: existingServerOrder?.contractConcluded || false,
          confirmationEmailSent: true
        };

        // 4. Update React state & localStorage
        setOrders(prev => {
          const exists = prev.some(o => o.orderId === orderId);
          const next = exists 
            ? prev.map(o => o.orderId === orderId ? finalizedOrder : o)
            : [finalizedOrder, ...prev];
          try { localStorage.setItem('pure_whisky_orders', JSON.stringify(next)); } catch {}
          return next;
        });

        // 5. Sync to server KV so ALL devices see the paid order immediately
        await syncOrderToServer(finalizedOrder);

        // 6. Automatically deduct stock safely on server without overwriting product metadata or tasting notes
        if (checkoutData.items && checkoutData.items.length > 0) {
          deductStockOnServer(checkoutData.items).then(serverProds => {
            if (serverProds && Array.isArray(serverProds) && serverProds.length > 0) {
              setProducts(serverProds);
            }
          });
        }
        setProducts(prevProducts => {
          return prevProducts.map(prod => {
            const orderedItem = checkoutData.items?.find(item => item.id === prod.id);
            if (orderedItem) {
              const currentRemaining = typeof prod.bottlesRemaining === 'number' ? prod.bottlesRemaining : (prod.stock || 48);
              const newRemaining = Math.max(0, currentRemaining - (orderedItem.quantity || 1));
              return {
                ...prod,
                bottlesRemaining: newRemaining,
                stock: newRemaining,
                isAvailable: newRemaining > 0,
                soldOut: newRemaining === 0,
                badge: newRemaining === 0 ? 'Ausverkauft' : prod.badge
              };
            }
            return prod;
          });
        });

        // 7. Automatically add customer to WooCommerce CRM
        setWooCustomers(prev => {
          const emailLower = (finalizedOrder.customer?.email || '').toLowerCase().trim();
          if (prev.some(c => c.email.toLowerCase().trim() === emailLower)) {
            return prev;
          }
          const newCust = {
            id: `crm_woo_${Date.now()}`,
            firstName: finalizedOrder.customer.firstName,
            lastName: finalizedOrder.customer.lastName,
            fullName: `${finalizedOrder.customer.firstName} ${finalizedOrder.customer.lastName}`.trim(),
            email: finalizedOrder.customer.email,
            subscribedAt: new Date().toISOString().replace('T', ' ').slice(0, 19),
            confirmedAt: new Date().toISOString().replace('T', ' ').slice(0, 19),
            listStatus: 'subscribed',
            globalStatus: 'subscribed',
            listName: 'WooCommerce Customers'
          };
          const updatedCust = [newCust, ...prev];
          try { localStorage.setItem('pure_whisky_woo_customers', JSON.stringify(updatedCust)); } catch {}
          syncCrmCustomersToServer(updatedCust);
          return updatedCust;
        });

        // 8. Clear cart & pending checkout
        setCartItems([]);
        try { localStorage.removeItem('pure_whisky_cart'); } catch {}
        await clearPendingCheckout(pendingPaymentId, sessionIdFromUrl);

        // 9. Send Emails (Order Confirmation to customer + Admin alert to Ines)
        if (!existingServerOrder?.confirmationEmailSent) {
          try {
            await sendOrderConfirmationEmail({ order: finalizedOrder, adminEmail });
          } catch (e) {
            console.warn('Could not send confirmation email:', e);
          }
        }

        // 10. Show Paid Confirmation Modal
        setPaidConfirmationOrder(finalizedOrder);
      })();
    }
  }, [adminEmail]);

  const handleRefreshOrders = async () => {
    try {
      const serverOrders = await fetchOrdersFromServer();
      if (serverOrders && Array.isArray(serverOrders)) {
        // Exclude legacy test order IDs and unconfirmed/cancelled test orders
        const cleaned = serverOrders.filter(o => 
          (!['1831', '1224', '1545', '1270', '1274', '1276'].includes(o.orderId) || o.status === 'rechnung_versendet' || o.contractConcluded) && 
          o.status !== 'zahlung_ausstehend'
        );
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

  // Refresh CRM from Cloudflare KV
  const refreshCrmCustomersFromKV = async () => {
    try {
      const serverCust = await fetchCrmCustomersFromServer();
      if (serverCust && Array.isArray(serverCust) && serverCust.length > 0) {
        setWooCustomers(serverCust);
      } else {
        if (wooCustomers && wooCustomers.length > 0) syncCrmCustomersToServer(wooCustomers);
      }
    } catch (e) {
      console.warn('Could not sync CRM customers from KV:', e);
    }
  };

  const refreshNewsletterSubsFromKV = async () => {
    try {
      const serverSubs = await fetchNewsletterSubsFromServer();
      if (serverSubs && Array.isArray(serverSubs) && serverSubs.length > 0) {
        setNewsletterSubs(serverSubs);
      } else {
        if (newsletterSubs && newsletterSubs.length > 0) syncNewsletterSubsToServer(newsletterSubs);
      }
    } catch (e) {
      console.warn('Could not sync newsletter subs from KV:', e);
    }
  };

  // Automatically sync ALL data from Cloudflare KV on mount, tab change, or window focus
  useEffect(() => {
    refreshProductsFromKV();
    refreshBlogPostsFromKV();
    refreshCrmCustomersFromKV();
    refreshNewsletterSubsFromKV();
    handleRefreshOrders();

    const handleFocus = () => {
      refreshProductsFromKV();
      refreshBlogPostsFromKV();
      refreshCrmCustomersFromKV();
      refreshNewsletterSubsFromKV();
      handleRefreshOrders();
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
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
      const updated = [newEntry, ...prev];
      syncNewsletterSubsToServer(updated);
      return updated;
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
    setNewsletterSubs(prev => {
      const updated = prev.map(s => {
        const sEmail = (s.email || '').toLowerCase().trim();
        const sId = (s.id || '').toLowerCase().trim();
        if (sEmail === term || sId === term) {
          const nextStatus = s.listStatus === 'subscribed' ? 'unsubscribed' : 'subscribed';
          return { ...s, listStatus: nextStatus, globalStatus: nextStatus };
        }
        return s;
      });
      syncNewsletterSubsToServer(updated);
      return updated;
    });
  };

  const handleDeleteNewsletterSubscriber = (identifier, secondaryId) => {
    const term = (identifier || '').toLowerCase().trim();
    const sec = (secondaryId || '').toLowerCase().trim();
    setNewsletterSubs(prev => {
      const updated = prev.filter(s => {
        const sEmail = (s.email || '').toLowerCase().trim();
        const sId = (s.id || '').toLowerCase().trim();
        if (term && (sEmail === term || sId === term)) return false;
        if (sec && (sEmail === sec || sId === sec)) return false;
        return true;
      });
      syncNewsletterSubsToServer(updated);
      return updated;
    });
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
      const updated = [cust, ...prev];
      syncCrmCustomersToServer(updated);
      return updated;
    });
  };

  const handleDeleteWooCustomer = (identifier, secondaryId) => {
    const term = (identifier || '').toLowerCase().trim();
    const sec = (secondaryId || '').toLowerCase().trim();
    setWooCustomers(prev => {
      const updated = prev.filter(c => {
        const cEmail = (c.email || '').toLowerCase().trim();
        const cId = (c.id || '').toLowerCase().trim();
        if (term && (cEmail === term || cId === term)) return false;
        if (sec && (cEmail === sec || cId === sec)) return false;
        return true;
      });
      syncCrmCustomersToServer(updated);
      return updated;
    });
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
    syncBlogPostsToServer(updated);
    try {
      localStorage.setItem('pure_whisky_posts_v4', JSON.stringify(updated));
    } catch (e) {
      console.warn('LocalStorage limit exceeded when saving blog posts:', e);
    }
  };

  const handleDeleteBlogPost = (postId) => {
    const updated = blogPosts.filter(p => p.id !== postId);
    setBlogPosts(updated);
    syncBlogPostsToServer(updated);
    try {
      localStorage.setItem('pure_whisky_posts_v4', JSON.stringify(updated));
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
