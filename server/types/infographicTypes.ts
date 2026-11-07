export type PeriodId = '2026-s1' | '2025-s2' | '2025-s1' | 'all';

export interface InfographicFilterQuery {
  kwarcab?: string;
  kwarran?: string;
  gudepId?: string;
  period?: PeriodId;
}

export interface YouthGolonganCount {
  siaga: number;
  penggalang: number;
  penegak: number;
  pandega: number;
  total: number;
}

export interface ChartBarItem {
  id: string;
  label: string;
  count: number | null; // null represents "Data belum tersedia"
  displayValue?: string; // e.g. "42", "< 3", or "Belum tersedia"
  isProtected?: boolean; // privacy masked
  color?: string;
}

export interface YouthDetailsStats {
  targetSku: ChartBarItem[];
  capaianTku: ChartBarItem[];
  statusSkk: {
    dalamProses: number | null;
    sudahTerpenuhi: number | null;
    items: ChartBarItem[];
    catatan: string;
  };
}

export interface PembinaDetailsStats {
  kursus: ChartBarItem[];
  penghargaan: ChartBarItem[];
  catatan: string;
}

export interface InfographicAggregateResponse {
  metadata: {
    kwarcab: string;
    kwarran: string;
    gudepId: string;
    gudepName: string;
    period: PeriodId;
    periodLabel: string;
    updatedAt: string;
    isDemoMode: boolean;
    dataStatus: 'available' | 'unavailable';
    statusMessage?: string;
  };
  summary: {
    pesertaDidikAktif: number | null;
    pembinaAktif: number | null;
    gudepAktif: number | null;
  };
  youthComposition: YouthGolonganCount;
  youthDetails: {
    siaga: YouthDetailsStats;
    penggalang: YouthDetailsStats;
    penegak: YouthDetailsStats;
    pandega: YouthDetailsStats;
  };
  pembinaDetails: PembinaDetailsStats;
}
