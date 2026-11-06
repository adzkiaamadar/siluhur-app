import React, { useState } from 'react';
import {
  Search,
  ArrowRight,
  MapPin,
  ArrowLeft,
} from 'lucide-react';
import { HerbItem, NusantaraRegion } from '../../types';
import { NUSANTARA_REGIONS } from '../../data/herbs';
import { useLanguage, LanguageToggle } from '../../i18n/LanguageContext';

interface ExploreScreenProps {
  herbs: HerbItem[];
  onSelectHerb: (herbId: string) => void;
  onBack?: () => void;
}

export function ExploreScreen({ herbs, onSelectHerb, onBack }: ExploreScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<NusantaraRegion>('Semua Wilayah');
  const [selectedType, setSelectedType] = useState<string>('Semua');
  const { t, language } = useLanguage();

  // Filter logic
  const filteredHerbs = herbs.filter((herb) => {
    const matchSearch =
      herb.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      herb.specificOrigin.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (herb.scientificName && herb.scientificName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      herb.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchRegion =
      selectedRegion === 'Semua Wilayah' || herb.region === selectedRegion;

    const matchType =
      selectedType === 'Semua' || herb.type === selectedType;

    return matchSearch && matchRegion && matchType;
  });

  const typeOptions = [
    { id: 'Semua', label: t('filterAll') },
    { id: 'Tanaman', label: t('filterPlant') },
    { id: 'Pangan', label: t('filterFood') },
    { id: 'Tradisi', label: t('filterTradition') },
  ];

  return (
    <div className="flex-1 w-full bg-[#FAF6F0] pb-24 md:pb-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-5 sm:space-y-6">
        {/* Top Bar with Nusantara Roof header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {onBack && (
              <button
                onClick={onBack}
                className="w-10 h-10 rounded-xl bg-white border border-stone-200 flex items-center justify-center text-stone-700 hover:bg-stone-50 shadow-2xs transition-colors"
                title={t('back')}
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
            <h1 className="text-base sm:text-lg font-bold text-[#1E201E] font-['Outfit']">
              {t('exploreTitle')}
            </h1>
          </div>

          <LanguageToggle />
        </div>

        {/* Hero Header Card with Traditional House Motif */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#F2F5ED] to-[#E5ECE0] border border-[#DFE5D5] shadow-2xs relative overflow-hidden flex items-center justify-between gap-4">
          <div className="max-w-[240px] sm:max-w-md z-10">
            <h2 className="text-sm sm:text-base font-bold text-[#253D32] leading-tight font-['Outfit']">
              {t('exploreTitle')}
            </h2>
            <p className="text-[11px] sm:text-xs text-stone-600 mt-1 leading-relaxed">
              {t('exploreHeroSubtitle')}
            </p>
          </div>

          {/* Traditional Roof Illustration */}
          <div className="w-20 h-16 shrink-0 relative flex items-center justify-center">
            <svg viewBox="0 0 100 80" className="w-20 h-16 drop-shadow-xs">
              <path
                d="M 10 70 Q 50 15 90 70 L 75 70 L 50 35 L 25 70 Z"
                fill="#253D32"
              />
              <rect x="30" y="55" width="40" height="20" fill="#A64F36" rx="2" />
              <rect x="42" y="62" width="16" height="13" fill="#FFF0D3" rx="1" />
            </svg>
          </div>
        </div>

        {/* Search Input */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('searchHerbPlaceholder')}
            className="w-full h-11 pl-10 pr-16 bg-white border border-stone-200 rounded-2xl text-xs placeholder:text-stone-400 focus:outline-hidden focus:ring-2 focus:ring-[#253D32]/20 focus:border-[#253D32] transition-all shadow-2xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-xs text-stone-400 hover:text-stone-600"
            >
              {language === 'id' ? 'Hapus' : 'Clear'}
            </button>
          )}
        </div>

        {/* Type Filter Buttons */}
        <div className="flex items-center gap-1.5 mb-3 overflow-x-auto no-scrollbar py-0.5">
          {typeOptions.map((type) => (
            <button
              key={type.id}
              onClick={() => setSelectedType(type.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all shadow-2xs active:scale-95 ${
                selectedType === type.id
                  ? 'bg-[#253D32] text-white'
                  : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>

        {/* Island / Region Selector Horizontal Scroller */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1.5 text-[11px] text-stone-500 font-medium">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#A64F36]" />
              {language === 'id' ? 'Pilih Wilayah Nusantara:' : 'Filter Region:'}
            </span>
            <span className="text-stone-400 font-normal">
              {filteredHerbs.length} {language === 'id' ? 'entri ditemukan' : 'entries found'}
            </span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {NUSANTARA_REGIONS.map((region) => (
              <button
                key={region}
                onClick={() => setSelectedRegion(region)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all border ${
                  selectedRegion === region
                    ? 'bg-[#A64F36] border-[#A64F36] text-white shadow-xs'
                    : 'bg-white border-stone-200 text-stone-700 hover:border-stone-300'
                }`}
              >
                {region === 'Semua Wilayah' && language === 'en' ? 'All Regions' : region}
              </button>
            ))}
          </div>
        </div>

        {/* Herb List in Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {filteredHerbs.length > 0 ? (
            filteredHerbs.map((herb) => (
              <div
                key={herb.id}
                onClick={() => onSelectHerb(herb.id)}
                className="p-3.5 bg-white border border-stone-200/90 rounded-3xl shadow-2xs hover:shadow-xs transition-all cursor-pointer flex items-center gap-3.5 group"
              >
                <img
                  src={herb.imageUrl}
                  alt={herb.name}
                  className="w-16 h-16 rounded-2xl object-cover shrink-0 border border-stone-100"
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-xs font-bold text-stone-900 group-hover:text-[#253D32] transition-colors truncate">
                      {herb.name}
                    </h3>
                    {herb.scientificName && (
                      <span className="text-[10px] text-stone-400 italic truncate hidden sm:inline">
                        ({herb.scientificName})
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1 text-[11px] text-[#A64F36] font-medium mt-0.5">
                    <MapPin className="w-3 h-3 shrink-0" />
                    <span className="truncate">{herb.specificOrigin}</span>
                  </div>

                  <p className="text-[11px] text-stone-500 line-clamp-1 mt-1">
                    {herb.keyBenefits[0] || herb.description}
                  </p>
                </div>

                <div className="w-8 h-8 rounded-full bg-stone-50 flex items-center justify-center text-stone-400 group-hover:bg-[#F2F5ED] group-hover:text-[#253D32] transition-all shrink-0">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-10 bg-white border border-stone-200 rounded-3xl p-6">
              <p className="text-xs text-stone-500 mb-2">
                {language === 'id'
                  ? 'Tidak ada tanaman atau tradisi yang sesuai dengan filter pencarian.'
                  : 'No herbs or traditions found matching the active filters.'}
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedRegion('Semua Wilayah');
                  setSelectedType('Semua');
                }}
                className="text-xs font-semibold text-[#A64F36] hover:underline"
              >
                {language === 'id' ? 'Reset Semua Filter' : 'Reset All Filters'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
