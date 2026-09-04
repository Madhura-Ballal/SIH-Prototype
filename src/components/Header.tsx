import React from 'react';
import { TabType, PipelineStep, Language } from '../types';
import { LOGO_EMBLEM_URL } from '../data/mockData';

interface HeaderProps {
  currentTab: TabType;
  onTabChange: (tab: TabType) => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onQuickDemo: () => void;
  onOpenHelpline: () => void;
  onPipelineStepClick: (step: PipelineStep) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onTabChange,
  language,
  onLanguageChange,
  onQuickDemo,
  onOpenHelpline,
  onPipelineStepClick,
}) => {
  return (
    <>
      <header className="fixed top-0 w-full z-50 bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.06)]">
        {/* Top Hackathon Banner */}
        <div className="w-full bg-secondary-fixed text-on-secondary-fixed text-center py-1 px-margin-mobile flex items-center justify-center gap-space-xs">
          <span className="material-symbols-outlined text-[16px]">flag</span>
          <span className="font-label-md text-label-md tracking-wide text-xs md:text-sm font-semibold">
            {language === 'mr'
              ? 'स्मार्ट इंडिया हॅकाथॉन २०२६ प्रोटोटाइप • प्रात्यक्षिकासाठी काल्पनिक नमुना डेटा'
              : 'Smart India Hackathon 2026 Prototype • Uses Fictional Sample Data for Demonstration'}
          </span>
        </div>

        {/* Global Shell Header */}
        <div className="h-20 w-full max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop flex items-center justify-between gap-space-md">
          {/* Logo & Emblem */}
          <div
            className="flex items-center gap-space-md cursor-pointer select-none"
            onClick={() => onTabChange('home')}
          >
            <img
              src={LOGO_EMBLEM_URL}
              alt="SevaSetu Emblem Logo"
              className="h-9 md:h-10 w-auto object-contain"
            />
            <div className="flex flex-col">
              <span className="font-headline-sm text-lg md:text-xl font-bold text-primary leading-tight">
                SevaSetu{' '}
                <span className="font-body-sm text-sm text-on-surface-variant font-normal">
                  | सेतू आरोग्याचा
                </span>
              </span>
              <span className="font-label-md text-xs text-on-surface-variant hidden sm:inline-block">
                Rural Healthcare & Smart Referral
              </span>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-space-xs">
            <button
              onClick={() => onTabChange('home')}
              className={`px-space-md py-space-sm rounded-lg font-title-md text-sm transition-all ${
                currentTab === 'home'
                  ? 'bg-primary-container text-on-primary font-bold shadow-sm'
                  : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
              }`}
            >
              Home (मुख्यपृष्ठ)
            </button>
            <button
              onClick={() => onTabChange('find-healthcare')}
              className={`px-space-md py-space-sm rounded-lg font-title-md text-sm transition-all ${
                currentTab === 'find-healthcare'
                  ? 'bg-primary-container text-on-primary font-bold shadow-sm'
                  : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
              }`}
            >
              Find Healthcare (आरोग्य सेवा शोधा)
            </button>
            <button
              onClick={() => onTabChange('health-drives')}
              className={`px-space-md py-space-sm rounded-lg font-title-md text-sm transition-all ${
                currentTab === 'health-drives'
                  ? 'bg-primary-container text-on-primary font-bold shadow-sm'
                  : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
              }`}
            >
              Health Drives (आरोग्य शिबिरे)
            </button>
            <button
              onClick={() => onTabChange('admin-dashboard')}
              className={`px-space-md py-space-sm rounded-lg font-title-md text-sm transition-all ${
                currentTab === 'admin-dashboard'
                  ? 'bg-primary-container text-on-primary font-bold shadow-sm'
                  : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
              }`}
            >
              Admin Dashboard (प्रशासक डॅशबोर्ड)
            </button>
          </nav>

          {/* Right Header Controls */}
          <div className="flex items-center gap-space-sm">
            {/* Toll-Free Helpline Pill */}
            <div
              onClick={onOpenHelpline}
              className="hidden md:flex items-center bg-error-container text-on-error-container px-space-md py-1 rounded-full gap-space-xs min-h-[40px] cursor-pointer hover:opacity-90 transition-opacity select-none shadow-sm"
            >
              <span className="material-symbols-outlined text-[20px] text-error">
                call
              </span>
              <div className="flex flex-col leading-tight">
                <span className="text-[11px] font-bold">Helpline / मदत केंद्र</span>
                <span className="text-[13px] font-semibold">1800-XXX-XXXX (Demo)</span>
              </div>
            </div>

            {/* Bilingual Switcher */}
            <div className="flex items-center bg-surface-container rounded-full p-1 border-0 shadow-[0_1px_4px_rgba(0,0,0,0.05)]">
              <button
                type="button"
                onClick={() => onLanguageChange('en')}
                className={`px-3 py-1 text-xs font-semibold rounded-full transition-all ${
                  language === 'en'
                    ? 'bg-secondary text-on-secondary shadow-sm'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => onLanguageChange('mr')}
                className={`px-3 py-1 text-xs font-semibold rounded-full transition-all ${
                  language === 'mr'
                    ? 'bg-secondary text-on-secondary shadow-sm'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                मराठी
              </button>
            </div>

            {/* Profile / ASHA worker avatar */}
            <div
              className="w-8 h-8 rounded-full bg-primary flex items-center justify-center ml-1 text-on-primary cursor-pointer hover:bg-primary-container transition-colors shadow-sm"
              title="Healthcare Operator Profile"
            >
              <span className="material-symbols-outlined text-on-primary text-[18px]">
                person
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Spacer for fixed header */}
      <div className="h-28" />

      {/* TOP WORKFLOW BREADCRUMB & SIH QUICK DEMO BAR */}
      <div className="w-full bg-surface-container-low px-space-md py-space-sm shadow-sm border-b border-surface-container">
        <div className="max-w-[1280px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-space-sm">
          {/* Stepper / Pipeline */}
          <div className="w-full lg:w-auto overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
            <div className="flex items-center gap-space-xs text-xs font-semibold whitespace-nowrap min-w-max">
              <button
                type="button"
                onClick={() => onPipelineStepClick('service')}
                className="inline-flex items-center px-2 py-1 bg-primary text-on-primary rounded font-bold hover:opacity-90 transition-opacity"
              >
                1. FIND SERVICE
              </button>
              <span className="text-outline material-symbols-outlined text-[16px]">
                chevron_right
              </span>
              <button
                type="button"
                onClick={() => onPipelineStepClick('facility')}
                className="inline-flex items-center px-2 py-1 bg-surface-container text-on-surface-variant rounded hover:bg-surface-container-high transition-colors"
              >
                2. FIND FACILITY
              </button>
              <span className="text-outline material-symbols-outlined text-[16px]">
                chevron_right
              </span>
              <button
                type="button"
                onClick={() => onPipelineStepClick('referral')}
                className="inline-flex items-center px-2 py-1 bg-surface-container text-on-surface-variant rounded hover:bg-surface-container-high transition-colors"
              >
                3. SMART REFERRAL
              </button>
              <span className="text-outline material-symbols-outlined text-[16px]">
                chevron_right
              </span>
              <button
                type="button"
                onClick={() => onPipelineStepClick('gap')}
                className="inline-flex items-center px-2 py-1 bg-surface-container text-on-surface-variant rounded hover:bg-surface-container-high transition-colors"
              >
                4. SERVICE GAP DETECTED
              </button>
              <span className="text-outline material-symbols-outlined text-[16px]">
                chevron_right
              </span>
              <button
                type="button"
                onClick={() => onPipelineStepClick('doctor')}
                className="inline-flex items-center px-2 py-1 bg-surface-container text-on-surface-variant rounded hover:bg-surface-container-high transition-colors"
              >
                5. CONNECT DOCTOR
              </button>
              <span className="text-outline material-symbols-outlined text-[16px]">
                chevron_right
              </span>
              <button
                type="button"
                onClick={() => onPipelineStepClick('drive')}
                className="inline-flex items-center px-2 py-1 bg-surface-container text-on-surface-variant rounded hover:bg-surface-container-high transition-colors"
              >
                6. ORGANIZE DRIVE
              </button>
            </div>
          </div>

          {/* 1-Click Judging Scenario Preset Button */}
          <div className="flex items-center gap-space-sm w-full lg:w-auto justify-end">
            <button
              id="quick-demo-btn"
              type="button"
              onClick={onQuickDemo}
              className="h-10 px-space-md bg-secondary text-on-secondary rounded-lg text-sm font-semibold flex items-center gap-space-xs shadow hover:bg-on-secondary-container transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">
                play_circle
              </span>
              <span>
                {language === 'mr'
                  ? 'झटपट डेमो मार्गदर्शक (१-क्लिक)'
                  : 'Quick Demo Walkthrough (1-Click)'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* MAIN TAB NAVIGATION BAR (Sticky secondary bar) */}
      <div className="w-full bg-surface shadow-[0_1px_4px_rgba(0,0,0,0.05)] sticky top-20 z-40">
        <div className="max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop py-space-xs flex items-center gap-space-xs overflow-x-auto scrollbar-none">
          <button
            type="button"
            onClick={() => onTabChange('home')}
            className={`px-space-md py-space-sm rounded-lg text-sm font-semibold flex items-center gap-space-xs whitespace-nowrap transition-all ${
              currentTab === 'home'
                ? 'bg-primary-container text-on-primary shadow-sm'
                : 'text-on-surface-variant hover:bg-surface-container'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">home</span>
            <span>{language === 'mr' ? 'मुख्यपृष्ठ' : 'Home'}</span>
          </button>
          <button
            type="button"
            onClick={() => onTabChange('find-healthcare')}
            className={`px-space-md py-space-sm rounded-lg text-sm font-semibold flex items-center gap-space-xs whitespace-nowrap transition-all ${
              currentTab === 'find-healthcare'
                ? 'bg-primary-container text-on-primary shadow-sm'
                : 'text-on-surface-variant hover:bg-surface-container'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">search</span>
            <span>
              {language === 'mr' ? 'आरोग्य सेवा शोधा' : 'Find Healthcare'}
            </span>
          </button>
          <button
            type="button"
            onClick={() => onTabChange('health-drives')}
            className={`px-space-md py-space-sm rounded-lg text-sm font-semibold flex items-center gap-space-xs whitespace-nowrap transition-all ${
              currentTab === 'health-drives'
                ? 'bg-primary-container text-on-primary shadow-sm'
                : 'text-on-surface-variant hover:bg-surface-container'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">campaign</span>
            <span>{language === 'mr' ? 'आरोग्य शिबिरे' : 'Health Drives'}</span>
          </button>
          <button
            type="button"
            onClick={() => onTabChange('admin-dashboard')}
            className={`px-space-md py-space-sm rounded-lg text-sm font-semibold flex items-center gap-space-xs whitespace-nowrap transition-all ${
              currentTab === 'admin-dashboard'
                ? 'bg-primary-container text-on-primary shadow-sm'
                : 'text-on-surface-variant hover:bg-surface-container'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">
              admin_panel_settings
            </span>
            <span>
              {language === 'mr' ? 'प्रशासक डॅशबोर्ड' : 'Admin Dashboard'}
            </span>
          </button>
        </div>
      </div>
    </>
  );
};
