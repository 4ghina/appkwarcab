import React from 'react';
import { useApp } from '../../../context/AppContext';
import { BarChart3, Database, Calendar } from 'lucide-react';
import { InfographicData } from '../../../types/infographic';

interface InfographicHeaderProps {
  data: InfographicData | null;
  selectedKwarran: string;
  selectedGudepName?: string;
}

export const InfographicHeader: React.FC<InfographicHeaderProps> = ({
  data,
  selectedKwarran,
  selectedGudepName
}) => {
  const { textCatalog } = useApp();

  const title = textCatalog['infographic.title'] || 'Potensi Pramuka dalam Angka';
  const subtitle = textCatalog['infographic.subtitle'] || 'Statistik Resmi & Capaian Berjenjang Kwartir Cabang Gerakan Pramuka';

  const kwarranLabel = selectedKwarran === 'all' ? 'Seluruh Kwarran' : `Kwarran ${selectedKwarran}`;
  const gudepLabel = selectedGudepName || 'Semua Gudep';
  const periodLabel = data?.metadata.periodLabel || 'Tahun 2026 (Semester 1)';
  const updateDate = data?.metadata.updatedAt || 'Maret 2026';
  const isDemo = data?.metadata.isDemoMode ?? true;

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center shrink-0 shadow-2xs">
            <BarChart3 className="w-5 h-5 text-amber-800" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
              {title}
            </h2>
            <p className="text-xs sm:text-sm text-stone-600">
              {subtitle}
            </p>
          </div>
        </div>

        {/* Status / Mode Indicator */}
        <div className="flex items-center gap-1.5 text-xs text-stone-500 bg-stone-100/80 px-2.5 py-1 rounded-lg border border-stone-200">
          <Database className="w-3.5 h-3.5 text-stone-600" />
          <span>{isDemo ? 'Mode Demo: Data Ilustrasi Terverifikasi' : 'Data Resmi Terverifikasi'}</span>
        </div>
      </div>

      {/* Scope, Period, and Update Metadata (Zero-pill typography discipline) */}
      <div className="flex flex-wrap items-center gap-2 text-xs text-stone-600 pt-1">
        <span className="font-semibold text-stone-800">Cakupan Wilayah:</span>
        <span>Kota Depok (09.22)</span>
        <span aria-hidden="true" className="text-stone-300">/</span>
        <span>{kwarranLabel}</span>
        <span aria-hidden="true" className="text-stone-300">/</span>
        <span className="text-amber-900 font-medium">{gudepLabel}</span>
        <span aria-hidden="true" className="text-stone-300">·</span>
        <span className="flex items-center gap-1 font-medium text-stone-700">
          <Calendar className="w-3.5 h-3.5 text-stone-400 inline" />
          {periodLabel}
        </span>
        <span aria-hidden="true" className="text-stone-300">·</span>
        <span className="text-stone-500">Pembaruan: {updateDate}</span>
      </div>
    </div>
  );
};
