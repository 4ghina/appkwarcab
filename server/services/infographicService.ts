import {
  InfographicFilterQuery,
  InfographicAggregateResponse,
  YouthDetailsStats,
  PembinaDetailsStats,
  ChartBarItem
} from '../types/infographicTypes';
import { SEED_GUDEPS, ALL_PERIODS } from '../data/infographicSeedData';
import { SEED_YOUTH_MEMBERS, SEED_PEMBINA_MEMBERS } from '../data/infographicMembers';
import { db } from '../db';

const SKU_LEVELS_BY_GOLONGAN: Record<string, { targets: string[]; capaian: string[] }> = {
  Siaga: {
    targets: ['Mula', 'Bantu', 'Tata', 'Tanpa target'],
    capaian: ['Belum memiliki TKU', 'Mula', 'Bantu', 'Tata', 'Garuda']
  },
  Penggalang: {
    targets: ['Ramu', 'Rakit', 'Terap', 'Tanpa target'],
    capaian: ['Belum memiliki TKU', 'Ramu', 'Rakit', 'Terap', 'Garuda']
  },
  Penegak: {
    targets: ['Bantara', 'Laksana', 'Tanpa target'],
    capaian: ['Belum memiliki TKU', 'Bantara', 'Laksana', 'Garuda']
  },
  Pandega: {
    targets: ['Pandega', 'Tanpa target'],
    capaian: ['Belum memiliki TKU', 'Pandega', 'Garuda']
  }
};

const PEMBINA_COURSES = ['KMD', 'KML', 'KPD', 'KPL'] as const;
const PEMBINA_AWARDS = [
  'Pancawarsa I', 'Pancawarsa II', 'Pancawarsa III', 'Pancawarsa IV', 'Pancawarsa V',
  'Lencana Darma Bakti', 'Lencana Melati', 'Lencana Tunas Kencana',
  'Lencana Karya Bakti', 'Lencana Wiratama', 'Lencana Satyawira'
];

function checkReportingAvailability(gudepId?: string, period = '2026-s1') {
  if (!gudepId || gudepId === 'all') return true;
  const target = SEED_GUDEPS.find(g => g.id === gudepId);
  if (!target) return true;
  if (!target.isActive) return false;
  return target.hasReporting[period] ?? false;
}

function isSampleHidden(): boolean {
  const config = db.getConfig() as any;
  return Boolean(config.sampleDataHidden);
}

function filterYouthList(query: InfographicFilterQuery) {
  if (isSampleHidden()) return [];
  const period = query.period || '2026-s1';
  return SEED_YOUTH_MEMBERS.filter(m => {
    if (!m.isActive) return false;
    if (period !== 'all' && !m.periods.includes(period)) return false;
    if (query.kwarran && query.kwarran !== 'all' && m.kwarran !== query.kwarran) return false;
    if (query.gudepId && query.gudepId !== 'all' && m.gudepId !== query.gudepId) return false;
    return true;
  });
}

function filterPembinaList(query: InfographicFilterQuery) {
  if (isSampleHidden()) return [];
  const period = query.period || '2026-s1';
  return SEED_PEMBINA_MEMBERS.filter(m => {
    if (!m.isActive) return false;
    if (period !== 'all' && !m.periods.includes(period)) return false;
    if (query.kwarran && query.kwarran !== 'all' && m.kwarran !== query.kwarran) return false;
    if (query.gudepId && query.gudepId !== 'all' && m.gudepId !== query.gudepId) return false;
    return true;
  });
}

function buildTargetBars(golonganMembers: any[], targets: string[], isSmall: boolean): ChartBarItem[] {
  return targets.map(level => {
    const count = golonganMembers.filter(m => m.currentTargetSku === level).length;
    return {
      id: `target-${level.toLowerCase().replace(/\s+/g, '-')}`,
      label: level,
      count,
      displayValue: isSmall && count > 0 && count < 3 ? '< 3' : String(count),
      isProtected: isSmall && count > 0 && count < 3
    };
  });
}

