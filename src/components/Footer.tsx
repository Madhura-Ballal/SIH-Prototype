import React from 'react';
import { Language } from '../types';

interface FooterProps {
  language: Language;
  onResetSeedData: () => void;
  onShowToast: (msg: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  language,
  onResetSeedData,
  onShowToast,
}) => {
  return (
    <footer className="w-full bg-surface-container-low mt-space-2xl py-space-xl shadow-[0_-1px_8px_rgba(0,0,0,0.02)] border-t border-surface-container">
      <div className="w-full max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-space-lg mb-space-xl">
          {/* Col 1 & 2: About SevaSetu */}
          <div className="md:col-span-2 flex flex-col gap-space-sm">
            <div className="flex items-center gap-space-sm">
              <span className="font-headline-sm text-xl font-bold text-primary">
                SevaSetu
              </span>
              <span className="bg-surface-container-high text-on-surface text-xs font-bold px-2 py-0.5 rounded-full border border-surface-container-highest">
                National Rural Health Mission Ready
              </span>
            </div>
            <p className="font-body-sm text-xs md:text-sm text-on-surface-variant max-w-lg leading-relaxed">
              Empowering ASHA workers, Primary Health Centers (PHC), and village citizens with high-reliability teleconsultation queues, intelligent bed availability trackers, and streamlined hospital referral pathways across Maharashtra and rural India.
            </p>
          </div>

          {/* Col 3: Emergency Quick Dial */}
          <div className="flex flex-col gap-space-xs">
            <span className="font-title-md text-sm font-bold text-on-surface mb-1">
              Emergency Quick Dial
            </span>
            <a
              href="tel:108"
              className="text-xs text-on-surface-variant hover:text-error flex items-center gap-space-xs transition-colors"
            >
              <span className="material-symbols-outlined text-[18px] text-error">
                emergency
              </span>
              National Ambulance: <b>108</b>
            </a>
            <a
              href="tel:14416"
              className="text-xs text-on-surface-variant hover:text-primary flex items-center gap-space-xs transition-colors"
            >
              <span className="material-symbols-outlined text-[18px] text-primary">
                health_and_safety
              </span>
              Tele-MANAS: <b>14416</b>
            </a>
            <a
              href="tel:1091"
              className="text-xs text-on-surface-variant hover:text-secondary flex items-center gap-space-xs transition-colors"
            >
              <span className="material-symbols-outlined text-[18px] text-secondary">
                call
              </span>
              Women Helpline: <b>1091</b>
            </a>
          </div>

          {/* Col 4: SIH Evaluation Details & Reset */}
          <div className="flex flex-col gap-space-xs">
            <span className="font-title-md text-sm font-bold text-on-surface mb-1">
              SIH 2026 Evaluation
            </span>
            <span className="text-xs text-on-surface-variant">
              Team Prototype Instance <b>#MH-PUNE-41</b>
            </span>
            <button
              type="button"
              onClick={onResetSeedData}
              className="mt-space-sm self-start px-space-md py-1.5 bg-surface-container-high text-on-surface rounded text-xs font-bold hover:bg-surface-variant transition-colors flex items-center gap-space-xs cursor-pointer border border-surface-container-highest"
            >
              <span className="material-symbols-outlined text-[16px]">
                restart_alt
              </span>
              Reset Demo Seed Data
            </button>
          </div>
        </div>

        {/* Bottom links */}
        <div className="pt-space-md flex flex-col sm:flex-row items-center justify-between gap-space-sm text-on-surface-variant text-xs border-t border-surface-container">
          <p>
            © 2026 Ministry of Health & Family Welfare Integration Concept. Developed for Smart India Hackathon.
          </p>
          <div className="flex items-center gap-space-md font-medium">
            <button
              type="button"
              onClick={() => onShowToast('Accessibility: WCAG AA, Marathi bilingual UI & Screen Reader tags active.')}
              className="hover:text-on-surface transition-colors cursor-pointer"
            >
              Accessibility (सुलभता)
            </button>
            <button
              type="button"
              onClick={() => onShowToast('ABHA Guide: Ayushman Bharat Health Accounts mapped to 14-digit national IDs.')}
              className="hover:text-on-surface transition-colors cursor-pointer"
            >
              ABHA Integration Guide
            </button>
            <button
              type="button"
              onClick={() => onShowToast('Offline Sync: Service worker caches facility directories for offline ASHA field tablets.')}
              className="hover:text-on-surface transition-colors cursor-pointer"
            >
              Offline Sync Info
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
