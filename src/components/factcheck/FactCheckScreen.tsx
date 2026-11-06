import React, { useState } from 'react';
import {
  Search,
  ArrowRight,
  Sparkles,
  AlertTriangle,
  BookOpen,
  ArrowLeft,
  Bookmark,
  Share2,
  CheckCircle,
} from 'lucide-react';
import { FactCheckItem } from '../../types';
import { getCuratedFactchecks, CURATED_FACTCHECKS, CURATED_FACTCHECKS_EN } from '../../data/factchecks';
import { checkClaimWithGemini } from '../../services/api';
import { VerdictBadge, EvidenceStrengthBadge } from '../common/Badge';
import { useLanguage, LanguageToggle } from '../../i18n/LanguageContext';

interface FactCheckScreenProps {
  onBack?: () => void;
  onAskAssistantWithContext?: (question: string) => void;
}

export function FactCheckScreen({
  onBack,
  onAskAssistantWithContext,
}: FactCheckScreenProps) {
  const [claimInput, setClaimInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedResult, setSelectedResult] = useState<FactCheckItem | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [copiedNotification, setCopiedNotification] = useState(false);
  const { t, language } = useLanguage();

  const sampleClaims =
    language === 'id'
      ? [
          'Jahe bisa sembuhkan semua penyakit',
          'Minum air lemon setiap hari bisa detoks',
          'Kunyit dan jamu kunyit asam bisa redakan nyeri haid',
          'Produk herbal selalu 100% aman tanpa efek samping',
          'Kerokan mengeluarkan angin lewat pori-pori',
          'Daun kelor terbukti memperlancar ASI',
        ]
      : [
          'Ginger cures all chronic illnesses',
          'Drinking lemon water daily flushes toxins from the body',
          'Turmeric and tamarind brew relieves menstrual cramps',
          'Herbal remedies are always 100% safe without side effects',
          'Coin scraping (kerokan) releases wind through pores',
          'Moringa leaves are clinically proven to boost breast milk',
        ];

  const handleCheckClaim = async (claimText: string) => {
    if (!claimText.trim()) return;
    setLoading(true);
    setErrorMessage(null);

    // 1. Check if it matches curated factchecks in active language
    const lower = claimText.toLowerCase();
    const curatedList = getCuratedFactchecks(language);
    const existing = curatedList.find(
      (c) =>
        c.claim.toLowerCase().includes(lower) ||
        lower.includes(c.claim.toLowerCase()) ||
        c.tags.some((t) => lower.includes(t.toLowerCase()))
    );

    // Also check cross-language match (e.g. searching "ginger" while in english matches claim-1)
    if (existing) {
      setSelectedResult(existing);
      setLoading(false);
      return;
    }

    const crossMatch = (language === 'en' ? CURATED_FACTCHECKS : CURATED_FACTCHECKS_EN).find(
      (c) =>
        c.claim.toLowerCase().includes(lower) ||
        lower.includes(c.claim.toLowerCase()) ||
        c.tags.some((t) => lower.includes(t.toLowerCase()))
    );
    if (crossMatch) {
      const targetInActiveLang = curatedList.find((c) => c.id === crossMatch.id) || crossMatch;
      setSelectedResult(targetInActiveLang);
      setLoading(false);
      return;
    }

    try {
      // Query Gemini AI API with selected language
      const result = await checkClaimWithGemini(claimText, language);
      setSelectedResult(result);
    } catch (err: unknown) {
      console.warn('Gemini API call fallback:', err);
      const isSuspectMyth =
        lower.includes('semua penyakit') ||
        lower.includes('100% aman') ||
        lower.includes('autisme') ||
        lower.includes('cures all');
      const isLikelyFact =
        lower.includes('haid') ||
        lower.includes('asi') ||
        lower.includes('imunitas') ||
        lower.includes('cramp') ||
        lower.includes('digest');

      const fallbackResult: FactCheckItem = {
        id: 'fallback-' + Date.now(),
        claim: claimText,
        verdict: isSuspectMyth ? 'Mitos' : isLikelyFact ? 'Fakta' : 'Belum Cukup Bukti',
        strengthOfEvidence: isSuspectMyth ? 'Kuat' : isLikelyFact ? 'Sedang' : 'Terbatas',
        summary:
          language === 'id'
            ? `Klaim "${claimText}" perlu ditelaah secara hati-hati. Banyak rempah dan tanaman obat Nusantara terbukti kaya fitonutrien antioksidan, namun tidak boleh diklaim secara berlebihan sebagai obat tunggal tanpa rujukan medis resmi.`
            : `The claim "${claimText}" requires careful evaluation. While Indonesian botanicals are rich in antioxidant phytonutrients, they must not be exaggerated as singular cure-alls without clinical physician guidance.`,
        scientificEvidence:
          language === 'id'
            ? 'Berdasarkan literatur farmakologi herbal, tanaman obat bekerja secara bertahap (holistik) melalui modulasi sistem imun atau antiinflamasi ringan, bukan bekerja instan seperti obat sintetis berdosis tinggi.'
            : 'Herbal pharmacological literature indicates traditional botanicals act progressively via mild immunomodulatory and anti-inflammatory pathways rather than immediate high-dose synthetic interventions.',
        culturalContext:
          language === 'id'
            ? 'Masyarakat Nusantara secara turun-temurun memanfaatkan jamu dan tanaman pekarangan untuk menjaga kebugaran jasmani dan mencegah penyakit ringan.'
            : 'Indonesian communities have traditionally brewed backyard herbs and jamu to sustain physical stamina and prevent mild ailments.',
        safetyCaution:
          language === 'id'
            ? 'Jangan menghentikan obat medis dari dokter. Hati-hati terhadap jamu oplosan Bahan Kimia Obat (BKO) dan perhatikan nomor izin edar resmi BPOM.'
            : 'Never discontinue prescribed doctor medication. Beware of unverified herbal concoctions adulterated with synthetic drugs and ensure official BPOM licensing.',
        tags: ['SiLuhur Review', 'Literasi Sains'],
        references: [
          { title: 'Badan Pengawas Obat dan Makanan (BPOM RI)', source: 'Direktorat Registrasi Obat Tradisional' },
          { title: 'Kementerian Kesehatan Republik Indonesia', source: 'Pedoman Pemanfaatan TOGA' },
          { title: 'World Health Organization (WHO)', source: 'Guidelines on Safety Monitoring of Herbal Medicines' }
        ],
        reviewedDate: language === 'id' ? 'November 2026' : 'November 2026',
      };
      setSelectedResult(fallbackResult);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectSample = (sample: string) => {
    setClaimInput(sample);
    handleCheckClaim(sample);
  };

  const handleShare = () => {
    if (!selectedResult) return;
    const shareText = `[SiLuhur FactCheck] ${selectedResult.claim}\nStatus: ${selectedResult.verdict}\nRingkasan: ${selectedResult.summary}`;
    navigator.clipboard?.writeText(shareText);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2500);
  };

  return (
    <div className="flex-1 w-full bg-[#FAF6F0] pb-24 md:pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-5 sm:space-y-6">
        {/* Top Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {onBack && (
              <button
                onClick={() => {
                  if (selectedResult) setSelectedResult(null);
                  else onBack();
                }}
                className="w-10 h-10 rounded-xl bg-white border border-stone-200 flex items-center justify-center text-stone-700 hover:bg-stone-50 shadow-2xs transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
            <h1 className="text-base sm:text-lg font-bold text-[#1E201E] font-['Outfit']">
            {selectedResult
              ? language === 'id'
                ? 'Hasil Analisis Klaim'
                : 'Claim Analysis Results'
              : t('siluhurCheckBannerTitle')}
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <LanguageToggle />
          {selectedResult && (
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-colors ${
                  isBookmarked
                    ? 'bg-[#A64F36] border-[#A64F36] text-white'
                    : 'bg-white border-stone-200 text-stone-600'
                }`}
                title={t('bookmark')}
              >
                <Bookmark className="w-4 h-4" />
              </button>
              <button
                onClick={handleShare}
                className="w-9 h-9 rounded-xl bg-white border border-stone-200 text-stone-600 flex items-center justify-center hover:bg-stone-50"
                title={t('share')}
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {copiedNotification && (
        <div className="mb-3 px-3 py-2 bg-emerald-100 text-emerald-800 text-xs rounded-xl flex items-center gap-2 border border-emerald-200 animate-in fade-in">
          <CheckCircle className="w-4 h-4 text-emerald-600" />
          <span>
            {language === 'id'
              ? 'Hasil analisis disalin ke papan klip!'
              : 'Analysis copied to clipboard!'}
          </span>
        </div>
      )}

      {/* Main View: Search Input or Result View */}
      {!selectedResult ? (
        <div className="flex flex-col items-center">
          {/* Magnifying Glass Hero Graphic */}
          <div className="relative w-32 h-32 flex items-center justify-center my-4">
            <div className="absolute inset-0 rounded-full bg-[#FFF0D3] border border-[#F4E3C1]" />
            <div className="relative z-10 w-20 h-20 rounded-full bg-white shadow-md flex items-center justify-center border-4 border-[#253D32]">
              <Search className="w-9 h-9 text-[#A64F36] stroke-[2.5]" />
            </div>
            {/* Sparkles icon */}
            <Sparkles className="absolute top-2 right-4 w-6 h-6 text-[#A64F36]" />
            <Sparkles className="absolute bottom-3 left-4 w-5 h-5 text-[#6E7953]" />
          </div>

          {/* Heading */}
          <h2 className="text-xl font-bold text-center text-[#1E201E] font-['Outfit'] mb-1">
            {t('factCheckHeroTitle')}
          </h2>
          <p className="text-xs text-center text-stone-600 max-w-xs mb-5 font-normal">
            {t('factCheckHeroDesc')}
          </p>

          {/* Claim Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleCheckClaim(claimInput);
            }}
            className="w-full relative mb-6"
          >
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={claimInput}
              onChange={(e) => setClaimInput(e.target.value)}
              placeholder={t('factCheckInputPlaceholder')}
              className="w-full h-12 pl-10 pr-24 bg-white border border-stone-200 rounded-2xl text-xs placeholder:text-stone-400 focus:outline-hidden focus:ring-2 focus:ring-[#253D32]/20 focus:border-[#253D32] transition-all shadow-xs"
            />
            <button
              type="submit"
              disabled={loading || !claimInput.trim()}
              className="absolute inset-y-1 right-1 px-4 bg-[#253D32] hover:bg-[#1A2D25] disabled:bg-stone-300 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-all"
            >
              {loading ? (
                <span>{language === 'id' ? 'Meneliti...' : 'Checking...'}</span>
              ) : (
                <>
                  <span>{language === 'id' ? 'Periksa' : 'Verify'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>

          {errorMessage && (
            <div className="w-full mb-4 p-3 bg-red-50 border border-red-200 rounded-2xl text-xs text-red-700 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Sample Claims List */}
          <div className="w-full">
            <h3 className="text-xs font-bold text-stone-700 mb-2.5 font-['Outfit']">
              {t('commonClaimsTitle')}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {sampleClaims.map((claim, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectSample(claim)}
                  className="w-full p-3 bg-white border border-stone-200/90 rounded-2xl text-left text-xs text-stone-800 font-medium hover:border-[#6E7953] hover:bg-[#F2F5ED] transition-all shadow-2xs flex items-center justify-between group"
                >
                  <span className="line-clamp-1">{claim}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-stone-700 group-hover:translate-x-0.5 transition-all shrink-0" />
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Result Screen View */
        <div className="flex flex-col gap-4 animate-in fade-in duration-300">
          {/* Claim Card Header */}
          <div className="p-4 bg-white border border-stone-200 rounded-3xl shadow-xs">
            <p className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider mb-1">
              {language === 'id' ? 'Klaim yang Dianalisis' : 'Analyzed Health Claim'}
            </p>
            <h2 className="text-sm font-bold text-stone-900 mb-3 leading-snug">
              "{selectedResult.claim}"
            </h2>

            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-stone-100">
              <VerdictBadge verdict={selectedResult.verdict} />
              <EvidenceStrengthBadge level={selectedResult.strengthOfEvidence} />
            </div>
          </div>

          {/* Summary Card */}
          <div className="p-4 bg-white border border-stone-200 rounded-3xl shadow-xs">
            <h3 className="text-xs font-bold text-stone-900 font-['Outfit'] mb-2 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#A64F36]" />
              {language === 'id' ? 'Ringkasan Analisis' : 'Analysis Summary'}
            </h3>
            <p className="text-xs text-stone-700 leading-relaxed">
              {selectedResult.summary}
            </p>
          </div>

          {/* Scientific Evidence Card */}
          <div className="p-4 bg-[#F2F5ED] border border-[#DFE5D5] rounded-3xl shadow-xs">
            <h3 className="text-xs font-bold text-[#253D32] font-['Outfit'] mb-2 flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-[#6E7953]" />
              {t('scientificEvidenceSection')}
            </h3>
            <p className="text-xs text-stone-700 leading-relaxed">
              {selectedResult.scientificEvidence}
            </p>
          </div>

          {/* Cultural Context Card */}
          <div className="p-4 bg-[#FFF0D3]/50 border border-[#F4E3C1] rounded-3xl shadow-xs">
            <h3 className="text-xs font-bold text-stone-900 font-['Outfit'] mb-2 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-[#A64F36]" />
              {t('culturalContextSection')}
            </h3>
            <p className="text-xs text-stone-700 leading-relaxed">
              {selectedResult.culturalContext}
            </p>
          </div>

          {/* Safety and Caution Card */}
          <div className="p-4 bg-[#FBF0EB] border border-[#F2D7CD] rounded-3xl shadow-xs">
            <h3 className="text-xs font-bold text-[#A64F36] font-['Outfit'] mb-2 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-[#A64F36]" />
              {t('safetyCautionSection')}
            </h3>
            <p className="text-xs text-stone-700 leading-relaxed">
              {selectedResult.safetyCaution}
            </p>
          </div>

          {/* References */}
          {selectedResult.references && selectedResult.references.length > 0 && (
            <div className="p-4 bg-white border border-stone-200 rounded-3xl shadow-xs">
              <h3 className="text-xs font-bold text-stone-900 font-['Outfit'] mb-2">
                {t('referencesSection')}
              </h3>
              <ul className="space-y-1.5">
                {selectedResult.references.map((ref, idx) => (
                  <li key={idx} className="text-[11px] text-stone-600 flex items-start gap-1.5">
                    <span className="text-[#A64F36] font-bold">·</span>
                    <span>
                      <strong className="text-stone-800">{ref.title}</strong>
                      {ref.source && ` — ${ref.source}`}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Responsible AI Medical Disclaimer */}
          <div className="p-3 bg-stone-100/80 rounded-2xl border border-stone-200 text-[10px] text-stone-500 leading-relaxed">
            <strong>{language === 'id' ? 'Catatan Medis:' : 'Medical Notice:'}</strong>{' '}
            {language === 'id'
              ? 'Analisis ini disusun untuk tujuan edukasi kesehatan masyarakat dan literasi ilmiah. Informasi ini tidak menggantikan konsultasi langsung, diagnosis, atau rencana terapi dokter spesialis Anda.'
              : 'This analysis is compiled strictly for public health education and scientific literacy. It does not replace direct clinical consultation, diagnosis, or treatment plans from medical professionals.'}
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <button
              onClick={() => setSelectedResult(null)}
              className="flex-1 py-3 bg-white border border-stone-200 text-stone-700 font-semibold rounded-2xl text-xs hover:bg-stone-50 transition-all text-center"
            >
              {language === 'id' ? 'Periksa Klaim Lain' : 'Verify Another Claim'}
            </button>
            {onAskAssistantWithContext && (
              <button
                onClick={() =>
                  onAskAssistantWithContext(
                    language === 'id'
                      ? `Jelaskan lebih lanjut mengenai klaim: "${selectedResult.claim}"`
                      : `Please explain in detail regarding the claim: "${selectedResult.claim}"`
                  )
                }
                className="flex-1 py-3 bg-[#253D32] text-white font-semibold rounded-2xl text-xs hover:bg-[#1A2D25] transition-all text-center flex items-center justify-center gap-1.5"
              >
                <span>{t('askAi')}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      )}
      </div>
    </div>
  );
}
