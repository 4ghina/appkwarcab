export type InfographicPeriodId = '2026-s1' | '2025-s2' | '2025-s1' | 'all';

export type GolonganTab = 'Siaga' | 'Penggalang' | 'Penegak' | 'Pandega' | 'Pembina';

export interface InfographicBarItem {
  id: string;
  label: string;
  count: number | null;
  displayValue?: string;
  isProtected?: boolean;
}

export interface InfographicYouthDetails {
  targetSku: InfographicBarItem[];
  capaianTku: InfographicBarItem[];
  statusSkk: {
    dalamProses: number | null;
    sudahTerpenuhi: number | null;
    items: InfographicBarItem[];
    catatan: string;
  };
}

export interface InfographicPembinaDetails {
  kursus: InfographicBarItem[];
  penghargaan: InfographicBarItem[];
  catatan: string;
}

export interface InfographicData {
  metadata: {
    kwarcab: string;
    kwarran: string;
    gudepId: string;
    gudepName: string;
    period: InfographicPeriodId;
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
  youthComposition: {
    siaga: number;
    penggalang: number;
    penegak: number;
    pandega: number;
    total: number;
  };
  youthDetails: {
    siaga: InfographicYouthDetails;
    penggalang: InfographicYouthDetails;
    penegak: InfographicYouthDetails;
    pandega: InfographicYouthDetails;
  };
  pembinaDetails: InfographicPembinaDetails;
}

export interface InfographicFilterOptions {
  kwarcab: { id: string; name: string };
  kwarrans: string[];
  gudeps: Array<{
    id: string;
    nomor: string;
    pangkalan: string;
    kwarran: string;
    isActive: boolean;
  }>;
  periods: Array<{ id: InfographicPeriodId; label: string }>;
}
