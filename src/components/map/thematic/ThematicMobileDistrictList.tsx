import React from 'react';
import { ThematicDistrict, ThematicMetricDef } from './thematicMapTypes';
import { ThematicDistrictCard } from './ThematicDistrictCard';

interface ThematicMobileDistrictListProps {
  districts: ThematicDistrict[];
  activeMetric: ThematicMetricDef;
  maxVal: number;
  selectedDistrictId: string | null;
  onSelectDistrict: (id: string) => void;
}

export const ThematicMobileDistrictList: React.FC<ThematicMobileDistrictListProps> = ({
  districts,
  activeMetric,
  maxVal,
  selectedDistrictId,
  onSelectDistrict,
}) => {
  return (
    <div className="lg:hidden space-y-2">
      <div className="flex items-center justify-between text-xs font-black text-stone-700 px-1">
        <span>Daftar Statistik 11 Kecamatan:</span>
        <span className="text-[10px] text-stone-600">Ketuk untuk rincian Gudep</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {districts.map((d, idx) => (
          <ThematicDistrictCard
            key={`mobile-${d.id}`}
            district={d}
            activeMetric={activeMetric}
            maxVal={maxVal}
            isSelected={selectedDistrictId === d.id}
            isHovered={false}
            onSelect={onSelectDistrict}
            onMouseEnter={() => {}}
            onMouseLeave={() => {}}
            anchorSide={idx % 2 === 0 ? 'left' : 'right'}
          />
        ))}
      </div>
    </div>
  );
};
