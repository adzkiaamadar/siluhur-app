import React from 'react';
import {
  X,
  ShieldCheck,
  AlertTriangle,
  CheckCircle,
  HelpCircle,
  Activity,
  PhoneCall,
} from 'lucide-react';
import { TraditionalTherapy } from '../../types';
import { EvidenceStrengthBadge } from '../common/Badge';
import { useLanguage } from '../../i18n/LanguageContext';

interface TherapyDetailModalProps {
  therapy: TraditionalTherapy;
  onClose: () => void;
}

export function TherapyDetailModal({ therapy, onClose }: TherapyDetailModalProps) {
  const { language } = useLanguage();

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl p-5 max-w-md w-full shadow-2xl border border-stone-200 my-auto max-h-[85vh] overflow-y-auto no-scrollbar space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between pb-3 border-b border-stone-100">
          <div>
            <span className="text-[10px] font-semibold text-[#A64F36] uppercase tracking-wider">
              {therapy.regionOrigin}
            </span>
            <h2 className="text-base font-bold text-stone-900 font-['Outfit']">
              {therapy.name}
            </h2>
            <div className="mt-1">
              <EvidenceStrengthBadge level={therapy.evidenceLevel} />
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-500 hover:text-stone-800 shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Budaya & Tujuan Tradisional */}
        <div className="p-3.5 bg-[#FFF0D3]/40 rounded-2xl border border-[#F4E3C1]">
          <h3 className="text-xs font-bold text-stone-900 font-['Outfit'] mb-1">
            {language === 'id' ? 'Latar Belakang Budaya & Tujuan Tradisional' : 'Cultural Heritage & Traditional Purpose'}
          </h3>
          <p className="text-xs text-stone-700 leading-relaxed mb-2">
            {therapy.culturalBackground}
          </p>
          <p className="text-xs text-stone-600 leading-relaxed italic">
            <strong>{language === 'id' ? 'Tujuan bagi masyarakat:' : 'Community Purpose:'}</strong> {therapy.communityPurpose}
          </p>
        </div>

        {/* Tinjauan Medis & Mekanisme Fisiologis */}
        <div className="p-3.5 bg-[#F2F5ED] rounded-2xl border border-[#DFE5D5]">
          <h3 className="text-xs font-bold text-[#253D32] font-['Outfit'] mb-1 flex items-center gap-1.5">
            <Activity className="w-4 h-4 text-[#6E7953]" />
            {language === 'id' ? 'Penjelasan Medis & Mekanisme Fisiologis' : 'Medical Insights & Physiological Mechanism'}
          </h3>
          <p className="text-xs text-stone-700 leading-relaxed mb-2">
            {therapy.scientificExplanation}
          </p>
          <div className="p-2.5 bg-white/80 rounded-xl border border-stone-200 text-xs text-stone-600">
            <strong>{language === 'id' ? 'Mekanisme tubuh:' : 'Biological mechanism:'}</strong> {therapy.physiologicalMechanism}
          </div>
        </div>

        {/* Batasan & Risiko */}
        <div className="p-3.5 bg-[#FBF0EB] rounded-2xl border border-[#F2D7CD]">
          <h3 className="text-xs font-bold text-[#A64F36] font-['Outfit'] mb-1.5 flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-[#A64F36]" />
            {language === 'id' ? 'Keterbatasan & Risiko yang Perlu Diwaspadai' : 'Limitations & Potential Risks'}
          </h3>
          <ul className="space-y-1 text-xs text-stone-700">
            {therapy.risksAndLimitations.map((risk, idx) => (
              <li key={idx} className="flex items-start gap-1.5">
                <span className="text-[#A64F36] font-bold">·</span>
                <span>{risk}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Kontraindikasi (Kapan Harus Dihindari) */}
        <div>
          <h3 className="text-xs font-bold text-stone-900 font-['Outfit'] mb-1.5">
            {language === 'id' ? 'Kondisi Kontraindikasi (Dilarang Dilakukan):' : 'Contraindications (Strictly Avoided):'}
          </h3>
          <div className="space-y-1 text-xs text-stone-600">
            {therapy.contraindications.map((contra, idx) => (
              <div key={idx} className="flex items-start gap-1.5">
                <span className="text-red-500 font-bold shrink-0">✕</span>
                <span>{contra}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Red Flags Kapan Harus ke Dokter */}
        <div className="p-3 bg-red-50 border border-red-200 rounded-2xl text-xs text-red-800">
          <p className="font-bold mb-1 flex items-center gap-1.5 text-red-900">
            <PhoneCall className="w-3.5 h-3.5 text-red-700" />
            {language === 'id' ? 'Tanda Bahaya: Segera ke Fasilitas Kesehatan / Dokter jika:' : 'Red Flags: Seek Immediate Medical Care If:'}
          </p>
          <ul className="space-y-1 pl-4 list-disc text-red-700">
            {therapy.medicalRedFlags.map((flag, idx) => (
              <li key={idx}>{flag}</li>
            ))}
          </ul>
        </div>

        {/* Praktik Aman */}
        <div className="p-3 bg-white border border-stone-200 rounded-2xl">
          <h3 className="text-xs font-bold text-stone-900 font-['Outfit'] mb-1.5 flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            {language === 'id' ? 'Praktik Aman yang Dianjurkan' : 'Recommended Safe Practices'}
          </h3>
          <ul className="space-y-1 text-xs text-stone-600">
            {therapy.safePractices.map((practice, idx) => (
              <li key={idx} className="flex items-start gap-1.5">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>{practice}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Disclaimer */}
        <p className="text-[10px] text-stone-500 italic text-center pt-2 border-t border-stone-100">
          {therapy.disclaimer}
        </p>

        <button
          onClick={onClose}
          className="w-full py-2.5 bg-[#253D32] text-white rounded-2xl text-xs font-semibold hover:bg-[#1A2D25] transition-all"
        >
          {language === 'id' ? 'Tutup Panduan' : 'Close Guide'}
        </button>
      </div>
    </div>
  );
}
