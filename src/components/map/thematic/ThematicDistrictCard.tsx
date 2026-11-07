import React from 'react';
import { ChevronRight, School } from 'lucide-react';
import { ThematicDistrict, ThematicMetricDef } from './thematicMapTypes';
import { getDistrictColor } from './thematicColorScale';

export const CardValuesRow: React.FC<{
  district: ThematicDistrict;
  colorRamp: any;
  displayValue: string;
  statusLabel: string;
}> = ({ district, colorRamp, displayValue, statusLabel }) => (
  <div className="flex items-center justify-between gap-2">
    <div className="min-w-0">
      <div className="flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: colorRamp.fill }} />
        <h4 className="text-xs font-black text-stone-900 truncate">{district.name}</h4>
      </div>
      <span className="text-[10px] text-stone-600 block pl-3.5">Kwarran {district.kode}</span>
    </div>
    <div className="text-right shrink-0">
      <div className="text-sm font-black text-stone-900 leading-none">{displayValue}</div>
      <div className="text-[9px] font-bold text-stone-600 leading-tight">{statusLabel}</div>
    </div>
  </div>
);

export const CardFooterRow: React.FC<{ registeredGudep: number }> = ({ registeredGudep }) => (
  <div className="mt-2 pt-1.5 border-t border-stone-100 flex items-center justify-between text-[10px] text-stone-600">
    <span className="flex items-center gap-1">
      <School className="w-3 h-3 text-stone-600" />
      <span>{registeredGudep} Gudep</span>
    </span>
    <span className="font-bold text-amber-900 flex items-center gap-0.5 group-hover:underline">
      <span>Rincian</span>
      <ChevronRight className="w-3 h-3" />
    </span>
  </div>
);

interface ThematicDistrictCardProps {
  district: ThematicDistrict;
  activeMetric: ThematicMetricDef;
  maxVal: number;
  isSelected: boolean;
  isHovered: boolean;
  onSelect: (id: string) => void;
  onMouseEnter: (id: string) => void;
  onMouseLeave: () => void;
  anchorSide: 'left' | 'right';
}

export const ThematicDistrictCard: React.FC<ThematicDistrictCardProps> = ({
  district,
  activeMetric,
  maxVal,
  isSelected,
  isHovered,
  onSelect,
  onMouseEnter,
  onMouseLeave,
  anchorSide,
}) => {
  const metricResult = district.metrics[activeMetric.id] || { value: 0, status: 'empty' };
  const colorRamp = getDistrictColor(metricResult.value, maxVal, metricResult.status, activeMetric.colorScheme);

  const displayValue = metricResult.status === 'unreported' ? 'Belum lapor' : metricResult.value === 0 ? '0' : metricResult.value.toLocaleString('id-ID');
  const statusLabel = metricResult.status === 'unreported' ? 'Data belum tersedia' : metricResult.value === 0 ? '0 tercatat' : activeMetric.unit;

  return (
    <div
      onMouseEnter={() => onMouseEnter(district.id)}
      onMouseLeave={onMouseLeave}
      onClick={() => onSelect(district.id)}
      className={`relative p-3 rounded-2xl cursor-pointer transition-all duration-200 border text-left ${
        isSelected
          ? 'bg-amber-50/90 border-amber-500 shadow-md ring-2 ring-amber-400/40 translate-x-0'
          : isHovered
          ? 'bg-white border-amber-300 shadow-sm'
          : 'bg-white/95 border-stone-200/90 hover:border-amber-200'
      }`}
    >
      <div
        className={`absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full border-2 border-white transition-all ${
          anchorSide === 'left' ? '-right-1.5' : '-left-1.5'
        } ${isSelected || isHovered ? 'bg-amber-600 scale-125' : 'bg-stone-400'}`}
      />
      <CardValuesRow district={district} colorRamp={colorRamp} displayValue={displayValue} statusLabel={statusLabel} />
      <CardFooterRow registeredGudep={district.gudepCount.registered} />
    </div>
  );
};
