import React, { useState } from 'react';
import { HealthDrive, Language } from '../types';

interface HealthDrivesViewProps {
  language: Language;
  drives: HealthDrive[];
  onOpenCampModal: (drive: HealthDrive) => void;
}

export const HealthDrivesView: React.FC<HealthDrivesViewProps> = ({
  language,
  drives,
  onOpenCampModal,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'diagnostics' | 'maternal' | 'eye'>('all');

  const filteredDrives = drives.filter((drive) => {
    if (selectedFilter === 'all') return true;
    return drive.category.includes(selectedFilter);
  });

  return (
    <section className="flex flex-col gap-space-lg" id="view-health-drives">
      {/* Header bar with filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md bg-surface-container-lowest p-space-lg rounded-xl shadow-sm border border-surface-container-low">
        <div>
          <div className="flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-primary text-[24px]">
              campaign
            </span>
            <h2 className="text-2xl font-bold text-on-surface">
              {language === 'mr'
                ? 'आगामी ग्रामीण आरोग्य शिबिरे'
                : 'Upcoming Village Health Drives (आरोग्य शिबिरे)'}
            </h2>
          </div>
          <p className="font-body-sm text-sm text-on-surface-variant">
            {language === 'mr'
              ? 'स्थानिक पातळीवरील तपासणी तुटवडा दूर करण्यासाठी ग्रामपंचायतींमध्ये आयोजित विशेष शिबिरे.'
              : 'Proactive clinical camps organized directly in rural Gram Panchayats to close local diagnostic gaps.'}
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center gap-space-xs flex-wrap">
          <button
            type="button"
            onClick={() => setSelectedFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              selectedFilter === 'all'
                ? 'bg-primary text-on-primary shadow-sm'
                : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
            }`}
          >
            All Camps
          </button>
          <button
            type="button"
            onClick={() => setSelectedFilter('diagnostics')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              selectedFilter === 'diagnostics'
                ? 'bg-primary text-on-primary shadow-sm'
                : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
            }`}
          >
            Diagnostics & X-Ray
          </button>
          <button
            type="button"
            onClick={() => setSelectedFilter('maternal')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              selectedFilter === 'maternal'
                ? 'bg-primary text-on-primary shadow-sm'
                : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
            }`}
          >
            Maternal & Child
          </button>
          <button
            type="button"
            onClick={() => setSelectedFilter('eye')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              selectedFilter === 'eye'
                ? 'bg-primary text-on-primary shadow-sm'
                : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
            }`}
          >
            Eye Care
          </button>
        </div>
      </div>

      {/* Health Drives List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md" id="health-drives-list">
        {filteredDrives.map((drive) => {
          return (
            <div
              key={drive.id}
              className={`bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col justify-between gap-space-md border transition-all ${
                drive.isNew
                  ? 'border-2 border-primary ring-2 ring-primary/20 animate-in fade-in'
                  : 'border-surface-container'
              }`}
            >
              <div className="flex flex-col gap-space-xs">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded bg-primary-fixed text-on-primary-fixed text-xs font-bold">
                    {drive.date}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                      drive.isNew
                        ? 'bg-primary text-on-primary font-bold'
                        : 'bg-secondary-fixed text-on-secondary-fixed'
                    }`}
                  >
                    ● {drive.isNew ? '✓ Newly Created Camp' : drive.status}
                  </span>
                </div>

                <h3 className="text-lg md:text-xl font-bold text-on-surface mt-1">
                  {language === 'mr' ? drive.titleMr : drive.title}
                </h3>

                <p className="text-xs text-on-surface-variant flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-primary">
                    location_on
                  </span>{' '}
                  {drive.location}
                </p>

                {/* Offered clinical services */}
                <div className="mt-space-xs flex flex-col gap-1">
                  <span className="text-xs font-semibold text-on-surface">
                    Offered Clinical Services:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {drive.services.map((svc, i) => (
                      <span
                        key={i}
                        className={`px-2 py-0.5 rounded text-xs font-medium ${
                          svc.toLowerCase().includes('x-ray')
                            ? 'bg-primary-fixed/40 text-on-primary-fixed-variant font-bold'
                            : 'bg-surface-container text-on-surface'
                        }`}
                      >
                        {svc}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Partner note */}
                <div className="mt-2 text-xs text-on-surface-variant flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-secondary">
                    handshake
                  </span>
                  <span>
                    Partner: <b>{drive.partner}</b>
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-space-xs border-t border-surface-container-low">
                <span className="text-xs font-bold text-primary">
                  {language === 'mr' ? drive.tagMr : drive.tag}
                </span>
                <button
                  type="button"
                  onClick={() => onOpenCampModal(drive)}
                  className="h-10 px-space-md rounded bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-bold cursor-pointer transition-colors"
                >
                  View Camp Details
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
