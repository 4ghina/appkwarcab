import React from 'react';
import { BinaanStudent } from '../../types/scout';
import { DEPOK_KWARRAN_STATS } from './analyticsData';
import { YouthPembinaLevelView } from './YouthPembinaLevelView';
import { YouthKwarranLevelView } from './YouthKwarranLevelView';
import { YouthKwarcabLevelView } from './YouthKwarcabLevelView';

interface YouthAnalyticsPanelProps {
  level: 'pembina' | 'kwarran' | 'kwarcab';
  binaanStudents: BinaanStudent[];
  selectedKwarran: string;
  onOpenPembinaan?: () => void;
}

export const YouthAnalyticsPanel: React.FC<YouthAnalyticsPanelProps> = ({
  level,
  binaanStudents,
  selectedKwarran,
  onOpenPembinaan,
}) => {
  const kwarranData = DEPOK_KWARRAN_STATS.find(
    (k) => k.name.toLowerCase() === selectedKwarran.toLowerCase()
  ) || DEPOK_KWARRAN_STATS[0];

  const totalPointsPassed = binaanStudents.reduce((acc, s) => acc + (s.skuPassed || 0), 0);
  const totalPointsTarget = binaanStudents.reduce((acc, s) => acc + (s.skuTotal || 23), 0) || 1;
  const overallSkuPercent = Math.round((totalPointsPassed / totalPointsTarget) * 100);

  if (level === 'pembina') {
    return (
      <YouthPembinaLevelView
        binaanStudents={binaanStudents}
        overallSkuPercent={overallSkuPercent}
        onOpenPembinaan={onOpenPembinaan}
      />
    );
  }

  if (level === 'kwarran') {
    return <YouthKwarranLevelView kwarranData={kwarranData} />;
  }

  return <YouthKwarcabLevelView />;
};
