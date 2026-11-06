import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AppLanguage, translations, TranslationKey } from './translations';
import { Globe } from 'lucide-react';

interface LanguageContextType {
  language: AppLanguage;
  setLanguage: (lang: AppLanguage) => void;
  toggleLanguage: () => void;
  t: (key: TranslationKey, params?: Record<string, string | number>) => string;
}

const LANGUAGE_KEY = 'siluhur_language_preference_v1';

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<AppLanguage>(() => {
    try {
      const saved = localStorage.getItem(LANGUAGE_KEY);
      if (saved === 'en' || saved === 'id') return saved;
    } catch {}
    return 'id'; // default to Bahasa Indonesia
  });

  const setLanguage = (lang: AppLanguage) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(LANGUAGE_KEY, lang);
    } catch (e) {
      console.warn('Failed to save language preference:', e);
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'id' ? 'en' : 'id');
  };

  const t = (key: TranslationKey, params?: Record<string, string | number>): string => {
    const langDict = translations[language] || translations.id;
    let text = langDict[key] || translations.id[key] || (key as string);

    if (params) {
      Object.entries(params).forEach(([paramKey, val]) => {
        text = text.replace(new RegExp(`\\{${paramKey}\\}`, 'g'), String(val));
      });
    }

    return text;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
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

interface LanguageToggleProps {
  className?: string;
  variant?: 'pill' | 'compact' | 'segmented';
}

/**
 * Clean, accessible Language Switcher Toggle
 * Complies with anti-slop guidelines: segmented control with clean contrast
 */
export function LanguageToggle({ className = '', variant = 'segmented' }: LanguageToggleProps) {
  const { language, setLanguage } = useLanguage();

  if (variant === 'compact') {
    return (
      <button
        onClick={() => setLanguage(language === 'id' ? 'en' : 'id')}
        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white border border-stone-200/90 text-stone-700 hover:text-stone-900 shadow-2xs text-xs font-bold transition-all ${className}`}
        title={language === 'id' ? 'Ganti ke Bahasa Inggris' : 'Switch to Indonesian'}
        aria-label="Switch Language"
      >
        <Globe className="w-3.5 h-3.5 text-[#253D32]" />
        <span>{language === 'id' ? 'EN' : 'ID'}</span>
      </button>
    );
  }

  return (
    <div
      className={`inline-flex items-center p-0.5 rounded-xl bg-stone-100 border border-stone-200/80 text-[11px] font-bold select-none ${className}`}
      role="group"
      aria-label="Language selection"
    >
      <button
        type="button"
        onClick={() => setLanguage('id')}
        className={`px-2.5 py-1 rounded-lg transition-all ${
          language === 'id'
            ? 'bg-white text-[#253D32] shadow-2xs font-extrabold'
            : 'text-stone-500 hover:text-stone-800'
        }`}
      >
        ID
      </button>
      <button
        type="button"
        onClick={() => setLanguage('en')}
        className={`px-2.5 py-1 rounded-lg transition-all ${
          language === 'en'
            ? 'bg-white text-[#253D32] shadow-2xs font-extrabold'
            : 'text-stone-500 hover:text-stone-800'
        }`}
      >
        EN
      </button>
    </div>
  );
}
