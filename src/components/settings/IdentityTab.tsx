import React from 'react';
import { Save } from 'lucide-react';
import { AppIdentityConfig } from '../../types/config';

interface IdentityTabProps {
  draftConfig: AppIdentityConfig;
  setDraftConfig: React.Dispatch<React.SetStateAction<AppIdentityConfig>>;
  onSave(): void;
  isSaving: boolean;
}

const FIELDS: Array<{ label: string; key: keyof AppIdentityConfig; full?: boolean; type?: string }> = [
  { label: 'Nama Aplikasi:', key: 'appName' },
  { label: 'Nama Singkat:', key: 'appShortName' },
  { label: 'Nama Kwartir Cabang:', key: 'kwarcabName' },
  { label: 'Nomor Kwarcab:', key: 'kwarcabNomor' },
  { label: 'Nama Kwartir Daerah:', key: 'kwardaName' },
  { label: 'Motto Gerakan Pramuka:', key: 'motto' },
  { label: 'Alamat Kantor Kwartir:', key: 'address', full: true },
  { label: 'Email Resmi:', key: 'email', type: 'email' },
  { label: 'Nomor WhatsApp Pelayanan:', key: 'whatsapp' },
];

export const IdentityTab: React.FC<IdentityTabProps> = ({ draftConfig, setDraftConfig, onSave, isSaving }) => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-base font-bold text-stone-900">Identitas Resmi Organisasi & Kwartir</h3>
        <p className="text-xs text-stone-500">Sesuaikan nama lembaga, nomor kwartir, alamat, dan kontak resmi.</p>
      </div>
      <button
        onClick={onSave}
        disabled={isSaving}
        className="flex items-center gap-1.5 px-4 py-2 bg-[#5D4037] hover:bg-[#4E342E] text-white rounded-xl text-xs font-bold disabled:opacity-50 transition-colors shadow-xs"
      >
        <Save className="w-3.5 h-3.5" />
        <span>{isSaving ? 'Menyimpan...' : 'Simpan Perubahan'}</span>
      </button>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {FIELDS.map((f) => (
        <div key={f.key} className={f.full ? 'md:col-span-2' : ''}>
          <label className="block text-xs font-semibold text-stone-700 mb-1">{f.label}</label>
          <input
            type={f.type || 'text'}
            value={String(draftConfig[f.key] || '')}
            onChange={(e) => setDraftConfig(prev => ({ ...prev, [f.key]: e.target.value }))}
            className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 focus:outline-none focus:border-[#5D4037]"
          />
        </div>
      ))}
    </div>
  </div>
);
