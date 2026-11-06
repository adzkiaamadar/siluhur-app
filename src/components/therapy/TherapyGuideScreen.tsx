import React, { useState } from 'react';
import {
  ArrowLeft,
  BookOpen,
  ArrowRight,
  ShieldAlert,
  Sparkles,
  CheckCircle,
  AlertTriangle,
} from 'lucide-react';
import { TraditionalTherapy } from '../../types';
import { THERAPY_DATABASE } from '../../data/therapies';
import { EvidenceStrengthBadge } from '../common/Badge';
import { TherapyDetailModal } from './TherapyDetailModal';
import { useLanguage, LanguageToggle } from '../../i18n/LanguageContext';

interface TherapyGuideScreenProps {
  onBack?: () => void;
}

export function TherapyGuideScreen({ onBack }: TherapyGuideScreenProps) {
  const [selectedTherapy, setSelectedTherapy] = useState<TraditionalTherapy | null>(null);
  const { language } = useLanguage();

  return (
    <div className="flex-1 w-full bg-[#FAF6F0] pb-24 md:pb-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-5 sm:space-y-6">
        {/* Top Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {onBack && (
              <button
                onClick={onBack}
                className="w-10 h-10 rounded-xl bg-white border border-stone-200 flex items-center justify-center text-stone-700 hover:bg-stone-50 shadow-2xs transition-colors"
                title={language === 'id' ? 'Kembali' : 'Back'}
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
            <h1 className="text-base sm:text-lg font-bold text-[#1E201E] font-['Outfit']">
              {language === 'id' ? 'Panduan Terapi Tradisional' : 'Traditional Therapy Guides'}
            </h1>
          </div>

          <LanguageToggle />
        </div>

        {/* Hero Banner */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-stone-200/90 shadow-2xs">
          <div className="flex items-center gap-2 text-[#A64F36] mb-1">
            <BookOpen className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-wider font-['Outfit']">
              {language === 'id' ? 'Pustaka Kearifan Nusantara' : 'Indonesian Heritage Library'}
            </span>
          </div>
          <h2 className="text-sm sm:text-base font-bold text-stone-900 leading-snug">
            {language === 'id'
              ? 'Memahami Kerokan, Urut, & Kompres dengan Kacamata Ilmiah'
              : 'Understanding Coin Scraping, Massage & Herbal Compresses Scientifically'}
          </h2>
          <p className="text-xs text-stone-600 mt-1.5 leading-relaxed">
            {language === 'id'
              ? 'Praktik tradisional sering kali memiliki efek fisiologis nyata yang dapat dijelaskan secara medis, namun juga memiliki batas keamanan yang harus dipahami demi keselamatan diri.'
              : 'Traditional remedies often trigger genuine physiological responses that can be explained medically, while also having safety boundaries essential for personal health.'}
          </p>
        </div>

        {/* Therapy Cards Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {THERAPY_DATABASE.map((therapy) => (
            <div
              key={therapy.id}
              onClick={() => setSelectedTherapy(therapy)}
              className="p-4 sm:p-5 bg-white border border-stone-200/90 rounded-2xl shadow-2xs hover:border-[#6E7953] hover:shadow-xs transition-all cursor-pointer flex flex-col justify-between gap-3 group"
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-stone-900 group-hover:text-[#253D32] transition-colors">
                      {therapy.name}
                    </h3>
                    <p className="text-[11px] text-[#A64F36] font-medium">
                      {therapy.regionOrigin}
                    </p>
                  </div>
                  <EvidenceStrengthBadge level={therapy.evidenceLevel} />
                </div>

                <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed">
                  {therapy.communityPurpose}
                </p>
              </div>

              <div className="flex items-center justify-between pt-2.5 border-t border-stone-100 text-[11px]">
                <span className="text-stone-500 font-medium flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span className="truncate">{language === 'id' ? 'Penjelasan Medis & Risiko' : 'Medical Review'}</span>
                </span>
                <span className="text-[#253D32] font-semibold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform shrink-0">
                  <span>{language === 'id' ? 'Baca' : 'Read'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Detail Modal */}
        {selectedTherapy && (
          <TherapyDetailModal
            therapy={selectedTherapy}
            onClose={() => setSelectedTherapy(null)}
          />
        )}
      </div>
    </div>
  );
}
