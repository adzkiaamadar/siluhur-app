import React, { useState } from 'react';
import {
  ArrowLeft,
  Bookmark,
  MapPin,
  CheckCircle,
  Share2,
  Sparkles,
  AlertTriangle,
  BookOpen,
  ShieldCheck,
  MessageSquare,
} from 'lucide-react';
import { HerbItem, OpenFoodProduct } from '../../types';
import { EvidenceStrengthBadge } from '../common/Badge';
import { searchOpenFoodFacts } from '../../services/api';
import { useLanguage, LanguageToggle } from '../../i18n/LanguageContext';

interface HerbDetailScreenProps {
  herb: HerbItem;
  onBack: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (herbId: string) => void;
  onAskAssistant: (question: string) => void;
  onOpenTherapies: () => void;
}

export function HerbDetailScreen({
  herb,
  onBack,
  isBookmarked,
  onToggleBookmark,
  onAskAssistant,
  onOpenTherapies,
}: HerbDetailScreenProps) {
  const [activeTab, setActiveTab] = useState<'ilmiah' | 'budaya' | 'keamanan' | 'produk' | 'referensi'>('ilmiah');
  const [copiedNotification, setCopiedNotification] = useState(false);
  const [offProducts, setOffProducts] = useState<OpenFoodProduct[]>([]);
  const [loadingOff, setLoadingOff] = useState(false);
  const [selectedOffProduct, setSelectedOffProduct] = useState<OpenFoodProduct | null>(null);
  const { language } = useLanguage();

  // Fetch Open Food Facts products when switching to produk tab or on mount
  React.useEffect(() => {
    if (herb.openFoodFactsTag) {
      setLoadingOff(true);
      searchOpenFoodFacts(herb.openFoodFactsTag, 1, 4)
        .then((res) => setOffProducts(res.products))
        .catch(() => setOffProducts([]))
        .finally(() => setLoadingOff(false));
    }
  }, [herb.id, herb.openFoodFactsTag]);

  const handleShare = () => {
    const text = `[SiLuhur Pustaka] ${herb.name} (${herb.scientificName || herb.specificOrigin})\n${herb.description}`;
    navigator.clipboard?.writeText(text);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2500);
  };

  return (
    <div className="flex-1 w-full bg-[#FAF6F0] pb-24 md:pb-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-5 sm:space-y-6">
        {/* Top Header */}
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-xl bg-white border border-stone-200 flex items-center justify-center text-stone-700 hover:bg-stone-50 shadow-2xs transition-colors"
            aria-label={language === 'id' ? 'Kembali' : 'Back'}
            title={language === 'id' ? 'Kembali' : 'Back'}
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2">
            <LanguageToggle />
            <button
              onClick={handleShare}
              className="w-10 h-10 rounded-xl bg-white border border-stone-200 flex items-center justify-center text-stone-600 hover:bg-stone-50 shadow-2xs transition-colors"
              title={language === 'id' ? 'Bagikan' : 'Share'}
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => onToggleBookmark(herb.id)}
              className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-colors shadow-2xs ${
                isBookmarked
                  ? 'bg-[#A64F36] border-[#A64F36] text-white'
                  : 'bg-white border-stone-200 text-stone-600'
              }`}
              title={language === 'id' ? 'Simpan ke Favorit' : 'Bookmark'}
            >
              <Bookmark className="w-4 h-4" />
            </button>
          </div>
        </div>

        {copiedNotification && (
          <div className="px-3.5 py-2.5 bg-emerald-100 text-emerald-800 text-xs rounded-xl flex items-center gap-2 border border-emerald-200">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>{language === 'id' ? 'Informasi tanaman disalin!' : 'Herb info copied!'}</span>
          </div>
        )}

        {/* Responsive Grid: 1 Col Mobile, 12 Col Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column (5 cols desktop): Image & Quick Overview */}
          <div className="lg:col-span-5 space-y-4">
            {/* Herb Large Image Showcase */}
            <div className="w-full h-56 sm:h-64 lg:h-72 rounded-2xl overflow-hidden bg-white border border-stone-200 shadow-2xs relative">
              <img
                src={herb.imageUrl}
                alt={herb.name}
                className="w-full h-full object-cover"
              />
              {/* Region badge overlay */}
              <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md text-white text-[11px] font-medium px-3 py-1 rounded-full flex items-center gap-1 shadow-xs">
                <MapPin className="w-3 h-3 text-[#FFF0D3]" />
                <span>{herb.specificOrigin}</span>
              </div>
            </div>

            {/* Title & Classification */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-stone-200/90 shadow-2xs space-y-3">
              <div className="flex items-baseline justify-between gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold text-[#1E201E] font-['Outfit']">
                  {herb.name}
                </h1>
                {herb.scientificName && (
                  <span className="text-xs text-stone-500 italic font-serif">
                    {herb.scientificName}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1.5 text-xs text-[#A64F36] font-medium">
                <MapPin className="w-3.5 h-3.5 shrink-0" />
                <span>{herb.specificOrigin} · {herb.region}</span>
              </div>

              {/* Category tags */}
              <div className="flex items-center gap-2 pt-1">
                <span className="px-3 py-1 rounded-full bg-[#FAF6F0] border border-stone-200 text-stone-700 text-xs font-semibold shadow-2xs">
                  {herb.type === 'Tanaman'
                    ? language === 'id'
                      ? 'Tanaman'
                      : 'Medicinal Plant'
                    : herb.type === 'Pangan'
                    ? language === 'id'
                      ? 'Pangan'
                      : 'Functional Food'
                    : herb.type === 'Tradisi'
                    ? language === 'id'
                      ? 'Tradisi'
                      : 'Tradition'
                    : herb.type}
                </span>
                <span className="px-3 py-1 rounded-full bg-[#F2F5ED] text-[#253D32] border border-[#DFE5D5] text-xs font-semibold">
                  {herb.category === 'Rempah Rimpang'
                    ? language === 'id'
                      ? 'Rempah Rimpang'
                      : 'Rhizome Spice'
                    : herb.category === 'Dedaunan Tradisional'
                    ? language === 'id'
                      ? 'Dedaunan Tradisional'
                      : 'Medicinal Leaves'
                    : herb.category === 'Biji & Buah'
                    ? language === 'id'
                      ? 'Biji & Buah'
                      : 'Seeds & Fruits'
                    : herb.category}
                </span>
              </div>

              {/* Description */}
              <p className="text-xs text-stone-600 leading-relaxed pt-1">
                {herb.description}
              </p>
            </div>

            {/* Manfaat Utama Box */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#F2F5ED] border border-[#DFE5D5] shadow-2xs">
              <h3 className="text-xs font-bold text-[#253D32] font-['Outfit'] mb-2.5 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#6E7953]" />
                {language === 'id' ? 'Manfaat Utama' : 'Key Health Benefits'}
              </h3>
              <div className="space-y-2">
                {herb.keyBenefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-stone-800">
                    <div className="w-4 h-4 rounded-full bg-[#6E7953] text-white flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column (7 cols desktop): Tabs, Content Panels & Actions */}
          <div className="lg:col-span-7 space-y-4">
            {/* Secondary Detail Tabs */}
            <div className="flex items-center gap-1 p-1 bg-white border border-stone-200 rounded-2xl shadow-2xs overflow-x-auto no-scrollbar">
              <button
                onClick={() => setActiveTab('ilmiah')}
                className={`flex-1 min-w-[70px] py-1.5 text-xs font-semibold rounded-xl transition-all ${
                  activeTab === 'ilmiah'
                    ? 'bg-[#253D32] text-white shadow-2xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {language === 'id' ? 'Bukti Ilmiah' : 'Science'}
              </button>
              <button
                onClick={() => setActiveTab('budaya')}
                className={`flex-1 min-w-[70px] py-1.5 text-xs font-semibold rounded-xl transition-all ${
                  activeTab === 'budaya'
                    ? 'bg-[#253D32] text-white shadow-2xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {language === 'id' ? 'Konteks Budaya' : 'Culture'}
              </button>
              <button
                onClick={() => setActiveTab('keamanan')}
                className={`flex-1 min-w-[70px] py-1.5 text-xs font-semibold rounded-xl transition-all ${
                  activeTab === 'keamanan'
                    ? 'bg-[#253D32] text-white shadow-2xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {language === 'id' ? 'Keamanan' : 'Safety'}
              </button>
              <button
                onClick={() => setActiveTab('produk')}
                className={`flex-1 min-w-[70px] py-1.5 text-xs font-semibold rounded-xl transition-all ${
                  activeTab === 'produk'
                    ? 'bg-[#253D32] text-white shadow-2xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {language === 'id' ? 'Produk (API)' : 'Products'}
              </button>
              <button
                onClick={() => setActiveTab('referensi')}
                className={`flex-1 min-w-[70px] py-1.5 text-xs font-semibold rounded-xl transition-all ${
                  activeTab === 'referensi'
                    ? 'bg-[#253D32] text-white shadow-2xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {language === 'id' ? 'Referensi' : 'References'}
              </button>
            </div>

      {/* Tab Content Panels */}
      <div className="mb-5">
        {activeTab === 'ilmiah' && (
          <div className="p-4 bg-white border border-stone-200 rounded-3xl shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-stone-500">
                {language === 'id' ? 'Tingkat Kekuatan Bukti:' : 'Evidence Strength Level:'}
              </span>
              <EvidenceStrengthBadge level={herb.scientificEvidence.evidenceLevel} />
            </div>

            <div>
              <p className="text-xs font-bold text-stone-900 mb-1">
                {language === 'id' ? 'Ringkasan Sains:' : 'Scientific Summary:'}
              </p>
              <p className="text-xs text-stone-600 leading-relaxed">
                {herb.scientificEvidence.summary}
              </p>
            </div>

            <div>
              <p className="text-xs font-bold text-stone-900 mb-1">
                {language === 'id' ? 'Senyawa Bioaktif Utama:' : 'Key Bioactive Compounds:'}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {herb.scientificEvidence.activeCompounds.map((compound, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-0.5 rounded-lg bg-[#FAF6F0] border border-stone-200 text-stone-700 text-[11px]"
                  >
                    {compound}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-bold text-stone-900 mb-1">
                {language === 'id' ? 'Temuan Uji Klinis:' : 'Clinical Findings:'}
              </p>
              <p className="text-xs text-stone-600 leading-relaxed">
                {herb.scientificEvidence.clinicalFindings}
              </p>
            </div>
          </div>
        )}

        {activeTab === 'budaya' && (
          <div className="p-4 bg-white border border-stone-200 rounded-3xl shadow-xs space-y-3">
            <div>
              <p className="text-xs font-bold text-stone-900 mb-1 font-['Outfit']">
                {language === 'id' ? 'Konteks & Makna Budaya Nusantara:' : 'Cultural Heritage & Indonesian Context:'}
              </p>
              <p className="text-xs text-stone-600 leading-relaxed">
                {herb.culturalContext}
              </p>
            </div>

            {herb.localNames && (
              <div>
                <p className="text-xs font-bold text-stone-900 mb-1 font-['Outfit']">
                  {language === 'id' ? 'Nama Daerah di Nusantara:' : 'Regional Names across Indonesia:'}
                </p>
                <div className="grid grid-cols-2 gap-1.5 text-xs text-stone-700">
                  {Object.entries(herb.localNames).map(([region, localName]) => (
                    <div key={region} className="p-2 bg-[#FAF6F0] rounded-xl border border-stone-100">
                      <span className="font-semibold text-stone-800">{region}:</span>{' '}
                      <span className="italic">{localName}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
              <p className="text-xs font-bold text-stone-900 mb-1 font-['Outfit']">
                {language === 'id' ? 'Pemanfaatan Tradisional:' : 'Traditional Practices & Preparations:'}
              </p>
              <ul className="space-y-1">
                {herb.traditionalUse.map((use, idx) => (
                  <li key={idx} className="text-xs text-stone-600 flex items-start gap-1.5">
                    <span className="text-[#A64F36] font-bold">·</span>
                    <span>{use}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'keamanan' && (
          <div className="p-4 bg-white border border-stone-200 rounded-3xl shadow-xs space-y-3">
            <div className="p-3 bg-[#FBF0EB] border border-[#F2D7CD] rounded-2xl">
              <p className="text-xs font-bold text-[#A64F36] mb-1 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4" />
                {language === 'id' ? 'Hal yang Perlu Diperhatikan:' : 'Safety Warnings & Precautions:'}
              </p>
              <ul className="space-y-1 text-xs text-stone-700">
                {herb.safetyNotes.precautions.map((p, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-[#A64F36] font-bold">·</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            {herb.safetyNotes.contraindications.length > 0 && (
              <div>
                <p className="text-xs font-bold text-stone-900 mb-1">
                  {language === 'id' ? 'Kontraindikasi:' : 'Contraindications:'}
                </p>
                <ul className="space-y-1 text-xs text-stone-600">
                  {herb.safetyNotes.contraindications.map((c, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-red-500 font-bold">✕</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {herb.safetyNotes.maxSafeIntake && (
              <div>
                <p className="text-xs font-bold text-stone-900 mb-1">
                  {language === 'id' ? 'Batas Aman Harian:' : 'Maximum Safe Daily Intake:'}
                </p>
                <p className="text-xs text-stone-600">{herb.safetyNotes.maxSafeIntake}</p>
              </div>
            )}

            <div className="pt-2 border-t border-stone-100">
              <p className="text-xs font-bold text-stone-900 mb-1">
                {language === 'id' ? 'Kapan Harus ke Dokter?' : 'When to See a Doctor?'}
              </p>
              <p className="text-xs text-stone-600 leading-relaxed">
                {herb.safetyNotes.whenToSeeDoctor}
              </p>
            </div>
          </div>
        )}

        {/* Tab Produk Pangan Open Food Facts */}
        {activeTab === 'produk' && (
          <div className="p-4 bg-white border border-stone-200 rounded-3xl shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold text-stone-900 font-['Outfit']">
                  {language === 'id' ? `Produk Pangan Berbahan ${herb.name}` : `Food Products Containing ${herb.name}`}
                </h3>
                <p className="text-[10px] text-stone-500">
                  {language === 'id'
                    ? `Data langsung dari Open Food Facts API v2 (Tag: ${herb.openFoodFactsTag || herb.name.toLowerCase()})`
                    : `Live data from Open Food Facts API v2 (Tag: ${herb.openFoodFactsTag || herb.name.toLowerCase()})`}
                </p>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-semibold">
                Live API
              </span>
            </div>

            {loadingOff ? (
              <div className="py-6 text-center">
                <div className="w-5 h-5 border-2 border-[#253D32] border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                <p className="text-xs text-stone-500">
                  {language === 'id' ? 'Memuat produk dari Open Food Facts...' : 'Loading products from Open Food Facts...'}
                </p>
              </div>
            ) : offProducts.length > 0 ? (
              <div className="space-y-2.5">
                {offProducts.map((p) => (
                  <div
                    key={p.code}
                    onClick={() => setSelectedOffProduct(p)}
                    className="p-2.5 bg-[#FAF6F0] rounded-2xl border border-stone-200 flex items-center gap-3 cursor-pointer hover:border-[#253D32] transition-colors"
                  >
                    {p.image_front_url ? (
                      <img
                        src={p.image_front_url}
                        alt={p.product_name}
                        className="w-12 h-12 object-contain bg-white rounded-xl p-1 border border-stone-200 shrink-0"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-white rounded-xl border border-stone-200 flex items-center justify-center text-xs shrink-0">
                        📦
                      </div>
                    )}
                    <div className="flex-1 min-w-0 text-xs">
                      <p className="font-bold text-stone-900 truncate">{p.product_name}</p>
                      <p className="text-[11px] text-stone-500 truncate">{p.brands} · Barcode: {p.code}</p>
                      <p className="text-[10px] text-stone-400 truncate mt-0.5">{p.ingredients_text}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-5 text-center text-xs text-stone-500 bg-[#FAF6F0] rounded-2xl border border-stone-200">
                <p>
                  {language === 'id'
                    ? `Belum ada produk pangan terdaftar dengan tag "${herb.openFoodFactsTag || herb.name.toLowerCase()}" di basis data publik.`
                    : `No food products found with tag "${herb.openFoodFactsTag || herb.name.toLowerCase()}" in the public database.`}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Selected Open Food Facts Product Modal */}
        {selectedOffProduct && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-5 max-w-sm w-full shadow-2xl border border-stone-200 space-y-3 text-xs max-h-[85vh] overflow-y-auto">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-semibold text-[#A64F36] uppercase tracking-wider">{selectedOffProduct.brands}</span>
                  <h3 className="text-sm font-bold text-stone-900 font-['Outfit'] mt-0.5">{selectedOffProduct.product_name}</h3>
                </div>
                <button
                  onClick={() => setSelectedOffProduct(null)}
                  className="w-7 h-7 rounded-full bg-stone-100 flex items-center justify-center text-stone-500 hover:bg-stone-200"
                >
                  ✕
                </button>
              </div>

              {selectedOffProduct.image_front_url && (
                <div className="w-full h-36 bg-stone-50 rounded-2xl flex items-center justify-center p-2 border border-stone-100">
                  <img src={selectedOffProduct.image_front_url} alt={selectedOffProduct.product_name} className="h-full object-contain" />
                </div>
              )}

              <div className="p-3 bg-[#FAF6F0] rounded-xl border border-stone-200 space-y-1">
                <p className="font-bold text-stone-900">
                  {language === 'id' ? 'Kode Barcode:' : 'Barcode:'} {selectedOffProduct.code}
                </p>
                <p className="text-stone-600 text-[11px]">
                  {language === 'id' ? 'Komposisi:' : 'Ingredients:'} {selectedOffProduct.ingredients_text || (language === 'id' ? 'Tidak tercantum' : 'Not specified')}
                </p>
              </div>

              {selectedOffProduct.nutriments && (
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-1.5">
                  <p className="font-bold text-stone-900">
                    {language === 'id' ? 'Informasi Nilai Gizi per 100g:' : 'Nutrition Facts per 100g:'}
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-[11px] text-stone-700">
                    <div>{language === 'id' ? 'Energi:' : 'Energy:'} {selectedOffProduct.nutriments.energy_kcal_100g || 0} kcal</div>
                    <div>{language === 'id' ? 'Lemak:' : 'Fat:'} {selectedOffProduct.nutriments.fat_100g || 0} g</div>
                    <div>{language === 'id' ? 'Gula:' : 'Sugars:'} {selectedOffProduct.nutriments.sugars_100g || 0} g</div>
                    <div>{language === 'id' ? 'Protein:' : 'Protein:'} {selectedOffProduct.nutriments.proteins_100g || 0} g</div>
                  </div>
                </div>
              )}

              {selectedOffProduct.allergens_tags && selectedOffProduct.allergens_tags.length > 0 && (
                <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-200 text-amber-800 text-[11px]">
                  <strong>{language === 'id' ? 'Alergen:' : 'Allergens:'}</strong> {selectedOffProduct.allergens_tags.join(', ')}
                </div>
              )}

              <button
                onClick={() => setSelectedOffProduct(null)}
                className="w-full py-2 bg-[#253D32] text-white rounded-xl font-semibold mt-2"
              >
                {language === 'id' ? 'Tutup' : 'Close'}
              </button>
            </div>
          </div>
        )}

        {activeTab === 'referensi' && (
          <div className="p-4 bg-white border border-stone-200 rounded-3xl shadow-xs">
            <h3 className="text-xs font-bold text-stone-900 font-['Outfit'] mb-2.5">
              {language === 'id' ? 'Daftar Referensi & Monografi' : 'References & Official Monographs'}
            </h3>
            <div className="space-y-2">
              {herb.references.map((ref, idx) => (
                <div key={idx} className="p-2.5 bg-[#FAF6F0] rounded-xl border border-stone-200 text-xs">
                  <p className="font-semibold text-stone-900">{ref.title}</p>
                  <p className="text-stone-500 text-[11px] mt-0.5">{ref.source}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-2 pt-1">
            <button
              onClick={onOpenTherapies}
              className="w-full h-11 rounded-xl bg-[#253D32] hover:bg-[#1A2D25] text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-2xs transition-all"
            >
              <span>{language === 'id' ? 'Lihat Tradisi Terkait' : 'View Related Traditions'}</span>
            </button>

            <button
              onClick={() =>
                onAskAssistant(
                  language === 'id'
                    ? `Bagaimana cara mengolah dan mengonsumsi ${herb.name} yang aman menurut kearifan tradisional dan bukti ilmiah?`
                    : `How can I safely prepare and consume ${herb.name} based on traditional wisdom and clinical evidence?`
                )
              }
              className="w-full h-11 rounded-xl bg-white border border-stone-200 text-stone-800 text-xs font-semibold flex items-center justify-center gap-2 hover:bg-stone-50 shadow-2xs transition-all"
            >
              <MessageSquare className="w-4 h-4 text-[#A64F36]" />
              <span>
                {language === 'id'
                  ? `Tanya Kakek Luhur tentang ${herb.name}`
                  : `Ask Grandpa Luhur about ${herb.name}`}
              </span>
            </button>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
