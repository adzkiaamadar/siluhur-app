import React, { useState, useEffect } from 'react';
import { ArrowRight, ArrowLeft, Sparkles, Leaf, CheckCircle2 } from 'lucide-react';
import { useLanguage, LanguageToggle } from '../../i18n/LanguageContext';

interface OnboardingScreenProps {
  onFinish: () => void;
}

export function OnboardingScreen({ onFinish }: OnboardingScreenProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { t, language } = useLanguage();

  const slides = [
    {
      kicker: t('onboarding1Kicker'),
      title: t('onboarding1Title'),
      description: t('onboarding1Desc'),
      features: [
        t('onboarding1Feat1'),
        t('onboarding1Feat2'),
        t('onboarding1Feat3'),
      ],
    },
    {
      kicker: t('onboarding2Kicker'),
      title: t('onboarding2Title'),
      description: t('onboarding2Desc'),
      features: [
        t('onboarding2Feat1'),
        t('onboarding2Feat2'),
        t('onboarding2Feat3'),
      ],
    },
    {
      kicker: t('onboarding3Kicker'),
      title: t('onboarding3Title'),
      description: t('onboarding3Desc'),
      features: [
        t('onboarding3Feat1'),
        t('onboarding3Feat2'),
        t('onboarding3Feat3'),
      ],
    },
  ];

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onFinish();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Keyboard navigation for desktop & tablet
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'Enter') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex]);

  const slide = slides[currentIndex];

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12 bg-[#FAF6F0] relative overflow-hidden select-none">
      {/* Background Soft Glows */}
      <div className="absolute -top-36 -right-36 w-96 h-96 rounded-full bg-[#FFF0D3]/60 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-36 -left-36 w-96 h-96 rounded-full bg-[#E9EFE3]/70 blur-3xl pointer-events-none" />

      {/* Responsive Card Container */}
      <div className="w-full max-w-sm sm:max-w-md md:max-w-4xl lg:max-w-5xl md:bg-white/95 md:backdrop-blur-md md:rounded-3xl md:shadow-2xl md:border md:border-stone-200/90 p-5 sm:p-7 md:p-10 lg:p-12 flex flex-col justify-between min-h-[92vh] md:min-h-[620px] relative z-10 transition-all">
        {/* Top Header: Brand Leaf Icon, Language Toggle and Skip Button */}
        <div className="flex items-center justify-between z-10 pb-2 border-b border-stone-200/60 md:border-none">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#253D32] flex items-center justify-center text-white shadow-2xs">
              <svg viewBox="0 0 100 100" className="w-4.5 h-4.5">
                <path
                  d="M50 14 L86 50 L50 86 L14 50 Z"
                  fill="none"
                  stroke="white"
                  strokeWidth="10"
                  strokeLinejoin="round"
                />
                <path
                  d="M50 28 C62 38 62 62 50 72 C38 62 38 38 50 28 Z"
                  fill="white"
                />
              </svg>
            </div>
            <div>
              <span className="text-sm font-bold text-[#253D32] font-['Outfit'] block leading-none">
                {t('appName')}
              </span>
              <span className="text-[10px] text-stone-500 hidden sm:inline">
                {t('badgeSub')}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <LanguageToggle />
            <button
              onClick={onFinish}
              className="text-xs font-semibold text-stone-500 hover:text-stone-900 transition-colors px-3 py-1.5 rounded-full hover:bg-stone-100"
            >
              {t('skip')}
            </button>
          </div>
        </div>

        {/* Content: Mobile single-column, Desktop/Tablet 2-columns */}
        <div className="my-auto py-4 md:py-6 w-full md:grid md:grid-cols-12 md:gap-10 md:items-center">
          {/* Left Column: Text & Features */}
          <div className="md:col-span-7 flex flex-col justify-center text-left">
            {/* Kicker tag */}
            <div className="flex items-center gap-1.5 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#A64F36]" />
              <span className="text-[11px] sm:text-xs font-bold text-[#A64F36] tracking-wider uppercase font-['Outfit']">
                {slide.kicker}
              </span>
            </div>

            {/* Dynamic Title */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1E201E] tracking-tight leading-snug sm:leading-tight mb-3 font-['Outfit']">
              {slide.title}
            </h2>

            {/* Description */}
            <p className="text-stone-600 text-xs sm:text-sm md:text-base leading-relaxed mb-4 sm:mb-6 font-normal">
              {slide.description}
            </p>

            {/* Feature Highlights (Visible on sm, md, and lg viewports) */}
            <div className="hidden sm:flex flex-col gap-2.5 mb-2 p-4 bg-[#FAF6F0] rounded-2xl border border-stone-200/80">
              {slide.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-stone-700">
                  <CheckCircle2 className="w-4 h-4 text-[#253D32] shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Handcrafted Artwork & Mascot Visuals */}
          <div className="md:col-span-5 flex items-center justify-center mt-3 md:mt-0">
            <div className="relative w-60 h-60 sm:w-72 sm:h-72 md:w-80 md:h-80 flex items-center justify-center">
              {/* SLIDE 1: Mascot with Magnifying Glass & Warm Botanical Aura */}
              {currentIndex === 0 && (
                <div className="relative w-full h-full flex items-center justify-center animate-in zoom-in-95 duration-400">
                  {/* Warm Sun Backdrop */}
                  <div className="absolute inset-2 sm:inset-4 rounded-full bg-[#FFF0D3] border border-[#F4E3C1] shadow-inner" />
                  <div className="absolute inset-8 sm:inset-10 rounded-full bg-white/75" />

                  {/* Botanical leaf decorations */}
                  <div className="absolute top-4 left-6 text-[#6E7953]">
                    <Leaf className="w-6 h-6 -rotate-45 opacity-80" />
                  </div>
                  <div className="absolute bottom-6 right-6 text-[#A64F36]">
                    <Sparkles className="w-6 h-6 opacity-80" />
                  </div>

                  {/* Mascot Character with Magnifying Glass */}
                  <img
                    src="/onboarding/onboarding_slide1_maskot.png"
                    alt="Maskot Kakek Luhur Meneliti"
                    className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 object-contain relative z-10 drop-shadow-md hover:scale-105 transition-transform"
                  />
                </div>
              )}

              {/* SLIDE 2: Handcrafted Jamu Pot, Mortar, and Spices Illustration */}
              {currentIndex === 1 && (
                <div className="relative w-full h-full flex items-center justify-center animate-in zoom-in-95 duration-400">
                  {/* Soft Sage Background Circle */}
                  <div className="absolute inset-2 sm:inset-4 rounded-full bg-[#F2F5ED] border border-[#DFE5D5] shadow-inner" />
                  <div className="absolute inset-8 sm:inset-10 rounded-full bg-white/70" />

                  {/* Vector Artwork: Traditional Clay Godokan & Herbal Spices */}
                  <img
                    src="/onboarding/onboarding_slide2_traditional_jamu.svg"
                    alt="Racikan Jamu Leluhur"
                    className="w-52 h-52 sm:w-60 sm:h-60 md:w-68 md:h-68 relative z-10 drop-shadow-sm object-contain"
                  />
                </div>
              )}

              {/* SLIDE 3: Evidence-Based Science & Lifestyle Harmony Illustration */}
              {currentIndex === 2 && (
                <div className="relative w-full h-full flex items-center justify-center animate-in zoom-in-95 duration-400">
                  {/* Warm Golden Cream Circle */}
                  <div className="absolute inset-2 sm:inset-4 rounded-full bg-[#FFF0D3] border border-[#F4E3C1] shadow-inner" />
                  <div className="absolute inset-8 sm:inset-10 rounded-full bg-white/70" />

                  {/* Vector Artwork: Medical Shield, Herbal Harmony, Pulse & Vitality */}
                  <img
                    src="/onboarding/onboarding_slide3_ebm_science.svg"
                    alt="Bukti Medis & EBM"
                    className="w-52 h-52 sm:w-60 sm:h-60 md:w-68 md:h-68 relative z-10 drop-shadow-sm object-contain"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Controls: Indicators & Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-stone-200/60 mt-auto">
          {/* Pagination Indicators */}
          <div className="flex items-center gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  currentIndex === idx
                    ? 'w-8 bg-[#253D32]'
                    : 'w-2.5 bg-stone-300 hover:bg-stone-400'
                }`}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
            <span className="text-xs text-stone-400 ml-2 font-medium">
              {currentIndex + 1} {language === 'id' ? 'dari' : 'of'} {slides.length}
            </span>
          </div>

          {/* Action Buttons (Back + Next) */}
          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            {currentIndex > 0 && (
              <button
                onClick={handlePrev}
                className="px-4 py-3 sm:py-2.5 rounded-2xl border border-stone-200 bg-white hover:bg-stone-50 text-stone-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{t('prev')}</span>
              </button>
            )}

            <button
              onClick={handleNext}
              className="flex-1 sm:flex-initial px-6 py-3 sm:py-2.5 bg-[#253D32] hover:bg-[#1A2D25] text-white text-xs sm:text-sm font-semibold rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-[#253D32]/20 active:scale-[0.98] transition-all"
            >
              <span>
                {currentIndex === slides.length - 1 ? t('startNow') : t('next')}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
