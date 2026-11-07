import React from 'react';
import { InfographicYouthDetails, InfographicBarItem } from '../../../types/infographic';
import { Target, CheckCircle2, Bookmark, Info } from 'lucide-react';
import { useApp } from '../../../context/AppContext';

interface YouthAchievementBarsProps {
  golongan: 'Siaga' | 'Penggalang' | 'Penegak' | 'Pandega';
  details: InfographicYouthDetails;
  isUnavailable?: boolean;
}

function renderBarRow(item: InfographicBarItem, maxCount: number, barColorClass: string) {
  const count = item.count ?? 0;
  const percentage = maxCount > 0 ? Math.min(100, Math.max(8, Math.round((count / maxCount) * 100))) : 0;
  const display = item.displayValue ?? String(count);

  return (
    <div key={item.id} className="space-y-1">
      <div className="flex items-center justify-between text-xs font-semibold text-stone-700">
        <span>{item.label}</span>
        <span className="font-mono tabular-nums text-stone-900 font-bold">
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

export const YouthAchievementBars: React.FC<YouthAchievementBarsProps> = ({
  golongan,
  details,
  isUnavailable
}) => {
  const { textCatalog } = useApp();
  const targetLabel = textCatalog['infographic.bars.target_sku'] || 'Target SKU (Sedang Ditempuh)';
  const capaianLabel = textCatalog['infographic.bars.achievement'] || 'Capaian Peserta Didik';
  const skkLabel = textCatalog['infographic.bars.skk'] || 'Status Syarat Kecakapan Khusus (SKK)';
  const skkNote = textCatalog['infographic.bars.skk_note'] || 'Satu peserta didik dapat memiliki beberapa catatan SKK.';

  if (isUnavailable) {
    return (
      <div className="p-8 text-center bg-stone-50 rounded-2xl border border-stone-200 text-stone-500 text-xs">
        Data capaian {golongan} belum tersedia untuk periode pelaporan ini.
      </div>
    );
  }

  const maxTarget = Math.max(...details.targetSku.map(i => i.count ?? 0), 1);
  const maxCapaian = Math.max(...details.capaianTku.map(i => i.count ?? 0), 1);
  const maxSkk = Math.max(...details.statusSkk.items.map(i => i.count ?? 0), 1);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* 1. Target SKU */}
      <div className="bg-white rounded-2xl p-4 border border-stone-200/90 shadow-2xs space-y-3.5 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 pb-2 border-b border-stone-100">
            <Target className="w-4 h-4 text-amber-600" />
            <h4 className="text-xs font-bold text-stone-900">{targetLabel}</h4>
          </div>
          <div className="space-y-3 mt-3">
            {details.targetSku.map(item => renderBarRow(item, maxTarget, 'bg-amber-500'))}
          </div>
        </div>
        <p className="text-[10px] text-stone-400">Tingkat SKU yang aktif ditempuh anggota {golongan}.</p>
      </div>

      {/* 2. Capaian Peserta Didik */}
      <div className="bg-white rounded-2xl p-4 border border-stone-200/90 shadow-2xs space-y-3.5 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 pb-2 border-b border-stone-100">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <h4 className="text-xs font-bold text-stone-900">{capaianLabel}</h4>
          </div>
          <div className="space-y-3 mt-3">
            {details.capaianTku.map(item => {
              const color = item.label === 'Garuda' ? 'bg-amber-600' : 'bg-emerald-600';
              return renderBarRow(item, maxCapaian, color);
            })}
          </div>
        </div>
        <p className="text-[10px] text-stone-400">Tingkat tertinggi disahkan atau status Pramuka Garuda.</p>
      </div>

      {/* 3. Status SKK */}
      <div className="bg-white rounded-2xl p-4 border border-stone-200/90 shadow-2xs space-y-3.5 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 pb-2 border-b border-stone-100">
            <Bookmark className="w-4 h-4 text-purple-600" />
            <h4 className="text-xs font-bold text-stone-900">{skkLabel}</h4>
          </div>
          <div className="space-y-3 mt-3">
            {details.statusSkk.items.map(item => {
              const color = item.id.includes('completed') ? 'bg-purple-600' : 'bg-stone-400';
              return renderBarRow(item, maxSkk, color);
            })}
          </div>
        </div>
        <div className="p-2 rounded-xl bg-purple-50/60 border border-purple-100/80 flex items-start gap-1.5 text-[10px] text-purple-900">
          <Info className="w-3.5 h-3.5 shrink-0 mt-0.5 text-purple-700" />
          <span>{skkNote}</span>
        </div>
      </div>
    </div>
  );
};
