import React, { useState } from 'react';
import { UserProfile, BinaanStudent, AssessmentSubmission, GudepData } from '../types/scout';
import { YouthAnalyticsPanel } from './analytics/YouthAnalyticsPanel';
import { PembinaAnalyticsPanel } from './analytics/PembinaAnalyticsPanel';
import { GudepAnalyticsPanel } from './analytics/GudepAnalyticsPanel';
import { AnalyticsLevelHeader, AnalyticsDomainTabs } from './analytics/AnalyticsNavControls';
import { DEPOK_KWARRAN_STATS } from './analytics/analyticsData';

export type AnalyticsLevel = 'pembina' | 'kwarran' | 'kwarcab';
export type AnalyticsDomain = 'peserta_didik' | 'pembina' | 'gudep';

interface ScoutAnalyticsDashboardProps {
  user: UserProfile;
  binaanStudents?: BinaanStudent[];
  assessmentQueue?: AssessmentSubmission[];
  gudepList?: GudepData[];
  initialLevel?: AnalyticsLevel;
  className?: string;
  onOpenPembinaan?: () => void;
  onOpenGudepMap?: () => void;
  onOpenGaruda?: () => void;
}

export const ScoutAnalyticsDashboard: React.FC<ScoutAnalyticsDashboardProps> = (p) => {
  const getDefaultLevel = (): AnalyticsLevel => {
    if (p.initialLevel) return p.initialLevel;
    if (p.user.role === 'superadmin_kwarcab') return 'kwarcab';
    if (p.user.role === 'admin_kwarran') return 'kwarran';
    return 'pembina';
  };

  const [activeLevel, setActiveLevel] = useState<AnalyticsLevel>(getDefaultLevel);
  const [activeDomain, setActiveDomain] = useState<AnalyticsDomain>('peserta_didik');
  const [selectedKwarran, setSelectedKwarran] = useState<string>('Pancoran Mas');

  return (
    <div className={`p-4 rounded-3xl bg-white border border-stone-200 shadow-2xs space-y-3.5 ${p.className || ''}`}>
      <AnalyticsLevelHeader activeLevel={activeLevel} setActiveLevel={setActiveLevel} />
      {activeLevel === 'kwarran' && (
        <div className="flex items-center justify-between text-xs bg-[#FAF8F5] p-2 rounded-xl border border-stone-200">
          <span className="text-[11px] font-semibold text-stone-700">Wilayah Ranting:</span>
          <select value={selectedKwarran} onChange={(e) => setSelectedKwarran(e.target.value)} className="p-1 rounded-lg border border-stone-300 font-bold text-purple-900 bg-white">
            {Object.keys(DEPOK_KWARRAN_STATS).map(k => <option key={k} value={k}>{k}</option>)}
          </select>
        </div>
      )}
      <AnalyticsDomainTabs activeDomain={activeDomain} setActiveDomain={setActiveDomain} />
      {activeDomain === 'peserta_didik' && <YouthAnalyticsPanel level={activeLevel} selectedKwarran={selectedKwarran} binaanStudents={p.binaanStudents || []} onOpenPembinaan={p.onOpenPembinaan} />}
      {activeDomain === 'pembina' && <PembinaAnalyticsPanel level={activeLevel} selectedKwarran={selectedKwarran} onOpenPusdiklat={p.onOpenPembinaan} />}
      {activeDomain === 'gudep' && <GudepAnalyticsPanel level={activeLevel} selectedKwarran={selectedKwarran} gudepList={p.gudepList || []} onOpenGudepMap={p.onOpenGudepMap} />}
    </div>
  );
};
