import React from 'react';
import { useApp } from '../../../context/AppContext';
import { AlertCircle, PieChart } from 'lucide-react';

interface YouthDonutChartProps {
  composition: {
    siaga: number;
    penggalang: number;
    penegak: number;
    pandega: number;
    total: number;
  };
  isUnavailable?: boolean;
}

interface SegmentDef {
  key: string;
  label: string;
  count: number;
  color: string;
  bgColor: string;
  borderColor: string;
}

export const YouthDonutChart: React.FC<YouthDonutChartProps> = ({ composition, isUnavailable }) => {
  const { textCatalog } = useApp();
  const title = textCatalog['infographic.donut.title'] || 'Komposisi Peserta Didik';
  const centerLabel = textCatalog['infographic.donut.center'] || 'Total Anggota Muda';

  const segments: SegmentDef[] = [
    { key: 'siaga', label: 'Siaga', count: composition.siaga, color: '#16A34A', bgColor: 'bg-green-600', borderColor: 'border-green-600' },
    { key: 'penggalang', label: 'Penggalang', count: composition.penggalang, color: '#DC2626', bgColor: 'bg-red-600', borderColor: 'border-red-600' },
    { key: 'penegak', label: 'Penegak', count: composition.penegak, color: '#D97706', bgColor: 'bg-amber-600', borderColor: 'border-amber-600' },
    { key: 'pandega', label: 'Pandega', count: composition.pandega, color: '#78350F', bgColor: 'bg-stone-800', borderColor: 'border-stone-800' }
  ];

  const total = composition.total;
  const radius = 64;
  const circumference = 2 * Math.PI * radius; // ~402.12
  let runningPercent = 0;

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 border border-stone-200/90 shadow-2xs flex flex-col justify-between">
      <div className="flex items-center justify-between pb-3 border-b border-stone-100">
        <div className="flex items-center gap-2">
          <PieChart className="w-4 h-4 text-amber-700" />
          <h3 className="text-sm font-bold text-stone-900">{title}</h3>
        </div>
        <span className="text-[11px] font-medium text-stone-500">4 Golongan Usia</span>
      </div>

      {isUnavailable ? (
        <div className="py-12 flex flex-col items-center justify-center text-center text-stone-400 space-y-2">
          <AlertCircle className="w-8 h-8 text-amber-600" />
          <p className="text-xs font-semibold text-stone-600">Data belum tersedia untuk wilayah ini</p>
          <p className="text-[11px] text-stone-400 max-w-xs">Gugus depan belum memperbarui her-registrasi periode ini.</p>
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row items-center justify-around gap-6 py-4">
          {/* SVG Donut */}
          <div className="relative w-44 h-44 shrink-0 flex items-center justify-center">
            <svg
              className="w-full h-full -rotate-90 transform"
              viewBox="0 0 160 160"
              role="img"
              aria-label={`Diagram komposisi: Total ${total} peserta didik`}
            >
              {/* Background circle */}
              <circle cx="80" cy="80" r={radius} fill="transparent" stroke="#F5F5F4" strokeWidth="20" />
              {total > 0 && segments.map((seg) => {
                const percent = seg.count / total;
                const strokeDasharray = `${percent * circumference} ${circumference}`;
                const strokeDashoffset = -runningPercent * circumference;
                runningPercent += percent;
                return (
                  <circle
                    key={seg.key}
                    cx="80"
                    cy="80"
                    r={radius}
                    fill="transparent"
                    stroke={seg.color}
                    strokeWidth="20"
                    strokeDasharray={strokeDasharray}
                    strokeDashoffset={strokeDashoffset}
                    className="transition-all duration-500"
                  />
                );
              })}
            </svg>

            {/* Total at Center */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
              <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">{centerLabel}</span>
              <span className="text-2xl sm:text-3xl font-black font-mono tabular-nums text-stone-900 leading-tight">
                {total.toLocaleString('id-ID')}
              </span>
              <span className="text-[10px] font-medium text-stone-500">Anggota</span>
            </div>
          </div>

          {/* Direct Count Legend (No hover required for mobile readability) */}
          <div className="w-full sm:w-auto flex-1 max-w-xs space-y-2.5">
            {segments.map((seg) => {
              const pct = total > 0 ? Math.round((seg.count / total) * 100) : 0;
              return (
                <div key={seg.key} className="flex items-center justify-between text-xs p-2 rounded-xl bg-stone-50/80 hover:bg-stone-100/80 transition-colors border border-stone-100">
                  <div className="flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-full ${seg.bgColor}`} aria-hidden="true" />
                    <span className="font-semibold text-stone-800">{seg.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono tabular-nums font-bold text-stone-900">
                      {seg.count.toLocaleString('id-ID')}
                    </span>
                    <span className="text-[10px] text-stone-500 font-medium w-8 text-right font-mono tabular-nums">
                      {pct}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
