export interface AppIdentityConfig {
  appName: string;
  appShortName: string;
  description: string;
  kwarcabName: string;
  kwarcabNomor: string;
  kwardaName: string;
  motto: string;
  address: string;
  email: string;
  phone: string;
  whatsapp: string;
  website: string;
  socials: {
    instagram: string;
    youtube: string;
    facebook?: string;
  };
  footerText: string;
  helpNotice: string;
  serviceNotice: string;
  logos: {
    primary: string;
    secondary: string;
    favicon: string;
    appIcon: string;
    stamp: string;
    signature: string;
  };
  colors: {
    primary: string;
    primaryHover: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
  };
  isDemoMode: boolean;
  activeFeatures: {
    garudaTracker: boolean;
    skuGamified: boolean;
    gudepMap: boolean;
    pusdiklatcab: boolean;
    sakaKrida: boolean;
    eventRegistration: boolean;
    ktaDigital: boolean;
    smartCardRfid: boolean;
    publicPortal: boolean;
  };
  cardTemplate?: any;
}


export interface ConfigVersionHistory {
  id: string;
  version: number;
  timestamp: string;
  author: string;
  summary: string;
  configSnapshot: AppIdentityConfig;
}

export interface MediaAssetRecord {
  id: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  category: 'logo' | 'stamp' | 'signature' | 'banner' | 'icon' | 'document';
  uploadedAt: string;
  uploadedBy?: string;
}

export interface OperationalEvent {
  id: string;
  nama: string;
  tanggal: string;
  lokasi: string;
  kategori: string;
  deskripsi: string;
  kuotaTotal: number;
  kuotaTerisi: number;
  biaya: string;
  status: 'Buka' | 'Penuh' | 'Selesai';
  imageUrl?: string;
  organizer: string;
  contactPerson?: string;
}
