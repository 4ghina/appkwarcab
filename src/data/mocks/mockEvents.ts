import type { CabangEvent, VerificationItem } from '../../types/scout';

export const MOCK_CABANG_EVENTS: CabangEvent[] = [
  {
    id: 'evt-1',
    nama: 'Raimuna Cabang XII Kota Depok 2026',
    tema: 'Pramuka Muda Berkarakter, Berteknologi & Peduli Lingkungan',
    kategoriGolongan: ['Penegak', 'Pandega'],
    tanggal: '20 - 24 Juli 2026',
    lokasi: 'Bumi Perkemahan Pramuka Cibubur / Situ Pengasinan Depok',
    kuotaPerGudep: 16,
    terdaftar: 340,
    biaya: 'Rp 150.000 / peserta',
    syarat: {
      minUsia: 16,
      maxUsia: 25,
      minTingkatan: 'Penegak Bantara',
      suratIzinOrtu: true,
      ktaAktif: true
    },
    isRegistered: false
  },
  {
    id: 'evt-2',
    nama: 'Jambore Cabang Kota Depok 2026',
    tema: 'Ceria, Berprestasi, dan Bersahabat',
    kategoriGolongan: ['Penggalang'],
    tanggal: '12 - 16 Agustus 2026',
    lokasi: 'Bumi Perkemahan Situ Pengasinan, Sawangan, Kota Depok',
    kuotaPerGudep: 24,
    terdaftar: 680,
    biaya: 'Rp 120.000 / peserta',
    syarat: {
      minUsia: 11,
      maxUsia: 15,
      minTingkatan: 'Penggalang Ramu',
      suratIzinOrtu: true,
      ktaAktif: true
    },
    isRegistered: true
  },
  {
    id: 'evt-3',
    nama: 'Pesta Siaga Tingkat Cabang Kota Depok 2026',
    tema: 'Siaga Cilik Berani, Mandiri, Gembira',
    kategoriGolongan: ['Siaga'],
    tanggal: '05 September 2026',
    lokasi: 'Kompleks Balai Kota Depok / GOR Kota Depok',
    kuotaPerGudep: 10,
    terdaftar: 410,
    biaya: 'Gratis (Subsidi Kwarcab)',
    syarat: {
      minUsia: 7,
      maxUsia: 10,
      minTingkatan: 'Siaga Bantu',
      suratIzinOrtu: true,
      ktaAktif: true
    },
    isRegistered: false
  },
  {
    id: 'evt-4',
    nama: 'Lomba Tingkat III (LT-III) Kwarcab Kota Depok',
    tema: 'Tangkas, Trampil, Terdepan Menuju LT-IV Kwarda',
    kategoriGolongan: ['Penggalang'],
    tanggal: '24 - 27 Oktober 2026',
    lokasi: 'Buper Situ Pengasinan, Sawangan, Kota Depok',
    kuotaPerGudep: 8,
    terdaftar: 192,
    biaya: 'Rp 200.000 / Regu Utusan Juara LT-II',
    syarat: {
      minUsia: 11,
      maxUsia: 15,
      minTingkatan: 'Penggalang Rakit',
      suratIzinOrtu: true,
      ktaAktif: true
    },
    isRegistered: false
  }
];

export const MOCK_VERIFICATION_QUEUE: VerificationItem[] = [
  {
    id: 'verif-new-user-1',
    jenis: 'Pengaitan Gudep & Keanggotaan',
    pengaju: 'Ananda Bagas Pratama',
    emailPengaju: 'ananda.pratama@gmail.com',
    instansi: 'SMA Negeri 1 Depok (Gudep 01.001)',
    tanggal: 'Hari ini, 09:15 WIB',
    keterangan: 'Pengguna baru mengajukan pengaitan keanggotaan Gudep 01.001 sebagai Penegak Bantara.',
    golongan: 'Penegak',
    appliedRole: 'Peserta Didik (Penegak)',
    claimNta: '09.22.01.00998 (Klaim KTA Fisik Lama)',
    status: 'Pending',
    userId: 'user-new-registrant'
  },
  {
    id: 'verif-1',
    jenis: 'Berkas E-Garuda',
    pengaju: 'Dimas Arya Pratama',
    instansi: 'SMA Negeri 1 Depok',
    tanggal: 'Hari ini, 08:30 WIB',
    keterangan: 'Pengajuan Pramuka Garuda Golongan Penegak lengkap 10 SKK dan portofolio bakti',
    golongan: 'Penegak',
    status: 'Pending'
  },
  {
    id: 'verif-2',
    jenis: 'Her-Registrasi Gudep',
    pengaju: 'Kak Hendra Gunawan, S.Pd.',
    instansi: 'Gudep 02.021 - 02.022 (SMAN 2 Depok)',
    tanggal: 'Kemarin, 14:15 WIB',
    keterangan: 'Pembaruan data Pembina dan Surat Keterangan aktif satuan tahun 2026',
    status: 'Pending'
  },
  {
    id: 'verif-3',
    jenis: 'Pendaftaran KTA Baru',
    pengaju: 'Aditya Bagus Saputra (50 Siswa)',
    instansi: 'SMP Negeri 4 Depok',
    tanggal: '28 Feb 2026',
    keterangan: 'Pengajuan KTA Kolektif Anggota Baru Penggalang dengan pas foto seragam Pramuka',
    golongan: 'Penggalang',
    status: 'Pending'
  },
  {
    id: 'verif-4',
    jenis: 'Kenaikan SKU Bantara',
    pengaju: 'Siti Aminah',
    instansi: 'SMA Negeri 1 Depok',
    tanggal: '27 Feb 2026',
    keterangan: 'Hasil pengujian 20 butir SKU Penegak Bantara oleh Pembina Satuan',
    golongan: 'Penegak',
    status: 'Pending'
  }
];
