import React from 'react';
import { useThematicMapState } from './useThematicMapState';
import { ThematicMapHeader } from './ThematicMapHeader';
import { ThematicMapSvgCanvas } from './ThematicMapSvgCanvas';
import { ThematicLeftSidebar, ThematicRightSidebar } from './ThematicDesktopSidebars';
import { ThematicMobileDistrictList } from './ThematicMobileDistrictList';
import { ThematicMapLegend } from './ThematicMapLegend';
import { ThematicMapFooter } from './ThematicMapFooter';
import { ThematicGudepDrawer } from './ThematicGudepDrawer';
import { RealtimeDemographicsMap } from '../RealtimeDemographicsMap';
import { RefreshCw, AlertCircle } from 'lucide-react';

export const ThematicMapLoadingState: React.FC = () => (
  <div className="bg-white rounded-3xl border border-stone-200/90 p-12 text-center shadow-xs space-y-3">
    <RefreshCw className="w-8 h-8 text-amber-600 animate-spin mx-auto" />
    <h3 className="text-base font-black text-stone-900">Sedang Memuat Peta Potensi Pramuka</h3>
    <p className="text-xs text-stone-500">Menghubungkan data agregasi wilayah dan capaian SKU/SKK...</p>
  </div>
);

export const ThematicMapErrorState: React.FC<{ error?: string; onRetry: () => void }> = ({ error, onRetry }) => (
  <div className="bg-white rounded-3xl border border-rose-200 p-8 text-center shadow-xs space-y-3">
    <AlertCircle className="w-8 h-8 text-rose-600 mx-auto" />
    <h3 className="text-base font-black text-stone-900">Gagal Memuat Data Peta Potensi</h3>
    <p className="text-xs text-rose-700">{error || 'Data wilayah tidak tersedia'}</p>
    <button onClick={onRetry} className="px-4 py-2 bg-stone-900 text-white rounded-xl text-xs font-bold hover:bg-stone-800 transition-colors">
      Coba Lagi
    </button>
  </div>
);

export const ThematicDesktopColumns: React.FC<{ state: ReturnType<typeof useThematicMapState> }> = ({ state }) => (
  <div className="bg-white rounded-3xl border border-stone-200/90 p-4 shadow-sm flex flex-col lg:flex-row gap-4 items-stretch">
    <div className="hidden lg:flex">
      <ThematicLeftSidebar
        districts={state.dataset!.districts}
        activeMetric={state.activeMetric!}
        maxVal={state.maxMetricValue}
        selectedDistrictId={state.selectedDistrictId}
        hoveredDistrictId={state.hoveredDistrictId}
        onSelectDistrict={state.selectDistrict}
        onHoverDistrict={state.setHoveredDistrictId}
      />
    </div>
    <div className="flex-1 flex flex-col justify-center min-w-0">
      <ThematicMapSvgCanvas
        districts={state.dataset!.districts}
        activeMetric={state.activeMetric!}
        maxVal={state.maxMetricValue}
        selectedDistrictId={state.selectedDistrictId}
        hoveredDistrictId={state.hoveredDistrictId}
        onSelectDistrict={state.selectDistrict}
        onHoverDistrict={state.setHoveredDistrictId}
      />
    </div>
    <div className="hidden lg:flex">
      <ThematicRightSidebar
        districts={state.dataset!.districts}
        activeMetric={state.activeMetric!}
        maxVal={state.maxMetricValue}
        selectedDistrictId={state.selectedDistrictId}
        hoveredDistrictId={state.hoveredDistrictId}
        onSelectDistrict={state.selectDistrict}
        onHoverDistrict={state.setHoveredDistrictId}
      />
    </div>
  </div>
);

export const ThematicActiveView: React.FC<{ state: ReturnType<typeof useThematicMapState> }> = ({ state }) => {
  if (state.viewMode === 'google_maps') return <RealtimeDemographicsMap />;
  return (
    <div className="space-y-4">
      <ThematicDesktopColumns state={state} />
      <ThematicMobileDistrictList
        districts={state.dataset!.districts}
        activeMetric={state.activeMetric!}
        maxVal={state.maxMetricValue}
        selectedDistrictId={state.selectedDistrictId}
        onSelectDistrict={state.selectDistrict}
      />
      <ThematicMapLegend activeMetric={state.activeMetric!} maxVal={state.maxMetricValue} />
      {state.selectedDistrict && (
        <ThematicGudepDrawer
          district={state.selectedDistrict}
          activeMetric={state.activeMetric!}
          onClose={() => state.selectDistrict(null)}
          selectedGudep={state.selectedGudep}
          onSelectGudep={state.setSelectedGudep}
        />
      )}
    </div>
  );
};

export const AnnotatedThematicMap: React.FC<{ onBackToBeranda?: () => void }> = ({ onBackToBeranda }) => {
  const state = useThematicMapState();

  if (state.loading) return <ThematicMapLoadingState />;
  if (state.error || !state.dataset || !state.activeMetric) {
    return <ThematicMapErrorState error={state.error || undefined} onRetry={state.refetch} />;
  }

  return (
    <div className="space-y-4">
      <ThematicMapHeader
        isSimulated={state.dataset.isSimulated}
        activeCategory={state.activeCategory}
        onCategoryChange={state.handleCategoryChange}
        categoryMetrics={state.categoryMetrics}
        activeMetricId={state.activeMetricId}
        onMetricChange={state.setActiveMetricId}
        viewMode={state.viewMode}
        onViewModeChange={state.setViewMode}
        onBackToBeranda={onBackToBeranda}
      />
      <ThematicActiveView state={state} />
      <ThematicMapFooter
        dataSource={state.dataset.attribution.dataSource}
        boundarySource={state.dataset.attribution.boundarySource}
        lastUpdated={state.dataset.attribution.lastUpdated}
      />
    </div>
  );
};
