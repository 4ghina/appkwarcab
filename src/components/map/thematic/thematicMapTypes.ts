export type ThematicCategory = 'peserta_didik' | 'pembina' | 'gudep';
export type ThematicViewMode = 'thematic' | 'google_maps';

export interface ThematicMetricDef {
  id: string;
  category: ThematicCategory;
  label: string;
  unit: string;
  description: string;
  colorScheme: 'amber' | 'emerald' | 'blue' | 'purple' | 'rose';
  notes?: string;
}

export interface DistrictMetricResult {
  value: number;
  status: 'verified' | 'unreported' | 'empty';
  note?: string;
}

export interface ThematicGudepSummary {
  id: string;
  nomor: string;
  pangkalan: string;
  kwarranName: string;
  jenjang: string;
  pembina: string;
  alamat: string;
  isActive: boolean;
  coordinates: { lat: number; lng: number } | null;
  totalAnggota: number;
}

export interface ThematicDistrict {
  id: string;
  name: string;
  kode: string;
  center: { lat: number; lng: number };
  gudepCount: { registered: number; active: number };
  metrics: Record<string, DistrictMetricResult>;
  gudeps: ThematicGudepSummary[];
}

export interface ThematicMapDataset {
  isSimulated: boolean;
  activePeriod: string;
  attribution: {
    dataSource: string;
    boundarySource: string;
    lastUpdated: string;
  };
  metricsCatalog: ThematicMetricDef[];
  kwarcabSummary: {
    totalAnggota: number;
    totalGudep: number;
    totalPembina: number;
  };
  districts: ThematicDistrict[];
}
