import React, { useState } from 'react';
import {
  ArrowLeft,
  Plus,
  Bookmark,
  ShieldCheck,
  Sparkles,
  MapPin,
  Calendar,
  User,
  AlertTriangle,
} from 'lucide-react';
import { RempahDocumentation } from '../../types';
import { StorageService } from '../../services/storage';
import { AddRempahModal } from './AddRempahModal';
import { useLanguage, LanguageToggle } from '../../i18n/LanguageContext';

interface RempahPediaScreenProps {
  onBack?: () => void;
}

export function RempahPediaScreen({ onBack }: RempahPediaScreenProps) {
  const [docs, setDocs] = useState<RempahDocumentation[]>(() =>
    StorageService.getRempahDocs()
  );
  const [showAddModal, setShowAddModal] = useState(false);
  const [filterType, setFilterType] = useState<'semua' | 'ilmiah' | 'tradisi'>('semua');
  const { language } = useLanguage();

  const filteredDocs = docs.filter((doc) => {
    if (filterType === 'ilmiah') return doc.isEvidenceBased;
    if (filterType === 'tradisi') return !doc.isEvidenceBased;
    return true;
  });

  const handleDocAdded = (newDoc: RempahDocumentation) => {
    setDocs((prev) => [newDoc, ...prev]);
  };

  return (
    <div className="flex-1 w-full bg-[#FAF6F0] pb-24 md:pb-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-5 sm:space-y-6">
        {/* Header */}
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
              {language === 'id' ? 'Rempah Pedia' : 'Spice Pedia'}
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <LanguageToggle />
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-1.5 px-3 py-2 bg-[#A64F36] hover:bg-[#8F3E28] text-white rounded-xl text-xs font-semibold shadow-xs active:scale-95 transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{language === 'id' ? 'Tulis Resep' : 'Write Recipe'}</span>
            </button>
          </div>
        </div>

        {/* Banner Card */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-stone-200/90 shadow-2xs">
          <h2 className="text-sm sm:text-base font-bold text-stone-900 font-['Outfit'] flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-[#A64F36]" />
            {language === 'id' ? 'Dokumentasi Kearifan Keluarga & Komunitas' : 'Family & Community Herbal Chronicles'}
          </h2>
          <p className="text-xs text-stone-600 mt-1.5 leading-relaxed">
            {language === 'id'
              ? 'Catat dan abadikan resep ramuan leluhur yang diwariskan dalam keluargamu. Setiap entri diberi label pembeda yang jelas antara tradisi turun-temurun dengan hasil riset ilmiah.'
              : 'Record and preserve ancestral remedies passed down through your family. Each entry clearly differentiates between folklore traditions and clinical findings.'}
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          <button
            onClick={() => setFilterType('semua')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all shadow-2xs ${
              filterType === 'semua'
                ? 'bg-[#253D32] text-white'
                : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
            }`}
          >
            {language === 'id' ? `Semua (${docs.length})` : `All (${docs.length})`}
          </button>
          <button
            onClick={() => setFilterType('ilmiah')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all shadow-2xs ${
              filterType === 'ilmiah'
                ? 'bg-[#253D32] text-white'
                : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
            }`}
          >
            {language === 'id' ? `Didukung Sains (${docs.filter((d) => d.isEvidenceBased).length})` : `Science-Backed (${docs.filter((d) => d.isEvidenceBased).length})`}
          </button>
          <button
            onClick={() => setFilterType('tradisi')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all shadow-2xs ${
              filterType === 'tradisi'
                ? 'bg-[#253D32] text-white'
                : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
            }`}
          >
            {language === 'id' ? `Tradisi Murni (${docs.filter((d) => !d.isEvidenceBased).length})` : `Pure Folklore (${docs.filter((d) => !d.isEvidenceBased).length})`}
          </button>
        </div>

        {/* Document Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDocs.map((doc) => (
            <div
              key={doc.id}
              className="p-4 sm:p-5 bg-white border border-stone-200/90 rounded-2xl shadow-2xs hover:border-stone-300 transition-all flex flex-col justify-between gap-3.5"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <h3 className="text-sm font-bold text-stone-900 font-['Outfit'] truncate">
                      {doc.plantName}
                    </h3>
                    <p className="text-[11px] text-stone-500 italic truncate">
                      {doc.localName} · <span className="font-sans not-italic text-[#A64F36]">{doc.region}</span>
                    </p>
                  </div>

                  {/* Status Badge */}
                  {doc.isEvidenceBased ? (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200 shrink-0">
                      {language === 'id' ? 'Sains' : 'Science'}
                    </span>
                  ) : (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#FFF0D3] text-[#8C3F29] border border-[#F4E3C1] shrink-0">
                      {language === 'id' ? 'Tradisi' : 'Folklore'}
                    </span>
                  )}
                </div>

                {/* Story */}
                <div className="p-3 bg-[#FAF6F0] rounded-xl border border-stone-200/70">
                  <p className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider mb-0.5">
                    {language === 'id' ? 'Cerita Warisan' : 'Inherited Story'}
                  </p>
                  <p className="text-xs text-stone-700 leading-relaxed italic line-clamp-3">
                    "{doc.inheritedStory}"
                  </p>
                </div>

                {/* Usage */}
                <div>
                  <p className="text-xs font-bold text-stone-800 mb-0.5">
                    {language === 'id' ? 'Cara Penggunaan:' : 'Preparation & Use:'}
                  </p>
                  <p className="text-xs text-stone-600 leading-relaxed line-clamp-2">{doc.traditionalUse}</p>
                </div>

                {/* Safety Caution */}
                {doc.safetyCaution && (
                  <div className="flex items-start gap-1.5 text-xs text-[#A64F36] bg-[#FBF0EB] p-2.5 rounded-xl border border-[#F2D7CD]">
                    <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                    <span className="line-clamp-2">{doc.safetyCaution}</span>
                  </div>
                )}
              </div>

              {/* Meta Footer */}
              <div className="flex items-center justify-between text-[11px] text-stone-400 pt-2.5 border-t border-stone-100">
                <span className="flex items-center gap-1 truncate max-w-[140px]">
                  <User className="w-3 h-3 shrink-0" />
                  <span className="truncate">{doc.authorName || (language === 'id' ? 'Anonim' : 'Anonymous')}</span>
                </span>
                <span className="flex items-center gap-1 shrink-0">
                  <Calendar className="w-3 h-3" />
                  <span>{doc.createdAt}</span>
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Add Modal */}
        {showAddModal && (
          <AddRempahModal
            onClose={() => setShowAddModal(false)}
            onSave={handleDocAdded}
          />
        )}
      </div>
    </div>
  );
}
