import React from 'react';
import { Info, HelpCircle } from 'lucide-react';
import { ThematicMetricDef } from './thematicMapTypes';

interface ThematicMapLegendProps {
  activeMetric: ThematicMetricDef;
  maxVal: number;
}

export const ThematicMapLegend: React.FC<ThematicMapLegendProps> = ({
  activeMetric,
  maxVal,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-stone-200/90 p-3.5 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
      {/* Metric Description */}
      <div className="flex items-center gap-2 text-stone-600">
        <Info className="w-4 h-4 text-amber-600 shrink-0" />
        <div>
          <span className="font-black text-stone-900">{activeMetric.label}: </span>
          <span className="text-stone-600">{activeMetric.description}</span>
        </div>
      </div>

      {/* Color Scale Ramp & Status Indicators */}
      <div className="flex flex-wrap items-center gap-4 shrink-0">
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-bold text-stone-600">Skala:</span>
          <span className="text-[10px] text-stone-600 font-mono">1</span>
          <div className="h-3 w-28 rounded-md bg-gradient-to-r from-amber-100 via-amber-400 to-amber-800 border border-stone-300" />
          <span className="text-[10px] text-stone-600 font-mono font-bold">
            {maxVal.toLocaleString('id-ID')}
          </span>
        </div>

        <div className="flex items-center gap-3 text-[11px] text-stone-600 pl-2 border-l border-stone-200">
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-sm bg-stone-100 border border-stone-300" />
            <span>0 tercatat</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-sm bg-stone-200 border border-stone-400" />
            <span>Data belum tersedia</span>
          </div>
        </div>
      </div>
    </div>
  );
};
