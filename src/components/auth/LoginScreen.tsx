import React, { useState } from 'react';
import { Mail, Lock, User as UserIcon, ArrowRight, Eye, EyeOff, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';
import { UserProfile } from '../../types';
import { StorageService } from '../../services/storage';
import confetti from 'canvas-confetti';
import { useLanguage, LanguageToggle } from '../../i18n/LanguageContext';

interface LoginScreenProps {
  onLoginSuccess: (user: UserProfile) => void;
  onContinueAsGuest?: () => void;
}

export function LoginScreen({ onLoginSuccess, onContinueAsGuest }: LoginScreenProps) {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successNotice, setSuccessNotice] = useState<string | null>(null);
  const { language } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessNotice(null);

    if (isRegister) {
      if (!name.trim()) {
        setError(language === 'id' ? 'Silakan isi nama lengkap Anda.' : 'Please enter your full name.');
        return;
      }
      if (!email.trim() || !password.trim()) {
        setError(language === 'id' ? 'Silakan lengkapi email dan kata sandi.' : 'Please enter email and password.');
        return;
      }

      setLoading(true);
      setTimeout(() => {
        const result = StorageService.registerUser(name, email, password);
        setLoading(false);
        if (result.success && result.user) {
          confetti({ particleCount: 50, spread: 60 });
          onLoginSuccess(result.user);
        } else {
          setError(result.error || (language === 'id' ? 'Pendaftaran gagal. Silakan coba lagi.' : 'Sign up failed. Please try again.'));
        }
      }, 350);
    } else {
      if (!email.trim() || !password.trim()) {
        setError(language === 'id' ? 'Silakan masukkan email dan kata sandi Anda.' : 'Please enter your email and password.');
        return;
      }

      setLoading(true);
      setTimeout(() => {
        const result = StorageService.loginUser(email, password);
        setLoading(false);
        if (result.success && result.user) {
          confetti({ particleCount: 50, spread: 60 });
          onLoginSuccess(result.user);
        } else {
          setError(result.error || (language === 'id' ? 'Email atau kata sandi tidak cocok.' : 'Invalid email or password.'));
        }
      }, 350);
    }
  };

  const handleFillDemoAccount = () => {
    setIsRegister(false);
    setEmail('sahabat@siluhur.id');
    setPassword('password123');
    setError(null);
    setSuccessNotice(
      language === 'id'
        ? 'Akun uji coba diisikan. Klik "Masuk Sekarang" untuk melanjutkan.'
        : 'Demo credentials loaded. Click "Sign In Now" to continue.'
    );
  };

  return (
    <div className="flex-1 min-h-full flex flex-col justify-center items-center px-4 py-8 bg-[#FAF6F0] selection:bg-[#A64F36] selection:text-white">
      <div className="w-full max-w-md bg-white border border-stone-200/90 rounded-3xl p-6 sm:p-8 shadow-sm relative">
        {/* Top Language Toggle */}
        <div className="flex justify-end mb-2">
          <LanguageToggle />
        </div>

        {/* Top Brand Lockup */}
        <div className="flex flex-col items-center mb-6 text-center">
          <div className="w-14 h-14 rounded-2xl bg-[#253D32] flex items-center justify-center text-white mb-3 shadow-xs">
            <svg viewBox="0 0 100 100" className="w-8 h-8">
              <path
                d="M50 12 L86 50 L50 88 L14 50 Z"
                fill="none"
                stroke="white"
                strokeWidth="8"
                strokeLinejoin="round"
              />
              <path
                d="M50 26 C62 38 62 62 50 74 C38 62 38 38 50 26 Z"
                fill="white"
              />
              <circle cx="50" cy="50" r="5" fill="#FFF0D3" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-[#1E201E] font-['Outfit']">
            {isRegister
              ? language === 'id'
                ? 'Daftar Akun SiLuhur'
                : 'Create SiLuhur Account'
              : language === 'id'
              ? 'Masuk ke SiLuhur'
              : 'Sign in to SiLuhur'}
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            {isRegister
              ? language === 'id'
                ? 'Mulai perjalanan memahami kearifan herbal berbasis bukti.'
                : 'Begin your journey into evidence-based herbal wisdom.'
              : language === 'id'
              ? 'Merawat warisan tradisi, pantau kebiasaan sehatmu.'
              : 'Cherish traditional heritage, track healthy habits.'}
          </p>
        </div>

        {/* Tab Mode Selector */}
        <div className="flex items-center gap-1 p-1 bg-[#FAF6F0] border border-stone-200 rounded-2xl mb-5">
          <button
            type="button"
            onClick={() => {
              setIsRegister(false);
              setError(null);
              setSuccessNotice(null);
            }}
            className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all ${
              !isRegister
                ? 'bg-[#253D32] text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            {language === 'id' ? 'Masuk' : 'Sign In'}
          </button>
          <button
            type="button"
            onClick={() => {
              setIsRegister(true);
              setError(null);
              setSuccessNotice(null);
            }}
            className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all ${
              isRegister
                ? 'bg-[#253D32] text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            {language === 'id' ? 'Daftar Baru' : 'Sign Up'}
          </button>
        </div>

        {/* Status Alerts */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-2xl text-xs text-red-700 animate-in fade-in">
            {error}
          </div>
        )}

        {successNotice && (
          <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-800 flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{successNotice}</span>
          </div>
        )}

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {isRegister && (
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                {language === 'id' ? 'Nama Lengkap' : 'Full Name'}
              </label>
              <div className="relative">
                <UserIcon className="absolute left-3.5 top-3 w-4 h-4 text-stone-400" />
                <input
                  type="text"
                  required
                  placeholder={language === 'id' ? 'Masukkan nama lengkap Anda' : 'Enter your full name'}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full h-11 pl-10 pr-3 bg-[#FAF6F0] border border-stone-200 rounded-xl text-xs placeholder:text-stone-400 focus:outline-hidden focus:ring-2 focus:ring-[#253D32]/20 focus:border-[#253D32] transition-all"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              {language === 'id' ? 'Alamat Email' : 'Email Address'}
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3 w-4 h-4 text-stone-400" />
              <input
                type="email"
                required
                placeholder="nama@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-11 pl-10 pr-3 bg-[#FAF6F0] border border-stone-200 rounded-xl text-xs placeholder:text-stone-400 focus:outline-hidden focus:ring-2 focus:ring-[#253D32]/20 focus:border-[#253D32] transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              {language === 'id' ? 'Kata Sandi' : 'Password'}
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3 w-4 h-4 text-stone-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder={
                  isRegister
                    ? language === 'id'
                      ? 'Minimal 6 karakter'
                      : 'At least 6 characters'
                    : language === 'id'
                    ? 'Masukkan kata sandi'
                    : 'Enter password'
                }
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-11 pl-10 pr-10 bg-[#FAF6F0] border border-stone-200 rounded-xl text-xs placeholder:text-stone-400 focus:outline-hidden focus:ring-2 focus:ring-[#253D32]/20 focus:border-[#253D32] transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-stone-400 hover:text-stone-600"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-[#253D32] hover:bg-[#1A2D25] text-white font-semibold rounded-2xl flex items-center justify-center gap-2 shadow-md shadow-[#253D32]/20 transition-all active:scale-[0.98] mt-2 text-xs"
          >
            {loading ? (
              <span>{language === 'id' ? 'Memproses...' : 'Processing...'}</span>
            ) : (
              <>
                <span>
                  {isRegister
                    ? language === 'id'
                      ? 'Daftar Akun Baru'
                      : 'Sign Up Now'
                    : language === 'id'
                    ? 'Masuk Sekarang'
                    : 'Sign In Now'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Demo Account Prompt without personal data */}
        <div className="mt-5 pt-4 border-t border-stone-100 flex flex-col items-center text-center">
          <p className="text-[11px] text-stone-500 mb-2">
            {language === 'id'
              ? 'Ingin mencoba tanpa mendaftar akun baru?'
              : 'Want to try without creating an account?'}
          </p>
          <button
            type="button"
            onClick={handleFillDemoAccount}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200/80 text-[11px] font-medium text-stone-700 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#A64F36]" />
            <span>
              {language === 'id'
                ? 'Gunakan Akun Uji Coba (sahabat@siluhur.id)'
                : 'Use Demo Account (sahabat@siluhur.id)'}
            </span>
          </button>
        </div>

        {/* Continue as Guest */}
        {onContinueAsGuest && (
          <div className="mt-3 text-center">
            <button
              type="button"
              onClick={onContinueAsGuest}
              className="text-xs text-stone-500 hover:text-stone-800 underline decoration-stone-300"
            >
              {language === 'id' ? 'Lanjutkan sebagai Tamu' : 'Continue as Guest'}
            </button>
          </div>
        )}

        {/* Bottom Switcher */}
        <div className="pt-4 text-center text-xs text-stone-500">
          <span>
            {isRegister
              ? language === 'id'
                ? 'Sudah memiliki akun?'
                : 'Already have an account?'
              : language === 'id'
              ? 'Belum memiliki akun?'
              : "Don't have an account?"}
          </span>{' '}
          <button
            type="button"
            onClick={() => {
              setIsRegister(!isRegister);
              setError(null);
              setSuccessNotice(null);
            }}
            className="font-bold text-[#A64F36] hover:underline"
          >
            {isRegister
              ? language === 'id'
                ? 'Masuk di sini'
                : 'Sign in here'
              : language === 'id'
              ? 'Daftar sekarang'
              : 'Sign up now'}
          </button>
        </div>
      </div>
    </div>
  );
}
