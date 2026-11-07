import React, { useState, useEffect, useCallback } from 'react';
import {
  InfographicData,
  InfographicFilterOptions,
  InfographicPeriodId,
  GolonganTab
} from '../../../types/infographic';
import { fetchInfographicOptions, fetchInfographicStats } from './infographicApi';
import { InfographicHeader } from './InfographicHeader';
import { InfographicFilters } from './InfographicFilters';
import { InfographicSummaryCards } from './InfographicSummaryCards';
import { YouthDonutChart } from './YouthDonutChart';
import { YouthAchievementBars } from './YouthAchievementBars';
import { PembinaAchievementBars } from './PembinaAchievementBars';
import { InfographicAccessibleSummary } from './InfographicAccessibleSummary';
import { Users2, Award } from 'lucide-react';

const TABS: Array<{ id: GolonganTab; label: string; icon: any }> = [
  { id: 'Siaga', label: 'Siaga', icon: Users2 },
  { id: 'Penggalang', label: 'Penggalang', icon: Users2 },
  { id: 'Penegak', label: 'Penegak', icon: Users2 },
  { id: 'Pandega', label: 'Pandega', icon: Users2 },
  { id: 'Pembina', label: 'Pembina', icon: Award }
];

export const PublicInfographicSection: React.FC = () => {
  const [filterOptions, setFilterOptions] = useState<InfographicFilterOptions>({
    kwarcab: { id: '09.22', name: 'Kwartir Cabang Kota Depok' },
    kwarrans: [],
    gudeps: [],
    periods: []
  });

  const [selectedKwarran, setSelectedKwarran] = useState<string>('all');
  const [selectedGudepId, setSelectedGudepId] = useState<string>('all');
  const [selectedPeriod, setSelectedPeriod] = useState<InfographicPeriodId>('2026-s1');
  const [activeTab, setActiveTab] = useState<GolonganTab>('Penegak');

  const [data, setData] = useState<InfographicData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Initial load for filter options
  useEffect(() => {
    fetchInfographicOptions().then(opts => {
      setFilterOptions(opts);
    });
  }, []);

  // Fetch stats when filters change (isolated to infographic section)
  const loadStats = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await fetchInfographicStats('09.22', selectedKwarran, selectedGudepId, selectedPeriod);
      setData(result);
    } catch (err) {
      console.error('[PublicInfographicSection] Error loading stats', err);
    } finally {
      setIsLoading(false);
    }
  }, [selectedKwarran, selectedGudepId, selectedPeriod]);

  useEffect(() => {
    loadStats();
  }, [loadStats]);

  const handleResetFilters = () => {
    setSelectedKwarran('all');
    setSelectedGudepId('all');
    setSelectedPeriod('2026-s1');
  };

  const selectedGudep = filterOptions.gudeps.find(g => g.id === selectedGudepId);
  const isUnavailable = data?.metadata.dataStatus === 'unavailable';

  return (
    <section id="potensi-angka" className="scroll-mt-16 space-y-5">
      {/* 1. Header with Title & Metadata */}
      <InfographicHeader
        data={data}
        selectedKwarran={selectedKwarran}
        selectedGudepName={selectedGudep?.pangkalan}
      />

      {/* 2. Cascading Filter Bar */}
      <InfographicFilters
        options={filterOptions}
        selectedKwarcab="09.22"
        selectedKwarran={selectedKwarran}
        selectedGudepId={selectedGudepId}
        selectedPeriod={selectedPeriod}
        onChangeKwarran={setSelectedKwarran}
        onChangeGudep={setSelectedGudepId}
        onChangePeriod={setSelectedPeriod}
        onResetFilters={handleResetFilters}
      />

      {/* 3. Three KPI Summary Cards */}
      <InfographicSummaryCards data={data} isLoading={isLoading} />

      {/* 4. Youth Donut Composition Chart */}
      <YouthDonutChart
        composition={data?.youthComposition || { siaga: 0, penggalang: 0, penegak: 0, pandega: 0, total: 0 }}
        isUnavailable={isUnavailable}
      />

      {/* 5. Detailed Breakdown Section (Rincian Capaian) */}
      <div className="space-y-4 pt-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base sm:text-lg font-black text-stone-900 tracking-tight">
              Rincian Capaian
            </h3>
            <p className="text-xs text-stone-500">
              Pilih golongan untuk meninjau target SKU, jenjang TKU/Garuda, atau kualifikasi Pembina.
            </p>
          </div>

          {/* Interactive segmented controls for Tab Selector */}
          <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-xl overflow-x-auto">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-all whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'bg-stone-900 text-white shadow-xs'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content Display */}
        {activeTab === 'Pembina' ? (
          <PembinaAchievementBars
            details={data?.pembinaDetails || { kursus: [], penghargaan: [], catatan: '' }}
            isUnavailable={isUnavailable}
          />
        ) : (
          <YouthAchievementBars
            golongan={activeTab}
            details={
              data?.youthDetails[activeTab.toLowerCase() as keyof typeof data.youthDetails] || {
                targetSku: [],
                capaianTku: [],
                statusSkk: { dalamProses: 0, sudahTerpenuhi: 0, items: [], catatan: '' }
              }
            }
            isUnavailable={isUnavailable}
          />
        )}
      </div>

      {/* 6. Screen Reader Accessibility and Publication Notices */}
      <InfographicAccessibleSummary data={data} />
    </section>
  );
};
