export type TabType = 'home' | 'find-healthcare' | 'health-drives' | 'admin-dashboard';

export type PipelineStep =
  | 'service'
  | 'facility'
  | 'referral'
  | 'gap'
  | 'doctor'
  | 'drive';

export type Language = 'en' | 'mr';

export interface Facility {
  id: string;
  name: string;
  nameMr: string;
  type: string;
  distance: string;
  address: string;
  phone: string;
  isRecommended?: boolean;
  tag?: string;
  timing?: string;
  availableServices: string[];
  lackingServices: string[];
  specialties?: string[];
  bedCount?: number;
}

export interface HealthDrive {
  id: string;
  title: string;
  titleMr: string;
  date: string;
  status: string;
  statusMr: string;
  location: string;
  services: string[];
  partner: string;
  category: string[];
  tag: string;
  tagMr: string;
  beneficiariesNote: string;
  isNew?: boolean;
}

export interface ServiceGap {
  id: string;
  facilityName: string;
  population: string;
  deficitsCount: number;
  deficits: {
    service: string;
    serviceMr: string;
    available: boolean;
  }[];
  prefillVillage: string;
  prefillService: string;
  prefillDoctor: string;
}

export interface ReferralSlipData {
  tokenId: string;
  patientName: string;
  abhaId: string;
  fromFacility: string;
  toFacility: string;
  service: string;
  serviceMr: string;
  distance: string;
  routeNote: string;
  timestamp: string;
}

export interface ToastMessage {
  id: string;
  text: string;
  type?: 'info' | 'success' | 'warning';
}
