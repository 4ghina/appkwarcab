import { SeedYouthMember, SeedPembinaMember } from './infographicSeedData';

export const SEED_YOUTH_MEMBERS: SeedYouthMember[] = [
  // --- PANCORAN MAS: SMAN 1 Depok (gudep-01) ---
  {
    id: 'ym-pm-01', nta: '09.22.01.00421', name: 'Dimas Arya Pratama', kwarran: 'Pancoran Mas', gudepId: 'gudep-01',
    isActive: true, youthGolongan: 'Penegak', isGaruda: false, currentTargetSku: 'Bantara', highestRatifiedTku: null,
    skkInProgress: 2, skkCompleted: 4, periods: ['2026-s1', '2025-s2']
  },
  {
    id: 'ym-pm-02', nta: '09.22.01.00762', name: 'Fajar Nugraha', kwarran: 'Pancoran Mas', gudepId: 'gudep-01',
    isActive: true, youthGolongan: 'Penegak', isGaruda: false, currentTargetSku: 'Laksana', highestRatifiedTku: 'Bantara',
    skkInProgress: 1, skkCompleted: 7, periods: ['2026-s1', '2025-s2', '2025-s1']
  },
  {
    id: 'ym-pm-03', nta: '09.22.01.00891', name: 'Siti Aminah', kwarran: 'Pancoran Mas', gudepId: 'gudep-01',
    isActive: true, youthGolongan: 'Penegak', isGaruda: false, currentTargetSku: 'Bantara', highestRatifiedTku: null,
    skkInProgress: 3, skkCompleted: 5, periods: ['2026-s1', '2025-s2']
  },
  {
    id: 'ym-pm-04', nta: '09.22.01.00944', name: 'Aldi Septian', kwarran: 'Pancoran Mas', gudepId: 'gudep-01',
    isActive: true, youthGolongan: 'Penegak', isGaruda: false, currentTargetSku: 'Bantara', highestRatifiedTku: null,
    skkInProgress: 1, skkCompleted: 6, periods: ['2026-s1']
  },
  {
    id: 'ym-pm-05', nta: '09.22.01.01015', name: 'Bagas Aditya', kwarran: 'Pancoran Mas', gudepId: 'gudep-01',
    isActive: true, youthGolongan: 'Penegak', isGaruda: true, currentTargetSku: 'Tanpa target', highestRatifiedTku: 'Laksana',
    skkInProgress: 0, skkCompleted: 12, periods: ['2026-s1', '2025-s2']
  },
  {
    id: 'ym-pm-06', nta: '09.22.01.01016', name: 'Zahra Amelia', kwarran: 'Pancoran Mas', gudepId: 'gudep-01',
    isActive: true, youthGolongan: 'Penegak', isGaruda: false, currentTargetSku: 'Laksana', highestRatifiedTku: 'Bantara',
    skkInProgress: 2, skkCompleted: 8, periods: ['2026-s1', '2025-s2', '2025-s1']
  },
  // --- PANCORAN MAS: SDN Anyelir 1 (gudep-03) ---
  {
    id: 'ym-pm-07', nta: '09.22.01.09012', name: 'Rizky Al-Fatih', kwarran: 'Pancoran Mas', gudepId: 'gudep-03',
    isActive: true, youthGolongan: 'Siaga', isGaruda: false, currentTargetSku: 'Tata', highestRatifiedTku: 'Bantu',
    skkInProgress: 1, skkCompleted: 2, periods: ['2026-s1', '2025-s2']
  },
  {
    id: 'ym-pm-08', nta: '09.22.01.09015', name: 'Kania Safira', kwarran: 'Pancoran Mas', gudepId: 'gudep-03',
    isActive: true, youthGolongan: 'Siaga', isGaruda: false, currentTargetSku: 'Bantu', highestRatifiedTku: 'Mula',
    skkInProgress: 2, skkCompleted: 1, periods: ['2026-s1', '2025-s2', '2025-s1']
  },
  {
    id: 'ym-pm-09', nta: '09.22.01.09018', name: 'Rafi Al-Ghifari', kwarran: 'Pancoran Mas', gudepId: 'gudep-03',
    isActive: true, youthGolongan: 'Siaga', isGaruda: false, currentTargetSku: 'Mula', highestRatifiedTku: null,
    skkInProgress: 0, skkCompleted: 0, periods: ['2026-s1']
  },
  {
    id: 'ym-pm-10', nta: '09.22.01.09022', name: 'Alifa Khumaira', kwarran: 'Pancoran Mas', gudepId: 'gudep-03',
    isActive: true, youthGolongan: 'Siaga', isGaruda: true, currentTargetSku: 'Tanpa target', highestRatifiedTku: 'Tata',
    skkInProgress: 1, skkCompleted: 5, periods: ['2026-s1', '2025-s2']
  },
  // --- SUKMAJAYA: SMPN 2 Depok (gudep-02) ---
  {
    id: 'ym-sk-01', nta: '09.22.02.01289', name: 'Nabila Putri Azzahra', kwarran: 'Sukmajaya', gudepId: 'gudep-02',
    isActive: true, youthGolongan: 'Penggalang', isGaruda: true, currentTargetSku: 'Tanpa target', highestRatifiedTku: 'Terap',
    skkInProgress: 1, skkCompleted: 9, periods: ['2026-s1', '2025-s2', '2025-s1']
  },
  {
    id: 'ym-sk-02', nta: '09.22.02.01340', name: 'Ilham Firdaus', kwarran: 'Sukmajaya', gudepId: 'gudep-02',
    isActive: true, youthGolongan: 'Penggalang', isGaruda: false, currentTargetSku: 'Terap', highestRatifiedTku: 'Rakit',
    skkInProgress: 2, skkCompleted: 6, periods: ['2026-s1', '2025-s2']
  },
  {
    id: 'ym-sk-03', nta: '09.22.02.01412', name: 'Dewi Anggraini', kwarran: 'Sukmajaya', gudepId: 'gudep-02',
    isActive: true, youthGolongan: 'Penggalang', isGaruda: false, currentTargetSku: 'Rakit', highestRatifiedTku: 'Ramu',
    skkInProgress: 1, skkCompleted: 3, periods: ['2026-s1', '2025-s2', '2025-s1']
  },
  {
    id: 'ym-sk-04', nta: '09.22.02.01488', name: 'Rangga Danendra', kwarran: 'Sukmajaya', gudepId: 'gudep-02',
    isActive: true, youthGolongan: 'Penggalang', isGaruda: false, currentTargetSku: 'Ramu', highestRatifiedTku: null,
    skkInProgress: 1, skkCompleted: 1, periods: ['2026-s1']
  },
  // --- SUKMAJAYA: SMAN 2 Depok (gudep-04) ---
  {
    id: 'ym-sk-05', nta: '09.22.02.02010', name: 'Farhan Maulana', kwarran: 'Sukmajaya', gudepId: 'gudep-04',
    isActive: true, youthGolongan: 'Penegak', isGaruda: false, currentTargetSku: 'Bantara', highestRatifiedTku: null,
    skkInProgress: 2, skkCompleted: 3, periods: ['2026-s1', '2025-s2']
  },
  {
    id: 'ym-sk-06', nta: '09.22.02.02015', name: 'Aisyah Sabrina', kwarran: 'Sukmajaya', gudepId: 'gudep-04',
    isActive: true, youthGolongan: 'Penegak', isGaruda: false, currentTargetSku: 'Laksana', highestRatifiedTku: 'Bantara',
    skkInProgress: 1, skkCompleted: 5, periods: ['2026-s1', '2025-s2']
  },
  // --- BEJI: Racana Makara UI (gudep-06) ---
  {
    id: 'ym-bj-01', nta: '09.22.03.00084', name: 'Wahyu Trianto, S.Kom', kwarran: 'Beji', gudepId: 'gudep-06',
    isActive: true, youthGolongan: 'Pandega', isGaruda: true, currentTargetSku: 'Tanpa target', highestRatifiedTku: 'Pandega',
    skkInProgress: 2, skkCompleted: 11, periods: ['2026-s1', '2025-s2', '2025-s1']
  },
  {
    id: 'ym-bj-02', nta: '09.22.03.00112', name: 'Nurul Hidayah', kwarran: 'Beji', gudepId: 'gudep-06',
    isActive: true, youthGolongan: 'Pandega', isGaruda: false, currentTargetSku: 'Pandega', highestRatifiedTku: null,
    skkInProgress: 3, skkCompleted: 4, periods: ['2026-s1', '2025-s2']
  },
  {
    id: 'ym-bj-03', nta: '09.22.03.00115', name: 'Bayu Wicaksono', kwarran: 'Beji', gudepId: 'gudep-06',
    isActive: true, youthGolongan: 'Pandega', isGaruda: false, currentTargetSku: 'Tanpa target', highestRatifiedTku: 'Pandega',
    skkInProgress: 1, skkCompleted: 7, periods: ['2026-s1', '2025-s2']
  },
  // --- Small Gudep (gudep-small-01) for k-anonymity testing ---
  {
    id: 'ym-small-01', nta: '09.22.01.09901', name: 'Ahmad Santoso', kwarran: 'Pancoran Mas', gudepId: 'gudep-small-01',
    isActive: true, youthGolongan: 'Penegak', isGaruda: false, currentTargetSku: 'Bantara', highestRatifiedTku: null,
    skkInProgress: 0, skkCompleted: 1, periods: ['2026-s1', '2025-s2']
  },
  {
    id: 'ym-small-02', nta: '09.22.01.09902', name: 'Budi Raharjo', kwarran: 'Pancoran Mas', gudepId: 'gudep-small-01',
    isActive: true, youthGolongan: 'Penegak', isGaruda: false, currentTargetSku: 'Bantara', highestRatifiedTku: null,
    skkInProgress: 1, skkCompleted: 0, periods: ['2026-s1']
  }
];

