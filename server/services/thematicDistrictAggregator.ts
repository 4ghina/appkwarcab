import { SEED_GUDEPS } from '../data/infographicSeedData';
import { SEED_YOUTH_MEMBERS, SEED_PEMBINA_MEMBERS } from '../data/infographicMembers';
import { DEFAULT_MAP_DATA } from './mapDefaults';

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

export interface ThematicDistrictAggregate {
  id: string;
  name: string;
  kode: string;
  center: { lat: number; lng: number };
  gudepCount: { registered: number; active: number };
  metrics: Record<string, DistrictMetricResult>;
  gudeps: ThematicGudepSummary[];
}

function calculateYouthMetrics(kwarranName: string): Record<string, number> {
  const ym = SEED_YOUTH_MEMBERS.filter((m) => m.kwarran === kwarranName && m.isActive);
  return {
    total_peserta: ym.length,
    siaga_total: ym.filter((m) => m.youthGolongan === 'Siaga').length,
    siaga_garuda: ym.filter((m) => m.youthGolongan === 'Siaga' && m.isGaruda).length,
    penggalang_total: ym.filter((m) => m.youthGolongan === 'Penggalang').length,
    penggalang_garuda: ym.filter((m) => m.youthGolongan === 'Penggalang' && m.isGaruda).length,
    penegak_total: ym.filter((m) => m.youthGolongan === 'Penegak').length,
    penegak_bantara: ym.filter((m) => m.currentTargetSku === 'Bantara' || m.highestRatifiedTku === 'Bantara').length,
    penegak_laksana: ym.filter((m) => m.currentTargetSku === 'Laksana' || m.highestRatifiedTku === 'Laksana').length,
    penegak_garuda: ym.filter((m) => m.youthGolongan === 'Penegak' && m.isGaruda).length,
    pandega_total: ym.filter((m) => m.youthGolongan === 'Pandega').length,
    skk_pemegang: ym.filter((m) => (m.skkCompleted || 0) > 0).length,
    skk_disahkan: ym.reduce((acc, m) => acc + (m.skkCompleted || 0), 0),
  };
}

function calculatePembinaMetrics(kwarranName: string): Record<string, number> {
  const pm = SEED_PEMBINA_MEMBERS.filter((m) => m.kwarran === kwarranName && m.isActive);
  return {
    pembina_total: pm.length,
    pembina_kmd: pm.filter((m) => m.courses.includes('KMD')).length,
    pembina_kml: pm.filter((m) => m.courses.includes('KML')).length,
    pembina_pelatih: pm.filter((m) => m.courses.includes('KPD') || m.courses.includes('KPL')).length,
    pembina_penghargaan: pm.reduce((acc, m) => acc + (m.awards?.length || 0), 0),
  };
}

function calculateGudepMetrics(kwarranName: string): { counts: Record<string, number>; list: ThematicGudepSummary[] } {
  const sg = SEED_GUDEPS.filter((g) => g.kwarran === kwarranName);
  const mg = DEFAULT_MAP_DATA.gudeps.filter((g) => g.kwarranName === kwarranName);
  const list: ThematicGudepSummary[] = sg.map((g) => {
    const match = mg.find((m) => m.id === g.id || m.pangkalan.toLowerCase() === g.pangkalan.toLowerCase());
    return {
      id: g.id,
      nomor: g.nomor,
      pangkalan: g.pangkalan,
      kwarranName: g.kwarran,
      jenjang: match?.jenjang || (g.pangkalan.includes('SMA') || g.pangkalan.includes('SMK') ? 'SMA/SMK' : g.pangkalan.includes('SMP') ? 'SMP/MTs' : g.pangkalan.includes('SD') ? 'SD/MI' : 'Perguruan Tinggi'),
      pembina: match?.pembina || 'Kak Pembina Satuan',
      alamat: match?.alamat || 'Kota Depok',
      isActive: g.isActive,
      coordinates: match?.koordinat || null,
      totalAnggota: (match?.jumlahAnggota?.siaga || 0) + (match?.jumlahAnggota?.penggalang || 0) + (match?.jumlahAnggota?.penegak || 0) + (match?.jumlahAnggota?.pandega || 0) || 45,
    };
  });

  return {
    counts: {
      gudep_total: sg.length,
      gudep_aktif: sg.filter((g) => g.isActive).length,
      gudep_sd: list.filter((g) => g.jenjang.includes('SD')).length,
      gudep_smp: list.filter((g) => g.jenjang.includes('SMP')).length,
      gudep_sma: list.filter((g) => g.jenjang.includes('SMA') || g.jenjang.includes('SMK')).length,
      gudep_pt: list.filter((g) => !g.jenjang.includes('SD') && !g.jenjang.includes('SMP') && !g.jenjang.includes('SMA')).length,
    },
    list,
  };
}

export function aggregateDistrict(kwarran: (typeof DEFAULT_MAP_DATA.kwarrans)[0]): ThematicDistrictAggregate {
  const kwName = kwarran.kecamatan;
  const ym = calculateYouthMetrics(kwName);
  const pm = calculatePembinaMetrics(kwName);
  const gm = calculateGudepMetrics(kwName);

  const rawValues: Record<string, number> = { ...ym, ...pm, ...gm.counts };
  const metrics: Record<string, DistrictMetricResult> = {};

  Object.entries(rawValues).forEach(([k, val]) => {
    metrics[k] = {
      value: val,
      status: val > 0 ? 'verified' : gm.counts.gudep_total === 0 ? 'unreported' : 'empty',
    };
  });

  return {
    id: kwarran.id,
    name: kwarran.kecamatan,
    kode: kwarran.kode,
    center: kwarran.center,
    gudepCount: { registered: gm.counts.gudep_total, active: gm.counts.gudep_aktif },
    metrics,
    gudeps: gm.list,
  };
}
