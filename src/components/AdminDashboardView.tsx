import React, { useState } from 'react';
import { ServiceGap, Language, HealthDrive } from '../types';

interface AdminDashboardViewProps {
  language: Language;
  activeReferralsCount: number;
  scheduledDrivesCount: number;
  gaps: ServiceGap[];
  onCreateDrive: (newDrive: HealthDrive) => void;
  onShowToast: (msg: string) => void;
}

export const AdminDashboardView: React.FC<AdminDashboardViewProps> = ({
  language,
  activeReferralsCount,
  scheduledDrivesCount,
  gaps,
  onCreateDrive,
  onShowToast,
}) => {
  const [village, setVillage] = useState('Shindewadi Village');
  const [service, setService] = useState('X-Ray Screening & Diagnostics');
  const [doctor, setDoctor] = useState(
    'XYZ Hospital (Diagnostics & Mobile X-Ray Van)'
  );
  const [date, setDate] = useState('25 September 2026');
  const [freq, setFreq] = useState('One-time');
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const handleGapPrefill = (gap: ServiceGap) => {
    setVillage(gap.prefillVillage);
    setService(gap.prefillService);
    setDoctor(gap.prefillDoctor);
    onShowToast(`Prefilled Health Drive creator with deficit for: ${gap.prefillVillage}`);

    const card = document.getElementById('drive-creator-card');
    if (card) {
      card.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newDrive: HealthDrive = {
      id: `drive-${Date.now()}`,
      title: `${village} Community Outreach Camp`,
      titleMr: `${village} समुदाय आरोग्य शिबिर`,
      date: date || 'Upcoming Date',
      status: 'Upcoming (Active)',
      statusMr: 'आगामी शिबिर (सक्रिय)',
      location: `${village} Central Chawadi`,
      services: [service, 'General Screening'],
      partner: doctor,
      category: ['all', 'diagnostics'],
      tag: 'Gram Panchayat Approved',
      tagMr: 'ग्रामपंचायत संमती प्राप्त',
      beneficiariesNote: 'Mobile medical van dispatched for service deficit triage.',
      isNew: true,
    };

    onCreateDrive(newDrive);
    setShowSuccessAlert(true);
    onShowToast(`🎉 Success: New Health Drive scheduled for ${village} on ${date}`);

    setTimeout(() => {
      setShowSuccessAlert(false);
    }, 7000);
  };

  return (
    <section className="flex flex-col gap-space-xl" id="view-admin-dashboard">
      {/* Admin KPI Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-space-md">
        <div className="bg-surface-container-lowest p-space-md md:p-space-lg rounded-xl shadow-sm border border-surface-container flex flex-col">
          <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">
            TOTAL FACILITIES
          </span>
          <div className="text-3xl md:text-4xl font-extrabold text-primary mt-1">
            5
          </div>
          <span className="text-xs text-on-surface-variant mt-0.5">
            Active In District Network
          </span>
        </div>

        <div className="bg-surface-container-lowest p-space-md md:p-space-lg rounded-xl shadow-sm border border-surface-container flex flex-col">
          <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">
            ACTIVE REFERRALS
          </span>
          <div
            id="kpi-pending-referrals"
            className="text-3xl md:text-4xl font-extrabold text-secondary mt-1"
          >
            {activeReferralsCount}
          </div>
          <span className="text-xs text-on-surface-variant mt-0.5">
            Live Verified Route Slips
          </span>
        </div>

        <div className="bg-surface-container-lowest p-space-md md:p-space-lg rounded-xl shadow-sm border border-surface-container flex flex-col">
          <span className="text-xs font-bold text-error uppercase tracking-wider">
            CRITICAL GAPS IDENTIFIED
          </span>
          <div className="text-3xl md:text-4xl font-extrabold text-error mt-1">
            3
          </div>
          <span className="text-xs text-on-surface-variant mt-0.5">
            Actionable Equipment Voids
          </span>
        </div>

        <div className="bg-surface-container-lowest p-space-md md:p-space-lg rounded-xl shadow-sm border border-surface-container flex flex-col">
          <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">
            SCHEDULED DRIVES
          </span>
          <div
            id="kpi-scheduled-drives"
            className="text-3xl md:text-4xl font-extrabold text-tertiary mt-1"
          >
            {scheduledDrivesCount}
          </div>
          <span className="text-xs text-on-surface-variant mt-0.5">
            Village Camps Planned
          </span>
        </div>
      </div>

      {/* CRITICAL SERVICE GAPS */}
      <div className="flex flex-col gap-space-sm bg-surface-container-lowest p-space-lg rounded-xl shadow-sm border border-surface-container">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-center gap-space-xs">
              <span className="material-symbols-outlined text-error text-[24px]">
                report_problem
              </span>
              <h3 className="text-xl font-bold text-on-surface">
                {language === 'mr'
                  ? 'ओळखलेले डायग्नोस्टिक व उपकरण तुटवडे'
                  : 'Identified Diagnostic & Service Gaps'}
              </h3>
            </div>
            <p className="font-body-sm text-sm text-on-surface-variant">
              {language === 'mr'
                ? 'स्वयंचलित रेफरल अल्गोरिदम वारंवार आढळणाऱ्या उपकरणांच्या अभावाची नोंद घेतो, जेणेकरून प्रशासक शिबिरांचे नियोजन करू शकतात.'
                : 'The automated referral algorithm flags recurring equipment deficits so supervisors can target mobile drives.'}
            </p>
          </div>
          <span className="px-2.5 py-1 rounded bg-error-container text-on-error-container text-xs font-bold whitespace-nowrap">
            High Priority Triage
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md mt-space-sm">
          {gaps.map((gap) => (
            <div
              key={gap.id}
              className="bg-surface-container-low p-space-md rounded-xl flex flex-col justify-between gap-space-sm border border-surface-container"
            >
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <span className="text-base font-bold text-on-surface">
                    {gap.facilityName}
                  </span>
                  <span className="text-xs font-bold text-error bg-error-container px-2 py-0.5 rounded">
                    {gap.deficitsCount} Deficits
                  </span>
                </div>
                <p className="text-xs text-on-surface-variant">
                  Population served: {gap.population}
                </p>

                <div className="mt-2 flex flex-col gap-1 text-xs">
                  {gap.deficits.map((d, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between bg-surface-container-lowest p-1.5 rounded border border-surface-container-high"
                    >
                      <span className="font-medium">{d.service}:</span>
                      <span className="text-error font-bold">
                        Not Available ✕
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleGapPrefill(gap)}
                className="w-full h-10 bg-primary text-on-primary rounded text-xs font-bold flex items-center justify-center gap-1 hover:bg-primary-container transition-all cursor-pointer shadow-sm"
              >
                <span className="material-symbols-outlined text-[16px]">
                  add_circle
                </span>
                <span>Schedule Drive for This Gap</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* CREATE HEALTH DRIVE FORM */}
      <div
        className="bg-surface-container-lowest p-space-lg md:p-space-xl rounded-xl shadow-md border border-surface-container flex flex-col gap-space-md"
        id="drive-creator-card"
      >
        <div className="flex flex-col">
          <div className="flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-primary text-[26px]">
              add_moderator
            </span>
            <h3 className="text-2xl font-bold text-on-surface">
              {language === 'mr'
                ? 'नवीन आरोग्य शिबिर आयोजित करा'
                : 'Organize Health Drive / नवीन आरोग्य शिबिर तयार करा'}
            </h3>
          </div>
          <p className="font-body-sm text-sm text-on-surface-variant">
            {language === 'mr'
              ? 'तुटवडा असणाऱ्या सेवांसाठी सहभागी रुग्णालये, तज्ज्ञ डॉक्टर आणि फिरत्या डायग्नोस्टिक व्हॅनशी समन्वय साधा.'
              : 'Coordinate with participating hospitals, specialist doctors, and mobile diagnostic vans to address missing services.'}
          </p>
        </div>

        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-space-md"
          id="create-health-drive-form"
          onSubmit={handleFormSubmit}
        >
          {/* Target Village */}
          <div className="flex flex-col gap-space-xs">
            <label
              className="text-sm font-bold text-on-surface"
              htmlFor="drive-village"
            >
              Target Village / Ward
            </label>
            <input
              id="drive-village"
              type="text"
              required
              value={village}
              onChange={(e) => setVillage(e.target.value)}
              className="h-[52px] px-space-md bg-surface-container-low text-on-surface rounded-lg text-sm border border-surface-container focus:outline-none focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest"
            />
          </div>

          {/* Required Service */}
          <div className="flex flex-col gap-space-xs">
            <label
              className="text-sm font-bold text-on-surface"
              htmlFor="drive-service"
            >
              Required Service / Healthcare Need
            </label>
            <select
              id="drive-service"
              value={service}
              onChange={(e) => setService(e.target.value)}
              className="h-[52px] px-space-md bg-surface-container-low text-on-surface rounded-lg text-sm border border-surface-container focus:outline-none focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest"
            >
              <option value="X-Ray Screening & Diagnostics">
                X-Ray Screening & Diagnostics (मोबाईल क्ष-किरण व तपासणी)
              </option>
              <option value="Eye Care & Vision Screening">
                Eye Care & Vision Screening (नेत्र चिकित्सा व चष्मा वाटप)
              </option>
              <option value="Diabetes & Hypertension Check">
                Diabetes & Hypertension Check (मधुमेह तपासणी)
              </option>
              <option value="Maternal & Child Sonography">
                Maternal & Child Health (माता व बाल संगोपन)
              </option>
            </select>
          </div>

          {/* Doctor / Hospital Partner */}
          <div className="flex flex-col gap-space-xs">
            <label
              className="text-sm font-bold text-on-surface"
              htmlFor="drive-doctor"
            >
              Doctor / Hospital Connection
            </label>
            <select
              id="drive-doctor"
              value={doctor}
              onChange={(e) => setDoctor(e.target.value)}
              className="h-[52px] px-space-md bg-surface-container-low text-on-surface rounded-lg text-sm border border-surface-container focus:outline-none focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest"
            >
              <option value="XYZ Hospital (Diagnostics & Mobile X-Ray Van)">
                XYZ Hospital (Diagnostics & Mobile X-Ray Van)
              </option>
              <option value="Dr. Priya Sharma (General Medicine)">
                Dr. Priya Sharma (General Medicine)
              </option>
              <option value="ABC Hospital (Eye Care Department)">
                ABC Hospital (Eye Care Department)
              </option>
              <option value="Dr. Anand Kulkarni (Pediatrics & Maternal)">
                Dr. Anand Kulkarni (Pediatrics & Maternal)
              </option>
            </select>
          </div>

          {/* Date Picker & Frequency */}
          <div className="grid grid-cols-2 gap-space-xs">
            <div className="flex flex-col gap-space-xs">
              <label
                className="text-sm font-bold text-on-surface"
                htmlFor="drive-date"
              >
                Target Date
              </label>
              <input
                id="drive-date"
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="h-[52px] px-space-md bg-surface-container-low text-on-surface rounded-lg text-sm border border-surface-container focus:outline-none focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest"
              />
            </div>
            <div className="flex flex-col gap-space-xs">
              <label
                className="text-sm font-bold text-on-surface"
                htmlFor="drive-freq"
              >
                Camp Frequency
              </label>
              <select
                id="drive-freq"
                value={freq}
                onChange={(e) => setFreq(e.target.value)}
                className="h-[52px] px-space-md bg-surface-container-low text-on-surface rounded-lg text-sm border border-surface-container focus:outline-none focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest"
              >
                <option value="One-time">One-time Camp</option>
                <option value="Monthly">Monthly Camp</option>
                <option value="Quarterly">Quarterly Camp</option>
              </select>
            </div>
          </div>

          {/* Submit */}
          <div className="md:col-span-2 pt-space-xs flex flex-col sm:flex-row items-center justify-between gap-space-sm border-t border-surface-container-low pt-4">
            <span className="text-xs text-on-surface-variant flex items-center gap-1">
              <span className="material-symbols-outlined text-primary text-[18px]">
                verified_user
              </span>
              Auto-dispatches request SMS to partner medical team & gram sevak.
            </span>
            <button
              type="submit"
              className="h-12 px-space-xl bg-primary text-on-primary rounded-lg text-sm font-bold hover:bg-primary-container shadow flex items-center gap-2 cursor-pointer transition-all"
            >
              <span className="material-symbols-outlined text-[20px]">
                event_available
              </span>
              <span>Create Health Drive / शिबिर आयोजित करा</span>
            </button>
          </div>
        </form>

        {/* Live Flash Alert for Health Drive Creation */}
        {showSuccessAlert && (
          <div
            id="drive-success-alert"
            className="p-space-md rounded-lg bg-primary-fixed text-on-primary-fixed flex items-center gap-space-sm border border-primary animate-in fade-in"
          >
            <span className="material-symbols-outlined text-primary text-[28px]">
              task_alt
            </span>
            <div className="flex flex-col text-xs md:text-sm">
              <span className="font-bold text-sm md:text-base">
                Health Drive Created Successfully! / आरोग्य शिबिर यशस्वीरीत्या नियोजित झाले!
              </span>
              <span>
                The camp has been automatically added to the Public Health Drives Registry and scheduled on the Gram Panchayat board.
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
