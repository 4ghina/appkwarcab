export interface ColorRamp {
  bg: string;
  fill: string;
  stroke: string;
  text: string;
  badgeBg: string;
  badgeText: string;
}

const PALETTES: Record<string, string[]> = {
  amber: ['#FEF3C7', '#FDE68A', '#FBBF24', '#F59E0B', '#D97706', '#92400E', '#78350F'],
  emerald: ['#ECFDF5', '#A7F3D0', '#6EE7B7', '#10B981', '#059669', '#047857', '#064E3B'],
  rose: ['#FFF1F2', '#FECDD3', '#FDA4AF', '#F43F5E', '#E11D48', '#BE123C', '#881337'],
  purple: ['#FAF5FF', '#E9D5FF', '#D8B4FE', '#A855F7', '#9333EA', '#7E22CE', '#581C87'],
  blue: ['#EFF6FF', '#BFDBFE', '#93C5FD', '#3B82F6', '#2563EB', '#1D4ED8', '#1E3A8A'],
};

export function getDistrictColor(
  val: number,
  maxVal: number,
  status: 'verified' | 'unreported' | 'empty',
  colorScheme: 'amber' | 'emerald' | 'blue' | 'purple' | 'rose' = 'amber'
): ColorRamp {
  if (status === 'unreported') {
    return {
      bg: '#F3F4F6',
      fill: '#E5E7EB',
      stroke: '#9CA3AF',
      text: '#6B7280',
      badgeBg: '#D1D5DB',
      badgeText: '#374151',
    };
  }

  if (val === 0 || status === 'empty') {
    return {
      bg: '#F9FAFB',
      fill: '#F3F4F6',
      stroke: '#D1D5DB',
      text: '#4B5563',
      badgeBg: '#E5E7EB',
      badgeText: '#4B5563',
    };
  }

  const palette = PALETTES[colorScheme] || PALETTES.amber;
  const ratio = Math.min(1, Math.max(0.1, maxVal > 0 ? val / maxVal : 0.5));
  const idx = Math.min(palette.length - 1, Math.floor(ratio * (palette.length - 1)));
  const hex = palette[idx];

  return {
    bg: hex,
    fill: hex,
    stroke: palette[Math.min(palette.length - 1, idx + 1)],
    text: idx > 3 ? '#FFFFFF' : '#1F2937',
    badgeBg: palette[Math.min(palette.length - 1, idx + 2)],
    badgeText: '#FFFFFF',
  };
}
