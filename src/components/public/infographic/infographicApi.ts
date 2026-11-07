import { InfographicData, InfographicFilterOptions, InfographicPeriodId } from '../../../types/infographic';

export async function fetchInfographicOptions(): Promise<InfographicFilterOptions> {
  try {
    const res = await fetch('/api/public/infographic-options');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('[InfographicAPI] Failed to fetch filter options, using defaults', err);
    return {
      kwarcab: { id: '09.22', name: 'Kwartir Cabang Kota Depok' },
      kwarrans: ['Beji', 'Bojongsari', 'Cilodong', 'Cimanggis', 'Cinere', 'Cipayung', 'Limo', 'Pancoran Mas', 'Sawangan', 'Sukmajaya', 'Tapos'],
      gudeps: [
        { id: 'gudep-01', nomor: '01.001 - 01.002', pangkalan: 'SMA Negeri 1 Depok', kwarran: 'Pancoran Mas', isActive: true },
        { id: 'gudep-03', nomor: '01.011 - 01.012', pangkalan: 'SD Negeri Anyelir 1 Depok', kwarran: 'Pancoran Mas', isActive: true },
        { id: 'gudep-02', nomor: '02.015 - 02.016', pangkalan: 'SMP Negeri 2 Depok', kwarran: 'Sukmajaya', isActive: true },
        { id: 'gudep-04', nomor: '02.021 - 02.022', pangkalan: 'SMA Negeri 2 Depok', kwarran: 'Sukmajaya', isActive: true },
        { id: 'gudep-06', nomor: '03.001 - 03.002', pangkalan: 'Racana Makara UI Depok', kwarran: 'Beji', isActive: true },
        { id: 'gudep-05', nomor: '04.011 - 04.012', pangkalan: 'SMP Negeri 4 Depok', kwarran: 'Cimanggis', isActive: false }
      ],
      periods: [
        { id: '2026-s1', label: 'Tahun 2026 (Semester 1)' },
        { id: '2025-s2', label: 'Tahun 2025 (Semester 2)' },
        { id: '2025-s1', label: 'Tahun 2025 (Semester 1)' },
        { id: 'all', label: 'Semua Periode (Kumulatif)' }
      ]
    };
  }
}

export async function fetchInfographicStats(
  kwarcab = '09.22',
  kwarran = 'all',
  gudepId = 'all',
  period: InfographicPeriodId = '2026-s1'
): Promise<InfographicData> {
  const params = new URLSearchParams({ kwarcab, kwarran, gudepId, period });
  const res = await fetch(`/api/public/infographic-stats?${params.toString()}`);
  if (!res.ok) {
    throw new Error(`Failed to load stats: HTTP ${res.status}`);
  }
  return await res.json();
}
