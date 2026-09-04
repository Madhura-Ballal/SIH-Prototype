import React, { useState } from 'react';
import { Facility, Language } from '../types';
import { SERVICES_OPTIONS } from '../data/mockData';

interface FindHealthcareViewProps {
  language: Language;
  facilities: Facility[];
  selectedService: string;
  setSelectedService: (svc: string) => void;
  locationInput: string;
  setLocationInput: (loc: string) => void;
  isSmartReferralActive: boolean;
  setIsSmartReferralActive: (active: boolean) => void;
  onOpenFacilityModal: (fac: Facility) => void;
  onStartReferral: (targetFacilityName: string, serviceName: string, fromFacilityName: string) => void;
  onOpenDirections: (destination: string) => void;
  onShowToast: (msg: string) => void;
}

export const FindHealthcareView: React.FC<FindHealthcareViewProps> = ({
  language,
  facilities,
  selectedService,
  setSelectedService,
  locationInput,
  setLocationInput,
  isSmartReferralActive,
  setIsSmartReferralActive,
  onOpenFacilityModal,
  onStartReferral,
  onOpenDirections,
  onShowToast,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedService === 'xray') {
      setIsSmartReferralActive(true);
      onShowToast('⚠️ Smart Referral Activated: Nearest PHC lacks X-Ray equipment!');
    } else {
      setIsSmartReferralActive(false);
      onShowToast(`Found 5 facilities offering your requested service in range.`);
    }
  };

  const setQuickSearch = (service: string, location: string) => {
    setSelectedService(service);
    setLocationInput(location);
    if (service === 'xray') {
      setIsSmartReferralActive(true);
      onShowToast('⚠️ Smart Referral Activated: Nearest PHC lacks X-Ray equipment!');
    } else {
      setIsSmartReferralActive(false);
      onShowToast(`Updated search for ${location}`);
    }
  };

  const handleUseSampleLocation = () => {
    setLocationInput('Shindewadi, Satara District');
    onShowToast('Loaded Rural Village: Shindewadi, Satara');
  };

  // Filter facilities if user enters in-page search term
  const displayedFacilities = facilities.filter((f) => {
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase();
    return (
      f.name.toLowerCase().includes(term) ||
      f.nameMr.toLowerCase().includes(term) ||
      f.address.toLowerCase().includes(term) ||
      f.availableServices.some((s) => s.toLowerCase().includes(term))
    );
  });

  return (
    <section className="flex flex-col gap-space-lg" id="view-find-healthcare">
      {/* Interactive Search Engine Filter Card */}
      <div className="bg-surface-container-lowest p-space-lg md:p-space-xl rounded-xl shadow-md border border-surface-container-low">
        <div className="flex flex-col mb-space-md">
          <div className="flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-primary text-[24px]">
              saved_search
            </span>
            <h2 className="text-2xl font-bold text-on-surface">
              {language === 'mr'
                ? 'आरोग्य सुविधा व सेवा शोधा'
                : 'Find a Healthcare Service'}
            </h2>
          </div>
          <p className="font-body-sm text-sm text-on-surface-variant">
            {language === 'mr'
              ? 'प्रमाणित सरकारी व संलग्नित आरोग्य केंद्रे थेट उपकरणांच्या रिअल-टाइम उपलब्धतेसह तपासा.'
              : 'Locate verified government and empanelled facilities with verified real-time equipment status.'}
          </p>
        </div>

        <form
          className="grid grid-cols-1 md:grid-cols-12 gap-space-md items-end"
          id="service-search-form"
          onSubmit={handleSearchSubmit}
        >
          {/* Service Selector */}
          <div className="md:col-span-5 flex flex-col gap-space-xs">
            <label
              className="text-sm font-bold text-on-surface"
              htmlFor="service-select"
            >
              {language === 'mr'
                ? 'आवश्यक आरोग्य सेवा निवडा'
                : 'Select Required Healthcare Service'}{' '}
              <span className="text-error">*</span>
            </label>
            <select
              id="service-select"
              value={selectedService}
              onChange={(e) => {
                setSelectedService(e.target.value);
                if (e.target.value === 'xray') {
                  setIsSmartReferralActive(true);
                } else {
                  setIsSmartReferralActive(false);
                }
              }}
              className="h-[52px] px-space-md bg-surface-container-low text-on-surface rounded-lg text-sm font-medium border border-surface-container focus:outline-none focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-colors"
            >
              {SERVICES_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {language === 'mr' ? opt.labelMr : opt.labelEn}
                </option>
              ))}
            </select>
          </div>

          {/* Location Input */}
          <div className="md:col-span-4 flex flex-col gap-space-xs">
            <div className="flex items-center justify-between">
              <label
                className="text-sm font-bold text-on-surface"
                htmlFor="location-input"
              >
                {language === 'mr' ? 'गाव / तालुका' : 'Village / Taluka'}{' '}
                <span className="text-error">*</span>
              </label>
              <button
                type="button"
                id="use-sample-loc-btn"
                onClick={handleUseSampleLocation}
                className="text-xs font-semibold text-secondary hover:underline cursor-pointer"
              >
                {language === 'mr'
                  ? 'नमुना ग्रामीण गाव वापरा'
                  : 'Use Sample Rural Location'}
              </button>
            </div>
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-3 text-outline text-[20px]">
                location_on
              </span>
              <input
                id="location-input"
                type="text"
                value={locationInput}
                onChange={(e) => setLocationInput(e.target.value)}
                placeholder="e.g., Shindewadi, Koregaon, Satara"
                className="h-[52px] w-full pl-10 pr-space-md bg-surface-container-low text-on-surface rounded-lg text-sm border border-surface-container focus:outline-none focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="md:col-span-3 flex">
            <button
              type="submit"
              className="h-[52px] w-full bg-primary text-on-primary rounded-lg text-sm font-bold flex items-center justify-center gap-space-xs shadow hover:bg-primary-container transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">
                manage_search
              </span>
              <span>
                {language === 'mr' ? 'सुविधा शोधा' : 'Find Facility / सुविधा शोधा'}
              </span>
            </button>
          </div>
        </form>

        {/* Quick filter chips */}
        <div className="flex flex-wrap items-center gap-space-xs mt-space-md pt-space-sm border-t border-surface-container-low">
          <span className="text-xs font-semibold text-on-surface-variant">
            {language === 'mr' ? 'लोकप्रिय शोध:' : 'Popular searches:'}
          </span>
          <button
            type="button"
            onClick={() => setQuickSearch('xray', 'Shindewadi, Satara District')}
            className="px-2.5 py-1 rounded-full bg-surface-container text-on-surface text-xs font-medium hover:bg-surface-container-high transition-colors"
          >
            X-Ray (Shindewadi)
          </button>
          <button
            type="button"
            onClick={() => setQuickSearch('blood', 'Rahimatpur')}
            className="px-2.5 py-1 rounded-full bg-surface-container text-on-surface text-xs font-medium hover:bg-surface-container-high transition-colors"
          >
            Blood Test (Rahimatpur)
          </button>
          <button
            type="button"
            onClick={() => setQuickSearch('eye', 'Koregaon')}
            className="px-2.5 py-1 rounded-full bg-surface-container text-on-surface text-xs font-medium hover:bg-surface-container-high transition-colors"
          >
            Eye Care (Koregaon)
          </button>
          <button
            type="button"
            onClick={() => setQuickSearch('maternal', 'Karad Taluka')}
            className="px-2.5 py-1 rounded-full bg-surface-container text-on-surface text-xs font-medium hover:bg-surface-container-high transition-colors"
          >
            Maternal Care (Karad)
          </button>
        </div>
      </div>

      {/* SMART REFERRAL ALERT BANNER */}
      {isSmartReferralActive && (
        <div
          id="smart-referral-banner"
          className="flex flex-col bg-tertiary-fixed text-on-tertiary-fixed p-space-md md:p-space-lg rounded-xl shadow-md gap-space-md border-2 border-tertiary/30 animate-in fade-in slide-in-from-top-2 duration-300"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-sm">
            <div className="flex items-center gap-space-sm">
              <span className="material-symbols-outlined text-tertiary text-[36px]">
                warning
              </span>
              <div>
                <h3 className="text-lg md:text-xl font-bold">
                  {language === 'mr'
                    ? 'त्वरित स्मार्ट रेफरल आवश्यक • Smart Referral Required'
                    : 'Smart Referral Required • त्वरित रेफरल सूचना'}
                </h3>
                <p className="text-sm md:text-base mt-0.5">
                  <b>Notice:</b> X-Ray is{' '}
                  <span className="underline font-bold">not available</span> at
                  your nearest facility (
                  <span className="underline font-bold">PHC Shindewadi</span>, 4
                  km away).
                </p>
              </div>
            </div>
            <span className="px-3 py-1 bg-tertiary text-on-tertiary rounded-full text-xs font-bold uppercase whitespace-nowrap shadow-sm">
              Auto-Triage Active
            </span>
          </div>

          {/* Visual Step Diagram of the Referral Logic */}
          <div className="w-full bg-surface-container-lowest p-space-md rounded-lg text-on-surface flex flex-col md:flex-row items-stretch md:items-center justify-between gap-space-sm shadow-sm border border-tertiary-fixed-dim">
            {/* Step 1 */}
            <div className="flex items-center gap-space-xs">
              <div className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center text-primary font-bold text-xs shrink-0">
                1
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-on-surface-variant font-medium">
                  Required Service
                </span>
                <span className="text-sm font-bold">X-Ray (क्ष-किरण)</span>
              </div>
            </div>

            <span className="hidden md:block material-symbols-outlined text-outline">
              arrow_forward
            </span>

            {/* Step 2 */}
            <div className="flex items-center gap-space-xs">
              <div className="w-8 h-8 rounded-full bg-error-container text-on-error-container flex items-center justify-center font-bold text-xs shrink-0">
                2
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-on-surface-variant font-medium">
                  Nearest Facility
                </span>
                <span className="text-sm font-semibold">
                  PHC Shindewadi (4 km)
                </span>
              </div>
            </div>

            <span className="hidden md:block material-symbols-outlined text-outline">
              arrow_forward
            </span>

            {/* Step 3 */}
            <div className="flex items-center gap-space-xs bg-error-container/40 p-2 rounded">
              <span className="material-symbols-outlined text-error text-[20px]">
                cancel
              </span>
              <div className="flex flex-col">
                <span className="text-xs text-error font-bold">
                  Equipment Status
                </span>
                <span className="text-sm text-on-error-container font-semibold">
                  Service Unavailable (✕)
                </span>
              </div>
            </div>

            <span className="hidden md:block material-symbols-outlined text-outline">
              arrow_forward
            </span>

            {/* Step 4 */}
            <div className="flex items-center gap-space-xs bg-primary-fixed/40 p-2 rounded border border-primary-fixed">
              <span className="material-symbols-outlined text-primary text-[20px]">
                check_circle
              </span>
              <div className="flex flex-col">
                <span className="text-xs text-primary font-bold">
                  Recommended Destination
                </span>
                <span className="text-sm text-on-primary-fixed-variant font-bold">
                  Rural Hospital Koregaon (19 km)
                </span>
              </div>
            </div>
          </div>

          {/* Highlighted Recommended Action Box */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-space-md pt-space-xs">
            <div className="flex flex-col">
              <span className="text-xs uppercase font-bold text-tertiary tracking-wider">
                Direct Transfer Recommended
              </span>
              <p className="text-sm md:text-base font-medium">
                Save travel fatigue: Bypass PHC Shindewadi and proceed directly
                to <b>Rural Hospital Koregaon</b> with an auto-generated SevaSetu
                Digital Token.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-space-sm w-full md:w-auto">
              <button
                type="button"
                onClick={() => openDirections('Rural Hospital Koregaon')}
                className="h-11 px-space-md bg-surface text-secondary font-semibold text-sm rounded-lg shadow-sm hover:bg-surface-container flex items-center justify-center gap-space-xs border border-surface-container"
              >
                <span className="material-symbols-outlined text-[18px]">
                  directions
                </span>
                <span>Get Directions</span>
              </button>
              <button
                type="button"
                onClick={() =>
                  onStartReferral(
                    'Rural Hospital Koregaon',
                    'X-Ray (क्ष-किरण)',
                    'PHC Shindewadi'
                  )
                }
                className="h-11 px-space-lg bg-primary text-on-primary font-bold text-sm rounded-lg shadow hover:bg-primary-container flex items-center justify-center gap-space-xs cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">
                  send_to_mobile
                </span>
                <span>Start Referral / रेफरल सुरू करा</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Facilities Header & Search refinement */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-sm">
        <div className="flex flex-col">
          <span className="text-xl font-bold text-on-surface">
            {facilities.length} Facilities Found Near{' '}
            {locationInput || 'Shindewadi'}
          </span>
          <span className="text-xs md:text-sm text-on-surface-variant">
            Ordered by proximity and verified diagnostic inventory
          </span>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Filter facilities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-9 px-3 rounded-lg text-xs bg-surface-container text-on-surface border border-surface-container-high focus:outline-none"
          />
          <div className="flex items-center gap-1.5 text-xs font-semibold text-on-surface-variant bg-surface-container-low px-2 py-1 rounded border border-surface-container">
            <span className="w-2.5 h-2.5 rounded-full bg-primary-fixed-dim inline-block" />
            Verified Today
          </div>
        </div>
      </div>

      {/* Realistic Sample Facilities Grid (5 Centers) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-md">
        {displayedFacilities.map((fac) => {
          const isRec = fac.isRecommended;
          return (
            <div
              key={fac.id}
              className={`bg-surface-container-lowest rounded-xl p-space-md flex flex-col justify-between gap-space-sm relative border ${
                isRec
                  ? 'border-primary shadow-md ring-1 ring-primary/20'
                  : 'border-surface-container shadow-sm'
              }`}
            >
              <div className="flex flex-col gap-space-xs">
                {/* Badges & Distance */}
                <div className="flex items-start justify-between gap-2">
                  <span
                    className={`px-2 py-0.5 rounded text-xs font-bold ${
                      isRec
                        ? 'bg-primary-fixed text-on-primary-fixed'
                        : fac.type === 'DISTRICT CIVIL HOSPITAL'
                        ? 'bg-secondary-fixed text-on-secondary-fixed'
                        : 'bg-surface-container-high text-on-surface'
                    }`}
                  >
                    {fac.type}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1 text-xs font-semibold ${
                      isRec ? 'text-primary font-bold' : 'text-secondary'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      {isRec ? 'verified' : 'near_me'}
                    </span>{' '}
                    {isRec ? 'Recommended' : fac.distance}
                  </span>
                </div>

                {/* Facility Name & Address */}
                <h4 className="text-base md:text-lg font-bold text-on-surface mt-1">
                  {language === 'mr' ? fac.nameMr : fac.name}
                </h4>
                <p className="text-xs text-on-surface-variant line-clamp-2">
                  {fac.address}
                </p>

                {/* Phone contact */}
                <div className="flex items-center gap-space-xs text-xs text-on-surface mt-1">
                  <span className="material-symbols-outlined text-[16px] text-primary">
                    call
                  </span>
                  <span className="font-semibold">{fac.phone}</span>
                  {fac.timing && (
                    <span className="ml-auto text-[11px] bg-secondary-fixed text-on-secondary-fixed px-2 py-0.5 rounded font-medium truncate max-w-[150px]">
                      {fac.timing}
                    </span>
                  )}
                </div>

                {/* Services Checklist */}
                <div className="mt-space-xs pt-space-xs flex flex-col gap-1 border-t border-surface-container-low text-xs">
                  <div className="text-[11px] font-semibold text-on-surface-variant uppercase tracking-wider">
                    Equipped Capacities:
                  </div>
                  <div className="grid grid-cols-2 gap-1">
                    {fac.availableServices.slice(0, 4).map((svc, i) => (
                      <span
                        key={i}
                        className={`flex items-center gap-1 text-xs ${
                          svc.includes('X-Ray Available') ||
                          svc.includes('Advanced Digital X-Ray')
                            ? 'text-primary font-bold bg-primary-fixed/30 px-1 py-0.5 rounded col-span-2'
                            : 'text-primary'
                        }`}
                      >
                        ✓ {svc}
                      </span>
                    ))}
                    {fac.lackingServices.map((lack, i) => (
                      <span
                        key={i}
                        className="text-error font-bold flex items-center gap-1 col-span-2 bg-error-container/30 px-1 py-0.5 rounded text-xs"
                      >
                        ✕ {lack}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-space-sm flex items-center gap-space-xs">
                <button
                  type="button"
                  onClick={() => onOpenFacilityModal(fac)}
                  className={`h-10 rounded bg-surface-container text-on-surface hover:bg-surface-container-high text-xs font-bold transition-colors ${
                    isRec ? 'w-1/2' : 'w-full'
                  }`}
                >
                  View Details
                </button>
                {isRec && (
                  <button
                    type="button"
                    onClick={() =>
                      onStartReferral(
                        fac.name,
                        'X-Ray (क्ष-किरण)',
                        'PHC Shindewadi'
                      )
                    }
                    className="w-1/2 h-10 rounded bg-primary text-on-primary hover:bg-primary-container text-xs font-bold shadow flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <span>Start Referral</span>
                    <span className="material-symbols-outlined text-[16px]">
                      arrow_forward
                    </span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );

  function openDirections(dest: string) {
    onOpenDirections(dest);
  }
};
