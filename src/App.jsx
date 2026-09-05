import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import PillarsStrip from './components/PillarsStrip';
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

import PhilosophyModal from './components/PhilosophyModal';
import BlogPostModal from './components/BlogPostModal';
import CartDrawer from './components/CartDrawer';
import LegalModal from './components/LegalModal';

import { PRODUCTS, BLOG_POSTS } from './data/pureWhiskyFullData';

function getTabFromUrl() {
  if (typeof window === 'undefined') return 'home';
  const path = window.location.pathname.toLowerCase().trim();
  if (path === '/admin' || path.startsWith('/admin')) return 'admin';
  if (path === '/shop' || path.startsWith('/shop') || path.startsWith('/faesser')) return 'shop';
  if (path === '/about' || path.startsWith('/about') || path.startsWith('/ueber-uns') || path.startsWith('/ines-zager')) return 'about';
  if (path === '/sustainability' || path.startsWith('/sustainability') || path.startsWith('/nachhaltigkeit')) return 'sustainability';
  if (path === '/blog' || path.startsWith('/blog') || path.startsWith('/journal') || path.startsWith('/messen')) return 'blog';
  if (path === '/product' || path.startsWith('/product')) return 'product';
  return 'home';
}

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

  // Sync state on component mount & on browser back/forward navigation
  useEffect(() => {
    const handleUrlSync = () => {
      const detected = getTabFromUrl();
      setActiveTab(detected);
    };

    handleUrlSync();
    window.addEventListener('popstate', handleUrlSync);
    return () => window.removeEventListener('popstate', handleUrlSync);
  }, []);

  // Persistent Blog Posts
  const [blogPosts, setBlogPosts] = useState(() => {
    const saved = localStorage.getItem('pure_whisky_posts');
    return saved ? JSON.parse(saved) : BLOG_POSTS;
  });

  // Persistent Contacts CRM
  const [contacts, setContacts] = useState(() => {
    const saved = localStorage.getItem('pure_whisky_contacts');
    if (saved) return JSON.parse(saved);
    return [
      { email: 'm.weber@t-online.de', name: 'Martin Weber', caskInterest: 'Glenburgie 11Y (Vorab-Zuteilung 17.09.)', source: 'vorabzugriff-17september', date: '05.09.2026' },
      { email: 'claudia.schmidt@whisky-club.de', name: 'Claudia Schmidt', caskInterest: 'Highland Park 18Y (Vorab-Zuteilung 17.09.)', source: 'vorabzugriff-17september', date: '04.09.2026' },
      { email: 'dr.hoffmann@kanzlei-nord.de', name: 'Dr. Michael Hoffmann', caskInterest: 'Alle Fässer (Highland & Island)', source: 'shop', date: '30.08.2026' },
      { email: 'j.vogel@whisky-passion.com', name: 'Julia Vogel', caskInterest: 'Aultmore 17Y (Vorab-Zuteilung 17.09.)', source: 'newsletter', date: '02.09.2026' },
      { email: 'kontakt@scholz-friese-webdesign.de', name: 'Scholz & Friese', caskInterest: 'Fettercairn 15Y (Vorab-Zuteilung 17.09.)', source: 'shop', date: '01.09.2026' }
    ];
  });

  useEffect(() => {
    localStorage.setItem('pure_whisky_posts', JSON.stringify(blogPosts));
  }, [blogPosts]);

  useEffect(() => {
    localStorage.setItem('pure_whisky_contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleAddContact = (newContact) => {
    setContacts(prev => {
      const emailLower = newContact.email.toLowerCase().trim();
      if (prev.some(c => c.email.toLowerCase().trim() === emailLower)) {
        return prev;
      }
      return [newContact, ...prev];
    });
  };

  const handleDeleteContact = (emailToDelete) => {
    setContacts(prev => prev.filter(c => c.email.toLowerCase().trim() !== emailToDelete.toLowerCase().trim()));
  };

  const handleBulkDeleteContacts = (emailsToDelete) => {
    const set = new Set(emailsToDelete.map(e => e.toLowerCase().trim()));
    setContacts(prev => prev.filter(c => !set.has(c.email.toLowerCase().trim())));
  };

  const handleSaveBlogPost = (post) => {
    if (post.id) {
      setBlogPosts(prev => prev.map(p => p.id === post.id ? post : p));
    } else {
      const newPost = { ...post, id: Date.now() };
      setBlogPosts(prev => [newPost, ...prev]);
    }
  };

  const handleDeleteBlogPost = (postId) => {
    setBlogPosts(prev => prev.filter(p => p.id !== postId));
  };

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
    handleAddContact({
      email: `kunde-${Date.now().toString().slice(-4)}@whisky-shop.de`,
      name: `Käufer (${product.name})`,
      caskInterest: product.name,
      source: 'shop',
      date: new Date().toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' })
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
          />
        )}

        {activeTab === 'shop' && (
          <ShopView
            onOpenProduct={handleOpenProductDetail}
            onAddToCart={handleAddToCart}
            onPreReserve={handleAddContact}
            onNavigateHome={() => handleNavClick('home')}
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
            contacts={contacts}
            onAddContact={handleAddContact}
            onDeleteContact={handleDeleteContact}
            onBulkDeleteContacts={handleBulkDeleteContacts}
            onNavigateHome={() => handleNavClick('home')}
            onNavigateBlog={() => handleNavClick('blog')}
          />
        )}

        {activeTab === 'home' && (
          <>
            <HeroSection
              onOpenShop={() => handleNavClick('shop')}
              onOpenAbout={() => handleNavClick('about')}
              onOpenProduct={handleOpenProductDetail}
            />
            <PillarsStrip />
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
            <NewsletterSection onSubscribe={handleAddContact} />
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
      />

      <LegalModal
        type={legalType}
        onClose={() => setLegalType(null)}
      />
    </div>
  );
}
