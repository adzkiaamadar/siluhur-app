import React, { useState } from 'react';
import { MobileFrame } from './components/layout/MobileFrame';
import { AppHeader } from './components/layout/AppHeader';
import { BottomNav, TabType } from './components/layout/BottomNav';
import { SplashScreen } from './components/onboarding/SplashScreen';
import { OnboardingScreen } from './components/onboarding/OnboardingScreen';
import { LoginScreen } from './components/auth/LoginScreen';
import { HomeScreen } from './components/home/HomeScreen';
import { ExploreScreen } from './components/explore/ExploreScreen';
import { HerbDetailScreen } from './components/explore/HerbDetailScreen';
import { FactCheckScreen } from './components/factcheck/FactCheckScreen';
import { TrackerScreen } from './components/tracker/TrackerScreen';
import { AssistantScreen } from './components/assistant/AssistantScreen';
import { RempahPediaScreen } from './components/rempah/RempahPediaScreen';
import { TherapyGuideScreen } from './components/therapy/TherapyGuideScreen';
import { FoodFactsScreen } from './components/foodfacts/FoodFactsScreen';
import { ProfileScreen } from './components/profile/ProfileScreen';
import { HERB_DATABASE } from './data/herbs';
import { StorageService } from './services/storage';
import { UserProfile } from './types';
import { LogOut } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useLanguage } from './i18n/LanguageContext';

type AppScreen =
  | 'splash'
  | 'onboarding'
  | 'login'
  | 'main'
  | 'factcheck'
  | 'herb_detail'
  | 'assistant'
  | 'therapies'
  | 'rempah_pedia'
  | 'food_facts';

