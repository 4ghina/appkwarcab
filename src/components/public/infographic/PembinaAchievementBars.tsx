import React from 'react';
import { InfographicPembinaDetails, InfographicBarItem } from '../../../types/infographic';
import { GraduationCap, Medal, Info } from 'lucide-react';
import { useApp } from '../../../context/AppContext';

interface PembinaAchievementBarsProps {
  details: InfographicPembinaDetails;
  isUnavailable?: boolean;
}

function renderPembinaBarRow(item: InfographicBarItem, maxCount: number, barColorClass: string) {
  const count = item.count ?? 0;
  const percentage = maxCount > 0 ? Math.min(100, Math.max(8, Math.round((count / maxCount) * 100))) : 0;
  const display = item.displayValue ?? String(count);

  return (
    <div key={item.id} className="space-y-1">
      <div className="flex items-center justify-between text-xs font-semibold text-stone-700">
        <span className="truncate pr-2">{item.label}</span>
        <span className="font-mono tabular-nums text-stone-900 font-bold shrink-0">
          {display}
          {item.isProtected && <span className="text-[10px] text-amber-700 font-normal ml-1">(terlindungi)</span>}
        </span>
      </div>
      <div className="w-full bg-stone-100 rounded-lg h-3 overflow-hidden flex">
        <div
          className={`h-full ${barColorClass} transition-all duration-500 rounded-lg`}
          style={{ width: count > 0 ? `${percentage}%` : '0%' }}
        />
      </div>
    </div>
  );
}

export const PembinaAchievementBars: React.FC<PembinaAchievementBarsProps> = ({
  details,
  isUnavailable
}) => {
  const { textCatalog } = useApp();
  const coursesLabel = textCatalog['infographic.bars.pembina_courses'] || 'Kursus yang Telah Diselesaikan';
  const awardsLabel = textCatalog['infographic.bars.pembina_awards'] || 'Tanda Penghargaan yang Telah Diterima';
  const disclaimerNote = textCatalog['infographic.bars.pembina_note'] ||
    'Penjumlahan kategori dapat melebihi total Pembina aktif karena seorang pembina dapat memiliki lebih dari satu sertifikat kursus atau tanda penghargaan.';

  if (isUnavailable) {
    return (
      <div className="p-8 text-center bg-stone-50 rounded-2xl border border-stone-200 text-stone-500 text-xs">
        Data kualifikasi Pembina belum tersedia untuk periode pelaporan ini.
      </div>
    );
  }

  const maxCourses = Math.max(...details.kursus.map(i => i.count ?? 0), 1);
  const maxAwards = Math.max(...details.penghargaan.map(i => i.count ?? 0), 1);

  return (
    <div className="space-y-4">
      {/* Disclaimer banner */}
      <div className="p-3 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-2.5 text-xs text-amber-900">
        <Info className="w-4 h-4 shrink-0 mt-0.5 text-amber-700" />
        <span>{disclaimerNote}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* 1. Kursus yang Telah Diselesaikan */}
        <div className="bg-white rounded-2xl p-4 border border-stone-200/90 shadow-2xs space-y-3.5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 pb-2 border-b border-stone-100">
              <GraduationCap className="w-4 h-4 text-blue-600" />
              <h4 className="text-xs font-bold text-stone-900">{coursesLabel}</h4>
            </div>
            <div className="space-y-3 mt-3">
              {details.kursus.map(item => renderPembinaBarRow(item, maxCourses, 'bg-blue-600'))}
            </div>
          </div>
          <p className="text-[10px] text-stone-400">
            Jenjang Kursus Pembina & Pelatih Pusdiklatcab/Pusdiklatda bersertifikat resmi.
          </p>
        </div>

        {/* 2. Tanda Penghargaan yang Telah Diterima */}
        <div className="bg-white rounded-2xl p-4 border border-stone-200/90 shadow-2xs space-y-3.5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 pb-2 border-b border-stone-100">
              <Medal className="w-4 h-4 text-amber-600" />
              <h4 className="text-xs font-bold text-stone-900">{awardsLabel}</h4>
            </div>
            <div className="space-y-2.5 mt-3 max-h-[380px] overflow-y-auto pr-1">
              {details.penghargaan.map(item => renderPembinaBarRow(item, maxAwards, 'bg-amber-600'))}
            </div>
          </div>
          <p className="text-[10px] text-stone-400">
            Tanda penghargaan Gerakan Pramuka yang telah disahkan melalui Surat Keputusan (SK).
          </p>
        </div>
      </div>
    </div>
  );
};
