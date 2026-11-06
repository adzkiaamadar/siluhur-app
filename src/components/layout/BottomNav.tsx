import React from 'react';
import { Home, Compass, HeartPulse, User } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

export type TabType = 'home' | 'explore' | 'factcheck' | 'tracker' | 'profile';

interface BottomNavProps {
  activeTab: TabType;
  onChangeTab: (tab: TabType) => void;
}

export function BottomNav({ activeTab, onChangeTab }: BottomNavProps) {
  const { t } = useLanguage();

  const tabs = [
    { id: 'home' as TabType, label: t('navHome'), icon: Home },
    { id: 'explore' as TabType, label: t('navExplore'), icon: Compass },
    { id: 'tracker' as TabType, label: t('navTracker'), icon: HeartPulse },
    { id: 'profile' as TabType, label: t('navProfile'), icon: User },
  ];

  return (
    <nav
      aria-label="Navigasi Utama"
      className="md:hidden sticky bottom-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200/80 px-2 py-2 flex items-center justify-around shrink-0 shadow-xs"
    >
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChangeTab(tab.id)}
            className={`flex flex-col items-center justify-center min-w-[56px] min-h-[46px] py-1 px-1 rounded-xl transition-all ${
              isActive
                ? 'text-[#253D32] font-semibold'
                : 'text-stone-400 hover:text-stone-700'
            }`}
          >
            <div
              className={`p-1 rounded-xl transition-all ${
                isActive ? 'bg-[#F2F5ED] text-[#253D32]' : ''
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.4]' : 'stroke-[1.8]'}`} />
            </div>
            <span
              className={`text-[10px] tracking-tight mt-0.5 whitespace-nowrap ${
                isActive ? 'font-bold text-[#253D32]' : 'font-medium text-stone-500'
              }`}
            >
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
