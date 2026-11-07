import React from 'react';
import { MapKwarranEntity, JenjangSekolah } from '../mapTypes';

interface GudepBasicFieldsProps {
  pangkalan: string;
  kwarranId: string;
  jenjang: JenjangSekolah;
  nomorPa: string;
  nomorPi: string;
  kwarrans: MapKwarranEntity[];
  onChange: (fields: any) => void;
}

const GudepNumberInputs: React.FC<{
  jenjang: JenjangSekolah;
  nomorPa: string;
  nomorPi: string;
  onChange: (f: any) => void;
}> = (p) => (
  <div className="grid grid-cols-3 gap-2">
    <div>
      <label className="block text-[10px] font-bold text-stone-900 mb-1">Jenjang</label>
      <select value={p.jenjang} onChange={(e) => p.onChange({ jenjang: e.target.value as JenjangSekolah })} className="w-full px-2 py-1.5 border border-stone-300 rounded-lg text-xs">
        <option value="SD/MI">SD/MI</option>
        <option value="SMP/MTs">SMP/MTs</option>
        <option value="SMA/SMK/MA">SMA/SMK/MA</option>
        <option value="Perguruan Tinggi">Perguruan Tinggi</option>
      </select>
    </div>
    <div>
      <label className="block text-[10px] font-bold text-stone-900 mb-1">No. Gudep Pa</label>
      <input type="text" value={p.nomorPa} onChange={(e) => p.onChange({ nomorPa: e.target.value })} className="w-full px-2 py-1.5 border border-stone-300 rounded-lg text-xs" required />
    </div>
    <div>
      <label className="block text-[10px] font-bold text-stone-900 mb-1">No. Gudep Pi</label>
      <input type="text" value={p.nomorPi} onChange={(e) => p.onChange({ nomorPi: e.target.value })} className="w-full px-2 py-1.5 border border-stone-300 rounded-lg text-xs" required />
    </div>
  </div>
);

export const GudepBasicFields: React.FC<GudepBasicFieldsProps> = (p) => (
  <div className="space-y-3">
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <div>
        <label className="block text-[11px] font-bold text-stone-900 mb-1">Nama Pangkalan (Sekolah)</label>
        <input type="text" placeholder="Contoh: SMAN 1 Depok" value={p.pangkalan} onChange={(e) => p.onChange({ pangkalan: e.target.value })} className="w-full px-3 py-2 border border-stone-300 rounded-xl bg-stone-50" required />
      </div>
      <div>
        <label className="block text-[11px] font-bold text-stone-900 mb-1">Kwartir Ranting</label>
        <select value={p.kwarranId} onChange={(e) => p.onChange({ kwarranId: e.target.value })} className="w-full px-3 py-2 border border-stone-300 rounded-xl bg-stone-50">
          {p.kwarrans.map((k) => <option key={k.id} value={k.id}>{k.name} ({k.kecamatan})</option>)}
        </select>
      </div>
    </div>
    <GudepNumberInputs jenjang={p.jenjang} nomorPa={p.nomorPa} nomorPi={p.nomorPi} onChange={p.onChange} />
  </div>
);
