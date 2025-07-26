import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { webinarTranslationsEN, webinarTranslationsRU, webinarTranslationsKK } from './translations';

type LanguageType = 'en' | 'ru' | 'kk';

interface TranslationsContextType {
  t: (key: string) => string;
  currentLanguage: LanguageType;
  setLanguage: (language: LanguageType) => void;
}

const TranslationsContext = createContext<TranslationsContextType | null>(null);

export const WebinarTranslationsProvider = ({ children }: { children: ReactNode }) => {
  const [currentLanguage, setCurrentLanguage] = useState<LanguageType>('ru');

  useEffect(() => {
    // Try to get language from localStorage or browser settings
    const savedLanguage = localStorage.getItem('language') as LanguageType;
    if (savedLanguage && ['en', 'ru', 'kk'].includes(savedLanguage)) {
      setCurrentLanguage(savedLanguage);
    } else if (navigator.language.startsWith('ru')) {
      setCurrentLanguage('ru');
    } else if (navigator.language.startsWith('kk')) {
      setCurrentLanguage('kk');
    } else {
      setCurrentLanguage('en');
    }
  }, []);

  const translations = {
    en: webinarTranslationsEN,
    ru: webinarTranslationsRU,
    kk: webinarTranslationsKK,
  };

  const t = (key: string): string => {
    const currentTranslations = translations[currentLanguage];
    const keys = key.split('.');
    let value: any = currentTranslations;
    
    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) {
        return key;
      }
    }
    
    return typeof value === 'string' ? value : key;
  };

  const setLanguage = (language: LanguageType): void => {
    setCurrentLanguage(language);
    localStorage.setItem('language', language);
  };

  return (
    <TranslationsContext.Provider value={{ t, currentLanguage, setLanguage }}>
      {children}
    </TranslationsContext.Provider>
  );
};

export const useWebinarTranslations = (): TranslationsContextType => {
  const context = useContext(TranslationsContext);
  if (!context) {
    throw new Error('useWebinarTranslations must be used within a WebinarTranslationsProvider');
  }
  return context;
};
