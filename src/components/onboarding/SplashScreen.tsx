import React, { useEffect, useState } from 'react';
import { ArrowRight, Sparkles, Leaf } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

interface SplashScreenProps {
  onStart: () => void;
}

export function SplashScreen({ onStart }: SplashScreenProps) {
  const [progress, setProgress] = useState(0);
  const { t, language } = useLanguage();

  useEffect(() => {
    // 2.5 seconds timer with smooth progress bar
    const startTime = Date.now();
    const duration = 2500;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min((elapsed / duration) * 100, 100);
      setProgress(pct);

      if (elapsed >= duration) {
        clearInterval(interval);
        onStart();
      }
    }, 30);

    return () => clearInterval(interval);
  }, [onStart]);

  return (
    <div
      onClick={onStart}
      className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6 md:p-8 bg-[#FAF6F0] relative overflow-hidden select-none cursor-pointer"
    >
      {/* Subtle Ambient Decorative Circles for Tablet & Desktop */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#FFF0D3]/60 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-[#E9EFE3]/70 blur-3xl pointer-events-none" />

      {/* Main Responsive Container: Full height on mobile, Elevated card on tablet & desktop */}
      <div className="w-full max-w-sm sm:max-w-md md:max-w-xl lg:max-w-2xl md:bg-white/90 md:backdrop-blur-md md:rounded-3xl md:shadow-2xl md:border md:border-stone-200/80 p-5 sm:p-8 md:p-12 flex flex-col items-center justify-between min-h-[92vh] md:min-h-[640px] relative z-10 transition-all">
        {/* Top subtle category */}
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#253D32]" />
          <span className="text-[11px] sm:text-xs font-bold tracking-widest text-stone-500 uppercase font-['Outfit']">
            {t('badgeSub')}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#253D32]" />
        </div>

        {/* Center: Brand & Mascot Hero */}
        <div className="flex flex-col items-center text-center my-auto py-4 w-full animate-in zoom-in-95 duration-500">
          {/* Diamond Leaf Logo */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mb-3 sm:mb-4 relative flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm">
              <path
                d="M50 10 L88 50 L50 90 L12 50 Z"
                fill="none"
                stroke="#253D32"
                strokeWidth="7"
                strokeLinejoin="round"
              />
              <path
                d="M50 26 C64 38 64 64 50 74 C36 64 36 38 50 26 Z"
                fill="#253D32"
              />
              <circle cx="50" cy="50" r="5.5" fill="#A64F36" />
            </svg>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#253D32] mb-1.5 font-['Outfit']">
            {t('appName')}
          </h1>
          <p className="text-stone-600 text-xs sm:text-sm md:text-base font-semibold tracking-wide max-w-xs sm:max-w-md">
            {t('appTagline')}
          </p>

          {/* Mascot Kakek Luhur Display Stage */}
          <div className="relative w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 my-5 sm:my-6 flex items-center justify-center">
            {/* Soft Ambient Radiance */}
            <div className="absolute inset-0 rounded-full bg-[#FFF0D3] border border-[#F4E3C1] shadow-inner" />
            <div className="absolute inset-4 rounded-full bg-white/70" />

            {/* Subtle botanical decorative floating badges */}
            <div className="absolute top-2 left-2 text-[#6E7953]">
              <Leaf className="w-5 h-5 -rotate-45 opacity-80" />
            </div>
            <div className="absolute bottom-3 right-3 text-[#A64F36]">
              <Sparkles className="w-5 h-5 opacity-80" />
            </div>

            <img
              src="/assets/aistudio/maskot_siluhur_4eca92db.png"
              alt="Maskot SiLuhur Kakek Luhur"
              className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 object-contain relative z-10 drop-shadow-md hover:scale-105 transition-transform"
            />
          </div>

          {/* Value highlight pills for tablet/desktop */}
          <div className="hidden sm:flex items-center justify-center gap-2 mt-1">
            <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-[#F2F5ED] text-[#253D32] border border-[#DFE5D5]">
              {language === 'id' ? '🌿 120+ Koleksi Etnobotani' : '🌿 120+ Ethnobotanical Archive'}
            </span>
            <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-[#FAF6F0] text-[#A64F36] border border-[#F4D9A0]">
              {language === 'id' ? '🔬 EBM Terverifikasi' : '🔬 EBM Verified'}
            </span>
            <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-[#FAF6F0] text-stone-700 border border-stone-200">
              🤖 {t('askAi')}
            </span>
          </div>
        </div>

        {/* Bottom Area: Mountain & Rumah Adat Silhouette + Progress Bar */}
        <div className="w-full flex flex-col items-center mt-auto">
          {/* Nusantara Panorama Silhouette vector */}
          <div className="w-full max-w-xs sm:max-w-sm md:max-w-md mb-4 sm:mb-5 opacity-85">
            <svg viewBox="0 0 320 80" className="w-full h-auto">
              <path
                d="M0 60 Q 60 30 140 45 T 260 35 T 320 55 L 320 80 L 0 80 Z"
                fill="#DFE5D5"
              />
              <path
                d="M0 68 Q 90 48 190 62 T 320 65 L 320 80 L 0 80 Z"
                fill="#6E7953"
                fillOpacity="0.5"
              />
              <g transform="translate(40, 36) scale(0.65)">
                <path
                  d="M 5 50 Q 30 20 50 5 Q 70 20 95 50 L 80 50 L 50 25 L 20 50 Z"
                  fill="#253D32"
                />
                <rect x="25" y="45" width="50" height="25" fill="#8C3F29" rx="2" />
                <rect x="42" y="55" width="16" height="15" fill="#FAF6F0" rx="1" />
              </g>
              <g transform="translate(220, 42) scale(0.55)">
                <path
                  d="M 5 50 Q 30 20 50 5 Q 70 20 95 50 L 80 50 L 50 25 L 20 50 Z"
                  fill="#253D32"
                />
                <rect x="25" y="45" width="50" height="25" fill="#8C3F29" rx="2" />
                <rect x="42" y="55" width="16" height="15" fill="#FAF6F0" rx="1" />
              </g>
            </svg>
          </div>

          {/* Progress Bar & Skip Action */}
          <div className="w-full max-w-xs flex flex-col items-center gap-2">
            <div className="w-full h-1.5 bg-stone-200/80 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#253D32] transition-all duration-75 ease-linear rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="w-full flex items-center justify-between text-[11px] text-stone-500 font-medium">
              <span>{t('splashMenyiapkan')}</span>
              <span className="font-bold text-[#253D32]">{Math.round(progress)}%</span>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onStart();
              }}
              className="mt-2 px-4 py-1.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
            >
              <span>{t('splashTapToSkip')}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
