import React from 'react';
import { Layers, Users, Award, School, Globe } from 'lucide-react';
import { ThematicCategory, ThematicMetricDef, ThematicViewMode } from './thematicMapTypes';

export const HeaderTitleRow: React.FC<{
  isSimulated: boolean;
  viewMode: ThematicViewMode;
  onViewModeChange: (m: ThematicViewMode) => void;
  onBackToBeranda?: () => void;
}> = ({ isSimulated, viewMode, onViewModeChange, onBackToBeranda }) => (
  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-stone-100 pb-4">
    <div>
      <div className="flex items-center gap-2">
        <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-black uppercase tracking-wider">
          Peta Tematik Beranotasi
        </span>
        {isSimulated && (
          <span className="px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-800 text-[10px] font-bold">
            Data Simulasi
          </span>
        )}
        <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
          11 Kwarran Aktif
        </span>
      </div>
      <h1 className="text-xl sm:text-2xl font-black text-stone-900 mt-1">Peta Potensi Pramuka Kwartir Cabang</h1>
      <p className="text-xs text-stone-500">Visualisasi sebaran peserta didik, jenjang kecakapan, pembina mahir, dan pangkalan sekolah se-Kota Depok</p>
    </div>
    <div className="flex items-center gap-2 self-start md:self-auto">
      {onBackToBeranda && (
        <button onClick={onBackToBeranda} className="px-3 py-2 rounded-xl border border-stone-200 text-xs font-bold text-stone-700 hover:bg-stone-50 transition-colors">
          ← Beranda
        </button>
      )}
      <div className="inline-flex rounded-xl bg-stone-100 p-1 border border-stone-200 text-xs font-bold">
        <button onClick={() => onViewModeChange('thematic')} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${viewMode === 'thematic' ? 'bg-white text-stone-900 shadow-2xs' : 'text-stone-500 hover:text-stone-900'}`}>
          <Layers className="w-3.5 h-3.5 text-amber-700" />
          <span>Tematik Beranotasi</span>
        </button>
        <button onClick={() => onViewModeChange('google_maps')} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${viewMode === 'google_maps' ? 'bg-white text-stone-900 shadow-2xs' : 'text-stone-500 hover:text-stone-900'}`}>
          <Globe className="w-3.5 h-3.5 text-emerald-700" />
          <span>Google Maps Satelit</span>
        </button>
      </div>
    </div>
  </div>
);

export const CategoryTabsRow: React.FC<{
  activeCategory: ThematicCategory;
  onCategoryChange: (c: ThematicCategory) => void;
}> = ({ activeCategory, onCategoryChange }) => (
  <div className="flex flex-wrap items-center gap-2">
    <button onClick={() => onCategoryChange('peserta_didik')} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all ${activeCategory === 'peserta_didik' ? 'bg-[#5D4037] text-white shadow-xs' : 'bg-stone-50 border border-stone-200 text-stone-700 hover:bg-stone-100'}`}>
      <Users className="w-4 h-4" />
      <span>Peserta Didik (TKU, Garuda, SKK)</span>
    </button>
    <button onClick={() => onCategoryChange('pembina')} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all ${activeCategory === 'pembina' ? 'bg-[#5D4037] text-white shadow-xs' : 'bg-stone-50 border border-stone-200 text-stone-700 hover:bg-stone-100'}`}>
      <Award className="w-4 h-4" />
      <span>Pembina & Pelatih Mahir</span>
    </button>
    <button onClick={() => onCategoryChange('gudep')} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all ${activeCategory === 'gudep' ? 'bg-[#5D4037] text-white shadow-xs' : 'bg-stone-50 border border-stone-200 text-stone-700 hover:bg-stone-100'}`}>
      <School className="w-4 h-4" />
      <span>Gugus Depan & Pangkalan</span>
    </button>
  </div>
);

export const MetricPillsRow: React.FC<{
  categoryMetrics: ThematicMetricDef[];
  activeMetricId: string;
  onMetricChange: (id: string) => void;
}> = ({ categoryMetrics, activeMetricId, onMetricChange }) => (
  <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
    <span className="text-[11px] font-bold text-stone-400 whitespace-nowrap">Pilih Metrik:</span>
    <div className="flex items-center gap-1.5 flex-nowrap">
      {categoryMetrics.map((m) => (
        <button
          key={m.id}
          onClick={() => onMetricChange(m.id)}
          className={`px-3 py-1.5 rounded-lg font-bold text-xs whitespace-nowrap transition-all ${
            m.id === activeMetricId ? 'bg-amber-600 text-white shadow-2xs' : 'bg-stone-100/90 text-stone-700 hover:bg-stone-200/90'
          }`}
          title={m.description}
        >
          {m.label}
        </button>
      ))}
    </div>
  </div>
);

interface ThematicMapHeaderProps {
  isSimulated: boolean;
  activeCategory: ThematicCategory;
  onCategoryChange: (cat: ThematicCategory) => void;
  categoryMetrics: ThematicMetricDef[];
  activeMetricId: string;
  onMetricChange: (id: string) => void;
  viewMode: ThematicViewMode;
  onViewModeChange: (mode: ThematicViewMode) => void;
  onBackToBeranda?: () => void;
}

export const ThematicMapHeader: React.FC<ThematicMapHeaderProps> = (p) => (
  <div className="bg-white rounded-3xl border border-stone-200/90 p-5 shadow-xs space-y-4">
    <HeaderTitleRow isSimulated={p.isSimulated} viewMode={p.viewMode} onViewModeChange={p.onViewModeChange} onBackToBeranda={p.onBackToBeranda} />
    <CategoryTabsRow activeCategory={p.activeCategory} onCategoryChange={p.onCategoryChange} />
    <MetricPillsRow categoryMetrics={p.categoryMetrics} activeMetricId={p.activeMetricId} onMetricChange={p.onMetricChange} />
  </div>
);
