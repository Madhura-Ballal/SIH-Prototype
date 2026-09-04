import React, { useState } from 'react';
import { Language } from '../types';

interface HelplineBannerProps {
  language: Language;
  onOpenHelpline: () => void;
  onRequestCallback: () => void;
  onShowToast: (msg: string) => void;
}

export const HelplineBanner: React.FC<HelplineBannerProps> = ({
  language,
  onOpenHelpline,
  onRequestCallback,
  onShowToast,
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const handleMarathiAudioGuide = () => {
    if (isPlayingAudio) return;

    setIsPlayingAudio(true);
    onShowToast('🔊 मराठी ऑडिओ मार्गदर्शक: "नमस्कार, सेवासेतू पोर्टलवर जवळचे रुग्णालय शोधण्यासाठी..."');

    // Try web speech synthesis if supported
    if ('speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(
          'नमस्कार, सेवासेतू पोर्टलवर आपले स्वागत आहे. जवळचे रुग्णालय शोधण्यासाठी वर दिलेल्या शोध पेटीमध्ये आपल्या गावाचे नाव आणि आवश्यक तपासणी निवडा.'
        );
        utterance.lang = 'mr-IN';
        utterance.rate = 0.9;
        utterance.onend = () => setIsPlayingAudio(false);
        utterance.onerror = () => setIsPlayingAudio(false);
        window.speechSynthesis.speak(utterance);
      } catch {
        // Fallback simulation timer
        setTimeout(() => setIsPlayingAudio(false), 5000);
      }
    } else {
      setTimeout(() => setIsPlayingAudio(false), 5000);
    }
  };

  return (
    <div
      className="w-full bg-surface-container-high text-on-surface p-space-lg rounded-xl shadow-sm border border-surface-container-highest flex flex-col md:flex-row items-start md:items-center justify-between gap-space-md my-space-md"
      id="helpline-banner-inline"
    >
      <div className="flex items-start gap-space-sm max-w-2xl">
        <div className="w-12 h-12 rounded-full bg-error text-on-error flex items-center justify-center shrink-0 shadow-sm">
          <span className="material-symbols-outlined text-[28px]">
            phone_in_talk
          </span>
        </div>
        <div className="flex flex-col">
          <h3 className="text-base md:text-lg font-bold text-on-surface">
            {language === 'mr'
              ? 'वेबसाइट वापरण्यात अडचण येत आहे का? / Not comfortable using the website?'
              : 'Not comfortable using the website? / वेबसाइट वापरण्यात अडचण येत आहे का?'}
          </h3>
          <p className="font-body-sm text-xs md:text-sm text-on-surface-variant">
            {language === 'mr'
              ? 'मोफत फोन मार्गदर्शनासाठी आमच्या ग्रामीण आरोग्य सहाय्यता केंद्राला कॉल करा. मराठी, हिंदी व इंग्रजीत २४x७ उपलब्ध.'
              : 'Call our rural healthcare assistance helpline for free, step-by-step telephonic guidance in Marathi, Hindi, and English.'}
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <span className="text-xs md:text-sm font-bold px-3 py-1 bg-surface-container-lowest rounded-full text-error flex items-center gap-1 shadow-sm border border-error/20">
              <span className="material-symbols-outlined text-[16px]">
                support_agent
              </span>
              Helpline: 1800-XXX-XXXX
            </span>
            <span className="text-[11px] font-semibold text-on-surface-variant">
              Toll-Free 24/7 Demo
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-space-xs w-full md:w-auto">
        <button
          type="button"
          onClick={onOpenHelpline}
          className="h-11 px-space-md bg-error text-on-error font-bold text-xs md:text-sm rounded-lg shadow hover:opacity-90 flex items-center gap-1 cursor-pointer transition-opacity"
        >
          <span className="material-symbols-outlined text-[18px]">call</span>
          <span>Call Helpline</span>
        </button>

        <button
          type="button"
          onClick={onRequestCallback}
          className="h-11 px-space-md bg-surface-container-lowest text-on-surface font-semibold text-xs md:text-sm rounded-lg shadow-sm hover:bg-surface-variant flex items-center gap-1 cursor-pointer border border-surface-container"
        >
          <span className="material-symbols-outlined text-[18px]">
            find_replace
          </span>
          <span>Request Call Back</span>
        </button>

        <button
          type="button"
          id="audio-guide-btn"
          onClick={handleMarathiAudioGuide}
          className={`h-11 px-space-md font-bold text-xs md:text-sm rounded-lg shadow flex items-center gap-1 cursor-pointer transition-all ${
            isPlayingAudio
              ? 'bg-error text-on-error animate-pulse'
              : 'bg-secondary text-on-secondary hover:bg-secondary-fixed-variant'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">
            {isPlayingAudio ? 'graphic_eq' : 'volume_up'}
          </span>
          <span>
            {isPlayingAudio
              ? 'ऑडिओ सुरू आहे... (Playing)'
              : 'मराठी ऑडिओ मार्गदर्शक'}
          </span>
        </button>
      </div>
    </div>
  );
};
