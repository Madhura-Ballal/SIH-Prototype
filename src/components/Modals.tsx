import React, { useState } from 'react';
import { Facility, HealthDrive, ReferralSlipData, Language } from '../types';

// =========================================================================
// SMART REFERRAL MODAL
// =========================================================================
interface ReferralModalProps {
  language: Language;
  data: ReferralSlipData | null;
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (msg: string) => void;
}

export const ReferralModal: React.FC<ReferralModalProps> = ({
  data,
  isOpen,
  onClose,
  onShowToast,
}) => {
  if (!isOpen || !data) return null;

  const handlePrint = () => {
    onShowToast('🖨️ Referral Slip sent to village kiosk printer queue.');
    window.print();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-space-md animate-in fade-in"
      id="referral-modal"
    >
      <div className="bg-surface-container-lowest w-full max-w-xl rounded-xl shadow-2xl overflow-hidden flex flex-col border border-surface-container">
        {/* Modal Header */}
        <div className="bg-primary p-space-md text-on-primary flex items-center justify-between">
          <div className="flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-[26px]">
              receipt_long
            </span>
            <div className="flex flex-col leading-tight">
              <span className="text-lg font-bold">
                Digital Smart Referral Slip
              </span>
              <span className="text-xs opacity-90">
                राष्ट्रीय ग्रामीण आरोग्य स्मार्ट रेफरल पावती
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-on-primary hover:opacity-75 cursor-pointer p-1 rounded-full transition-opacity"
          >
            <span className="material-symbols-outlined text-[24px]">close</span>
          </button>
        </div>

        {/* Slip Body */}
        <div
          id="printable-referral-slip"
          className="p-space-lg flex flex-col gap-space-md overflow-y-auto max-h-[768px]"
        >
          {/* Token ID Card */}
          <div className="flex items-center justify-between bg-surface-container-low p-space-sm rounded-lg border border-surface-container">
            <div>
              <span className="text-xs text-on-surface-variant font-semibold">
                Referral Token ID
              </span>
              <div
                className="text-xl md:text-2xl font-extrabold text-primary"
                id="ref-modal-id"
              >
                {data.tokenId}
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-primary-fixed text-on-primary-fixed text-xs font-bold uppercase tracking-wider">
              CONFIRMED QUEUE
            </span>
          </div>

          {/* Patient Details Grid */}
          <div className="grid grid-cols-2 gap-space-sm text-xs md:text-sm">
            <div className="p-space-xs bg-surface-container rounded border border-surface-container-high">
              <span className="text-xs text-on-surface-variant font-medium">
                Patient Name (Sample)
              </span>
              <div className="font-bold text-on-surface text-sm md:text-base">
                {data.patientName}
              </div>
            </div>
            <div className="p-space-xs bg-surface-container rounded border border-surface-container-high">
              <span className="text-xs text-on-surface-variant font-medium">
                ABHA Health ID
              </span>
              <div className="font-bold text-on-surface text-sm md:text-base font-mono">
                {data.abhaId}
              </div>
            </div>
            <div className="p-space-xs bg-surface-container rounded border border-surface-container-high">
              <span className="text-xs text-on-surface-variant font-medium">
                Originating Center
              </span>
              <div
                className="font-bold text-on-surface text-sm"
                id="ref-modal-from"
              >
                {data.fromFacility}
              </div>
            </div>
            <div className="p-space-xs bg-surface-container rounded border border-surface-container-high">
              <span className="text-xs text-on-surface-variant font-medium">
                Recommended Center
              </span>
              <div
                className="font-bold text-primary text-sm"
                id="ref-modal-to"
              >
                {data.toFacility}
              </div>
            </div>
          </div>

          {/* Clinical Reason for Transfer */}
          <div className="p-space-sm bg-tertiary-fixed text-on-tertiary-fixed rounded-lg text-xs md:text-sm flex items-start gap-space-xs border border-tertiary-fixed-dim">
            <span className="material-symbols-outlined text-tertiary text-[22px] shrink-0 mt-0.5">
              info
            </span>
            <div>
              <b className="block">Clinical Reason for Smart Transfer:</b>
              <div id="ref-modal-service">
                {data.service} diagnostic deficit identified at {data.fromFacility}. Immediate priority transfer token issued to {data.toFacility}.
              </div>
            </div>
          </div>

          {/* Simulated SMS Alert to Patient's Feature Phone */}
          <div className="p-space-sm bg-surface-container-high rounded-lg flex flex-col gap-1 text-on-surface border border-surface-container-highest">
            <div className="flex items-center gap-1 text-xs font-bold text-secondary">
              <span className="material-symbols-outlined text-[16px]">sms</span>
              <span>
                Automated SMS Dispatched to +91 98XXX XXXXX (मराठी व इंग्रजी)
              </span>
            </div>
            <p className="text-xs italic bg-surface-container-lowest p-2.5 rounded border border-surface-container font-mono text-on-surface leading-relaxed">
              &quot;SevaSetu: {data.patientName}, aapla referral slip {data.toFacility} sathi tayar aahe. Token: {data.tokenId}. X-Ray OPD Room 4 madhe daakhva.&quot;
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-space-md bg-surface-container flex items-center justify-between border-t border-surface-container-high">
          <button
            type="button"
            onClick={handlePrint}
            className="px-space-md h-10 rounded bg-surface-container-lowest text-on-surface hover:bg-surface-container-high text-xs font-bold flex items-center gap-1 cursor-pointer border border-surface-container"
          >
            <span className="material-symbols-outlined text-[18px]">print</span>
            <span>Print Referral Slip</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-space-lg h-10 rounded bg-primary text-on-primary text-xs md:text-sm font-bold hover:bg-primary-container cursor-pointer shadow-sm"
          >
            Done / पूर्ण झाले
          </button>
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// FACILITY DETAILS MODAL
// =========================================================================
interface FacilityModalProps {
  facility: Facility | null;
  isOpen: boolean;
  onClose: () => void;
  onStartReferral: (targetFacilityName: string, serviceName: string, fromFacilityName: string) => void;
}

export const FacilityModal: React.FC<FacilityModalProps> = ({
  facility,
  isOpen,
  onClose,
  onStartReferral,
}) => {
  if (!isOpen || !facility) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-space-md animate-in fade-in"
      id="facility-modal"
    >
      <div className="bg-surface-container-lowest w-full max-w-lg rounded-xl shadow-2xl overflow-hidden flex flex-col border border-surface-container">
        <div className="bg-secondary p-space-md text-on-secondary flex items-center justify-between">
          <div className="flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-[24px]">
              local_hospital
            </span>
            <span className="text-lg font-bold">{facility.name}</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-on-secondary hover:opacity-75 cursor-pointer p-1 rounded-full transition-opacity"
          >
            <span className="material-symbols-outlined text-[24px]">close</span>
          </button>
        </div>

        <div className="p-space-lg flex flex-col gap-space-sm text-xs md:text-sm">
          <div className="flex justify-between border-b border-surface-container-low pb-2">
            <span className="text-on-surface-variant font-medium">Type & Distance:</span>
            <span className="font-bold text-on-surface">
              {facility.type} • {facility.distance}
            </span>
          </div>

          <div className="flex justify-between border-b border-surface-container-low pb-2">
            <span className="text-on-surface-variant font-medium">Helpline Contact:</span>
            <span className="font-bold text-primary">{facility.phone}</span>
          </div>

          <div className="flex justify-between border-b border-surface-container-low pb-2">
            <span className="text-on-surface-variant font-medium">Operating Timing:</span>
            <span className="font-semibold text-on-surface">{facility.timing}</span>
          </div>

          <div className="pt-1">
            <span className="text-on-surface-variant font-semibold block mb-1">
              Available Clinical Services:
            </span>
            <div className="flex flex-wrap gap-1 p-2 rounded bg-surface-container border border-surface-container-high">
              {facility.availableServices.map((s, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 bg-surface-container-lowest text-primary rounded text-xs font-semibold"
                >
                  ✓ {s}
                </span>
              ))}
            </div>
          </div>

          {facility.lackingServices.length > 0 && (
            <div className="pt-1">
              <span className="text-on-surface-variant font-semibold block mb-1">
                Services Lacking / Equipment Gaps:
              </span>
              <div className="flex flex-wrap gap-1 p-2 rounded bg-error-container text-on-error-container border border-error/20">
                {facility.lackingServices.map((s, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 bg-error-container/50 text-error rounded text-xs font-bold"
                  >
                    ✕ {s}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="p-space-md bg-surface-container flex items-center justify-between border-t border-surface-container-high">
          <button
            type="button"
            onClick={onClose}
            className="px-space-md h-10 rounded bg-surface-container-lowest text-on-surface text-xs font-bold cursor-pointer border border-surface-container"
          >
            Close
          </button>
          {facility.isRecommended && (
            <button
              type="button"
              onClick={() => {
                onClose();
                onStartReferral(facility.name, 'X-Ray (क्ष-किरण)', 'PHC Shindewadi');
              }}
              className="px-space-lg h-10 rounded bg-primary text-on-primary text-xs font-bold hover:bg-primary-container cursor-pointer shadow-sm flex items-center gap-1"
            >
              <span>Refer to This Facility</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// HELPLINE CALL SIMULATOR MODAL
// =========================================================================
interface HelplineModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelplineModal: React.FC<HelplineModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-space-md animate-in fade-in"
      id="helpline-modal"
    >
      <div className="bg-surface-container-lowest w-full max-w-md rounded-xl shadow-2xl p-space-lg flex flex-col items-center text-center gap-space-md border border-surface-container">
        <div className="w-16 h-16 rounded-full bg-error-container text-on-error-container flex items-center justify-center animate-pulse shadow-md">
          <span className="material-symbols-outlined text-[36px] text-error">
            phone_in_talk
          </span>
        </div>

        <div className="flex flex-col">
          <span className="text-lg font-bold text-on-surface">
            Connecting Toll-Free Helpline
          </span>
          <span className="text-2xl md:text-3xl font-extrabold text-primary mt-1 tracking-wider">
            1800-XXX-XXXX
          </span>
          <span className="text-xs text-on-surface-variant mt-2 leading-relaxed">
            (Prototype Simulation) A Marathi/Hindi healthcare operator is being assigned to your call queue.
          </span>
        </div>

        <div className="w-full p-space-sm bg-surface-container rounded-lg text-xs font-semibold text-on-surface border border-surface-container-high">
          Active Telephonic Agent: <b>MH-Satara Helpdesk Node 4</b>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="w-full h-11 bg-surface-container-high text-on-surface hover:bg-error-container hover:text-error font-bold text-sm rounded-lg transition-colors cursor-pointer border border-surface-container-highest"
        >
          End Simulated Call
        </button>
      </div>
    </div>
  );
};

// =========================================================================
// CALLBACK REQUEST MODAL
// =========================================================================
interface CallbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (phone: string) => void;
}

export const CallbackModal: React.FC<CallbackModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [phoneNumber, setPhoneNumber] = useState('+91 98765-43210');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-space-md animate-in fade-in">
      <div className="bg-surface-container-lowest w-full max-w-md rounded-xl shadow-2xl p-space-lg flex flex-col gap-space-md border border-surface-container">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[24px]">
              call_log
            </span>
            <h3 className="text-lg font-bold text-on-surface">
              Request Telephonic Callback
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-on-surface-variant hover:text-on-surface cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <p className="text-xs text-on-surface-variant leading-relaxed">
          Enter your 10-digit mobile number. Our healthcare officer will call you back within 60 seconds to assist with referrals or hospital guidance.
        </p>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold text-on-surface">
            Mobile Number / फोन नंबर:
          </label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="h-11 px-3 rounded-lg text-sm bg-surface-container-low border border-surface-container focus:outline-none focus:ring-2 focus:ring-primary text-on-surface"
            placeholder="+91 98765-43210"
          />
        </div>

        <div className="flex items-center justify-end gap-2 pt-2 border-t border-surface-container-low">
          <button
            type="button"
            onClick={onClose}
            className="px-4 h-10 rounded text-xs font-bold text-on-surface bg-surface-container hover:bg-surface-container-high"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              if (phoneNumber.trim()) {
                onSubmit(phoneNumber);
                onClose();
              }
            }}
            className="px-5 h-10 rounded text-xs font-bold text-on-primary bg-primary hover:bg-primary-container shadow-sm"
          >
            Submit Request
          </button>
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// CAMP DETAILS MODAL
// =========================================================================
interface CampDetailsModalProps {
  drive: HealthDrive | null;
  isOpen: boolean;
  onClose: () => void;
}

export const CampDetailsModal: React.FC<CampDetailsModalProps> = ({
  drive,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !drive) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-space-md animate-in fade-in">
      <div className="bg-surface-container-lowest w-full max-w-md rounded-xl shadow-2xl overflow-hidden flex flex-col border border-surface-container">
        <div className="bg-primary p-space-md text-on-primary flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[24px]">
              medical_information
            </span>
            <span className="text-base font-bold">Health Camp Details</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-on-primary hover:opacity-75 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[22px]">close</span>
          </button>
        </div>

        <div className="p-space-lg flex flex-col gap-space-sm text-xs md:text-sm">
          <div>
            <span className="text-xs text-on-surface-variant font-medium">Camp Name:</span>
            <div className="font-bold text-base text-on-surface">{drive.title}</div>
          </div>

          <div className="flex justify-between border-t border-surface-container-low pt-2">
            <span className="text-on-surface-variant font-medium">Scheduled Date:</span>
            <span className="font-bold text-primary">{drive.date}</span>
          </div>

          <div className="flex justify-between border-t border-surface-container-low pt-2">
            <span className="text-on-surface-variant font-medium">Location:</span>
            <span className="font-semibold text-on-surface text-right">{drive.location}</span>
          </div>

          <div className="flex justify-between border-t border-surface-container-low pt-2">
            <span className="text-on-surface-variant font-medium">Medical Partner:</span>
            <span className="font-bold text-secondary text-right">{drive.partner}</span>
          </div>

          <div className="border-t border-surface-container-low pt-2">
            <span className="text-on-surface-variant font-medium block mb-1">
              Clinical Capacities:
            </span>
            <div className="flex flex-wrap gap-1">
              {drive.services.map((s, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 bg-surface-container text-on-surface rounded text-xs font-semibold"
                >
                  ✓ {s}
                </span>
              ))}
            </div>
          </div>

          <div className="p-2.5 rounded bg-primary-fixed/30 text-on-surface border border-primary-fixed text-xs mt-1">
            <b>Logistics Note:</b> {drive.beneficiariesNote}
          </div>
        </div>

        <div className="p-space-md bg-surface-container flex justify-end border-t border-surface-container-high">
          <button
            type="button"
            onClick={onClose}
            className="px-space-md h-10 rounded bg-surface-container-lowest text-on-surface text-xs font-bold cursor-pointer border border-surface-container"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// TURN-BY-TURN DIRECTIONS MODAL
// =========================================================================
interface DirectionsModalProps {
  destination: string;
  isOpen: boolean;
  onClose: () => void;
}

export const DirectionsModal: React.FC<DirectionsModalProps> = ({
  destination,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-space-md animate-in fade-in">
      <div className="bg-surface-container-lowest w-full max-w-lg rounded-xl shadow-2xl overflow-hidden flex flex-col border border-surface-container">
        <div className="bg-secondary p-space-md text-on-secondary flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[24px]">
              route
            </span>
            <span className="text-base font-bold">Directions to {destination}</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-on-secondary hover:opacity-75 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[22px]">close</span>
          </button>
        </div>

        <div className="p-space-lg flex flex-col gap-space-md text-xs md:text-sm">
          <div className="flex items-center justify-between bg-surface-container-low p-2.5 rounded-lg border border-surface-container">
            <div>
              <span className="text-xs text-on-surface-variant">Recommended Route:</span>
              <div className="font-bold text-on-surface">Via NH-48 / Koregaon Highway</div>
            </div>
            <div className="text-right">
              <span className="text-xs text-primary font-bold">19 km</span>
              <div className="text-xs text-on-surface-variant font-medium">~28 mins</div>
            </div>
          </div>

          <div className="flex flex-col gap-2.5">
            <div className="flex items-start gap-2.5">
              <div className="w-6 h-6 rounded-full bg-primary text-on-primary flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                A
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-on-surface">Start: Shindewadi Village Chawadi</span>
                <span className="text-xs text-on-surface-variant">
                  Head east toward Koregaon Station Road (3.2 km)
                </span>
              </div>
            </div>

            <div className="flex items-start gap-2.5 pl-3 border-l-2 border-dashed border-surface-container-highest ml-3 py-1">
              <span className="material-symbols-outlined text-secondary text-[18px]">
                turn_right
              </span>
              <div className="flex flex-col">
                <span className="font-semibold text-on-surface">Turn right onto State Highway 140</span>
                <span className="text-xs text-on-surface-variant">Continue past Rahimatpur junction (12 km)</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <div className="w-6 h-6 rounded-full bg-error text-on-error flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                B
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-on-surface">Destination: {destination}</span>
                <span className="text-xs text-on-surface-variant">
                  Station Road, opposite Taluka Panchayat office. Dedicated emergency bay active.
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-space-md bg-surface-container flex justify-end border-t border-surface-container-high">
          <button
            type="button"
            onClick={onClose}
            className="px-space-md h-10 rounded bg-primary text-on-primary text-xs font-bold cursor-pointer"
          >
            Understood
          </button>
        </div>
      </div>
    </div>
  );
};
