import React, { useState, useEffect } from 'react';
import {
  TabType,
  PipelineStep,
  Language,
  Facility,
  HealthDrive,
  ServiceGap,
  ReferralSlipData,
  ToastMessage,
} from './types';
import {
  INITIAL_FACILITIES,
  INITIAL_HEALTH_DRIVES,
  SERVICE_GAPS,
} from './data/mockData';
import { Header } from './components/Header';
import { HomeView } from './components/HomeView';
import { FindHealthcareView } from './components/FindHealthcareView';
import { HealthDrivesView } from './components/HealthDrivesView';
import { AdminDashboardView } from './components/AdminDashboardView';
import { HelplineBanner } from './components/HelplineBanner';
import { Footer } from './components/Footer';
import { ToastContainer } from './components/ToastContainer';
import {
  ReferralModal,
  FacilityModal,
  HelplineModal,
  CallbackModal,
  CampDetailsModal,
  DirectionsModal,
} from './components/Modals';

export default function App() {
  // Navigation & Language
  const [currentTab, setCurrentTab] = useState<TabType>('home');
  const [language, setLanguage] = useState<Language>('en');

  // Search & Referral state
  const [selectedService, setSelectedService] = useState<string>('xray');
  const [locationInput, setLocationInput] = useState<string>(
    'Shindewadi, Satara District'
  );
  const [isSmartReferralActive, setIsSmartReferralActive] =
    useState<boolean>(true);

  // Core Data
  const [facilities, setFacilities] =
    useState<Facility[]>(INITIAL_FACILITIES);
  const [healthDrives, setHealthDrives] =
    useState<HealthDrive[]>(INITIAL_HEALTH_DRIVES);
  const [serviceGaps, setServiceGaps] = useState<ServiceGap[]>(SERVICE_GAPS);

  // Live Metric Counters
  const [activeReferralsCount, setActiveReferralsCount] = useState<number>(18);
  const [scheduledDrivesCount, setScheduledDrivesCount] = useState<number>(4);

  // Modals state
  const [isReferralModalOpen, setIsReferralModalOpen] = useState(false);
  const [referralData, setReferralData] = useState<ReferralSlipData | null>({
    tokenId: '#REF-2026-881',
    patientName: 'Ramesh Dnyandeo Patil',
    abhaId: '91-4402-9912-3811',
    fromFacility: 'PHC Shindewadi',
    toFacility: 'Rural Hospital Koregaon',
    service: 'X-Ray (क्ष-किरण)',
    serviceMr: 'क्ष-किरण तपासणी',
    distance: '19 km',
    routeNote: 'Via State Highway 140 / Koregaon Station Rd',
    timestamp: 'Today, 10:15 AM',
  });

  const [isFacilityModalOpen, setIsFacilityModalOpen] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(
    null
  );

  const [isHelplineModalOpen, setIsHelplineModalOpen] = useState(false);
  const [isCallbackModalOpen, setIsCallbackModalOpen] = useState(false);

  const [isCampDetailsModalOpen, setIsCampDetailsModalOpen] = useState(false);
  const [selectedDrive, setSelectedDrive] = useState<HealthDrive | null>(null);

  const [isDirectionsModalOpen, setIsDirectionsModalOpen] = useState(false);
  const [directionsDestination, setDirectionsDestination] = useState(
    'Rural Hospital Koregaon'
  );

  // Floating Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (
    text: string,
    type: 'info' | 'success' | 'warning' = 'info'
  ) => {
    const newToast: ToastMessage = {
      id: `toast-${Date.now()}-${Math.random()}`,
      text,
      type,
    };
    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== newToast.id));
    }, 4500);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // 1-Click Quick Demo Handler
  const handleQuickDemo = () => {
    setCurrentTab('find-healthcare');
    setSelectedService('xray');
    setLocationInput('Shindewadi, Satara District');
    setIsSmartReferralActive(true);

    showToast(
      'Demo Preset Loaded: X-Ray needed in Shindewadi village. Smart Referral Banner activated!',
      'warning'
    );

    setTimeout(() => {
      const banner = document.getElementById('smart-referral-banner');
      if (banner) {
        banner.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 250);
  };

  // Pipeline stepper click handler
  const handlePipelineStepClick = (step: PipelineStep) => {
    switch (step) {
      case 'service':
        setCurrentTab('find-healthcare');
        showToast('Step 1: Choose required healthcare service');
        break;
      case 'facility':
        setCurrentTab('find-healthcare');
        showToast('Step 2: Browsing local health facilities');
        break;
      case 'referral':
        setIsReferralModalOpen(true);
        showToast('Step 3: Viewing Smart Referral verification slip');
        break;
      case 'gap':
        setCurrentTab('admin-dashboard');
        showToast('Step 4: Reviewing rural equipment service gaps');
        setTimeout(() => {
          const el = document.getElementById('view-admin-dashboard');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 150);
        break;
      case 'doctor':
        setCurrentTab('admin-dashboard');
        showToast('Step 5: Connecting specialist doctors & mobile vans');
        setTimeout(() => {
          const card = document.getElementById('drive-creator-card');
          if (card) card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 150);
        break;
      case 'drive':
        setCurrentTab('health-drives');
        showToast('Step 6: Viewing scheduled Gram Panchayat health camps');
        break;
    }
  };

  // Start Referral Trigger
  const handleStartReferral = (
    toFacility: string,
    service: string,
    fromFacility: string
  ) => {
    const randomToken = `#REF-2026-${Math.floor(100 + Math.random() * 899)}`;
    setReferralData({
      tokenId: randomToken,
      patientName: 'Ramesh Dnyandeo Patil',
      abhaId: '91-4402-9912-3811',
      fromFacility,
      toFacility,
      service,
      serviceMr: 'क्ष-किरण तपासणी',
      distance: '19 km',
      routeNote: 'Via NH-48 / Koregaon Station Road',
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    });

    setActiveReferralsCount((prev) => prev + 1);
    setIsReferralModalOpen(true);
    showToast(`Smart Referral slip created! Assigned Token: ${randomToken}`, 'success');
  };

  // Open Facility Profile
  const handleOpenFacilityModal = (fac: Facility) => {
    setSelectedFacility(fac);
    setIsFacilityModalOpen(true);
  };

  // Open Health Camp Details
  const handleOpenCampModal = (drive: HealthDrive) => {
    setSelectedDrive(drive);
    setIsCampDetailsModalOpen(true);
  };

  // Open Directions
  const handleOpenDirections = (dest: string) => {
    setDirectionsDestination(dest);
    setIsDirectionsModalOpen(true);
    showToast(`Routing instructions to ${dest} opened.`);
  };

  // Add Health Drive from Admin
  const handleCreateDrive = (newDrive: HealthDrive) => {
    setHealthDrives((prev) => [newDrive, ...prev]);
    setScheduledDrivesCount((prev) => prev + 1);
  };

  // Submit Callback
  const handleCallbackSubmit = (phone: string) => {
    showToast(
      `Callback registered for ${phone}. You will receive an automated Hindi/Marathi call in 60 seconds.`,
      'success'
    );
  };

  // Reset Demo Seed Data
  const handleResetSeedData = () => {
    setFacilities(INITIAL_FACILITIES);
    setHealthDrives(INITIAL_HEALTH_DRIVES);
    setServiceGaps(SERVICE_GAPS);
    setActiveReferralsCount(18);
    setScheduledDrivesCount(4);
    setSelectedService('xray');
    setLocationInput('Shindewadi, Satara District');
    setIsSmartReferralActive(true);
    showToast('Demo seed data restored to initial state.', 'info');
  };

  // Scroll to top when tab changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentTab]);

  return (
    <div className="min-h-screen bg-surface font-body-md text-on-surface flex flex-col selection:bg-primary-fixed selection:text-on-primary-fixed">
      {/* Header with Nav, Pipeline Stepper & Quick Demo */}
      <Header
        currentTab={currentTab}
        onTabChange={setCurrentTab}
        language={language}
        onLanguageChange={(lang) => {
          setLanguage(lang);
          showToast(
            lang === 'mr'
              ? 'भाषा बदलली: मराठी (Marathi Selected)'
              : 'Language Switched: English'
          );
        }}
        onQuickDemo={handleQuickDemo}
        onOpenHelpline={() => setIsHelplineModalOpen(true)}
        onPipelineStepClick={handlePipelineStepClick}
      />

      {/* Main Body Container */}
      <main className="w-full max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop py-space-md flex-1 flex flex-col gap-space-lg">
        {/* Render Tab View */}
        {currentTab === 'home' && (
          <HomeView
            language={language}
            onNavigateTab={setCurrentTab}
            onQuickDemo={handleQuickDemo}
            onOpenHelpline={() => setIsHelplineModalOpen(true)}
          />
        )}

        {currentTab === 'find-healthcare' && (
          <FindHealthcareView
            language={language}
            facilities={facilities}
            selectedService={selectedService}
            setSelectedService={setSelectedService}
            locationInput={locationInput}
            setLocationInput={setLocationInput}
            isSmartReferralActive={isSmartReferralActive}
            setIsSmartReferralActive={setIsSmartReferralActive}
            onOpenFacilityModal={handleOpenFacilityModal}
            onStartReferral={handleStartReferral}
            onOpenDirections={handleOpenDirections}
            onShowToast={showToast}
          />
        )}

        {currentTab === 'health-drives' && (
          <HealthDrivesView
            language={language}
            drives={healthDrives}
            onOpenCampModal={handleOpenCampModal}
          />
        )}

        {currentTab === 'admin-dashboard' && (
          <AdminDashboardView
            language={language}
            activeReferralsCount={activeReferralsCount}
            scheduledDrivesCount={scheduledDrivesCount}
            gaps={serviceGaps}
            onCreateDrive={handleCreateDrive}
            onShowToast={showToast}
          />
        )}

        {/* Universal Helpline Assistance Banner (Present on all screens) */}
        <HelplineBanner
          language={language}
          onOpenHelpline={() => setIsHelplineModalOpen(true)}
          onRequestCallback={() => setIsCallbackModalOpen(true)}
          onShowToast={showToast}
        />
      </main>

      {/* Footer with Emergency Numbers & SIH Instance Info */}
      <Footer
        language={language}
        onResetSeedData={handleResetSeedData}
        onShowToast={showToast}
      />

      {/* Modals */}
      <ReferralModal
        language={language}
        data={referralData}
        isOpen={isReferralModalOpen}
        onClose={() => setIsReferralModalOpen(false)}
        onShowToast={showToast}
      />

      <FacilityModal
        facility={selectedFacility}
        isOpen={isFacilityModalOpen}
        onClose={() => setIsFacilityModalOpen(false)}
        onStartReferral={handleStartReferral}
      />

      <HelplineModal
        isOpen={isHelplineModalOpen}
        onClose={() => setIsHelplineModalOpen(false)}
      />

      <CallbackModal
        isOpen={isCallbackModalOpen}
        onClose={() => setIsCallbackModalOpen(false)}
        onSubmit={handleCallbackSubmit}
      />

      <CampDetailsModal
        drive={selectedDrive}
        isOpen={isCampDetailsModalOpen}
        onClose={() => setIsCampDetailsModalOpen(false)}
      />

      <DirectionsModal
        destination={directionsDestination}
        isOpen={isDirectionsModalOpen}
        onClose={() => setIsDirectionsModalOpen(false)}
      />

      {/* Floating Notifications */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}
