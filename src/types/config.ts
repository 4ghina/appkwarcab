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
  };
  cardTemplate?: CardTemplateConfig;
}

export interface CardTemplateConfig {
  id: string;
  title: string;
  version: number;
  status: 'draft' | 'published';
  updatedAt: string;
  themePreset: 'pradana_brown' | 'wosm_purple' | 'penegak_gold' | 'forest_green' | 'navy_blue';
  gradientStart: string;
  gradientEnd: string;
  textColor: string;
  accentColor: string;
  fontFamily: 'Plus Jakarta Sans' | 'JetBrains Mono' | 'Manrope';
  photoPosition: 'left' | 'center' | 'right';
  fieldLayout: 'standard' | 'compact_two_col' | 'minimal';
  showQrFront: boolean;
  showQrBack: boolean;
  showWatermark: boolean;
  logoType: 'pramuka' | 'wosm' | 'both';
}


export interface ConfigVersionHistory {
  id: string;
  versionId?: string;
  version?: number;
  timestamp: string;
  author: string;
  authorRole?: string;
  changeSummary?: string;
  summary?: string;
  snapshot?: AppIdentityConfig;
  configSnapshot?: AppIdentityConfig;
}

export type ConfigVersionSnapshot = ConfigVersionHistory;

export interface MediaAssetRecord {
  id: string;
  filename: string;
  originalName: string;
  url: string;
  mimeType: string;
  size: number;
  uploadedAt: string;
  category: 'logo' | 'stamp' | 'signature' | 'banner' | 'avatar' | 'document' | 'other';
  label: string;
}

export interface OperationalEvent {
  id: string;
  nama: string;
  tingkat: 'Cabang' | 'Daerah' | 'Nasional' | 'Internasional';
  tanggal: string;
  lokasi: string;
  penyelenggara: string;
  status: 'Pendaftaran Dibuka' | 'Segera Hadir' | 'Ditutup' | 'Selesai';
  sisaKuota: number;
  totalKuota: number;
  deadlinePendaftaran: string;
  golonganPeserta: string[];
  syaratMinimalTingkat: string;
  syaratUsiaMin: number;
  syaratUsiaMax: number;
  approvalWorkflow: 'langsung_gudep' | 'rekomendasi_kwarran' | 'seleksi_kwarcab';
  deskripsi: string;
  bannerImage?: string;
}
