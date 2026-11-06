import React, { useState } from 'react';
import {
  Search,
  Bell,
  ArrowRight,
  ShieldCheck,
  Compass,
  HeartPulse,
  ShoppingBag,
  BookOpen,
  Sparkles,
} from 'lucide-react';
import { TabType } from '../layout/BottomNav';
import { HerbItem } from '../../types';
import { useLanguage, LanguageToggle } from '../../i18n/LanguageContext';

interface HomeScreenProps {
  onNavigate: (tab: TabType) => void;
  onSelectHerb: (herbId: string) => void;
  onOpenAssistant: () => void;
  onOpenTherapies: () => void;
  onOpenFoodFacts: () => void;
  onOpenFactCheck: () => void;
  userName?: string;
  herbs: HerbItem[];
}

export function HomeScreen({
  onNavigate,
  onSelectHerb,
  onOpenAssistant,
  onOpenTherapies,
  onOpenFoodFacts,
  onOpenFactCheck,
  userName = 'Amada',
  herbs,
}: HomeScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const { t, language } = useLanguage();

  // Search filter
  const filteredHerbs = searchQuery.trim()
    ? herbs.filter(
        (h) =>
          h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          h.specificOrigin.toLowerCase().includes(searchQuery.toLowerCase()) ||
          h.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (h.scientificName &&
            h.scientificName.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : [];

  const popularTopics = [
    { label: language === 'id' ? 'Jahe' : 'Ginger', id: 'jahe' },
    { label: language === 'id' ? 'Imun Tubuh' : 'Immunity', id: 'kunyit' },
    { label: language === 'id' ? 'Tidur' : 'Sleep', id: 'tip-2' },
    { label: language === 'id' ? 'Mitos Kesehatan' : 'Health Myths', isFactcheck: true },
    { label: language === 'id' ? 'Temulawak' : 'Java Turmeric', id: 'temulawak' },
    { label: language === 'id' ? 'Daun Kelor' : 'Moringa', id: 'daun-kelor' },
  ];

  return (
    <div className="flex-1 w-full bg-[#FAF6F0] pb-24 md:pb-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-5 sm:space-y-6">
        {/* Top Header (Mobile Native & Desktop) */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            {/* Clean Brand Leaf Avatar Badge */}
            <div className="w-11 h-11 rounded-2xl bg-[#253D32] flex items-center justify-center text-white shadow-xs shrink-0">
              <svg viewBox="0 0 100 100" className="w-6 h-6">
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
            <div className="min-w-0">
              <h1 className="text-base sm:text-lg font-bold text-[#1E201E] flex items-center gap-1.5 font-['Outfit'] truncate">
                <span>{t('greeting', { name: userName })}</span>
                <span className="text-sm">👋</span>
              </h1>
              <p className="text-xs text-stone-500 font-normal truncate">
                {t('greetingSub')}
              </p>
            </div>
          </div>

          {/* Right side: Language Switcher & Notification Bell */}
          <div className="flex items-center gap-2 shrink-0">
            <LanguageToggle />

            {/* Notification Bell Button */}
            <button
              onClick={() => setShowNotificationModal(true)}
              className="w-10 h-10 rounded-xl bg-white border border-stone-200 flex items-center justify-center text-stone-600 hover:text-stone-900 shadow-2xs relative transition-colors"
              aria-label={t('notificationsTitle')}
              title={t('notificationsTitle')}
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-[#A64F36]" />
            </button>
          </div>
        </div>

        {/* Search Input Bar */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('searchPlaceholderHome')}
            className="w-full h-11 pl-10 pr-16 bg-white border border-stone-200 rounded-2xl text-xs placeholder:text-stone-400 focus:outline-hidden focus:ring-2 focus:ring-[#253D32]/20 focus:border-[#253D32] transition-all shadow-2xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-xs text-stone-400 hover:text-stone-600"
            >
              {language === 'id' ? 'Bersihkan' : 'Clear'}
            </button>
          )}
        </div>

        {/* Search Results Dropdown / Preview */}
        {searchQuery.trim() && (
          <div className="p-4 bg-white border border-stone-200 rounded-2xl shadow-xs">
            <p className="text-xs font-semibold text-stone-600 mb-2.5">
              {language === 'id'
                ? `Hasil pencarian untuk "${searchQuery}":`
                : `Search results for "${searchQuery}":`}
            </p>
            {filteredHerbs.length > 0 ? (
              <div className="space-y-2">
                {filteredHerbs.slice(0, 3).map((herb) => (
                  <button
                    key={herb.id}
                    onClick={() => onSelectHerb(herb.id)}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-[#F2F5ED] text-left transition-colors"
                  >
                    <div>
                      <p className="text-xs font-bold text-stone-800">{herb.name}</p>
                      <p className="text-[11px] text-stone-500">
                        {herb.specificOrigin} · {herb.scientificName}
                      </p>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-stone-400" />
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-xs text-stone-400 italic py-1">
                {language === 'id'
                  ? 'Tidak ditemukan tanaman dengan kata kunci tersebut. Coba cari di menu Cek Fakta atau Eksplorasi.'
                  : 'No herbs found for this query. Try checking Fact Check or Explore tabs.'}
              </p>
            )}
          </div>
        )}

        {/* Responsive Dashboard Grid: 1 Col on Mobile, 12-Col Split on Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
          {/* Left Column (Desktop 7 cols) */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-5">
            {/* Featured Banner: SiLuhur Check */}
            <div
              onClick={onOpenFactCheck}
              className="w-full p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#FFF0D3] to-[#FCE6BD] border border-[#F4D9A0] shadow-2xs cursor-pointer active:scale-[0.99] transition-all relative overflow-hidden group"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-12 h-12 rounded-xl bg-white/90 shadow-2xs flex items-center justify-center text-[#253D32] shrink-0">
                    <ShieldCheck className="w-6 h-6 text-[#A64F36]" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h2 className="text-sm font-bold text-[#1E201E] font-['Outfit'] truncate">
                        {t('siluhurCheckBannerTitle')}
                      </h2>
                      <Sparkles className="w-3.5 h-3.5 text-[#A64F36] shrink-0" />
                    </div>
                    <p className="text-xs text-stone-600 font-normal mt-0.5 line-clamp-2">
                      {t('siluhurCheckBannerDesc')}
                    </p>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/80 flex items-center justify-center text-stone-700 group-hover:translate-x-0.5 transition-transform shrink-0">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Quick Action Grid (4 Actions) */}
            <div className="grid grid-cols-4 gap-2.5 sm:gap-3">
              <button
                onClick={() => onNavigate('explore')}
                className="flex flex-col items-center p-3 rounded-2xl bg-white border border-stone-200/90 shadow-2xs hover:border-[#6E7953] hover:shadow-xs transition-all active:scale-95 text-center group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#F2F5ED] flex items-center justify-center text-[#6E7953] mb-2 group-hover:scale-105 transition-transform">
                  <Compass className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-semibold text-stone-800 leading-tight">
                  {language === 'id' ? 'Jejak Sehat' : 'Health Trail'}
                </span>
                <span className="text-[9px] text-stone-400 mt-0.5">
                  {language === 'id' ? 'Nusantara' : 'Heritage'}
                </span>
              </button>

              <button
                onClick={() => onNavigate('tracker')}
                className="flex flex-col items-center p-3 rounded-2xl bg-white border border-stone-200/90 shadow-2xs hover:border-[#6E7953] hover:shadow-xs transition-all active:scale-95 text-center group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#F2F5ED] flex items-center justify-center text-[#253D32] mb-2 group-hover:scale-105 transition-transform">
                  <HeartPulse className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-semibold text-stone-800 leading-tight">
                  {language === 'id' ? 'Hidup Sehat' : 'Healthy Living'}
                </span>
                <span className="text-[9px] text-stone-400 mt-0.5">Tracker</span>
              </button>

              <button
                onClick={onOpenFoodFacts}
                className="flex flex-col items-center p-3 rounded-2xl bg-white border border-stone-200/90 shadow-2xs hover:border-[#6E7953] hover:shadow-xs transition-all active:scale-95 text-center group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#FBF0EB] flex items-center justify-center text-[#A64F36] mb-2 group-hover:scale-105 transition-transform">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-semibold text-stone-800 leading-tight">
                  {language === 'id' ? 'Cek Produk' : 'Check Product'}
                </span>
                <span className="text-[9px] text-stone-400 mt-0.5">
                  {language === 'id' ? 'Keamanan' : 'Safety'}
                </span>
              </button>

              <button
                onClick={onOpenAssistant}
                className="flex flex-col items-center p-3 rounded-2xl bg-white border border-stone-200/90 shadow-2xs hover:border-[#6E7953] hover:shadow-xs transition-all active:scale-95 text-center group relative"
              >
                <div className="w-10 h-10 rounded-xl bg-[#FFF0D3] flex items-center justify-center overflow-hidden mb-2 group-hover:scale-105 transition-transform">
                  <img
                    src="/assets/aistudio/maskot_siluhur_4eca92db.png"
                    alt="Kakek Luhur"
                    className="w-8 h-8 object-contain"
                  />
                </div>
                <span className="text-[11px] font-semibold text-stone-800 leading-tight">
                  {t('askAiShort')}
                </span>
                <span className="text-[9px] text-stone-400 mt-0.5">
                  {language === 'id' ? 'Kakek Luhur' : 'Grandpa Luhur'}
                </span>
              </button>
            </div>

            {/* Pustaka Kesehatan Card */}
            <div
              onClick={onOpenTherapies}
              className="w-full p-4 sm:p-5 rounded-2xl bg-white border border-stone-200/90 shadow-2xs cursor-pointer hover:border-[#6E7953] hover:shadow-xs transition-all flex items-center justify-between gap-3 group"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-11 h-11 rounded-xl bg-[#253D32] flex items-center justify-center text-white shrink-0 group-hover:scale-105 transition-transform">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-xs sm:text-sm font-bold text-stone-900 font-['Outfit'] truncate">
                    {language === 'id'
                      ? 'Pustaka Kesehatan & Terapi Tradisional'
                      : 'Traditional Therapy & Health Library'}
                  </h3>
                  <p className="text-[11px] text-stone-500 mt-0.5 line-clamp-1">
                    {language === 'id'
                      ? 'Panduan ilmiah urut, kerokan, kompres herbal & jamu.'
                      : 'Scientific guides to massage, acupressure, compresses & jamu.'}
                  </p>
                </div>
              </div>
              <div className="w-7 h-7 rounded-full bg-stone-50 flex items-center justify-center text-stone-400 group-hover:text-stone-700 transition-colors shrink-0">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Right Column (Desktop 5 cols) */}
          <div className="lg:col-span-5 space-y-4 sm:space-y-5">
            {/* Featured Herbal Spotlight */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-stone-200/90 shadow-2xs">
              <div className="flex items-center justify-between mb-3.5">
                <h2 className="text-xs sm:text-sm font-bold text-stone-900 font-['Outfit']">
                  {language === 'id' ? 'Jelajah Rempah Nusantara' : 'Featured Indonesian Herbs'}
                </h2>
                <button
                  onClick={() => onNavigate('explore')}
                  className="text-xs font-semibold text-[#A64F36] hover:underline flex items-center gap-1"
                >
                  {t('seeAll')} <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              <div className="space-y-2.5">
                {herbs.slice(0, 3).map((herb) => (
                  <div
                    key={herb.id}
                    onClick={() => onSelectHerb(herb.id)}
                    className="p-3 bg-[#FAF6F0] border border-stone-200/70 rounded-xl hover:border-stone-300 hover:bg-[#F2F5ED] transition-all cursor-pointer flex items-center gap-3 group"
                  >
                    <img
                      src={herb.imageUrl}
                      alt={herb.name}
                      className="w-12 h-12 rounded-lg object-cover shrink-0 border border-stone-200/60"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h3 className="text-xs font-bold text-stone-900 truncate">
                          {herb.name}
                        </h3>
                        <span className="text-[10px] text-stone-400 truncate">
                          · {herb.specificOrigin}
                        </span>
                      </div>
                      <p className="text-[11px] text-stone-500 line-clamp-1 mt-0.5">
                        {herb.keyBenefits.join(' · ')}
                      </p>
                    </div>
                    <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-stone-400 group-hover:text-stone-700 transition-colors shrink-0 shadow-2xs">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Topik Populer Interactive Pills */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-stone-200/90 shadow-2xs">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-xs sm:text-sm font-bold text-stone-900 font-['Outfit']">
                  {t('popularTopics')}
                </h2>
                <button
                  onClick={() => onNavigate('explore')}
                  className="text-xs text-stone-500 hover:text-stone-800"
                >
                  {t('seeAll')}
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {popularTopics.map((topic, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      if (topic.isFactcheck) {
                        onOpenFactCheck();
                      } else if (topic.id) {
                        onSelectHerb(topic.id);
                      }
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-[#FAF6F0] border border-stone-200/80 text-xs font-medium text-stone-700 hover:border-[#6E7953] hover:text-[#253D32] hover:bg-[#F2F5ED] transition-colors shadow-2xs active:scale-95"
                  >
                    {topic.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Notification Modal */}
        {showNotificationModal && (
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-5 max-w-sm w-full shadow-xl border border-stone-200">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Bell className="w-4 h-4 text-[#A64F36]" />
                  <h3 className="text-sm font-bold text-stone-900">
                    {t('notificationsTitle')}
                  </h3>
                </div>
                <button
                  onClick={() => setShowNotificationModal(false)}
                  className="text-xs text-stone-400 hover:text-stone-700"
                >
                  {t('close')}
                </button>
              </div>
              <div className="space-y-3 text-xs text-stone-600">
                <div className="p-3 bg-[#FAF6F0] rounded-xl border border-stone-200">
                  <p className="font-semibold text-stone-900">
                    {language === 'id' ? 'Musim Pancaroba Tiba 🍂' : 'Seasonal Transition Care 🍂'}
                  </p>
                  <p className="mt-1">
                    {language === 'id'
                      ? 'Hangatkan tubuh dengan seduhan jahe merah dan perbanyak istirahat cukup untuk menjaga daya tahan tubuh.'
                      : 'Nourish your body with warm red ginger brew and get adequate rest to maintain optimal immunity.'}
                  </p>
                </div>
                <div className="p-3 bg-[#FAF6F0] rounded-xl border border-stone-200">
                  <p className="font-semibold text-stone-900">
                    {language === 'id' ? 'Waspada Hoaks Obat Herbal ⚠️' : 'Beware of Herbal Hoaxes ⚠️'}
                  </p>
                  <p className="mt-1">
                    {language === 'id'
                      ? 'Gunakan fitur SiLuhur Check sebelum mempercayai klaim ramuan yang menjanjikan kesembuhan instan 100%.'
                      : 'Use SiLuhur Check before believing claims that promise 100% instant cures.'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowNotificationModal(false)}
                className="mt-4 w-full py-2 bg-[#253D32] text-white rounded-xl text-xs font-semibold"
              >
                {t('understand')}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
