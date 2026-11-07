export interface KwarranStat {
  name: string;
  gudepCount: number;
  studentsCount: number;
  pembinaCount: number;
  shbActive: number;
  garudaCount: number;
  akreditasiA: number;
}

export const DEPOK_KWARRAN_STATS: KwarranStat[] = [
  { name: 'Pancoran Mas', gudepCount: 42, studentsCount: 4120, pembinaCount: 210, shbActive: 178, garudaCount: 46, akreditasiA: 20 },
  { name: 'Sukmajaya', gudepCount: 48, studentsCount: 4650, pembinaCount: 235, shbActive: 198, garudaCount: 52, akreditasiA: 24 },
  { name: 'Beji', gudepCount: 32, studentsCount: 3200, pembinaCount: 165, shbActive: 142, garudaCount: 38, akreditasiA: 16 },
  { name: 'Cimanggis', gudepCount: 45, studentsCount: 4280, pembinaCount: 220, shbActive: 185, garudaCount: 44, akreditasiA: 22 },
  { name: 'Sawangan', gudepCount: 36, studentsCount: 3400, pembinaCount: 175, shbActive: 140, garudaCount: 31, akreditasiA: 15 },
  { name: 'Tapos', gudepCount: 38, studentsCount: 3620, pembinaCount: 180, shbActive: 145, garudaCount: 34, akreditasiA: 16 },
  { name: 'Cilodong', gudepCount: 28, studentsCount: 2750, pembinaCount: 140, shbActive: 115, garudaCount: 26, akreditasiA: 12 },
  { name: 'Cinere', gudepCount: 20, studentsCount: 1980, pembinaCount: 105, shbActive: 88, garudaCount: 22, akreditasiA: 10 },
  { name: 'Cipayung', gudepCount: 24, studentsCount: 2320, pembinaCount: 118, shbActive: 94, garudaCount: 21, akreditasiA: 9 },
  { name: 'Bojongsari', gudepCount: 22, studentsCount: 2150, pembinaCount: 110, shbActive: 89, garudaCount: 18, akreditasiA: 8 },
  { name: 'Limo', gudepCount: 18, studentsCount: 1820, pembinaCount: 92, shbActive: 76, garudaCount: 16, akreditasiA: 7 },
];

export const PUSDIKLAT_GRADUATES = [
  { year: '2023', kmd: 180, kml: 65, kpd: 12 },
  { year: '2024', kmd: 210, kml: 82, kpd: 15 },
  { year: '2025', kmd: 245, kml: 94, kpd: 18 },
  { year: '2026 (Berjalan)', kmd: 120, kml: 45, kpd: 6 },
];
