import React from 'react';
import { Users, Award, Landmark, AlertCircle } from 'lucide-react';
import { InfographicData } from '../../../types/infographic';
import { useApp } from '../../../context/AppContext';

interface InfographicSummaryCardsProps {
  data: InfographicData | null;
  isLoading: boolean;
}

export const InfographicSummaryCards: React.FC<InfographicSummaryCardsProps> = ({
  data,
  isLoading
}) => {
  const { textCatalog } = useApp();
  const youthLabel = textCatalog['infographic.kpi.active_youth'] || 'Peserta Didik Aktif';
  const adultLabel = textCatalog['infographic.kpi.active_adult'] || 'Pembina Aktif';
  const gudepLabel = textCatalog['infographic.kpi.active_gudep'] || 'Gudep Aktif';

  const isUnavailable = data?.metadata.dataStatus === 'unavailable';

  const renderValue = (val: number | null | undefined, suffix = 'Orang') => {
    if (isLoading) return <span className="animate-pulse text-stone-300">...</span>;
    if (isUnavailable || val === null || val === undefined) {
      return (
        <span className="text-xs sm:text-sm font-semibold text-amber-700 flex items-center gap-1">
          <AlertCircle className="w-3.5 h-3.5" /> Data belum tersedia
        </span>
      );
    }
    return (
      <div className="flex items-baseline gap-1.5">
        <span className="text-2xl sm:text-3xl font-black font-mono tabular-nums text-stone-900">
          {val.toLocaleString('id-ID')}
        </span>
        <span className="text-xs font-medium text-stone-500">{suffix}</span>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      {/* 1. Peserta Didik Aktif */}
      <div className="bg-white rounded-2xl p-4 border border-stone-200/90 shadow-2xs hover:border-amber-400 transition-all flex items-start gap-3.5">
        <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0">
          <Users className="w-6 h-6" />
        </div>
        <div className="space-y-0.5">
          <p className="text-xs font-semibold text-stone-500 uppercase tracking-wide">
            {youthLabel}
          </p>
          {renderValue(data?.summary.pesertaDidikAktif, 'Anggota')}
          <p className="text-[10px] text-stone-400">Siaga, Penggalang, Penegak & Pandega</p>
        </div>
      </div>

      {/* 2. Pembina Aktif */}
      <div className="bg-white rounded-2xl p-4 border border-stone-200/90 shadow-2xs hover:border-amber-400 transition-all flex items-start gap-3.5">
        <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center shrink-0">
          <Award className="w-6 h-6" />
        </div>
        <div className="space-y-0.5">
          <p className="text-xs font-semibold text-stone-500 uppercase tracking-wide">
            {adultLabel}
          </p>
          {renderValue(data?.summary.pembinaAktif, 'Pembina')}
          <p className="text-[10px] text-stone-400">Terdaftar & memiliki legalitas SHB/KMD</p>
        </div>
      </div>

      {/* 3. Gudep Aktif */}
      <div className="bg-white rounded-2xl p-4 border border-stone-200/90 shadow-2xs hover:border-amber-400 transition-all flex items-start gap-3.5">
        <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-800 flex items-center justify-center shrink-0">
          <Landmark className="w-6 h-6" />
        </div>
        <div className="space-y-0.5">
          <p className="text-xs font-semibold text-stone-500 uppercase tracking-wide">
            {gudepLabel}
          </p>
          {renderValue(data?.summary.gudepAktif, 'Pangkalan')}
          <p className="text-[10px] text-stone-400">Pangkalan sekolah & perguruan tinggi</p>
        </div>
      </div>
    </div>
  );
};
