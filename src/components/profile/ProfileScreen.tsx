import React, { useState } from 'react';
import {
  Bookmark,
  Award,
  BookOpen,
  ShieldCheck,
  RotateCcw,
  Heart,
  ArrowRight,
  LogOut,
  LogIn,
  Globe,
} from 'lucide-react';
import { HerbItem, UserProfile } from '../../types';
import { StorageService } from '../../services/storage';
import { useLanguage, LanguageToggle } from '../../i18n/LanguageContext';

interface ProfileScreenProps {
  herbs: HerbItem[];
  user: UserProfile | null;
  onSelectHerb: (herbId: string) => void;
  onOpenTherapies: () => void;
  onOpenRempahPedia: () => void;
  onOpenAuthModal: () => void;
  onLogout: () => void;
}

export function ProfileScreen({
  herbs,
  user,
  onSelectHerb,
  onOpenTherapies,
  onOpenRempahPedia,
  onOpenAuthModal,
  onLogout,
}: ProfileScreenProps) {
  const [bookmarks, setBookmarks] = useState<string[]>(() =>
    StorageService.getBookmarks()
  );
  const [rempahDocsCount] = useState<number>(() =>
    StorageService.getRempahDocs().length
  );
  const [showEthicsModal, setShowEthicsModal] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [resetMessage, setResetMessage] = useState<string | null>(null);
  const { t, language } = useLanguage();

  const bookmarkedHerbs = herbs.filter((h) => bookmarks.includes(h.id));

  const handleExecuteReset = () => {
    localStorage.clear();
    setBookmarks(['jahe', 'kunyit']);
    setShowResetConfirm(false);
    setResetMessage(
      language === 'id'
        ? 'Data tracker berhasil direset.'
        : 'Tracker data has been successfully reset.'
    );
    setTimeout(() => setResetMessage(null), 3000);
  };

  return (
    <div className="flex-1 w-full bg-[#FAF6F0] pb-24 md:pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-5 sm:space-y-6">
        {/* Top Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-base sm:text-lg font-bold text-[#1E201E] font-['Outfit']">
            {t('profileHeading')}
          </h1>

          <div className="flex items-center gap-2">
            {user ? (
              <button
                onClick={onLogout}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-red-200 text-red-700 hover:bg-red-50 text-xs font-semibold shadow-2xs transition-all"
                title="Keluar dari akun"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>{t('logout')}</span>
              </button>
            ) : (
              <button
                onClick={onOpenAuthModal}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#253D32] hover:bg-[#1A2D25] text-white text-xs font-semibold shadow-2xs transition-all"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>{t('login')}</span>
              </button>
            )}
          </div>
        </div>

        {resetMessage && (
          <div className="p-3 bg-emerald-100 text-emerald-800 text-xs rounded-xl border border-emerald-200">
            {resetMessage}
          </div>
        )}

        {/* Responsive Layout Grid: 1 Col Mobile, 12 Col Desktop */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 items-start">
          {/* Left Column (5 Cols Desktop) */}
          <div className="md:col-span-5 space-y-4">
            {/* Profile Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-stone-200/90 shadow-2xs flex items-center gap-3.5">
              <div className="w-14 h-14 rounded-xl bg-[#253D32] flex items-center justify-center text-white text-xl font-bold font-['Outfit'] shrink-0 shadow-2xs">
                {user ? user.name.charAt(0).toUpperCase() : 'G'}
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-sm font-bold text-stone-900 font-['Outfit'] truncate">
                  {user ? user.name : t('guestUser')}
                </h2>
                <p className="text-xs text-stone-500 truncate">
                  {user ? user.email : t('notLoggedIn')}
                </p>
                <div className="flex items-center gap-1.5 mt-1.5">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#F2F5ED] text-[#253D32] border border-[#DFE5D5] flex items-center gap-1">
                    <Award className="w-3 h-3 text-[#A64F36]" />
                    {t('literacyLevel')} {user?.literacyLevel || 1}
                  </span>
                </div>
              </div>
            </div>

            {/* Language Selector Card */}
            <div className="p-3.5 sm:p-4 rounded-2xl bg-white border border-stone-200/90 shadow-2xs flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-[#F2F5ED] flex items-center justify-center text-[#253D32] shrink-0">
                  <Globe className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-xs font-bold text-stone-900 font-['Outfit'] truncate">
                    {language === 'id' ? 'Bahasa Tampilan' : 'Display Language'}
                  </h3>
                  <p className="text-[10px] text-stone-500 truncate">
                    {language === 'id' ? 'Bahasa Indonesia & English' : 'English & Indonesian'}
                  </p>
                </div>
              </div>
              <LanguageToggle />
            </div>

            {/* Mascot Advice Card */}
            <div className="p-4 rounded-2xl bg-[#FFF0D3]/60 border border-[#F4E3C1] flex items-start gap-3">
              <img
                src="/maskot/maskot_kakek_luhur.png"
                alt="Maskot Kakek Luhur"
                className="w-12 h-12 object-contain shrink-0 drop-shadow-2xs"
              />
              <div>
                <p className="text-xs font-bold text-stone-900 font-['Outfit']">
                  {language === 'id' ? 'Pesan Kakek Luhur 🌿' : 'Grandpa Luhur’s Advice 🌿'}
                </p>
                <p className="text-[11px] text-stone-700 mt-0.5 leading-relaxed">
                  {language === 'id'
                    ? '"Kesehatan sejati tumbuh dari kearifan memilih yang baik bagi tubuh dan pikiran kita setiap hari."'
                    : '"True health flourishes from the daily wisdom of mindful choices for both body and mind."'}
                </p>
              </div>
            </div>

            {/* Reset Data Button */}
            <button
              onClick={() => setShowResetConfirm(true)}
              className="w-full py-2.5 bg-white hover:bg-stone-100 border border-stone-200 text-stone-600 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
            >
              <RotateCcw className="w-3.5 h-3.5 text-stone-400" />
              <span>{t('resetTrackerBtn')}</span>
            </button>
          </div>

          {/* Right Column (7 Cols Desktop) */}
          <div className="md:col-span-7 space-y-4">
            {/* Stats Counter Strip */}
            <div className="grid grid-cols-3 gap-2.5">
              <div className="p-3.5 bg-white border border-stone-200/90 rounded-2xl text-center shadow-2xs">
                <p className="text-lg font-extrabold text-[#253D32] font-['Outfit']">
                  {language === 'id' ? '7 Hari' : '7 Days'}
                </p>
                <p className="text-[10px] text-stone-400 mt-0.5">
                  {language === 'id' ? 'Streak Kebiasaan' : 'Habit Streak'}
                </p>
              </div>

              <div className="p-3.5 bg-white border border-stone-200/90 rounded-2xl text-center shadow-2xs">
                <p className="text-lg font-extrabold text-[#A64F36] font-['Outfit']">
                  {bookmarkedHerbs.length}
                </p>
                <p className="text-[10px] text-stone-400 mt-0.5">
                  {language === 'id' ? 'Favorit Disimpan' : 'Saved Bookmarks'}
                </p>
              </div>

              <div
                onClick={onOpenRempahPedia}
                className="p-3.5 bg-white border border-stone-200/90 rounded-2xl text-center shadow-2xs cursor-pointer hover:border-[#6E7953] transition-colors"
              >
                <p className="text-lg font-extrabold text-[#6E7953] font-['Outfit']">
                  {rempahDocsCount}
                </p>
                <p className="text-[10px] text-stone-400 mt-0.5">
                  {language === 'id' ? 'Resep Keluarga' : 'Family Recipes'}
                </p>
              </div>
            </div>

            {/* Bookmarked Herbs Section */}
            <div className="p-4 sm:p-5 bg-white border border-stone-200/90 rounded-2xl shadow-2xs">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs sm:text-sm font-bold text-stone-900 font-['Outfit'] flex items-center gap-1.5">
                  <Bookmark className="w-4 h-4 text-[#A64F36]" />
                  {t('favoritesTitle')}
                </h3>
                <span className="text-[10px] text-stone-400 font-medium">
                  {bookmarkedHerbs.length} {language === 'id' ? 'tersimpan' : 'saved'}
                </span>
              </div>

              {bookmarkedHerbs.length > 0 ? (
                <div className="space-y-2">
                  {bookmarkedHerbs.map((herb) => (
                    <div
                      key={herb.id}
                      onClick={() => onSelectHerb(herb.id)}
                      className="p-2.5 bg-[#FAF6F0] border border-stone-200/70 rounded-xl hover:border-stone-300 hover:bg-[#F2F5ED] cursor-pointer flex items-center justify-between group transition-colors"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <img
                          src={herb.imageUrl}
                          alt={herb.name}
                          className="w-10 h-10 rounded-lg object-cover shrink-0 border border-stone-200/60"
                        />
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-stone-900 group-hover:text-[#253D32] transition-colors truncate">
                            {herb.name}
                          </p>
                          <p className="text-[10px] text-stone-500 truncate">{herb.specificOrigin}</p>
                        </div>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-stone-700 shrink-0 ml-2" />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-stone-400 italic p-4 bg-[#FAF6F0] rounded-xl border border-stone-200/60 text-center">
                  {t('emptyFavorites')}
                </p>
              )}
            </div>

            {/* Quick Links Menu */}
            <div className="p-3 bg-white border border-stone-200/90 rounded-2xl shadow-2xs space-y-1">
              <button
                onClick={onOpenRempahPedia}
                className="w-full p-2.5 rounded-xl hover:bg-[#FAF6F0] flex items-center justify-between text-left text-xs font-semibold text-stone-800 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <BookOpen className="w-4 h-4 text-[#A64F36]" />
                  <span>{t('rempahDocsTitle')}</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-stone-400" />
              </button>

              <button
                onClick={onOpenTherapies}
                className="w-full p-2.5 rounded-xl hover:bg-[#FAF6F0] flex items-center justify-between text-left text-xs font-semibold text-stone-800 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Heart className="w-4 h-4 text-[#253D32]" />
                  <span>{t('therapiesMenu')}</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-stone-400" />
              </button>

              <button
                onClick={() => setShowEthicsModal(true)}
                className="w-full p-2.5 rounded-xl hover:bg-[#FAF6F0] flex items-center justify-between text-left text-xs font-semibold text-stone-800 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-[#6E7953]" />
                  <span>{t('ethicsMenu')}</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-stone-400" />
              </button>
            </div>
          </div>
        </div>

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-stone-200 text-center animate-in zoom-in-95 duration-150">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center mx-auto mb-3">
              <RotateCcw className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-stone-900 font-['Outfit'] mb-1">
              {language === 'id' ? 'Reset Data Tracker?' : 'Reset Tracker Data?'}
            </h3>
            <p className="text-xs text-stone-500 mb-5 leading-relaxed">
              {language === 'id'
                ? 'Tindakan ini akan mengembalikan data catatan hidrasi, kebiasaan, dan bookmark lokal ke kondisi awal.'
                : 'This will reset your local hydration, lifestyle habit logs, and bookmarks to initial state.'}
            </p>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="py-2.5 rounded-xl border border-stone-200 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold"
              >
                {t('cancel')}
              </button>
              <button
                onClick={handleExecuteReset}
                className="py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold"
              >
                {language === 'id' ? 'Ya, Reset' : 'Yes, Reset'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Ethics Modal */}
      {showEthicsModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-5 max-w-sm w-full shadow-2xl border border-stone-200 space-y-3 text-xs max-h-[85vh] overflow-y-auto no-scrollbar">
            <h3 className="text-sm font-bold text-stone-900 font-['Outfit']">
              {t('ethicsMenu')}
            </h3>
            <p className="text-stone-600 leading-relaxed">
              {language === 'id'
                ? 'SiLuhur didirikan dengan prinsip dasar memuliakan warisan etnobotani bangsa Indonesia tanpa mengorbankan ketelitian bukti sains kedokteran modern (Evidence-Based Medicine).'
                : 'SiLuhur is built on honoring Indonesian botanical heritage without compromising on rigorous modern evidence-based medical science.'}
            </p>
            <div className="space-y-2 text-stone-700">
              <div className="p-2.5 bg-[#FAF6F0] rounded-xl border border-stone-200">
                <strong>{language === 'id' ? '1. Bukan Pengganti Dokter:' : '1. Not a Doctor Substitute:'}</strong>{' '}
                {language === 'id'
                  ? 'Seluruh materi, artikel, dan jawaban AI tidak dirancang sebagai diagnosis atau peresepan medis klinis.'
                  : 'Educational materials and AI answers are not intended as clinical diagnosis or prescription.'}
              </div>
              <div className="p-2.5 bg-[#FAF6F0] rounded-xl border border-stone-200">
                <strong>{language === 'id' ? '2. Kejujuran Tingkat Bukti:' : '2. Evidence Transparency:'}</strong>{' '}
                {language === 'id'
                  ? 'Kami membedakan khasiat yang sudah teruji klinis acak (RCT) dengan klaim yang masih sebatas uji cawan petri atau tradisi empiris.'
                  : 'We clearly differentiate randomized clinical trials (RCT) from in-vitro or empirical traditions.'}
              </div>
              <div className="p-2.5 bg-[#FAF6F0] rounded-xl border border-stone-200">
                <strong>{language === 'id' ? '3. Anti-Hoaks & Keamanan Obat:' : '3. Anti-Hoax & Drug Safety:'}</strong>{' '}
                {language === 'id'
                  ? 'Kami aktif mengedukasi bahaya jamu ber-BKO dan klaim berlebihan yang membahayakan nyawa.'
                  : 'We educate against illegal adulterated traditional medicine and dangerous exaggerated claims.'}
              </div>
            </div>
            <button
              onClick={() => setShowEthicsModal(false)}
              className="w-full py-2 bg-[#253D32] text-white rounded-xl font-semibold mt-2"
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
