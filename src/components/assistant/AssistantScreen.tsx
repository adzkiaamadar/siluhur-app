import React, { useState, useRef, useEffect } from 'react';
import {
  ArrowLeft,
  Send,
  Sparkles,
  AlertTriangle,
  RotateCcw,
} from 'lucide-react';
import { ChatMessage } from '../../types';
import { askWellnessAssistant } from '../../services/api';
import { useLanguage, LanguageToggle } from '../../i18n/LanguageContext';

interface AssistantScreenProps {
  onBack?: () => void;
  initialQuestion?: string;
}

export function AssistantScreen({ onBack, initialQuestion }: AssistantScreenProps) {
  const { t, language } = useLanguage();

  const getInitialMessages = (): ChatMessage[] => [
    {
      id: 'welcome',
      sender: 'assistant',
      text:
        language === 'id'
          ? 'Salam sehat, Cucu Luhur! Saya Kakek Luhur, asisten edukasi kesehatan SiLuhur. Kakek siap berbagi pengetahuan seputar khasiat tanaman rempah Nusantara, cara merawat kesehatan tradisional, dan apa kata penelitian sains medis terkini.\n\nApa yang ingin kamu diskusikan hari ini?'
          : 'Warm greetings! I am Grandpa Luhur, your health educator and wellness advisor at SiLuhur. I am here to share time-honored Indonesian herbal traditions alongside modern evidence-based scientific insights.\n\nWhat would you like to discuss today?',
      timestamp: language === 'id' ? 'Baru saja' : 'Just now',
      suggestedFollowUps:
        language === 'id'
          ? [
              'Bagaimana cara aman minum seduhan jahe hangat jika punya sakit maag?',
              'Apa manfaat temulawak dan kunyit menurut bukti klinis?',
              'Apakah kerokan aman secara medis saat masuk angin?',
            ]
          : [
              'How can I safely drink warm ginger brew if I have mild gastritis?',
              'What are the proven clinical benefits of turmeric and Java turmeric?',
              'Is traditional scraping (kerokan) medically safe for mild chills?',
            ],
    },
  ];

  const [messages, setMessages] = useState<ChatMessage[]>(getInitialMessages);
  const [inputValue, setInputValue] = useState(initialQuestion || '');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Update initial message when language toggles if chat hasn't started
  useEffect(() => {
    if (messages.length === 1 && messages[0].id === 'welcome') {
      setMessages(getInitialMessages());
    }
  }, [language]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  useEffect(() => {
    if (initialQuestion) {
      handleSendMessage(initialQuestion);
    }
  }, [initialQuestion]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: 'user-' + Date.now(),
      sender: 'user',
      text: text.trim(),
      timestamp: language === 'id' ? 'Baru saja' : 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setLoading(true);

    try {
      const history = messages.map((m) => ({
        sender: m.sender,
        text: m.text,
      }));

      const reply = await askWellnessAssistant(userMsg.text, history, language);

      const assistantMsg: ChatMessage = {
        id: 'assistant-' + Date.now(),
        sender: 'assistant',
        text: reply,
        timestamp: language === 'id' ? 'Baru saja' : 'Just now',
        suggestedFollowUps:
          language === 'id'
            ? [
                'Bagaimana batas aman konsumsinya sehari-hari?',
                'Adakah kontraindikasi dengan obat dokter?',
                'Apakah ada ramuan tradisional lain yang serupa?',
              ]
            : [
                'What is the safe daily dosage recommendation?',
                'Are there any contraindications with prescription drugs?',
                'Are there other similar traditional remedies in the archipelago?',
              ],
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: unknown) {
      const fallbackMsg: ChatMessage = {
        id: 'assistant-err-' + Date.now(),
        sender: 'assistant',
        text:
          language === 'id'
            ? 'Maaf, Kakek sedang kesulitan membuka pustaka catatan herbal. Pastikan koneksi internet stabil dan silakan ulangi kembali ya.'
            : 'Apologies, Grandpa is currently having trouble accessing the herbal archives. Please ensure your internet connection is stable and try again.',
        timestamp: language === 'id' ? 'Baru saja' : 'Just now',
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setLoading(false);
    }
  };

  const resetChat = () => {
    setMessages(getInitialMessages());
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#FAF6F0] relative overflow-hidden">
      {/* Top Header */}
      <div className="p-3.5 sm:p-4 bg-white border-b border-stone-200/90 shadow-2xs z-10 shrink-0">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            {onBack && (
              <button
                onClick={onBack}
                className="w-10 h-10 rounded-xl hover:bg-stone-100 flex items-center justify-center text-stone-600 transition-colors"
                aria-label={t('back')}
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            <div className="relative">
              <div className="w-10 h-10 rounded-2xl bg-[#FFF0D3] border border-[#F4E3C1] flex items-center justify-center overflow-hidden shadow-2xs">
                <img
                  src="/assets/aistudio/maskot_siluhur_4eca92db.png"
                  alt="Kakek Luhur"
                  className="w-8 h-8 object-contain"
                />
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-sm font-bold text-stone-900 font-['Outfit']">
                  {t('assistantTitleHeading')}
                </h1>
                <Sparkles className="w-3.5 h-3.5 text-[#A64F36]" />
              </div>
              <p className="text-[11px] text-stone-500">{t('assistantOnline')}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <LanguageToggle />
            <button
              onClick={resetChat}
              className="w-10 h-10 rounded-xl hover:bg-stone-100 text-stone-500 hover:text-stone-800 transition-colors flex items-center justify-center"
              title={language === 'id' ? 'Percakapan baru' : 'New chat'}
              aria-label="Reset percakapan"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Medical Boundary Safety Banner */}
      <div className="px-4 py-2 bg-[#FFF8EC] border-b border-[#F4E3C1] text-[11px] text-[#8C3F29] shrink-0">
        <div className="max-w-4xl mx-auto flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 shrink-0 text-[#A64F36]" />
          <p className="leading-tight">{t('assistantDisclaimer')}</p>
        </div>
      </div>

      {/* Chat Messages Body */}
      <div className="flex-1 overflow-y-auto p-4 no-scrollbar">
        <div className="max-w-4xl mx-auto space-y-4">
        {messages.map((message) => {
          const isUser = message.sender === 'user';
          return (
            <div
              key={message.id}
              className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] sm:max-w-md p-4 rounded-2xl text-xs sm:text-[13px] leading-relaxed shadow-2xs ${
                  isUser
                    ? 'bg-[#253D32] text-white rounded-br-xs'
                    : 'bg-white text-stone-800 border border-stone-200/90 rounded-bl-xs'
                }`}
              >
                {!isUser && (
                  <div className="flex items-center gap-1.5 mb-1.5 text-[#A64F36] font-bold text-[11px]">
                    <span>🌿 {t('assistantTitleHeading')}</span>
                  </div>
                )}
                <p className="whitespace-pre-line">{message.text}</p>
              </div>

              <span className="text-[10px] text-stone-400 mt-1 px-1">
                {message.timestamp}
              </span>

              {/* Follow-up Prompts */}
              {!isUser &&
                message.suggestedFollowUps &&
                message.suggestedFollowUps.length > 0 && (
                  <div className="mt-2.5 space-y-1.5 max-w-[85%] sm:max-w-md">
                    <p className="text-[10px] text-stone-400 font-semibold px-1">
                      {t('suggestedQuestions')}:
                    </p>
                    <div className="flex flex-col gap-1.5">
                      {message.suggestedFollowUps.map((question, qIdx) => (
                        <button
                          key={qIdx}
                          onClick={() => handleSendMessage(question)}
                          className="text-left text-xs p-2.5 rounded-xl bg-white border border-[#DFE5D5] hover:bg-[#F2F5ED] hover:border-[#253D32] text-stone-700 transition-all shadow-2xs active:scale-[0.99]"
                        >
                          👉 {question}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
            </div>
          );
        })}

        {loading && (
          <div className="flex items-start gap-2">
            <div className="p-3 bg-white border border-stone-200 rounded-2xl rounded-bl-xs text-xs text-stone-500 shadow-2xs flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#253D32] animate-bounce" />
              <div className="w-2 h-2 rounded-full bg-[#6E7953] animate-bounce delay-150" />
              <div className="w-2 h-2 rounded-full bg-[#A64F36] animate-bounce delay-300" />
              <span className="text-[11px] font-medium ml-1">
                {language === 'id'
                  ? 'Kakek sedang menelaah catatan herbal...'
                  : 'Grandpa is reviewing herbal archives...'}
              </span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Message Area */}
      <div className="p-3 bg-white border-t border-stone-200/90 shadow-lg shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage(inputValue);
          }}
          className="flex items-center gap-2 max-w-4xl mx-auto"
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={t('assistantInputPlaceholder')}
            disabled={loading}
            className="flex-1 h-11 px-4 bg-[#FAF6F0] border border-stone-200 rounded-2xl text-xs placeholder:text-stone-400 focus:outline-hidden focus:ring-2 focus:ring-[#253D32]/20 focus:border-[#253D32] transition-all disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!inputValue.trim() || loading}
            className="h-11 px-4 bg-[#253D32] hover:bg-[#1A2D25] disabled:bg-stone-300 text-white rounded-2xl flex items-center justify-center gap-1.5 text-xs font-semibold shadow-xs transition-all active:scale-95 shrink-0"
            aria-label={t('send')}
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">{t('send')}</span>
          </button>
        </form>
      </div>
    </div>
  );
}
