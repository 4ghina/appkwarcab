import React from 'react';
import { GudepData } from '../../types/scout';
import { DEPOK_KWARRAN_STATS } from './analyticsData';
import { GudepPembinaLevelView } from './GudepPembinaLevelView';
import { GudepKwarranLevelView } from './GudepKwarranLevelView';
import { GudepKwarcabLevelView } from './GudepKwarcabLevelView';

interface GudepAnalyticsPanelProps {
  level: 'pembina' | 'kwarran' | 'kwarcab';
  gudepList: GudepData[];
  selectedKwarran: string;
  onOpenGudepMap?: () => void;
}

const DEFAULT_GUDEP: GudepData = {
  id: 'gudep-01',
  nomorPa: '01.001',
  nomorPi: '01.002',
  pangkalan: 'SMA Negeri 1 Depok',
  status: 'Aktif',
  akreditasi: 'A',
  terakhirHerRegistrasi: 'Januari 2026',
  jumlahAnggota: { siaga: 0, penggalang: 0, penegak: 124, pandega: 0 },
  kwarran: 'Pancoran Mas',
  alamat: 'Depok',
  pembina: 'Kak Pembina Satuan',
  kontakWa: '0812-3456-7890',
  mabigus: 'Kak Gudep',
  telepon: '-'
};

export const GudepAnalyticsPanel: React.FC<GudepAnalyticsPanelProps> = ({
  level,
  gudepList,
  selectedKwarran,
  onOpenGudepMap,
}) => {
  const kwarranData = DEPOK_KWARRAN_STATS.find(
    (k) => k.name.toLowerCase() === selectedKwarran.toLowerCase()
  ) || DEPOK_KWARRAN_STATS[0];

  const myGudep = gudepList[0] || DEFAULT_GUDEP;

  if (level === 'pembina') {
    return <GudepPembinaLevelView myGudep={myGudep} />;
  }

  if (level === 'kwarran') {
    return <GudepKwarranLevelView kwarranData={kwarranData} onOpenGudepMap={onOpenGudepMap} />;
  }

  return <GudepKwarcabLevelView />;
};