export const SEED_PEMBINA_MEMBERS: SeedPembinaMember[] = [
  {
    id: 'pb-01', nta: '09.22.01.00015', name: 'Kak Suryono, S.Pd., M.Pd.', kwarran: 'Pancoran Mas', gudepId: 'gudep-01',
    isActive: true, courses: ['KMD', 'KML'], awards: ['Pancawarsa I', 'Pancawarsa II', 'Lencana Darma Bakti'],
    periods: ['2026-s1', '2025-s2', '2025-s1']
  },
  {
    id: 'pb-02', nta: '09.22.01.00022', name: 'Kak Joko Susilo, S.Pd.', kwarran: 'Pancoran Mas', gudepId: 'gudep-03',
    isActive: true, courses: ['KMD', 'KML'], awards: ['Pancawarsa I', 'Lencana Karya Bakti'],
    periods: ['2026-s1', '2025-s2']
  },
  {
    id: 'pb-03', nta: '09.22.02.00031', name: 'Kak Siti Nurhaliza, M.Pd.', kwarran: 'Sukmajaya', gudepId: 'gudep-02',
    isActive: true, courses: ['KMD', 'KML', 'KPD'], awards: ['Pancawarsa I', 'Pancawarsa II', 'Pancawarsa III', 'Lencana Darma Bakti'],
    periods: ['2026-s1', '2025-s2', '2025-s1']
  },
  {
    id: 'pb-04', nta: '09.22.02.00045', name: 'Kak Hendra Gunawan, S.Pd.', kwarran: 'Sukmajaya', gudepId: 'gudep-04',
    isActive: true, courses: ['KMD'], awards: ['Pancawarsa I'],
    periods: ['2026-s1', '2025-s2']
  },
  {
    id: 'pb-05', nta: '09.22.03.00050', name: 'Kak Dr. H. Mulyadi', kwarran: 'Beji', gudepId: 'gudep-06',
    isActive: true, courses: ['KMD', 'KML', 'KPD', 'KPL'], awards: ['Pancawarsa I', 'Pancawarsa II', 'Pancawarsa III', 'Pancawarsa IV', 'Pancawarsa V', 'Lencana Melati', 'Lencana Tunas Kencana'],
    periods: ['2026-s1', '2025-s2', '2025-s1']
  },
  {
    id: 'pb-06', nta: '09.22.00.00001', name: 'Kak Drs. Bambang Hermawan, M.Si.', kwarran: 'Pancoran Mas', gudepId: 'gudep-01',
    isActive: true, courses: ['KMD', 'KML', 'KPD', 'KPL'], awards: ['Pancawarsa I', 'Pancawarsa II', 'Pancawarsa III', 'Pancawarsa IV', 'Lencana Darma Bakti', 'Lencana Melati', 'Lencana Karya Bakti', 'Lencana Satyawira'],
    periods: ['2026-s1', '2025-s2', '2025-s1']
  },
  {
    id: 'pb-07', nta: '09.22.00.00007', name: 'Kak Endang Lestari, S.Pd., M.Si.', kwarran: 'Beji', gudepId: 'gudep-06',
    isActive: true, courses: ['KMD', 'KML', 'KPD', 'KPL'], awards: ['Pancawarsa I', 'Pancawarsa II', 'Pancawarsa III', 'Lencana Darma Bakti', 'Lencana Wiratama'],
    periods: ['2026-s1', '2025-s2', '2025-s1']
  },
  {
    id: 'pb-08', nta: '09.22.04.00088', name: 'Kak Rusdianto, S.Pd.', kwarran: 'Cimanggis', gudepId: 'gudep-08',
    isActive: true, courses: ['KMD'], awards: ['Pancawarsa I', 'Lencana Karya Bakti'],
    periods: ['2026-s1']
  }
];
