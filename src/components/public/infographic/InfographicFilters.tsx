import React from 'react';
import { InfographicFilterOptions, InfographicPeriodId } from '../../../types/infographic';
import { Filter, RotateCcw } from 'lucide-react';

interface InfographicFiltersProps {
  options: InfographicFilterOptions;
  selectedKwarcab: string;
  selectedKwarran: string;
  selectedGudepId: string;
  selectedPeriod: InfographicPeriodId;
  onChangeKwarran: (kwarran: string) => void;
  onChangeGudep: (gudepId: string) => void;
  onChangePeriod: (period: InfographicPeriodId) => void;
  onResetFilters: () => void;
}

export const InfographicFilters: React.FC<InfographicFiltersProps> = ({
  options,
  selectedKwarcab,
  selectedKwarran,
  selectedGudepId,
  selectedPeriod,
  onChangeKwarran,
  onChangeGudep,
  onChangePeriod,
  onResetFilters
}) => {
  // Filter available gudeps based on currently selected kwarran
  const filteredGudeps = options.gudeps.filter(g => {
    if (selectedKwarran === 'all') return true;
    return g.kwarran === selectedKwarran;
  });

  const handleKwarranChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newKwarran = e.target.value;
    onChangeKwarran(newKwarran);
    // Mandatory requirement: Saat Kwarran berubah, kembalikan pilihan Gudep ke “Semua Gudep”
    onChangeGudep('all');
  };

  const isFiltered = selectedKwarran !== 'all' || selectedGudepId !== 'all' || selectedPeriod !== '2026-s1';

  return (
    <div className="bg-white rounded-2xl p-4 border border-stone-200/90 shadow-2xs space-y-3">
      <div className="flex items-center justify-between pb-1 border-b border-stone-100">
        <div className="flex items-center gap-1.5 text-xs font-bold text-stone-700 uppercase tracking-wider">
          <Filter className="w-3.5 h-3.5 text-amber-700" />
          <span>Filter Wilayah & Periode Pelaporan</span>
        </div>
        {isFiltered && (
          <button
            onClick={onResetFilters}
            className="flex items-center gap-1 text-[11px] font-semibold text-stone-500 hover:text-stone-900 transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset Filter</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* 1. Kwarcab (Tingkat Kota) */}
        <div>
          <label className="block text-[11px] font-semibold text-stone-600 mb-1">
            Kwartir Cabang
          </label>
          <select
            value={selectedKwarcab}
            disabled
            className="w-full text-xs font-medium bg-stone-100/90 text-stone-700 border border-stone-200 rounded-xl px-3 py-2 cursor-not-allowed"
          >
            <option value="09.22">{options.kwarcab.name} (09.22)</option>
          </select>
        </div>

        {/* 2. Kwarran (Kecamatan) */}
        <div>
          <label className="block text-[11px] font-semibold text-stone-600 mb-1">
            Kwartir Ranting (Kecamatan)
          </label>
          <select
            value={selectedKwarran}
            onChange={handleKwarranChange}
            className="w-full text-xs font-semibold bg-white text-stone-800 border border-stone-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            <option value="all">Semua Kwarran (11 Kecamatan)</option>
            {options.kwarrans.map(kw => (
              <option key={kw} value={kw}>Kwarran {kw}</option>
            ))}
          </select>
        </div>

        {/* 3. Gugus Depan (Mengikuti Kwarran) */}
        <div>
          <label className="block text-[11px] font-semibold text-stone-600 mb-1">
            Gugus Depan / Pangkalan
          </label>
          <select
            value={selectedGudepId}
            onChange={(e) => onChangeGudep(e.target.value)}
            className="w-full text-xs font-semibold bg-white text-stone-800 border border-stone-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            <option value="all">Semua Gudep di Wilayah Ini</option>
            {filteredGudeps.map(g => (
              <option key={g.id} value={g.id}>
                {g.nomor} - {g.pangkalan}
              </option>
            ))}
          </select>
        </div>

        {/* 4. Periode Pelaporan */}
        <div>
          <label className="block text-[11px] font-semibold text-stone-600 mb-1">
            Periode Pelaporan
          </label>
          <select
            value={selectedPeriod}
            onChange={(e) => onChangePeriod(e.target.value as InfographicPeriodId)}
            className="w-full text-xs font-semibold bg-white text-stone-800 border border-stone-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            {options.periods.map(p => (
              <option key={p.id} value={p.id}>{p.label}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
