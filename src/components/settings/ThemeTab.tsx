import React from 'react';
import { Save } from 'lucide-react';
import { AppIdentityConfig } from '../../types/config';
import { ColorPickerField } from './ColorPickerField';

interface ThemeTabProps {
  draftConfig: AppIdentityConfig;
  setDraftConfig: React.Dispatch<React.SetStateAction<AppIdentityConfig>>;
  onSave(): void;
  isSaving: boolean;
}

export const ThemeTab: React.FC<ThemeTabProps> = ({ draftConfig, setDraftConfig, onSave, isSaving }) => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-base font-bold text-stone-900">Tema Warna & Identitas Visual</h3>
        <p className="text-xs text-stone-500">Sesuaikan palet warna khas Gerakan Pramuka dan aplikasi.</p>
      </div>
      <button onClick={onSave} disabled={isSaving} className="flex items-center gap-1.5 px-4 py-2 bg-[#5D4037] hover:bg-[#4E342E] text-white rounded-xl text-xs font-bold">
        <Save className="w-3.5 h-3.5" /> Simpan Tema
      </button>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <ColorPickerField
        label="Warna Utama (Cokelat Pramuka):"
        value={draftConfig.colors?.primary || '#5D4037'}
        onChange={(val) => setDraftConfig(prev => ({ ...prev, colors: { ...prev.colors, primary: val } as any }))}
      />
      <ColorPickerField
        label="Warna Sekunder (Kuning Emas / Amber):"
        value={draftConfig.colors?.secondary || '#D97706'}
        onChange={(val) => setDraftConfig(prev => ({ ...prev, colors: { ...prev.colors, secondary: val } as any }))}
      />
    </div>
  </div>
);