function buildCapaianBars(golonganMembers: any[], capaianLevels: string[], isSmall: boolean): ChartBarItem[] {
  return capaianLevels.map(level => {
    let count = 0;
    if (level === 'Garuda') {
      count = golonganMembers.filter(m => m.isGaruda === true).length;
    } else if (level === 'Belum memiliki TKU') {
      count = golonganMembers.filter(m => !m.isGaruda && !m.highestRatifiedTku).length;
    } else {
      count = golonganMembers.filter(m => !m.isGaruda && m.highestRatifiedTku === level).length;
    }
    return {
      id: `capaian-${level.toLowerCase().replace(/\s+/g, '-')}`,
      label: level,
      count,
      displayValue: isSmall && count > 0 && count < 3 ? '< 3' : String(count),
      isProtected: isSmall && count > 0 && count < 3
    };
  });
}

function buildYouthDetails(youthList: any[], golongan: 'Siaga' | 'Penggalang' | 'Penegak' | 'Pandega', isSmall: boolean): YouthDetailsStats {
  const members = youthList.filter(m => m.youthGolongan === golongan);
  const cfg = SKU_LEVELS_BY_GOLONGAN[golongan];
  const targetBars = buildTargetBars(members, cfg.targets, isSmall);
  const capaianBars = buildCapaianBars(members, cfg.capaian, isSmall);
  const totalInProgress = members.reduce((acc, m) => acc + (m.skkInProgress || 0), 0);
  const totalCompleted = members.reduce((acc, m) => acc + (m.skkCompleted || 0), 0);

  return {
    targetSku: targetBars,
    capaianTku: capaianBars,
    statusSkk: {
      dalamProses: totalInProgress,
      sudahTerpenuhi: totalCompleted,
      catatan: 'Satu peserta didik dapat memiliki beberapa catatan SKK.',
      items: [
        { id: 'skk-inprogress', label: 'Dalam Proses', count: totalInProgress, displayValue: String(totalInProgress) },
        { id: 'skk-completed', label: 'Sudah Terpenuhi', count: totalCompleted, displayValue: String(totalCompleted) }
      ]
    }
  };
}

function buildPembinaDetails(pembinaList: any[], isSmall: boolean): PembinaDetailsStats {
  const kursusBars: ChartBarItem[] = PEMBINA_COURSES.map(course => {
    const count = pembinaList.filter(p => p.courses.includes(course)).length;
    return {
      id: `course-${course.toLowerCase()}`,
      label: course,
      count,
      displayValue: isSmall && count > 0 && count < 3 ? '< 3' : String(count),
      isProtected: isSmall && count > 0 && count < 3
    };
  });

  const penghargaanBars: ChartBarItem[] = PEMBINA_AWARDS.map(award => {
    const count = pembinaList.filter(p => p.awards.includes(award)).length;
    return {
      id: `award-${award.toLowerCase().replace(/\s+/g, '-')}`,
      label: award,
      count,
      displayValue: isSmall && count > 0 && count < 3 ? '< 3' : String(count),
      isProtected: isSmall && count > 0 && count < 3
    };
  });

  return {
    kursus: kursusBars,
    penghargaan: penghargaanBars,
    catatan: 'Penjumlahan kategori dapat melebihi total Pembina aktif karena seorang pembina dapat memiliki lebih dari satu sertifikat kursus atau tanda penghargaan.'
  };
}

function formatPeriodLabel(period: string) {
  const found = ALL_PERIODS.find(p => p.id === period);
  return found ? found.label : 'Tahun 2026 (Semester 1)';
}

