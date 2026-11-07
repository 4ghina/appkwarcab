export interface SeedYouthMember {
  id: string;
  nta: string;
  name: string;
  kwarran: string;
  gudepId: string;
  isActive: boolean;
  youthGolongan: 'Siaga' | 'Penggalang' | 'Penegak' | 'Pandega';
  isGaruda: boolean;
  currentTargetSku: string;
  highestRatifiedTku: string | null;
  skkInProgress: number;
  skkCompleted: number;
  periods: string[];
}

export interface SeedPembinaMember {
  id: string;
  nta: string;
  name: string;
  kwarran: string;
  gudepId: string;
  isActive: boolean;
  courses: ('KMD' | 'KML' | 'KPD' | 'KPL')[];
  awards: string[];
  periods: string[];
}

export interface SeedGudepRecord {
  id: string;
  nomor: string;
  pangkalan: string;
  kwarran: string;
  isActive: boolean;
  hasReporting: { [period: string]: boolean };
}

export const SEED_GUDEPS: SeedGudepRecord[] = [
  { id: 'gudep-01', nomor: '01.001 - 01.002', pangkalan: 'SMA Negeri 1 Depok', kwarran: 'Pancoran Mas', isActive: true, hasReporting: { '2026-s1': true, '2025-s2': true, '2025-s1': true } },
  { id: 'gudep-03', nomor: '01.011 - 01.012', pangkalan: 'SD Negeri Anyelir 1 Depok', kwarran: 'Pancoran Mas', isActive: true, hasReporting: { '2026-s1': true, '2025-s2': true, '2025-s1': true } },
  { id: 'gudep-02', nomor: '02.015 - 02.016', pangkalan: 'SMP Negeri 2 Depok', kwarran: 'Sukmajaya', isActive: true, hasReporting: { '2026-s1': true, '2025-s2': true, '2025-s1': true } },
  { id: 'gudep-04', nomor: '02.021 - 02.022', pangkalan: 'SMA Negeri 2 Depok', kwarran: 'Sukmajaya', isActive: true, hasReporting: { '2026-s1': true, '2025-s2': true, '2025-s1': true } },
  { id: 'gudep-06', nomor: '03.001 - 03.002', pangkalan: 'Racana Makara UI Depok', kwarran: 'Beji', isActive: true, hasReporting: { '2026-s1': true, '2025-s2': true, '2025-s1': true } },
  { id: 'gudep-07', nomor: '03.005 - 03.006', pangkalan: 'SMP Negeri 5 Depok', kwarran: 'Beji', isActive: true, hasReporting: { '2026-s1': true, '2025-s2': true, '2025-s1': true } },
  { id: 'gudep-05', nomor: '04.011 - 04.012', pangkalan: 'SMP Negeri 4 Depok', kwarran: 'Cimanggis', isActive: false, hasReporting: { '2026-s1': false, '2025-s2': false, '2025-s1': false } },
  { id: 'gudep-08', nomor: '04.025 - 04.026', pangkalan: 'SMA Negeri 13 Depok', kwarran: 'Cimanggis', isActive: true, hasReporting: { '2026-s1': true, '2025-s2': true, '2025-s1': true } },
  { id: 'gudep-09', nomor: '05.001 - 05.002', pangkalan: 'SMP Negeri 10 Depok', kwarran: 'Sawangan', isActive: true, hasReporting: { '2026-s1': true, '2025-s2': true, '2025-s1': true } },
  { id: 'gudep-10', nomor: '06.003 - 06.004', pangkalan: 'SMA Negeri 4 Depok', kwarran: 'Tapos', isActive: true, hasReporting: { '2026-s1': true, '2025-s2': true, '2025-s1': true } },
  { id: 'gudep-11', nomor: '07.001 - 07.002', pangkalan: 'SD Negeri Kalimulya 1', kwarran: 'Cilodong', isActive: true, hasReporting: { '2026-s1': true, '2025-s2': true, '2025-s1': true } },
  { id: 'gudep-12', nomor: '08.005 - 08.006', pangkalan: 'SMP Negeri 9 Depok', kwarran: 'Cinere', isActive: true, hasReporting: { '2026-s1': true, '2025-s2': true, '2025-s1': true } },
  { id: 'gudep-13', nomor: '09.001 - 09.002', pangkalan: 'SMA Negeri 9 Depok', kwarran: 'Cipayung', isActive: true, hasReporting: { '2026-s1': true, '2025-s2': true, '2025-s1': true } },
  { id: 'gudep-14', nomor: '10.003 - 10.004', pangkalan: 'SMP Negeri 14 Depok', kwarran: 'Bojongsari', isActive: true, hasReporting: { '2026-s1': true, '2025-s2': true, '2025-s1': true } },
  { id: 'gudep-15', nomor: '11.001 - 11.002', pangkalan: 'SD Negeri Limo 1', kwarran: 'Limo', isActive: true, hasReporting: { '2026-s1': true, '2025-s2': true, '2025-s1': true } },
  // Small sample gudep for testing privacy & k-anonymity publication rule
  { id: 'gudep-small-01', nomor: '01.099 - 01.100', pangkalan: 'PKBM Mandiri Pancoran Mas', kwarran: 'Pancoran Mas', isActive: true, hasReporting: { '2026-s1': true, '2025-s2': true, '2025-s1': true } }
];

export const ALL_PERIODS = [
  { id: '2026-s1', label: 'Tahun 2026 (Semester 1)' },
  { id: '2025-s2', label: 'Tahun 2025 (Semester 2)' },
  { id: '2025-s1', label: 'Tahun 2025 (Semester 1)' },
  { id: 'all', label: 'Semua Periode (Kumulatif)' }
];
