import React from 'react';
import { UserProfile } from '../../types/scout';
import { DEPOK_KWARRAN_STATS } from './analyticsData';
import { PembinaPersonalView } from './PembinaPersonalView';
import { PembinaKwarranView } from './PembinaKwarranView';
import { PembinaKwarcabView } from './PembinaKwarcabView';

interface PembinaAnalyticsPanelProps {
  level: 'pembina' | 'kwarran' | 'kwarcab';
  user?: UserProfile;
  selectedKwarran: string;
  onOpenPusdiklat?(): void;
}

export const PembinaAnalyticsPanel: React.FC<PembinaAnalyticsPanelProps> = ({
  level,
  selectedKwarran,
}) => {
  const kwarranData = DEPOK_KWARRAN_STATS.find(
    (k) => k.name.toLowerCase() === selectedKwarran.toLowerCase()
  ) || DEPOK_KWARRAN_STATS[0];

  if (level === 'pembina') {
    return <PembinaPersonalView />;
  }

  if (level === 'kwarran') {
    return <PembinaKwarranView kwarranData={kwarranData} />;
  }

  return <PembinaKwarcabView />;
};
