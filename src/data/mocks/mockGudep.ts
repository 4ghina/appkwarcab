import type { GudepData, GarudaApplication } from '../../types/scout';

export const MOCK_GUDEP_LIST: GudepData[] = [
  {
    id: 'gudep-01',
    nomorPa: '01.001',
    nomorPi: '01.002',
    pangkalan: 'SMA Negeri 1 Depok',
    kwarran: 'Pancoran Mas',
    alamat: 'Jl. Nusantara Raya No. 317, Pancoran Mas, Kota Depok',
    status: 'Aktif',
    pembina: 'Kak Suryono, S.Pd., M.Pd.',
    kontakWa: '081234567890',
    jumlahAnggota: {
      siaga: 0,
      penggalang: 0,
      penegak: 124,
      pandega: 0
    },
    akreditasi: 'A',
    terakhirHerRegistrasi: 'Januari 2026',
    koordinat: { lat: -6.398, lng: 106.815 }
  },
  {
    id: 'gudep-02',
    nomorPa: '02.015',
    nomorPi: '02.016',
    pangkalan: 'SMP Negeri 2 Depok',
    kwarran: 'Sukmajaya',
    alamat: 'Jl. Bangau Raya No. 1, Depok II Tengah, Sukmajaya, Kota Depok',
    status: 'Aktif',
    pembina: 'Kak Siti Nurhaliza, M.Pd.',
    kontakWa: '081398765432',
    jumlahAnggota: {
      siaga: 0,
      penggalang: 218,
      penegak: 0,
      pandega: 0
    },
    akreditasi: 'A',
    terakhirHerRegistrasi: 'Februari 2026',
    koordinat: { lat: -6.388, lng: 106.843 }
  },
  {
    id: 'gudep-03',
    nomorPa: '01.011',
    nomorPi: '01.012',
    pangkalan: 'SD Negeri Anyelir 1 Depok',
    kwarran: 'Pancoran Mas',
    alamat: 'Jl. Anyelir No. 1, Pancoran Mas, Kota Depok',
    status: 'Aktif',
    pembina: 'Kak Joko Susilo, S.Pd.',
    kontakWa: '081255566677',
    jumlahAnggota: {
      siaga: 180,
      penggalang: 0,
      penegak: 0,
      pandega: 0
    },
    akreditasi: 'A',
    terakhirHerRegistrasi: 'Januari 2026',
    koordinat: { lat: -6.392, lng: 106.822 }
  },
  {
    id: 'gudep-04',
    nomorPa: '02.021',
    nomorPi: '02.022',
    pangkalan: 'SMA Negeri 2 Depok',
    kwarran: 'Sukmajaya',
    alamat: 'Jl. Gede No. 9, Depok II Timur, Sukmajaya, Kota Depok',
    status: 'Kurang Aktif',
    pembina: 'Kak Hendra Gunawan, S.Pd.',
    kontakWa: '081311223344',
    jumlahAnggota: {
      siaga: 0,
      penggalang: 0,
      penegak: 85,
      pandega: 0
    },
    akreditasi: 'B',
    terakhirHerRegistrasi: 'Agustus 2025',
    koordinat: { lat: -6.395, lng: 106.848 }
  },
  {
    id: 'gudep-05',
    nomorPa: '04.011',
    nomorPi: '04.012',
    pangkalan: 'SMP Negeri 4 Depok',
    kwarran: 'Cimanggis',
    alamat: 'Jl. Radar Auri No. 12, Cimanggis, Kota Depok',
    status: 'Belum Her-Registrasi',
    pembina: 'Kak Dewi Kartika',
    kontakWa: '081299887766',
    jumlahAnggota: {
      siaga: 0,
      penggalang: 96,
      penegak: 0,
      pandega: 0
    },
    akreditasi: 'Belum',
    terakhirHerRegistrasi: 'Tahun 2024 (Kadaluarsa)',
    koordinat: { lat: -6.368, lng: 106.862 }
  },
  {
    id: 'gudep-06',
    nomorPa: '03.001',
    nomorPi: '03.002',
    pangkalan: 'Racana Makara UI - Universitas Indonesia',
    kwarran: 'Beji',
    alamat: 'Kampus UI Depok, Pondok Cina, Kec. Beji, Kota Depok',
    status: 'Aktif',
    pembina: 'Kak Dr. H. Mulyadi',
    kontakWa: '081577889900',
    jumlahAnggota: {
      siaga: 0,
      penggalang: 0,
      penegak: 0,
      pandega: 64
    },
    akreditasi: 'A',
    terakhirHerRegistrasi: 'Februari 2026',
    koordinat: { lat: -6.365, lng: 106.828 }
  }
];

export const MOCK_GARUDA_APPLICATIONS: GarudaApplication[] = [
  {
    id: 'garuda-app-01',
    applicantName: 'Dimas Arya Pratama',
    nta: '09.22.01.00421',
    golongan: 'Penegak',
    gudep: 'SMA Negeri 1 Depok (01.001)',
    kwarran: 'Pancoran Mas',
    status: 'Penilaian Kwarcab',
    currentStep: 3,
    tanggalPengajuan: '14 Feb 2026',
    berkas: {
      skuLengkap: true,
      skkMinimal: true,
      portofolioBakti: true,
      suratRekomendasiGudep: true,
      suratRekomendasiKwarran: true
    },
    catatanPenilai: 'Berkas administrasi dan portofolio bakti masyarakat lengkap. Dijadwalkan wawancara Tim Penilai Kwarcab pada 25 Maret 2026.'
  },
  {
    id: 'garuda-app-02',
    applicantName: 'Nabila Putri Azzahra',
    nta: '09.22.02.01289',
    golongan: 'Penggalang',
    gudep: 'SMP Negeri 2 Depok (02.015)',
    kwarran: 'Sukmajaya',
    status: 'SK Terbit',
    currentStep: 4,
    tanggalPengajuan: '10 Jan 2026',
    skNomor: 'SK-KWARCAB-DPK/042/GARUDA-LT/2026',
    berkas: {
      skuLengkap: true,
      skkMinimal: true,
      portofolioBakti: true,
      suratRekomendasiGudep: true,
      suratRekomendasiKwarran: true
    },
    catatanPenilai: 'Lulus dengan predikat Pujian (Sangat Memuaskan). Medali Pramuka Garuda disematkan pada Hari Pramuka.'
  },
  {
    id: 'garuda-app-03',
    applicantName: 'Fajar Nugraha',
    nta: '09.22.01.00762',
    golongan: 'Penegak',
    gudep: 'SMA Negeri 2 Depok (02.021)',
    kwarran: 'Sukmajaya',
    status: 'Perlu Revisi',
    currentStep: 2,
    tanggalPengajuan: '20 Feb 2026',
    berkas: {
      skuLengkap: true,
      skkMinimal: false,
      portofolioBakti: true,
      suratRekomendasiGudep: true,
      suratRekomendasiKwarran: false
    },
    catatanPenilai: 'Kekurangan 3 SKK tingkat Madya/Utama dan belum melampirkan Surat Rekomendasi dari Kwarran Sukmajaya.'
  }
];
