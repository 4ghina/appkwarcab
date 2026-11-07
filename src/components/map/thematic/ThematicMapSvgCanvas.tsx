import React from 'react';
import { DISTRICT_SVG_GEOS, DistrictSvgGeo } from './thematicGeoData';
import { ThematicDistrict, ThematicMetricDef } from './thematicMapTypes';
import { getDistrictColor } from './thematicColorScale';
import { ThematicLeaderLines } from './ThematicLeaderLines';

export const DistrictPolygonItem: React.FC<{
  geo: DistrictSvgGeo;
  district?: ThematicDistrict;
  activeMetric: ThematicMetricDef;
  maxVal: number;
  isSelected: boolean;
  isHovered: boolean;
  onSelect: (id: string) => void;
  onHover: (id: string | null) => void;
}> = ({ geo, district, activeMetric, maxVal, isSelected, isHovered, onSelect, onHover }) => {
  const metricRes = district?.metrics[activeMetric.id] || { value: 0, status: 'empty' };
  const colorRamp = getDistrictColor(metricRes.value, maxVal, metricRes.status, activeMetric.colorScheme);

  return (
    <path
      d={geo.d}
      fill={colorRamp.fill}
      stroke={isSelected ? '#78350F' : isHovered ? '#D97706' : colorRamp.stroke}
      strokeWidth={isSelected ? 3.5 : isHovered ? 2.5 : 1.5}
      strokeLinejoin="round"
      className="cursor-pointer transition-all duration-200"
      style={{
        filter: isSelected ? 'url(#thematicGlow)' : undefined,
        opacity: isSelected ? 1 : isHovered ? 0.95 : 0.88,
      }}
      onClick={() => onSelect(geo.id)}
      onMouseEnter={() => onHover(geo.id)}
      onMouseLeave={() => onHover(null)}
    />
  );
};

export const DistrictBadgeItem: React.FC<{
  geo: DistrictSvgGeo;
  district?: ThematicDistrict;
  activeMetricId: string;
  isSelected: boolean;
  isHovered: boolean;
}> = ({ geo, district, activeMetricId, isSelected, isHovered }) => {
  const metricRes = district?.metrics[activeMetricId] || { value: 0, status: 'empty' };
  const badgeVal = metricRes.status === 'unreported' ? '-' : metricRes.value.toLocaleString('id-ID');

  return (
    <g transform={`translate(${geo.badgePos.x}, ${geo.badgePos.y - 12})`} className="transition-transform duration-200">
      <text
        x="0"
        y="-10"
        textAnchor="middle"
        className={`text-[11px] font-black tracking-tight ${isSelected ? 'fill-stone-950 font-black' : 'fill-stone-800'}`}
        style={{ textShadow: '0 1px 2px rgba(255,255,255,0.9)' }}
      >
        {geo.name}
      </text>
      <rect
        x="-22"
        y="-3"
        width="44"
        height="18"
        rx="9"
        fill={isSelected ? '#78350F' : isHovered ? '#D97706' : '#1C1917'}
        stroke="#FFFFFF"
        strokeWidth="1.5"
      />
      <text x="0" y="10" textAnchor="middle" className="fill-white text-[10px] font-extrabold">
        {badgeVal}
      </text>
    </g>
  );
};

interface ThematicMapSvgCanvasProps {
  districts: ThematicDistrict[];
  activeMetric: ThematicMetricDef;
  maxVal: number;
  selectedDistrictId: string | null;
  hoveredDistrictId: string | null;
  onSelectDistrict: (id: string) => void;
  onHoverDistrict: (id: string | null) => void;
}

export const ThematicMapSvgCanvas: React.FC<ThematicMapSvgCanvasProps> = (p) => {
  const districtMap = React.useMemo(() => {
    const map = new Map<string, ThematicDistrict>();
    p.districts.forEach((d) => map.set(d.id, d));
    return map;
  }, [p.districts]);

  return (
    <div className="relative w-full aspect-[940/680] max-w-full mx-auto select-none overflow-hidden rounded-2xl bg-gradient-to-b from-stone-50/60 to-amber-50/30 border border-stone-200/70 shadow-inner">
      <svg viewBox="0 0 940 680" className="w-full h-full" style={{ transition: 'all 250ms ease' }}>
        <defs>
          <filter id="thematicGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#D97706" floodOpacity="0.4" />
          </filter>
        </defs>
        <ThematicLeaderLines selectedDistrictId={p.selectedDistrictId} hoveredDistrictId={p.hoveredDistrictId} />
        <g className="district-polygons">
          {DISTRICT_SVG_GEOS.map((geo) => (
            <DistrictPolygonItem
              key={`poly-${geo.id}`}
              geo={geo}
              district={districtMap.get(geo.id)}
              activeMetric={p.activeMetric}
              maxVal={p.maxVal}
              isSelected={p.selectedDistrictId === geo.id}
              isHovered={p.hoveredDistrictId === geo.id}
              onSelect={p.onSelectDistrict}
              onHover={p.onHoverDistrict}
            />
          ))}
        </g>
        <g className="district-badges pointer-events-none">
          {DISTRICT_SVG_GEOS.map((geo) => (
            <DistrictBadgeItem
              key={`badge-${geo.id}`}
              geo={geo}
              district={districtMap.get(geo.id)}
              activeMetricId={p.activeMetric.id}
              isSelected={p.selectedDistrictId === geo.id}
              isHovered={p.hoveredDistrictId === geo.id}
            />
          ))}
        </g>
      </svg>
    </div>
  );
};
