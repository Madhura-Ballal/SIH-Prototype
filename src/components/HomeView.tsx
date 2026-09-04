import React from 'react';
import { TabType, Language } from '../types';

interface HomeViewProps {
  language: Language;
  onNavigateTab: (tab: TabType) => void;
  onQuickDemo: () => void;
  onOpenHelpline: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  language,
  onNavigateTab,
  onQuickDemo,
  onOpenHelpline,
}) => {
  return (
    <section className="flex flex-col gap-space-xl" id="view-home">
      {/* Civic Announcement Banner */}
      <div className="w-full bg-surface-container p-space-md rounded-xl flex items-center justify-between gap-space-md shadow-sm border border-surface-container-high">
        <div className="flex items-center gap-space-sm">
          <span className="material-symbols-outlined text-primary text-[28px]">
            verified
          </span>
          <div>
            <div className="font-title-md text-sm md:text-base font-bold text-on-surface">
              {language === 'mr'
                ? 'एकात्मिक राष्ट्रीय ग्रामीण आरोग्य अभियान प्रोटोटाइप'
                : 'Integrated National Rural Health Mission Prototype'}
            </div>
            <div className="font-body-sm text-xs md:text-sm text-on-surface-variant">
              {language === 'mr'
                ? 'तालुका दवाखाने, प्राथमिक आरोग्य केंद्र (PHC), ग्रामीण रुग्णालय व तज्ज्ञ टेलिकन्सल्टेशन जोडणारे माध्यम.'
                : 'Connecting taluka dispensaries, PHCs, Sub-District hospitals, and specialized teleconsultations.'}
            </div>
          </div>
        </div>
        <span className="hidden sm:inline-block px-3 py-1 rounded-full bg-surface-container-highest text-on-surface text-xs font-bold whitespace-nowrap">
          SIH 2026 EVALUATION INSTANCE
        </span>
      </div>

      {/* Hero Section & Direct CTAs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center bg-surface-container-lowest p-space-lg md:p-space-2xl rounded-xl shadow-md border border-surface-container-low">
        <div className="lg:col-span-7 flex flex-col gap-space-md">
          <div className="flex items-center gap-space-xs">
            <span className="px-2 py-0.5 rounded bg-primary-fixed text-on-primary-fixed text-xs font-bold uppercase tracking-wider">
              {language === 'mr' ? 'सर्वसमावेशक आरोग्य सुरक्षा' : 'Universal Health Coverage'}
            </span>
            <span className="text-on-surface-variant text-xs font-semibold">
              • Smart India Hackathon
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-on-surface leading-tight font-display-lg">
            {language === 'mr' ? (
              <>
                नागरिकांना मिळवून द्या{' '}
                <span className="text-primary underline decoration-secondary decoration-4">
                  योग्य व वेळेत आरोग्य सेवा
                </span>
                .
              </>
            ) : (
              <>
                Connecting people to the{' '}
                <span className="text-primary underline decoration-secondary decoration-4">
                  right healthcare
                </span>{' '}
                service.
              </>
            )}
          </h1>

          <p className="text-lg md:text-xl font-bold text-secondary">
            आरोग्य सेवेचा विश्वासू सेतू
          </p>

          <p className="text-base text-on-surface-variant max-w-xl leading-relaxed">
            {language === 'mr'
              ? 'जवळची आरोग्य केंद्रे शोधा, प्राथमिक केंद्रात क्ष-किरण किंवा विशेष उपकरणे नसल्यास त्वरित स्वयंचलित स्मार्ट रेफरल मिळवा आणि गावात आयोजित होणाऱ्या आरोग्य शिबिरांची माहिती जाणून घ्या.'
              : 'Find nearby healthcare facilities, receive verified automated referrals when local primary centers lack specific diagnostic equipment, and discover scheduled village outreach drives.'}
          </p>

          {/* Triple Action Buttons */}
          <div className="flex flex-wrap gap-space-sm pt-space-sm">
            <button
              type="button"
              onClick={() => onNavigateTab('find-healthcare')}
              className="min-h-[48px] px-space-lg bg-primary text-on-primary rounded-lg font-semibold text-sm md:text-base flex items-center justify-center gap-space-xs shadow hover:bg-primary-container transition-all"
            >
              <span className="material-symbols-outlined text-[20px]">
                travel_explore
              </span>
              <span>Find Healthcare / आरोग्य सेवा शोधा</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigateTab('health-drives')}
              className="min-h-[48px] px-space-lg bg-surface-container-high text-on-surface rounded-lg font-semibold text-sm md:text-base flex items-center justify-center gap-space-xs shadow-sm hover:bg-secondary-fixed transition-all"
            >
              <span className="material-symbols-outlined text-[20px]">
                calendar_month
              </span>
              <span>Health Drives / आरोग्य शिबिरे</span>
            </button>
            <button
              type="button"
              onClick={onOpenHelpline}
              className="min-h-[48px] px-space-md bg-surface text-secondary border border-surface-container-high rounded-lg font-semibold text-sm md:text-base flex items-center justify-center gap-space-xs shadow-sm hover:bg-surface-container transition-all"
            >
              <span className="material-symbols-outlined text-[20px] text-error">
                support_agent
              </span>
              <span>Need Help? / मदत हवी आहे?</span>
            </button>
          </div>
        </div>

        {/* System Readiness Graphic (Satara District) */}
        <div className="lg:col-span-5 flex flex-col gap-space-md">
          <div className="bg-surface-container-low p-space-lg rounded-xl shadow-sm border border-surface-container flex flex-col gap-space-md">
            <div className="flex items-center justify-between">
              <span className="font-title-md text-sm md:text-base font-bold text-on-surface">
                {language === 'mr'
                  ? 'प्रणाली सज्जता (सातारा जिल्हा)'
                  : 'System Readiness (Satara District)'}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed text-xs font-bold tracking-wider">
                LIVE SYNC
              </span>
            </div>

            <div className="grid grid-cols-2 gap-space-sm">
              <div className="bg-surface-container-lowest p-space-md rounded-lg shadow-sm border border-surface-container-high">
                <div className="text-3xl font-extrabold text-primary">5</div>
                <div className="text-xs text-on-surface-variant font-medium">
                  {language === 'mr' ? 'नोंदणीकृत ग्रामीण केंद्रे' : 'Rural Facilities Mapped'}
                </div>
                <div className="text-xs font-semibold text-primary mt-1 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">
                    domain
                  </span>{' '}
                  Koregaon & Karad
                </div>
              </div>

              <div className="bg-surface-container-lowest p-space-md rounded-lg shadow-sm border border-surface-container-high">
                <div className="text-3xl font-extrabold text-secondary">94%</div>
                <div className="text-xs text-on-surface-variant font-medium">
                  {language === 'mr' ? 'रेफरल अचूकता दर' : 'Referral Accuracy'}
                </div>
                <div className="text-xs font-semibold text-secondary mt-1 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">
                    alt_route
                  </span>{' '}
                  Distance Optimized
                </div>
              </div>

              <div className="bg-surface-container-lowest p-space-md rounded-lg shadow-sm border border-surface-container-high">
                <div className="text-3xl font-extrabold text-tertiary">4</div>
                <div className="text-xs text-on-surface-variant font-medium">
                  {language === 'mr' ? 'आगामी शिबिरे' : 'Upcoming Camps'}
                </div>
                <div className="text-xs font-semibold text-tertiary mt-1 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">
                    local_shipping
                  </span>{' '}
                  Mobile Van Ready
                </div>
              </div>

              <div className="bg-surface-container-lowest p-space-md rounded-lg shadow-sm border border-surface-container-high">
                <div className="text-3xl font-extrabold text-error">3</div>
                <div className="text-xs text-on-surface-variant font-medium">
                  {language === 'mr' ? 'उपकरण तुटवडा नोंद' : 'Gaps Under Action'}
                </div>
                <div className="text-xs font-semibold text-error mt-1 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">
                    warning
                  </span>{' '}
                  Missing X-Ray/Eye
                </div>
              </div>
            </div>

            {/* Quick Demo Shortcut callout */}
            <div
              onClick={onQuickDemo}
              className="p-space-sm bg-primary-fixed/30 rounded-lg flex items-center gap-space-sm cursor-pointer hover:bg-primary-fixed/40 transition-colors border border-primary-fixed"
            >
              <span className="material-symbols-outlined text-primary text-[24px]">
                crisis_alert
              </span>
              <div className="text-xs md:text-sm text-on-surface">
                <b>Judge Walkthrough Shortcut:</b> Click the top &quot;Quick Demo&quot; button to observe immediate referral triage for an unavailable diagnostic test.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SOP Section: Smart Referral & Community Care Architecture */}
      <div className="flex flex-col gap-space-md">
        <div className="flex flex-col">
          <span className="text-xs font-bold text-primary uppercase tracking-wider">
            {language === 'mr'
              ? 'मानक कार्यप्रणाली (SOP)'
              : 'Standard Operating Procedure'}
          </span>
          <h2 className="text-2xl font-bold text-on-surface">
            {language === 'mr'
              ? 'स्मार्ट रेफरल व ग्रामीण आरोग्य साखळी'
              : 'Smart Referral & Community Care Architecture'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
          {/* Step 1 Card */}
          <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm border border-surface-container-low flex flex-col gap-space-xs">
            <div className="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center text-primary mb-2">
              <span className="material-symbols-outlined text-[28px]">
                radar
              </span>
            </div>
            <h3 className="font-title-md text-base font-bold text-on-surface">
              1. Local Diagnostic Check
            </h3>
            <p className="font-body-sm text-sm text-on-surface-variant leading-relaxed">
              Citizens and ASHA workers specify their village and medical requirement (e.g. X-Ray, Blood, Specialist). The engine scans the closest Primary Health Center first.
            </p>
          </div>

          {/* Step 2 Card */}
          <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm border border-surface-container-low flex flex-col gap-space-xs">
            <div className="w-12 h-12 rounded-lg bg-secondary-fixed flex items-center justify-center text-secondary mb-2">
              <span className="material-symbols-outlined text-[28px]">
                switch_access_shortcut
              </span>
            </div>
            <h3 className="font-title-md text-base font-bold text-on-surface">
              2. Automatic Fallback & Slip
            </h3>
            <p className="font-body-sm text-sm text-on-surface-variant leading-relaxed">
              If the nearest PHC lacks the equipment, SevaSetu warns the patient instantly and reroutes them to the nearest equipped Rural or Sub-District Hospital with a verified token.
            </p>
          </div>

          {/* Step 3 Card */}
          <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm border border-surface-container-low flex flex-col gap-space-xs">
            <div className="w-12 h-12 rounded-lg bg-tertiary-fixed flex items-center justify-center text-tertiary mb-2">
              <span className="material-symbols-outlined text-[28px]">
                medical_services
              </span>
            </div>
            <h3 className="font-title-md text-base font-bold text-on-surface">
              3. Community Camp Dispatch
            </h3>
            <p className="font-body-sm text-sm text-on-surface-variant leading-relaxed">
              Repeated missing service requests trigger admin alerts, prompting health supervisors to schedule mobile diagnostic vans and specialist doctors directly to village gram panchayats.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
