import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Search,
  Barcode,
  ShieldCheck,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  Info,
  ExternalLink,
  Package,
} from 'lucide-react';
import { OpenFoodProduct } from '../../types';
import {
  searchOpenFoodFacts,
  getProductByBarcode,
  getProductSelectedInfo,
} from '../../services/api';
import { useLanguage, LanguageToggle } from '../../i18n/LanguageContext';

interface FoodFactsScreenProps {
  onBack?: () => void;
}

export function FoodFactsScreen({ onBack }: FoodFactsScreenProps) {
  const [searchQuery, setSearchQuery] = useState('ginger');
  const [activeIngredientTag, setActiveIngredientTag] = useState('ginger');
  const [barcodeInput, setBarcodeInput] = useState('');
  const [useSelectiveFields, setUseSelectiveFields] = useState(false);
  const [products, setProducts] = useState<OpenFoodProduct[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<OpenFoodProduct | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showGuideModal, setShowGuideModal] = useState(false);
  const { t, language } = useLanguage();

  const rempahTags = [
    { label: 'Jahe (Ginger)', tag: 'ginger' },
    { label: 'Kunyit (Turmeric)', tag: 'turmeric' },
    { label: 'Kayu Manis (Cinnamon)', tag: 'cinnamon' },
    { label: 'Kelor (Moringa)', tag: 'moringa' },
    { label: 'Bawang (Onion)', tag: 'onion' },
    { label: 'Cengkeh (Clove)', tag: 'clove' },
  ];

  const sampleBarcodes = [
    { label: '3017620422003 (Nutella/Sampel)', code: '3017620422003' },
    { label: '0851770007566 (Herbal Protein)', code: '0851770007566' },
    { label: '8886467100055 (Snack Halal)', code: '8886467100055' },
  ];

  // Perform search on mount using Endpoint 2
  useEffect(() => {
    executeSearch('ginger');
  }, []);

  // Endpoint 2: Product Search by ingredient tag
  const executeSearch = async (tag: string) => {
    if (!tag.trim()) return;
    setLoading(true);
    setError(null);
    setActiveIngredientTag(tag.trim().toLowerCase());
    try {
      const res = await searchOpenFoodFacts(tag.trim().toLowerCase(), 1, 12);
      setProducts(res.products);
      if (res.products.length === 0) {
        setError(`Tidak ditemukan produk pangan dengan tag bahan "${tag}".`);
      }
    } catch (err: unknown) {
      console.error(err);
      setError('Gagal memuat data dari Open Food Facts API v2. Silakan coba kembali.');
    } finally {
      setLoading(false);
    }
  };

  // Endpoint 1 (Full) or Endpoint 3 (Selected Fields)
  const handleBarcodeLookup = async (code: string) => {
    const cleanCode = code.trim();
    if (!cleanCode) return;
    setLoading(true);
    setError(null);
    try {
      let product: OpenFoodProduct | null = null;
      if (useSelectiveFields) {
        // Endpoint 3: Selected product fields
        product = await getProductSelectedInfo(cleanCode);
      } else {
        // Endpoint 1: Full product detail
        product = await getProductByBarcode(cleanCode);
      }

      if (product) {
        setSelectedProduct(product);
      } else {
        setError(`Produk dengan barcode ${cleanCode} tidak ditemukan di database Open Food Facts.`);
      }
    } catch (err: unknown) {
      console.error(err);
      setError('Gagal mengambil informasi produk melalui barcode.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 w-full bg-[#FAF6F0] pb-24 md:pb-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-5 sm:space-y-6">
        {/* Top Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {onBack && (
              <button
                onClick={() => {
                  if (selectedProduct) setSelectedProduct(null);
                  else onBack();
                }}
                className="w-10 h-10 rounded-xl bg-white border border-stone-200 flex items-center justify-center text-stone-700 hover:bg-stone-50 transition-colors shadow-2xs"
                title="Kembali"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-[#1E201E] font-['Outfit']">
                {selectedProduct
                  ? language === 'id'
                    ? 'Detail Produk Pangan'
                    : 'Food Product Details'
                  : t('foodFactsTitle')}
              </h1>
              <p className="text-xs text-stone-500 hidden sm:block">
                {t('foodFactsSubtitle')}
              </p>
            </div>
          </div>

          <LanguageToggle />
        </div>

        {!selectedProduct ? (
          <>
            {/* Top Responsive Control Section: 2 Columns on desktop */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 mb-6">
              {/* Left Column: Search & Quick Guide */}
              <div className="lg:col-span-7 space-y-4">
                {/* Search Bar */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    executeSearch(searchQuery);
                  }}
                  className="space-y-2.5"
                >
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                      <Search className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={
                        language === 'id'
                          ? 'Cari nama produk, rempah (jahe, kunyit), atau merek...'
                          : 'Search product name, herbs (ginger, turmeric), or brand...'
                      }
                      className="w-full h-11 pl-10 pr-24 bg-white border border-stone-200 rounded-2xl text-xs placeholder:text-stone-400 focus:outline-hidden focus:ring-2 focus:ring-[#253D32]/20 focus:border-[#253D32] transition-all shadow-2xs"
                    />
                    <button
                      type="submit"
                      disabled={loading || !searchQuery.trim()}
                      className="absolute inset-y-1.5 right-1.5 px-4 bg-[#253D32] hover:bg-[#1A2D25] disabled:bg-stone-300 text-white text-xs font-semibold rounded-xl flex items-center gap-1 transition-all"
                    >
                      <span>{language === 'id' ? 'Cari' : 'Search'}</span>
                    </button>
                  </div>

                  {/* Ingredient Tag Chips */}
                  <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
                    {rempahTags.map((r) => (
                      <button
                        key={r.tag}
                        type="button"
                        onClick={() => {
                          setSearchQuery(r.tag);
                          executeSearch(r.tag);
                        }}
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                          activeIngredientTag === r.tag
                            ? 'bg-[#253D32] text-white shadow-2xs'
                            : 'bg-white border border-stone-200 text-stone-600 hover:border-stone-400'
                        }`}
                      >
                        🌿 {r.label}
                      </button>
                    ))}
                  </div>
                </form>

                {/* Quick Info Buttons Row */}
                <div className="grid grid-cols-4 gap-2.5 sm:gap-3">
                  <button
                    onClick={() => setShowGuideModal(true)}
                    className="p-3 bg-white border border-stone-200 rounded-2xl flex flex-col items-center text-center shadow-2xs hover:border-[#6E7953] transition-all"
                  >
                    <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-1.5">
                      <CheckCircle className="w-4 h-4" />
                    </div>
                    <span className="text-[11px] font-semibold text-stone-800">
                      {language === 'id' ? 'Izin Edar' : 'Permits'}
                    </span>
                  </button>

                  <button
                    onClick={() => setShowGuideModal(true)}
                    className="p-3 bg-white border border-stone-200 rounded-2xl flex flex-col items-center text-center shadow-2xs hover:border-[#6E7953] transition-all"
                  >
                    <div className="w-9 h-9 rounded-xl bg-[#F2F5ED] text-[#253D32] flex items-center justify-center mb-1.5">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <span className="text-[11px] font-semibold text-stone-800">
                      {language === 'id' ? 'BPOM KLIK' : 'KLIK Guide'}
                    </span>
                  </button>

                  <button
                    onClick={() => setShowGuideModal(true)}
                    className="p-3 bg-white border border-stone-200 rounded-2xl flex flex-col items-center text-center shadow-2xs hover:border-[#6E7953] transition-all"
                  >
                    <div className="w-9 h-9 rounded-xl bg-[#FAF6F0] text-stone-700 flex items-center justify-center mb-1.5">
                      <Barcode className="w-4 h-4" />
                    </div>
                    <span className="text-[11px] font-semibold text-stone-800">
                      {language === 'id' ? 'Cek Label' : 'Label Check'}
                    </span>
                  </button>

                  <button
                    onClick={() => setShowGuideModal(true)}
                    className="p-3 bg-white border border-stone-200 rounded-2xl flex flex-col items-center text-center shadow-2xs hover:border-[#6E7953] transition-all"
                  >
                    <div className="w-9 h-9 rounded-xl bg-[#FBF0EB] text-[#A64F36] flex items-center justify-center mb-1.5">
                      <AlertTriangle className="w-4 h-4" />
                    </div>
                    <span className="text-[11px] font-semibold text-stone-800">
                      {language === 'id' ? 'Tips Aman' : 'Safe Tips'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Right Column: Barcode Lookup Box */}
              <div className="lg:col-span-5 p-4 sm:p-5 bg-gradient-to-br from-[#F2F5ED] to-[#E9EFE3] border border-[#DFE5D5] rounded-3xl shadow-2xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Barcode className="w-4 h-4 text-[#253D32]" />
                      <h3 className="text-xs font-bold text-[#253D32] font-['Outfit']">
                        {language === 'id' ? 'Cek Produk via Barcode' : 'Lookup via Barcode'}
                      </h3>
                    </div>

                    {/* Endpoint 3 Toggle */}
                    <label className="flex items-center gap-1.5 text-[11px] font-medium text-stone-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={useSelectiveFields}
                        onChange={(e) => setUseSelectiveFields(e.target.checked)}
                        className="rounded text-[#253D32] focus:ring-[#253D32] w-3.5 h-3.5"
                      />
                      <span>{language === 'id' ? 'Endpoint 3 (Filter Field)' : 'Endpoint 3 (Field Filter)'}</span>
                    </label>
                  </div>

                  <p className="text-[11px] text-stone-600 mb-3">
                    {language === 'id'
                      ? 'Masukkan kode barcode produk untuk melihat detail gizi, alergen, dan bahan langsung dari Open Food Facts.'
                      : 'Enter product barcode to inspect nutrition facts, allergens, and ingredients directly from Open Food Facts.'}
                  </p>

                  <div className="flex gap-2 mb-3">
                    <input
                      type="text"
                      value={barcodeInput}
                      onChange={(e) => setBarcodeInput(e.target.value)}
                      placeholder={language === 'id' ? 'Contoh: 3017620422003' : 'Example: 3017620422003'}
                      className="flex-1 h-10 px-3 bg-white border border-stone-200 rounded-xl text-xs placeholder:text-stone-400 focus:outline-hidden focus:ring-2 focus:ring-[#253D32]/20"
                    />
                    <button
                      onClick={() => handleBarcodeLookup(barcodeInput)}
                      disabled={!barcodeInput.trim() || loading}
                      className="px-4 bg-[#253D32] hover:bg-[#1A2D25] disabled:bg-stone-300 text-white text-xs font-semibold rounded-xl transition-all shadow-xs"
                    >
                      {language === 'id' ? 'Cek' : 'Check'}
                    </button>
                  </div>
                </div>

                {/* Quick Sample Barcode Pills */}
                <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-[#DFE5D5]/80">
                  <span className="text-[10px] text-stone-600 font-semibold mr-1">
                    {language === 'id' ? 'Contoh Cepat:' : 'Quick Samples:'}
                  </span>
                  {sampleBarcodes.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setBarcodeInput(item.code);
                        handleBarcodeLookup(item.code);
                      }}
                      className="text-[10px] bg-white hover:bg-stone-50 border border-stone-200 text-stone-700 px-2 py-1 rounded-lg transition-colors shadow-2xs"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl text-xs text-red-700 flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {/* Product Results Section */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-stone-900 font-['Outfit']">
                    {language === 'id' ? 'Hasil Produk Bahan Rempah & Pangan' : 'Herbal & Food Product Results'}
                  </h3>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-stone-200/70 text-stone-700 font-medium">
                    {products.length} {language === 'id' ? 'ditemukan' : 'found'}
                  </span>
                </div>
                <span className="text-xs text-stone-400 hidden sm:inline">
                  Open Food Facts v2 API Integration
                </span>
              </div>

              {loading ? (
                <div className="p-12 text-center bg-white rounded-3xl border border-stone-200 shadow-xs">
                  <div className="w-8 h-8 border-3 border-[#253D32] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                  <p className="text-xs font-semibold text-stone-700">
                    {language === 'id' ? 'Mengambil data dari Open Food Facts API v2...' : 'Fetching data from Open Food Facts API v2...'}
                  </p>
                  <p className="text-[11px] text-stone-400 mt-1">
                    {language === 'id' ? 'Memproses informasi gizi dan komposisi bahan' : 'Processing nutritional info and ingredients list'}
                  </p>
                </div>
              ) : (
                /* Responsive Grid: 1 col mobile, 2 col tablet, 3 col desktop */
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
                  {products.map((p) => (
                    <div
                      key={p.code}
                      onClick={() => setSelectedProduct(p)}
                      className="p-4 bg-white border border-stone-200/90 rounded-2xl sm:rounded-3xl shadow-2xs hover:shadow-md hover:border-[#6E7953] transition-all cursor-pointer flex flex-col justify-between group h-full"
                    >
                      <div className="flex items-start gap-3.5 mb-3">
                        {p.image_front_url ? (
                          <img
                            src={p.image_front_url}
                            alt={p.product_name}
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                            className="w-16 h-16 rounded-xl object-contain bg-stone-50 p-1 shrink-0 border border-stone-100"
                          />
                        ) : (
                          <div className="w-16 h-16 rounded-xl bg-[#FAF6F0] flex items-center justify-center text-stone-400 text-lg shrink-0 border border-stone-200/80">
                            <Package className="w-6 h-6 text-stone-400" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <span className="text-[10px] font-semibold text-[#A64F36] uppercase tracking-wider block truncate">
                            {p.brands || (language === 'id' ? 'Merek Umum' : 'General Brand')}
                          </span>
                          <h4 className="text-xs font-bold text-stone-900 group-hover:text-[#253D32] transition-colors line-clamp-2 leading-snug">
                            {p.product_name || (language === 'id' ? 'Produk Tanpa Nama' : 'Unnamed Product')}
                          </h4>
                          <span className="inline-block mt-1 text-[10px] font-mono bg-stone-100 text-stone-600 px-1.5 py-0.5 rounded">
                            {p.code}
                          </span>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-stone-100">
                        <p className="text-[11px] text-stone-500 line-clamp-2 leading-relaxed">
                          {p.ingredients_text || (language === 'id' ? 'Komposisi bahan tersedia pada kemasan resmi.' : 'Ingredients list available on official package.')}
                        </p>
                        <div className="flex items-center justify-between mt-2.5 text-xs text-[#253D32] font-semibold">
                          <span>{language === 'id' ? 'Lihat Nilai Gizi & Bahan' : 'View Nutrition & Ingredients'}</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        ) : (
          /* Selected Product Detail View: Responsive 2-column layout */
          <div className="space-y-6 animate-in fade-in max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              {/* Left Column: Image & Brand Overview */}
              <div className="md:col-span-5 bg-white border border-stone-200/90 rounded-3xl p-5 shadow-xs space-y-4">
                <div className="w-full h-56 rounded-2xl bg-stone-50 flex items-center justify-center p-3 overflow-hidden border border-stone-100">
                  {selectedProduct.image_front_url ? (
                    <img
                      src={selectedProduct.image_front_url}
                      alt={selectedProduct.product_name}
                      className="h-full object-contain"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-stone-400">
                      <Package className="w-12 h-12 mb-2 stroke-1" />
                      <span className="text-xs">{language === 'id' ? 'Foto tidak tersedia' : 'Photo not available'}</span>
                    </div>
                  )}
                </div>

                <div>
                  <span className="text-[11px] font-bold text-[#A64F36] uppercase tracking-wider">
                    {selectedProduct.brands || (language === 'id' ? 'Produk Open Food Facts' : 'Open Food Facts Product')}
                  </span>
                  <h2 className="text-lg font-bold text-stone-900 font-['Outfit'] mt-1 leading-snug">
                    {selectedProduct.product_name}
                  </h2>
                  <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-stone-100 text-stone-700 text-xs font-mono">
                    <Barcode className="w-3.5 h-3.5" />
                    <span>{selectedProduct.code}</span>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedProduct(null)}
                  className="w-full py-2.5 bg-stone-100 hover:bg-stone-200/80 text-stone-700 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>{language === 'id' ? 'Kembali ke Daftar Produk' : 'Back to Product List'}</span>
                </button>
              </div>

              {/* Right Column: Ingredients, Nutrition & Allergen */}
              <div className="md:col-span-7 space-y-4">
                {/* Komposisi Bahan */}
                <div className="p-5 bg-white border border-stone-200/90 rounded-3xl shadow-xs">
                  <h3 className="text-xs font-bold text-stone-900 font-['Outfit'] mb-2 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-[#253D32]" />
                    <span>{language === 'id' ? 'Komposisi Bahan (Ingredients)' : 'Ingredients List'}</span>
                  </h3>
                  <p className="text-xs text-stone-700 leading-relaxed bg-[#FAF6F0] p-3 rounded-2xl border border-stone-200/80">
                    {selectedProduct.ingredients_text || (language === 'id' ? 'Komposisi detail tidak tercantum secara spesifik di database.' : 'Specific ingredients not detailed in the database.')}
                  </p>
                </div>

                {/* Nutriments Data Grid */}
                {selectedProduct.nutriments && (
                  <div className="p-5 bg-white border border-stone-200/90 rounded-3xl shadow-xs">
                    <h3 className="text-xs font-bold text-stone-900 font-['Outfit'] mb-3">
                      {language === 'id' ? 'Informasi Nilai Gizi (per 100g / porsi)' : 'Nutrition Facts (per 100g / serving)'}
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
                      <div className="p-3 bg-[#FAF6F0] rounded-2xl border border-stone-200/70 text-center">
                        <span className="text-[11px] text-stone-500 block mb-1">
                          {language === 'id' ? 'Energi' : 'Energy'}
                        </span>
                        <strong className="text-sm text-stone-900">
                          {selectedProduct.nutriments.energy_kcal_100g ?? 0}
                        </strong>
                        <span className="text-[10px] text-stone-400 block">{language === 'id' ? 'kkal' : 'kcal'}</span>
                      </div>
                      <div className="p-3 bg-[#FAF6F0] rounded-2xl border border-stone-200/70 text-center">
                        <span className="text-[11px] text-stone-500 block mb-1">
                          {language === 'id' ? 'Lemak' : 'Fat'}
                        </span>
                        <strong className="text-sm text-stone-900">
                          {selectedProduct.nutriments.fat_100g ?? 0}
                        </strong>
                        <span className="text-[10px] text-stone-400 block">g</span>
                      </div>
                      <div className="p-3 bg-[#FAF6F0] rounded-2xl border border-stone-200/70 text-center">
                        <span className="text-[11px] text-stone-500 block mb-1">
                          {language === 'id' ? 'Gula' : 'Sugars'}
                        </span>
                        <strong className="text-sm text-stone-900">
                          {selectedProduct.nutriments.sugars_100g ?? 0}
                        </strong>
                        <span className="text-[10px] text-stone-400 block">g</span>
                      </div>
                      <div className="p-3 bg-[#FAF6F0] rounded-2xl border border-stone-200/70 text-center">
                        <span className="text-[11px] text-stone-500 block mb-1">
                          {language === 'id' ? 'Protein' : 'Protein'}
                        </span>
                        <strong className="text-sm text-stone-900">
                          {selectedProduct.nutriments.proteins_100g ?? 0}
                        </strong>
                        <span className="text-[10px] text-stone-400 block">g</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Allergen Notice */}
                {selectedProduct.allergens_tags && selectedProduct.allergens_tags.length > 0 && (
                  <div className="p-4 bg-[#FBF0EB] border border-[#F2D7CD] rounded-2xl text-xs text-[#A64F36]">
                    <strong>{language === 'id' ? 'Peringatan Alergen:' : 'Allergen Alert:'}</strong>{' '}
                    {selectedProduct.allergens_tags.join(', ')}
                  </div>
                )}

                {/* Important Scientific Disclaimer */}
                <div className="p-4 bg-white border border-stone-200/90 rounded-2xl text-xs text-stone-600 leading-relaxed">
                  <strong className="text-stone-800">
                    {language === 'id' ? 'Catatan Edukasi SiLuhur:' : 'SiLuhur Educational Note:'}
                  </strong>{' '}
                  {language === 'id'
                    ? 'Data produk ini dihimpun secara terbuka melalui platform komunitas dunia Open Food Facts. Pastikan untuk selalu membaca label fisik asli pada kemasan dan nomor izin edar BPOM sebelum mengonsumsi.'
                    : 'This product information is openly aggregated via Open Food Facts. Always verify physical packaging labels and official health authority permits before consuming.'}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Guide Modal (BPOM KLIK Guide) */}
        {showGuideModal && (
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-stone-200 space-y-4 text-xs">
              <div className="flex items-center justify-between border-b border-stone-100 pb-2">
                <h3 className="text-sm font-bold text-stone-900 font-['Outfit']">
                  {language === 'id' ? 'Panduan Cek KLIK dari BPOM RI' : 'Indonesian FDA (BPOM) KLIK Safety Guide'}
                </h3>
                <button
                  onClick={() => setShowGuideModal(false)}
                  className="w-7 h-7 rounded-full bg-stone-100 flex items-center justify-center text-stone-500 hover:text-stone-800"
                >
                  ✕
                </button>
              </div>
              <p className="text-stone-600 leading-relaxed">
                {language === 'id'
                  ? 'Sebelum membeli dan mengonsumsi produk obat bahan alam (herbal), jamu kemasan, maupun pangan olahan, terapkan standar KLIK:'
                  : 'Before buying or consuming traditional herbal medicines or packaged foods, apply the KLIK standard:'}
              </p>
              <div className="space-y-2.5">
                <div className="p-3 bg-[#FAF6F0] rounded-xl border border-stone-200">
                  <strong className="text-[#A64F36]">
                    {language === 'id' ? 'K - Kemasan:' : 'K - Packaging (Kemasan):'}
                  </strong>{' '}
                  {language === 'id'
                    ? 'Pastikan kemasan dalam kondisi bersih, tidak penyok, tidak sobek, dan segel belum rusak.'
                    : 'Ensure packaging is clean, untampered, and tightly sealed without dents or tears.'}
                </div>
                <div className="p-3 bg-[#FAF6F0] rounded-xl border border-stone-200">
                  <strong className="text-[#253D32]">
                    {language === 'id' ? 'L - Label:' : 'L - Label:'}
                  </strong>{' '}
                  {language === 'id'
                    ? 'Periksa nama produk, aturan pakai, dosis pemakaian, kontraindikasi, dan alamat produsen.'
                    : 'Inspect product brand, dosage instructions, contraindications, and manufacturer address.'}
                </div>
                <div className="p-3 bg-[#FAF6F0] rounded-xl border border-stone-200">
                  <strong className="text-emerald-700">
                    {language === 'id' ? 'I - Izin Edar:' : 'I - Distribution Permit (Izin Edar):'}
                  </strong>{' '}
                  {language === 'id'
                    ? 'Pastikan memiliki nomor izin edar sah (contoh: POM TR untuk Jamu, POM HT untuk Herbal Terstandar, POM FF untuk Fitofarmaka).'
                    : 'Verify official authorization number (e.g., BPOM TR for Jamu, POM HT for Standardized Herbals, POM FF for Phytopharmaceuticals).'}
                </div>
                <div className="p-3 bg-[#FAF6F0] rounded-xl border border-stone-200">
                  <strong className="text-amber-700">
                    {language === 'id' ? 'K - Kedaluwarsa:' : 'K - Expiry Date (Kedaluwarsa):'}
                  </strong>{' '}
                  {language === 'id'
                    ? "Jangan mengonsumsi jika sudah melewati tanggal 'Baik Digunakan Sebelum' (EXP date)."
                    : 'Never consume items past the Best Before / Expiration date.'}
                </div>
              </div>
              <button
                onClick={() => setShowGuideModal(false)}
                className="w-full py-2.5 bg-[#253D32] text-white rounded-xl font-semibold shadow-xs hover:bg-[#1A2D25] transition-colors"
              >
                {language === 'id' ? 'Saya Mengerti' : 'I Understand'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
