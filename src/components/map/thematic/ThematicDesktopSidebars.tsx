import React from 'react';
import { ThematicDistrict, ThematicMetricDef } from './thematicMapTypes';
import { ThematicDistrictCard } from './ThematicDistrictCard';

interface ThematicDesktopSidebarsProps {
  districts: ThematicDistrict[];
  activeMetric: ThematicMetricDef;
  maxVal: number;
  selectedDistrictId: string | null;
  hoveredDistrictId: string | null;
  onSelectDistrict: (id: string) => void;
  onHoverDistrict: (id: string | null) => void;
}

export const ThematicLeftSidebar: React.FC<ThematicDesktopSidebarsProps> = ({
  districts,
  activeMetric,
  maxVal,
  selectedDistrictId,
  hoveredDistrictId,
  onSelectDistrict,
  onHoverDistrict,
}) => {
  const leftDistricts = districts.slice(0, 5);

  return (
    <div className="w-60 flex flex-col justify-between py-2 space-y-2 shrink-0">
      <div className="text-[10px] font-black uppercase tracking-wider text-stone-600 px-1">
        Kecamatan Bagian Barat & Selatan
      </div>
      {leftDistricts.map((d) => (
        <ThematicDistrictCard
          key={`left-${d.id}`}
          district={d}
          activeMetric={activeMetric}
          maxVal={maxVal}
          isSelected={selectedDistrictId === d.id}
          isHovered={hoveredDistrictId === d.id}
          onSelect={onSelectDistrict}
          onMouseEnter={(id) => onHoverDistrict(id)}
          onMouseLeave={() => onHoverDistrict(null)}
          anchorSide="left"
        />
      ))}
    </div>
  );
};

export const ThematicRightSidebar: React.FC<ThematicDesktopSidebarsProps> = ({
  districts,
  activeMetric,
  maxVal,
  selectedDistrictId,
  hoveredDistrictId,
  onSelectDistrict,
  onHoverDistrict,
}) => {
  const rightDistricts = districts.slice(5, 11);

  return (
    <div className="w-60 flex flex-col justify-between py-2 space-y-2 shrink-0">
      <div className="text-[10px] font-black uppercase tracking-wider text-stone-600 px-1 text-right">
        Kecamatan Pusat & Timur
      </div>
      {rightDistricts.map((d) => (
        <ThematicDistrictCard
          key={`right-${d.id}`}
          district={d}
          activeMetric={activeMetric}
          maxVal={maxVal}
          isSelected={selectedDistrictId === d.id}
          isHovered={hoveredDistrictId === d.id}
          onSelect={onSelectDistrict}
          onMouseEnter={(id) => onHoverDistrict(id)}
          onMouseLeave={() => onHoverDistrict(null)}
          anchorSide="right"
        />
      ))}
    </div>
  );
};
