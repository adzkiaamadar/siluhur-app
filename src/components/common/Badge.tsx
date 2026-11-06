import React from 'react';
import { ClaimCategory, EvidenceLevel } from '../../types';
import { useLanguage } from '../../i18n/LanguageContext';

export function VerdictBadge({ verdict }: { verdict: ClaimCategory }) {
  const { language } = useLanguage();

  if (verdict === 'Fakta') {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
        <span className="w-2 h-2 rounded-full bg-emerald-600" />
        {language === 'id' ? 'Fakta Ilmiah' : 'Scientific Fact'}
      </span>
    );
  }

  if (verdict === 'Mitos') {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#FBF0EB] text-[#A64F36] border border-[#F2D7CD]">
        <span className="w-2 h-2 rounded-full bg-[#A64F36]" />
        {language === 'id' ? 'Mitos / Keliru' : 'Myth / Inaccurate'}
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-900 border border-amber-200">
      <span className="w-2 h-2 rounded-full bg-amber-600" />
      {language === 'id' ? 'Belum Cukup Bukti' : 'Insufficient Evidence'}
    </span>
  );
}

export function EvidenceStrengthBadge({ level }: { level: EvidenceLevel }) {
  const { language } = useLanguage();

  const labelsId: Record<EvidenceLevel, string> = {
    Kuat: 'Bukti Kuat (Uji Klinis/RCT)',
    Sedang: 'Bukti Sedang (Studi In Vivo/Kohort)',
    Terbatas: 'Bukti Terbatas (In Vitro/Awal)',
    Anekdotal: 'Tradisi Empiris / Anekdotal',
  };

  const labelsEn: Record<EvidenceLevel, string> = {
    Kuat: 'Strong Evidence (Clinical Trials/RCT)',
    Sedang: 'Moderate Evidence (In Vivo/Cohort)',
    Terbatas: 'Limited Evidence (In Vitro/Early)',
    Anekdotal: 'Empirical / Anecdotal Tradition',
  };

  const styles: Record<EvidenceLevel, { bg: string; text: string }> = {
    Kuat: { bg: 'bg-emerald-50 border-emerald-200', text: 'text-emerald-700' },
    Sedang: { bg: 'bg-blue-50 border-blue-200', text: 'text-blue-700' },
    Terbatas: { bg: 'bg-amber-50 border-amber-200', text: 'text-amber-800' },
    Anekdotal: { bg: 'bg-stone-100 border-stone-200', text: 'text-stone-700' },
  };

  const currentStyle = styles[level] || styles.Terbatas;
  const currentLabel = (language === 'id' ? labelsId : labelsEn)[level] || (language === 'id' ? labelsId.Terbatas : labelsEn.Terbatas);

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium border ${currentStyle.bg} ${currentStyle.text}`}>
      {currentLabel}
    </span>
  );
}