function createUnavailableResponse(query: InfographicFilterQuery, period: string, periodLabel: string, selectedGudep: any, isDemo: boolean): InfographicAggregateResponse {
  return {
    metadata: {
      kwarcab: 'Kwartir Cabang Kota Depok (09.22)',
      kwarran: query.kwarran && query.kwarran !== 'all' ? query.kwarran : 'Semua Kwarran',
      gudepId: query.gudepId || 'all',
      gudepName: selectedGudep?.pangkalan || 'Semua Gudep',
      period: period as any,
      periodLabel,
      updatedAt: new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }),
      isDemoMode: isDemo,
      dataStatus: 'unavailable',
      statusMessage: 'Data belum tersedia untuk periode pelaporan yang dipilih. Gudep belum melakukan her-registrasi atau penyetoran berkas tahunan.'
    },
    summary: { pesertaDidikAktif: null, pembinaAktif: null, gudepAktif: null },
    youthComposition: { siaga: 0, penggalang: 0, penegak: 0, pandega: 0, total: 0 },
    youthDetails: {
      siaga: { targetSku: [], capaianTku: [], statusSkk: { dalamProses: null, sudahTerpenuhi: null, catatan: '', items: [] } },
      penggalang: { targetSku: [], capaianTku: [], statusSkk: { dalamProses: null, sudahTerpenuhi: null, catatan: '', items: [] } },
      penegak: { targetSku: [], capaianTku: [], statusSkk: { dalamProses: null, sudahTerpenuhi: null, catatan: '', items: [] } },
      pandega: { targetSku: [], capaianTku: [], statusSkk: { dalamProses: null, sudahTerpenuhi: null, catatan: '', items: [] } }
    },
    pembinaDetails: { kursus: [], penghargaan: [], catatan: '' }
  };
}

function createAvailableResponse(
  query: InfographicFilterQuery,
  period: string,
  periodLabel: string,
  selectedGudep: any,
  isDemo: boolean
): InfographicAggregateResponse {
  const youthList = filterYouthList(query);
  const pembinaList = filterPembinaList(query);
  const activeGudeps = isSampleHidden() ? [] : SEED_GUDEPS.filter(g => {
    if (!g.isActive) return false;
    if (query.kwarran && query.kwarran !== 'all' && g.kwarran !== query.kwarran) return false;
    if (query.gudepId && query.gudepId !== 'all' && g.id !== query.gudepId) return false;
    return true;
  });

  const isSmall = Boolean(query.gudepId && query.gudepId !== 'all' && (youthList.length < 3 || pembinaList.length < 3));
  const privacyMsg = isSmall ? 'Berdasarkan prinsip perlindungan privasi data publik, rincian dengan jumlah sangat kecil ditampilkan terlindungi (< 3).' : undefined;

  return {
    metadata: {
      kwarcab: 'Kwartir Cabang Kota Depok (09.22)',
      kwarran: query.kwarran && query.kwarran !== 'all' ? query.kwarran : 'Semua Kwarran',
      gudepId: query.gudepId || 'all',
      gudepName: selectedGudep?.pangkalan || 'Semua Gudep',
      period: period as any, periodLabel,
      updatedAt: new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }),
      isDemoMode: isDemo, dataStatus: 'available', statusMessage: privacyMsg
    },
    summary: { pesertaDidikAktif: youthList.length, pembinaAktif: pembinaList.length, gudepAktif: activeGudeps.length },
    youthComposition: {
      siaga: youthList.filter(m => m.youthGolongan === 'Siaga').length,
      penggalang: youthList.filter(m => m.youthGolongan === 'Penggalang').length,
      penegak: youthList.filter(m => m.youthGolongan === 'Penegak').length,
      pandega: youthList.filter(m => m.youthGolongan === 'Pandega').length,
      total: youthList.length
    },
    youthDetails: {
      siaga: buildYouthDetails(youthList, 'Siaga', isSmall),
      penggalang: buildYouthDetails(youthList, 'Penggalang', isSmall),
      penegak: buildYouthDetails(youthList, 'Penegak', isSmall),
      pandega: buildYouthDetails(youthList, 'Pandega', isSmall)
    },
    pembinaDetails: buildPembinaDetails(pembinaList, isSmall)
  };
}

export function getInfographicStats(query: InfographicFilterQuery): InfographicAggregateResponse {
  const period = query.period || '2026-s1';
  const periodLabel = formatPeriodLabel(period);
  const isAvailable = checkReportingAvailability(query.gudepId, period);
  const isDemo = Boolean(db.getConfig().isDemoMode);
  const selectedGudep = SEED_GUDEPS.find(g => g.id === query.gudepId);

  if (!isAvailable) {
    return createUnavailableResponse(query, period, periodLabel, selectedGudep, isDemo);
  }
  return createAvailableResponse(query, period, periodLabel, selectedGudep, isDemo);
}

