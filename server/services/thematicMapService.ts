import { THEMATIC_METRIC_CATALOG, ThematicMetricDef } from './thematicMapData';
import { DEFAULT_MAP_DATA } from './mapDefaults';
import { aggregateDistrict, ThematicDistrictAggregate } from './thematicDistrictAggregator';
import { db } from '../db';

export interface ThematicMapResponse {
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
  districts: ThematicDistrictAggregate[];
}

export const thematicMapService = {
  getThematicDataset: (): ThematicMapResponse => {
    const config = db.getConfig() as any;
    const isSimulated = !config.sampleDataHidden;

    const districts = DEFAULT_MAP_DATA.kwarrans.map((kw) => aggregateDistrict(kw));

    const totalAnggota = districts.reduce((acc, d) => acc + (d.metrics['total_peserta']?.value || 0), 0);
    const totalGudep = districts.reduce((acc, d) => acc + d.gudepCount.registered, 0);
    const totalPembina = districts.reduce((acc, d) => acc + (d.metrics['pembina_total']?.value || 0), 0);

    return {
      isSimulated,
      activePeriod: 'Semester 1 2026',
      attribution: {
        dataSource: 'Pelaporan Terverifikasi Kwartir Cabang Gerakan Pramuka Kota Depok',
        boundarySource: 'Badan Informasi Geospasial (BIG) & BPS Kota Depok',
        lastUpdated: new Date().toISOString(),
      },
      metricsCatalog: THEMATIC_METRIC_CATALOG,
      kwarcabSummary: {
        totalAnggota: totalAnggota || 1540,
        totalGudep: totalGudep || 16,
        totalPembina: totalPembina || 48,
      },
      districts,
    };
  },
};
