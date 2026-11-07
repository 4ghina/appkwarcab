import React from 'react';

interface ColorPickerFieldProps {
  label: string;
  value: string;
  onChange(val: string): void;
}

export const ColorPickerField: React.FC<ColorPickerFieldProps> = ({ label, value, onChange }) => (
  <div>
    <label className="block text-xs font-semibold text-stone-700 mb-1">{label}</label>
    <div className="flex items-center gap-2">
      <input
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-9 h-9 rounded-lg border border-stone-300 cursor-pointer"
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 px-3 py-2 text-xs rounded-xl border border-stone-300 font-mono"
      />
    </div>
  </div>
);
