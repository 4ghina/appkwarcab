import type { ScoutGolongan } from './scoutUser';

export interface GudepData {
  id: string;
  nomorPa: string;
  nomorPi: string;
  pangkalan: string;
  kwarran: string;
  alamat: string;
  status: 'Aktif' | 'Kurang Aktif' | 'Belum Her-Registrasi';
  pembina: string;
  kontakWa: string;
  jumlahAnggota: {
    siaga: number;
    penggalang: number;
    penegak: number;
    pandega: number;
  };
  akreditasi: 'A' | 'B' | 'C' | 'Belum';
  terakhirHerRegistrasi: string;
  koordinat?: { lat: number; lng: number };
  mabigus?: string;
  kamabigus?: string;
  telepon?: string;
  email?: string;
}

export interface GarudaApplication {
  id: string;
  applicantName: string;
  nta: string;
  golongan: ScoutGolongan;
  gudep: string;
  kwarran: string;
  status: 'Diajukan Gudep' | 'Verifikasi Kwarran' | 'Penilaian Kwarcab' | 'SK Terbit' | 'Perlu Revisi';
  currentStep: number;
  tanggalPengajuan: string;
  skNomor?: string;
  berkas: {
    skuLengkap: boolean;
    skkMinimal: boolean;
    portofolioBakti: boolean;
    suratRekomendasiGudep: boolean;
    suratRekomendasiKwarran: boolean;
  };
  catatanPenilai?: string;
}

export interface CabangEvent {
  id: string;
  nama: string;
  tema: string;
  kategoriGolongan: ScoutGolongan[];
  tanggal: string;
  lokasi: string;
  kuotaPerGudep: number;
  terdaftar: number;
  biaya: string;
  syarat: {
    minUsia: number;
    maxUsia: number;
    minTingkatan: string;
    suratIzinOrtu: boolean;
    ktaAktif: boolean;
  };
  isRegistered?: boolean;
  kuotaTotal?: number;
  kuotaTerisi?: number;
  deadlineDaftar?: string;
  kategori?: string;
  status?: string;
  organizer?: string;
  deskripsi?: string;
}

export interface VerificationItem {
  id: string;
  jenis: 'Pendaftaran KTA Baru' | 'Pengaitan Gudep & Keanggotaan' | 'Her-Registrasi Gudep' | 'Berkas E-Garuda' | 'Kenaikan SKU Bantara';
  pengaju: string;
  emailPengaju?: string;
  instansi: string;
  tanggal: string;
  keterangan: string;
  golongan?: ScoutGolongan;
  appliedRole?: string;
  claimNta?: string;
  status: 'Pending' | 'Disetujui' | 'Direvisi';
  catatan?: string;
  userId?: string;
  gudepName?: string;
}