export default function App() {
  const [screen, setScreen] = useState<AppScreen>('splash');
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [selectedHerbId, setSelectedHerbId] = useState<string | null>(null);
  const [assistantPrompt, setAssistantPrompt] = useState<string | undefined>(undefined);
  const [showEthicsModal, setShowEthicsModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const { t, language } = useLanguage();

  // Authenticated user state
  const [user, setUser] = useState<UserProfile | null>(() => StorageService.getUser());
  const [bookmarks, setBookmarks] = useState<string[]>(() =>
    StorageService.getBookmarks()
  );

  const herbs = HERB_DATABASE;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSelectHerb = (herbId: string) => {
    setSelectedHerbId(herbId);
    setScreen('herb_detail');
  };

  const handleToggleBookmark = (herbId: string) => {
    StorageService.toggleBookmark(herbId);
    setBookmarks(StorageService.getBookmarks());
  };

  const handleOpenAssistantWithPrompt = (question: string) => {
    setAssistantPrompt(question);
    setScreen('assistant');
  };

  const handleLoginSuccess = (loggedInUser: UserProfile) => {
    setUser(loggedInUser);
    setScreen('main');
    setActiveTab('home');
    showToast(
      language === 'id'
        ? `Selamat datang, ${loggedInUser.name}!`
        : `Welcome, ${loggedInUser.name}!`
    );
    confetti({ particleCount: 50, spread: 60 });
  };

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const handleConfirmLogout = () => {
    StorageService.logoutUser();
    setUser(null);
    setShowLogoutModal(false);
    setScreen('login');
    showToast(
      language === 'id'
        ? 'Kamu telah berhasil logout.'
        : 'You have been successfully logged out.'
    );
  };

  const selectedHerb = herbs.find((h) => h.id === selectedHerbId) || herbs[0];

  const showAppHeader = screen !== 'splash' && screen !== 'onboarding' && screen !== 'login';

  return (
    <MobileFrame>
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-16 left-4 right-4 sm:left-auto sm:right-6 sm:w-80 z-50 p-3 bg-[#253D32] text-white text-xs font-semibold rounded-2xl shadow-xl flex items-center justify-center gap-2 animate-in fade-in slide-in-from-top duration-300 pointer-events-none">
          <span>🌿 {toastMessage}</span>
        </div>
      )}

      {/* In-Project Responsive App Header with Desktop Navigation & In-Project Hamburger Menu */}
      {showAppHeader && (
        <AppHeader
          activeTab={activeTab}
          currentScreen={screen}
          onNavigateTab={(tab) => {
            setActiveTab(tab);
            setScreen('main');
          }}
          onNavigateScreen={(screenName) => {
            setScreen(screenName as AppScreen);
          }}
          onOpenEthicsModal={() => setShowEthicsModal(true)}
          user={user}
          onLogout={handleLogout}
          onOpenLogin={() => setScreen('login')}
        />
      )}

      {/* 1. Splash Screen with Automatic Timer */}
      {screen === 'splash' && (
        <SplashScreen onStart={() => setScreen('onboarding')} />
      )}

      {/* 2. Onboarding Screen */}
      {screen === 'onboarding' && (
        <OnboardingScreen onFinish={() => setScreen('login')} />
      )}

      {/* 3. Dedicated Functional Login & Register Screen */}
      {screen === 'login' && (
        <LoginScreen
          onLoginSuccess={handleLoginSuccess}
          onContinueAsGuest={() => {
            setScreen('main');
            setActiveTab('home');
          }}
        />
      )}

      {/* 4. FactCheck Screen (SiLuhur Check) */}
      {screen === 'factcheck' && (
        <FactCheckScreen
          onBack={() => setScreen('main')}
          onAskAssistantWithContext={handleOpenAssistantWithPrompt}
        />
      )}

      {/* 5. Herb Detail Screen */}
      {screen === 'herb_detail' && (
        <HerbDetailScreen
          herb={selectedHerb}
          isBookmarked={bookmarks.includes(selectedHerb.id)}
          onToggleBookmark={handleToggleBookmark}
          onBack={() => setScreen('main')}
          onAskAssistant={handleOpenAssistantWithPrompt}
          onOpenTherapies={() => setScreen('therapies')}
        />
      )}

      {/* 6. Traditional Wellness Assistant Screen */}
      {screen === 'assistant' && (
        <AssistantScreen
          onBack={() => setScreen('main')}
          initialQuestion={assistantPrompt}
        />
      )}

      {/* 7. Traditional Therapy Guide Screen */}
      {screen === 'therapies' && (
        <TherapyGuideScreen onBack={() => setScreen('main')} />
      )}

      {/* 8. Rempah Pedia Documentation Screen */}
      {screen === 'rempah_pedia' && (
        <RempahPediaScreen onBack={() => setScreen('main')} />
      )}

      {/* 9. Open Food Facts Health Product Screen (Fully Responsive) */}
      {screen === 'food_facts' && (
        <FoodFactsScreen onBack={() => setScreen('main')} />
      )}

      {/* 10. Main 4-Tab Navigation Experience */}
      {screen === 'main' && (
        <div className="flex-1 flex flex-col justify-between h-full relative">
          <div className="flex-1 overflow-y-auto no-scrollbar">
            {activeTab === 'home' && (
              <HomeScreen
                onNavigate={(tab) => {
                  if (tab === 'factcheck') {
                    setScreen('factcheck');
                  } else {
                    setActiveTab(tab);
                  }
                }}
                onSelectHerb={handleSelectHerb}
                onOpenAssistant={() => {
                  setAssistantPrompt(undefined);
                  setScreen('assistant');
                }}
                onOpenTherapies={() => setScreen('therapies')}
                onOpenFoodFacts={() => setScreen('food_facts')}
                onOpenFactCheck={() => setScreen('factcheck')}
                userName={user ? user.name : 'Sahabat'}
                herbs={herbs}
              />
            )}

            {activeTab === 'explore' && (
              <ExploreScreen
                herbs={herbs}
                onSelectHerb={handleSelectHerb}
                onBack={() => setActiveTab('home')}
              />
            )}

            {activeTab === 'tracker' && (
              <TrackerScreen
                onBack={() => setActiveTab('home')}
              />
            )}

            {activeTab === 'profile' && (
              <ProfileScreen
                herbs={herbs}
                user={user}
                onSelectHerb={handleSelectHerb}
                onOpenTherapies={() => setScreen('therapies')}
                onOpenRempahPedia={() => setScreen('rempah_pedia')}
                onOpenAuthModal={() => setScreen('login')}
                onLogout={handleLogout}
              />
            )}
          </div>

          {/* Persistent Bottom Tab Bar (visible on mobile, hidden on md: desktop via md:hidden) */}
          <BottomNav activeTab={activeTab} onChangeTab={setActiveTab} />
        </div>
      )}

      {/* Ethics Modal */}
      {showEthicsModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-stone-200 space-y-3.5 text-xs">
            <h3 className="text-sm font-bold text-stone-900 font-['Outfit']">
              {language === 'id'
                ? 'Komitmen Etika & Batasan Medis SiLuhur'
                : 'SiLuhur Ethical Commitment & Medical Boundaries'}
            </h3>
            <p className="text-stone-600 leading-relaxed">
              {language === 'id'
                ? 'SiLuhur didirikan untuk menjembatani kearifan herbal Nusantara dengan ilmu kedokteran berbasis bukti (Evidence-Based Medicine).'
                : 'SiLuhur was created to bridge traditional Indonesian herbal wisdom with Evidence-Based Medicine (EBM).'}
            </p>
            <div className="space-y-2 text-stone-700">
              <div className="p-2.5 bg-[#FAF6F0] rounded-xl border border-stone-200">
                <strong>{language === 'id' ? '1. Bukan Pengganti Dokter:' : '1. Not a Doctor Substitute:'}</strong>{' '}
                {language === 'id'
                  ? 'Konten edukasi tidak ditujukan sebagai diagnosis klinis atau resep obat pengganti dokter spesialis.'
                  : 'Educational content is not intended as a clinical diagnosis or replacement for a physician prescription.'}
              </div>
              <div className="p-2.5 bg-[#FAF6F0] rounded-xl border border-stone-200">
                <strong>{language === 'id' ? '2. Kejujuran Bukti:' : '2. Evidence Honesty:'}</strong>{' '}
                {language === 'id'
                  ? 'Kami membedakan ramuan yang teruji klinis acak (RCT) dengan tradisi empiris yang belum diteliti mendalam.'
                  : 'We clearly distinguish randomized clinical trial (RCT) results from anecdotal or folklore traditions.'}
              </div>
              <div className="p-2.5 bg-[#FAF6F0] rounded-xl border border-stone-200">
                <strong>{language === 'id' ? '3. Anti-Hoaks Herbal:' : '3. Anti-Herbal Hoaxes:'}</strong>{' '}
                {language === 'id'
                  ? 'Waspadai obat tradisional ilegal mengandung Bahan Kimia Obat (BKO) berbahaya.'
                  : 'Beware of illegal herbal products adulterated with synthetic pharmaceutical ingredients.'}
              </div>
            </div>
            <button
              onClick={() => setShowEthicsModal(false)}
              className="w-full py-2.5 bg-[#253D32] hover:bg-[#1A2D25] text-white rounded-xl font-semibold mt-2 transition-colors shadow-xs"
            >
              {t('understand')}
            </button>
          </div>
        </div>
      )}

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-stone-200 text-center animate-in zoom-in-95 duration-150">
            <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto mb-3 shadow-2xs">
              <LogOut className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-stone-900 font-['Outfit'] mb-1">
              {t('logoutConfirmTitle')}
            </h3>
            <p className="text-xs text-stone-500 leading-relaxed mb-5">
              {t('logoutConfirmDesc')}
            </p>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="py-2.5 rounded-xl border border-stone-200 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold transition-colors"
              >
                {t('cancel')}
              </button>
              <button
                onClick={handleConfirmLogout}
                className="py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold transition-colors shadow-xs"
              >
                {t('logoutConfirmBtn')}
              </button>
            </div>
          </div>
        </div>
      )}
    </MobileFrame>
  );
}
