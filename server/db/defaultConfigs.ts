import { AppIdentityConfig, MediaAssetRecord } from './types';

export const DEFAULT_IDENTITY_CONFIG: AppIdentityConfig = {
  appName: 'SIM-KWARCAB',
  appShortName: 'SIM-KWARCAB',
  description: 'Sistem Informasi Manajemen Kwartir Cabang Gerakan Pramuka Kota Depok - SuperApp Komunitas Kepanduan Terintegrasi.',
  kwarcabName: 'Kwartir Cabang Kota Depok',
  kwarcabNomor: '09.22',
  kwardaName: 'Kwartir Daerah Jawa Barat',
  motto: 'Satyaku Kudarmakan, Darmaku Kubaktikan',
  address: 'Gedung Kwartir Cabang Kota Depok, Jl. Kalimulya No. 45, Cilodong, Kota Depok, Jawa Barat 16413',
  email: 'pusinfo@kwarcabdepok.or.id',
  phone: '(021) 7788-9900',
  whatsapp: '0812-9988-7766',
  website: 'https://kwarcabdepok.or.id',
  socials: {
    instagram: '@pramukakotadepok',
    youtube: 'Kwarcab Depok Official',
    facebook: 'Pramuka Kwarcab Kota Depok'
  },
  footerText: '© 2026 Kwartir Cabang Gerakan Pramuka Kota Depok. Terverifikasi Kwarnas.',
  helpNotice: 'Pusat Bantuan Resmi Kwartir Cabang Kota Depok siap mendampingi kendala teknis dan pembinaan.',
  serviceNotice: 'Layanan Pengesahan SKU, Verifikasi NTA, dan Penerbitan KTA Beroperasi Normal.',
  logos: {
    primary: '/assets/logo-pramuka.svg',
    secondary: '/assets/logo-wosm.svg',
    favicon: '/assets/favicon-pramuka.svg',
    appIcon: '/assets/icon-pramuka.svg',
    stamp: '/assets/stempel-kwarcab.svg',
    signature: '/assets/ttd-kakwarcab.svg'
  },
  colors: {
    primary: '#5D4037',
    primaryHover: '#4E342E',
    secondary: '#D97706',
    accent: '#059669',
    background: '#FAF8F5',
    surface: '#FFFFFF'
  },
  isDemoMode: true,
  activeFeatures: {
    garudaTracker: true,
    skuGamified: true,
    gudepMap: true,
    pusdiklatcab: true,
    sakaKrida: true,
    eventRegistration: true,
    ktaDigital: true,
    smartCardRfid: true,
    publicPortal: true
  }
};

export const DEFAULT_TEXT_CATALOG: Record<string, string> = {
  'nav.home': 'Beranda',
  'nav.sku': 'E-SKU',
  'nav.gudep': 'Peta Gudep',
  'nav.events': 'Kegiatan',
  'nav.profile': 'Profil',
  'cta.login': 'Masuk Portal',
  'cta.register': 'Daftar Anggota Baru',
  'cta.verify': 'Verifikasi Berkas',
  'status.verified': 'Anggota Terverifikasi',
  'status.pending': 'Menunggu Verifikasi',
  'status.unregistered': 'Belum Bergabung Gudep',
  'banner.announcement': 'Pendaftaran Jambore Cabang 2026 Telah Dibuka. Kuota Terbatas!',
  'section.kta_title': 'Kartu Tanda Anggota Digital (E-KTA)',
  'section.sku_title': 'Progres Syarat Kecakapan Umum (SKU)',
  'section.events_title': 'Agenda Kegiatan Kwartir Cabang',
  'infographic.title': 'Potensi Pramuka dalam Angka',
  'infographic.subtitle': 'Statistik Resmi & Capaian Berjenjang Kwartir Cabang Gerakan Pramuka',
  'infographic.kpi.active_youth': 'Peserta Didik Aktif',
  'infographic.kpi.active_adult': 'Pembina Aktif',
  'infographic.kpi.active_gudep': 'Gudep Aktif',
  'infographic.donut.title': 'Komposisi Peserta Didik',
  'infographic.donut.center': 'Total Anggota Muda',
  'infographic.details.title': 'Rincian Capaian',
  'infographic.bars.target_sku': 'Target SKU (Sedang Ditempuh)',
  'infographic.bars.achievement': 'Capaian Peserta Didik',
  'infographic.bars.skk': 'Status Syarat Kecakapan Khusus (SKK)',
  'infographic.bars.skk_note': 'Satu peserta didik dapat memiliki beberapa catatan SKK.',
  'infographic.bars.pembina_courses': 'Kursus Mahir & Pelatih yang Diselesaikan',
  'infographic.bars.pembina_awards': 'Tanda Penghargaan yang Telah Diterima',
  'infographic.bars.pembina_note': 'Penjumlahan kategori dapat melebihi total Pembina aktif karena seorang pembina dapat memiliki lebih dari satu sertifikat kursus atau tanda penghargaan.'
};


export const DEFAULT_MEDIA_ASSETS: MediaAssetRecord[] = [
  {
    id: 'asset-logo-cikal',
    filename: 'logo-pramuka.svg',
    originalName: 'Tunas Kelapa Kwarnas.svg',
    mimeType: 'image/svg+xml',
    size: 24500,
    url: '/assets/logo-pramuka.svg',
    category: 'logo',
    uploadedAt: '01 Jan 2026, 00:00 WIB',
    uploadedBy: 'Sistem SIM-KWARCAB'
  },
  {
    id: 'asset-logo-wosm',
    filename: 'logo-wosm.svg',
    originalName: 'World Scout Emblem.svg',
    mimeType: 'image/svg+xml',
    size: 31200,
    url: '/assets/logo-wosm.svg',
    category: 'logo',
    uploadedAt: '01 Jan 2026, 00:00 WIB',
    uploadedBy: 'Sistem SIM-KWARCAB'
  },
  {
    id: 'asset-stempel',
    filename: 'stempel-kwarcab.svg',
    originalName: 'Cap Stempel Kwarcab Depok.svg',
    mimeType: 'image/svg+xml',
    size: 42000,
    url: '/assets/stempel-kwarcab.svg',
    category: 'stamp',
    uploadedAt: '10 Jan 2026, 09:15 WIB',
    uploadedBy: 'Super Admin Kwarcab'
  },
  {
    id: 'asset-ttd-kakwarcab',
    filename: 'ttd-kakwarcab.svg',
    originalName: 'Tanda Tangan Ketua Kwarcab.svg',
    mimeType: 'image/svg+xml',
    size: 18500,
    url: '/assets/ttd-kakwarcab.svg',
    category: 'signature',
    uploadedAt: '10 Jan 2026, 09:20 WIB',
    uploadedBy: 'Super Admin Kwarcab'
  }
];
