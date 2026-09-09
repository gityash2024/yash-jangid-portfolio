'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { SupportedLanguage, LANGUAGES, translations } from '@/lib/translations';

interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: (key: string, fallback?: string) => string;
  dir: 'ltr' | 'rtl';
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key: string, fallback?: string) => fallback || key,
  dir: 'ltr',
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<SupportedLanguage>('en');

  useEffect(() => {
    try {
      const savedLang = localStorage.getItem('preferred_language') as SupportedLanguage;
      if (savedLang && LANGUAGES[savedLang]) {
        setLanguageState(savedLang);
        document.documentElement.lang = savedLang;
        document.documentElement.dir = LANGUAGES[savedLang].dir;
      }
    } catch {
      // safe fallback
    }
  }, []);

  const setLanguage = (lang: SupportedLanguage) => {
    if (!LANGUAGES[lang]) return;
    setLanguageState(lang);
    try {
      localStorage.setItem('preferred_language', lang);
      document.documentElement.lang = lang;
      document.documentElement.dir = LANGUAGES[lang].dir;
    } catch {
      // safe fallback
    }
  };

  const t = (key: string, fallback?: string): string => {
    const langDict = translations[language] || translations.en;
    if (langDict && langDict[key]) {
      return langDict[key];
    }
    const defaultDict = translations.en;
    if (defaultDict && defaultDict[key]) {
      return defaultDict[key];
    }
    return fallback !== undefined ? fallback : key;
  };

  const dir = LANGUAGES[language]?.dir || 'ltr';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
