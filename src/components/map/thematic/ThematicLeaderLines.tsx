import React from 'react';
import { DISTRICT_SVG_GEOS, DistrictSvgGeo } from './thematicGeoData';

interface LeaderLineItemProps {
  geo: DistrictSvgGeo;
  isSelected: boolean;
  isHovered: boolean;
}

export const LeaderLineItem: React.FC<LeaderLineItemProps> = ({ geo, isSelected, isHovered }) => {
  const isHighlighted = isSelected || isHovered;
  const startX = geo.cardAnchor.x;
  const startY = geo.cardAnchor.y;
  const endX = geo.centroid.x;
  const endY = geo.centroid.y;

  const midX = geo.anchorSide === 'left' ? startX + 35 : startX - 35;
  const pathData = `M ${startX} ${startY} L ${midX} ${startY} L ${endX} ${endY}`;

  return (
    <g className="transition-all duration-300">
      <path
        d={pathData}
        fill="none"
        stroke={isHighlighted ? '#D97706' : '#CBD5E1'}
        strokeWidth={isHighlighted ? 2.5 : 1.2}
        strokeDasharray={isHighlighted ? 'none' : '3 3'}
        strokeOpacity={isHighlighted ? 1 : 0.65}
      />
      <circle cx={startX} cy={startY} r={isHighlighted ? 4 : 2.5} fill={isHighlighted ? '#D97706' : '#94A3B8'} />
      <circle cx={endX} cy={endY} r={isHighlighted ? 5 : 3} fill={isHighlighted ? '#D97706' : '#64748B'} stroke="#FFFFFF" strokeWidth={1.5} />
    </g>
  );
};

interface ThematicLeaderLinesProps {
  selectedDistrictId: string | null;
  hoveredDistrictId: string | null;
}

export const ThematicLeaderLines: React.FC<ThematicLeaderLinesProps> = ({
  selectedDistrictId,
  hoveredDistrictId,
}) => (
  <g className="thematic-leader-lines pointer-events-none">
    {DISTRICT_SVG_GEOS.map((geo: DistrictSvgGeo) => (
      <LeaderLineItem
        key={`leader-${geo.id}`}
        geo={geo}
        isSelected={selectedDistrictId === geo.id}
        isHovered={hoveredDistrictId === geo.id}
      />
    ))}
  </g>
);
