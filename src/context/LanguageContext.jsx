import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../i18n/translations';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    try {
      const saved = localStorage.getItem('pure_whisky_lang');
      return saved === 'en' ? 'en' : 'de';
    } catch {
      return 'de';
    }
  });

  const setLang = (newLang) => {
    const valid = newLang === 'en' ? 'en' : 'de';
    setLangState(valid);
    try {
      localStorage.setItem('pure_whisky_lang', valid);
    } catch (e) {
      console.warn('Could not save language preference:', e);
    }
  };

  const toggleLang = () => {
    setLang(lang === 'de' ? 'en' : 'de');
  };

  const t = translations[lang] || translations.de;

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
