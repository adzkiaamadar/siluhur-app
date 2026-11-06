import React, { useState } from 'react';
import {
  Menu,
  X,
  Home,
  Compass,
  ShieldCheck,
  HeartPulse,
  ShoppingBag,
  BookOpen,
  FileText,
  User,
  LogIn,
  LogOut,
  Info,
  ChevronRight,
} from 'lucide-react';
import { TabType } from './BottomNav';
import { UserProfile } from '../../types';
import { useLanguage, LanguageToggle } from '../../i18n/LanguageContext';

interface AppHeaderProps {
  activeTab: TabType;
  currentScreen: string;
  onNavigateTab: (tab: TabType) => void;
  onNavigateScreen: (screenName: string) => void;
  onOpenEthicsModal: () => void;
  user: UserProfile | null;
  onLogout: () => void;
  onOpenLogin: () => void;
}

export function AppHeader({
  activeTab,
  currentScreen,
  onNavigateTab,
  onNavigateScreen,
  onOpenEthicsModal,
  user,
  onLogout,
  onOpenLogin,
}: AppHeaderProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { t, language } = useLanguage();

  const navItems = [
    {
      id: 'home',
      label: t('navHome'),
      desc: t('homeDesc'),
      icon: Home,
      type: 'tab',
      tabId: 'home' as TabType,
    },
    {
      id: 'explore',
      label: t('navExplore'),
      desc: t('exploreDesc'),
      icon: Compass,
      type: 'tab',
      tabId: 'explore' as TabType,
    },
    {
      id: 'factcheck',
      label: `${t('navFactCheck')} (SiLuhur Check)`,
      desc: t('factCheckDesc'),
      icon: ShieldCheck,
      type: 'screen',
      screenId: 'factcheck',
    },
    {
      id: 'tracker',
      label: t('navTracker'),
      desc: t('trackerDesc'),
      icon: HeartPulse,
      type: 'tab',
      tabId: 'tracker' as TabType,
    },
    {
      id: 'food_facts',
      label: t('navFoodFacts'),
      desc: t('foodFactsDesc'),
      icon: ShoppingBag,
      type: 'screen',
      screenId: 'food_facts',
    },
    {
      id: 'therapies',
      label: t('navTherapies'),
      desc: t('therapiesDesc'),
      icon: BookOpen,
      type: 'screen',
      screenId: 'therapies',
    },
    {
      id: 'rempah_pedia',
      label: t('navRempahPedia'),
      desc: t('rempahPediaDesc'),
      icon: FileText,
      type: 'screen',
      screenId: 'rempah_pedia',
    },
  ];

  const handleItemClick = (item: (typeof navItems)[0]) => {
    if (item.type === 'tab' && item.tabId) {
      onNavigateTab(item.tabId);
    } else if (item.type === 'screen' && item.screenId) {
      onNavigateScreen(item.screenId);
    }
    setIsDrawerOpen(false);
  };

  const isItemActive = (item: (typeof navItems)[0]) => {
    if (item.type === 'screen') return currentScreen === item.screenId;
    return currentScreen === 'main' && activeTab === item.tabId;
  };

  return (
    <>
      {/* Top Bar: Only Logo, Language, Tanya AI, Akun, and Hamburger Button (Hidden on Mobile) */}
      <header className="hidden md:block sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200/90 shadow-2xs">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-3">
          {/* 1. Logo & Brand Left */}
          <button
            onClick={() => {
              onNavigateTab('home');
              onNavigateScreen('main');
            }}
            className="flex items-center gap-2.5 text-left group shrink-0"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#253D32] flex items-center justify-center text-white shadow-2xs group-hover:bg-[#1A2D25] transition-colors">
              <svg viewBox="0 0 100 100" className="w-5 h-5 sm:w-6 sm:h-6">
                <path
                  d="M50 12 L86 50 L50 88 L14 50 Z"
                  fill="none"
                  stroke="white"
                  strokeWidth="8"
                  strokeLinejoin="round"
                />
                <path
                  d="M50 26 C62 38 62 62 50 74 C38 62 38 38 50 26 Z"
                  fill="white"
                />
                <circle cx="50" cy="50" r="5" fill="#FFF0D3" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-['Outfit'] font-bold text-base sm:text-lg text-stone-900 tracking-tight">
                  {t('appName')}
                </span>
                <span className="hidden sm:inline text-[10px] uppercase font-bold tracking-widest text-[#A64F36] bg-[#FFF0D3] px-1.5 py-0.5 rounded">
                  {t('ebmBadge')}
                </span>
              </div>
              <p className="text-[10px] text-stone-500 hidden sm:block leading-none">
                {t('appTagline')}
              </p>
            </div>
          </button>

          {/* 2. Right Elements: Language Switcher, Tanya AI, Akun, and Hamburger Toggle */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            {/* Language Switcher */}
            <LanguageToggle />

            {/* Tanya AI (Kakek Luhur) */}
            <button
              onClick={() => onNavigateScreen('assistant')}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-[#FFF0D3] hover:bg-[#FCE6BD] border border-[#F4D9A0] text-xs font-semibold text-[#8C3F29] transition-all shadow-2xs"
              title={t('askAi')}
            >
              <img
                src="/assets/aistudio/maskot_siluhur_4eca92db.png"
                alt="Kakek Luhur"
                className="w-4 h-4 object-contain"
              />
              <span className="hidden xs:inline">{t('askAi')}</span>
              <span className="xs:hidden text-xs font-bold">{t('askAiShort')}</span>
            </button>

            {/* Akun: Profile badge or Login button */}
            {user ? (
              <button
                onClick={() => {
                  onNavigateTab('profile');
                  onNavigateScreen('main');
                }}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200/80 text-xs text-stone-700 transition-colors"
                title={`${t('navProfile')}: ${user.name}`}
              >
                <div className="w-5 h-5 rounded-full bg-[#253D32] text-white flex items-center justify-center text-[10px] font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="font-medium max-w-[80px] sm:max-w-[100px] truncate hidden sm:inline">
                  {user.name}
                </span>
              </button>
            ) : (
              <button
                onClick={onOpenLogin}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#253D32] text-white text-xs font-semibold hover:bg-[#1A2D25] transition-all shadow-2xs"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>{t('login')}</span>
              </button>
            )}

            {/* Hamburger Menu Toggle Button */}
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="p-2 sm:px-3 sm:py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 flex items-center gap-1.5 transition-all shadow-2xs border border-stone-200"
              aria-label="Buka Menu Navigasi"
              title="Menu Navigasi SiLuhur"
            >
              <Menu className="w-5 h-5 text-stone-800" />
              <span className="hidden md:inline text-xs font-semibold text-stone-800">
                {t('menu')}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Hamburger Navigation Drawer */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end animate-in fade-in duration-200">
          {/* Backdrop */}
          <div
            onClick={() => setIsDrawerOpen(false)}
            className="fixed inset-0 bg-black/45 backdrop-blur-xs transition-opacity"
            aria-label="Tutup Menu"
          />

          {/* Drawer Panel */}
          <div className="relative w-full max-w-sm sm:max-w-md bg-white h-full shadow-2xl flex flex-col justify-between overflow-y-auto z-10 border-l border-stone-200 animate-in slide-in-from-right duration-250">
            {/* Drawer Header */}
            <div className="p-4 sm:p-5 border-b border-stone-100 flex items-center justify-between bg-[#FAF6F0]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#253D32] flex items-center justify-center text-white shadow-2xs">
                  <svg viewBox="0 0 100 100" className="w-5 h-5">
                    <path
                      d="M50 12 L86 50 L50 88 L14 50 Z"
                      fill="none"
                      stroke="white"
                      strokeWidth="8"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M50 26 C62 38 62 62 50 74 C38 62 38 38 50 26 Z"
                      fill="white"
                    />
                    <circle cx="50" cy="50" r="5" fill="#FFF0D3" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base font-bold text-stone-900 font-['Outfit']">
                    {t('appName')} {t('menu')}
                  </h3>
                  <p className="text-[11px] text-stone-500">{t('appTagline')}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <LanguageToggle />
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="w-9 h-9 rounded-xl bg-white border border-stone-200 flex items-center justify-center text-stone-500 hover:text-stone-900 shadow-2xs transition-colors"
                  aria-label="Tutup Menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* User Account Banner */}
            <div className="p-4 mx-4 mt-4 bg-gradient-to-r from-[#F2F5ED] to-[#E9EFE3] rounded-2xl border border-[#DFE5D5] flex items-center justify-between">
              {user ? (
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-[#253D32] text-white flex items-center justify-center text-xs font-bold shadow-2xs shrink-0">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-stone-900 truncate">
                      {user.name}
                    </h4>
                    <p className="text-[11px] text-stone-500 truncate">{user.email}</p>
                  </div>
                </div>
              ) : (
                <div>
                  <h4 className="text-xs font-bold text-stone-900">
                    {language === 'id' ? 'Selamat Datang di SiLuhur' : 'Welcome to SiLuhur'}
                  </h4>
                  <p className="text-[11px] text-stone-500">
                    {language === 'id'
                      ? 'Masuk untuk menyimpan riwayat & favorit'
                      : 'Sign in to sync bookmarks & history'}
                  </p>
                </div>
              )}

              {user ? (
                <button
                  onClick={() => {
                    setIsDrawerOpen(false);
                    onLogout();
                  }}
                  className="px-2.5 py-1.5 rounded-lg bg-white/90 hover:bg-white text-xs font-semibold text-red-700 flex items-center gap-1 shadow-2xs border border-red-200 shrink-0 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>{t('logout')}</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    setIsDrawerOpen(false);
                    onOpenLogin();
                  }}
                  className="px-3 py-1.5 rounded-lg bg-[#253D32] text-white text-xs font-semibold shadow-2xs shrink-0 hover:bg-[#1A2D25] transition-colors"
                >
                  {t('login')}
                </button>
              )}
            </div>

            {/* Navigation Links inside Drawer */}
            <div className="p-4 space-y-5 flex-1 overflow-y-auto no-scrollbar">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-2 block px-2">
                  {language === 'id' ? 'Navigasi Aplikasi' : 'App Navigation'}
                </span>
                <div className="space-y-1">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const active = isItemActive(item);
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleItemClick(item)}
                        className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-medium text-left transition-all ${
                          active
                            ? 'bg-[#253D32] text-white shadow-xs font-bold'
                            : 'text-stone-700 hover:bg-stone-100 hover:text-stone-900'
                        }`}
                      >
                        <div
                          className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                            active
                              ? 'bg-white/20 text-white'
                              : 'bg-stone-100 text-stone-600'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="truncate font-semibold">{item.label}</p>
                          <p
                            className={`text-[10px] truncate ${
                              active ? 'text-white/80' : 'text-stone-400'
                            }`}
                          >
                            {item.desc}
                          </p>
                        </div>
                        <ChevronRight
                          className={`w-4 h-4 shrink-0 ${
                            active ? 'text-white/70' : 'text-stone-300'
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Extra Features & Info */}
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-2 block px-2">
                  {language === 'id' ? 'Layanan & Bantuan' : 'Services & Support'}
                </span>
                <div className="space-y-1">
                  {/* Tanya Kakek Luhur */}
                  <button
                    onClick={() => {
                      onNavigateScreen('assistant');
                      setIsDrawerOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-medium text-left text-stone-700 hover:bg-[#FFF0D3]/60 transition-all border border-transparent hover:border-[#F4D9A0]"
                  >
                    <div className="w-8 h-8 rounded-xl bg-[#FFF0D3] flex items-center justify-center shrink-0">
                      <img
                        src="/assets/aistudio/maskot_siluhur_4eca92db.png"
                        alt="Kakek Luhur"
                        className="w-5 h-5 object-contain"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-stone-900">
                        {t('askAi')} (AI)
                      </p>
                      <p className="text-[10px] text-stone-500">
                        {t('assistantDesc')}
                      </p>
                    </div>
                    <span className="text-[10px] bg-[#FFF0D3] text-[#A64F36] px-1.5 py-0.5 rounded font-bold shrink-0">
                      {language === 'id' ? 'AI Etnomedisin' : 'Ethnomedicine AI'}
                    </span>
                  </button>

                  {/* Profil Pengguna */}
                  <button
                    onClick={() => {
                      onNavigateTab('profile');
                      onNavigateScreen('main');
                      setIsDrawerOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-medium text-left text-stone-700 hover:bg-stone-100 transition-all"
                  >
                    <div className="w-8 h-8 rounded-xl bg-stone-100 flex items-center justify-center text-stone-600 shrink-0">
                      <User className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-stone-900">
                        {t('navProfile')} & {t('bookmark')}
                      </p>
                      <p className="text-[10px] text-stone-400">
                        {t('profileDesc')}
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-stone-300 shrink-0" />
                  </button>

                  {/* Komitmen Etika & Medis */}
                  <button
                    onClick={() => {
                      setIsDrawerOpen(false);
                      onOpenEthicsModal();
                    }}
                    className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-medium text-left text-stone-700 hover:bg-stone-100 transition-all"
                  >
                    <div className="w-8 h-8 rounded-xl bg-stone-100 flex items-center justify-center text-stone-600 shrink-0">
                      <Info className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-stone-900">
                        {t('ethicsMenu')}
                      </p>
                      <p className="text-[10px] text-stone-400">
                        {t('ethicsDesc')}
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-stone-300 shrink-0" />
                  </button>
                </div>
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="p-4 border-t border-stone-100 bg-[#FAF6F0] flex flex-col items-center text-center">
              {user && (
                <button
                  onClick={() => {
                    setIsDrawerOpen(false);
                    onLogout();
                  }}
                  className="w-full py-2 mb-2 rounded-xl bg-white border border-red-200 text-red-700 hover:bg-red-50 text-xs font-semibold flex items-center justify-center gap-2 shadow-2xs transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>
                    {t('logout')} ({user.name})
                  </span>
                </button>
              )}
              <p className="text-[11px] font-semibold text-stone-700 font-['Outfit']">
                {t('appName')} — {t('appTagline')}
              </p>
              <p className="text-[10px] text-stone-400 mt-0.5">
                {language === 'id'
                  ? 'Integrasi Tradisi Nusantara & Open Food Facts API'
                  : 'Bridging Indonesian Heritage & Open Food Facts API'}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
