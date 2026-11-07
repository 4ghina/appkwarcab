import React from 'react';

interface GudepDemographicsSectionProps {
  siaga: number;
  penggalang: number;
  penegak: number;
  pandega: number;
  pembina: string;
  kontakWa: string;
  alamat: string;
  onChange: (fields: any) => void;
}

const StudentGridInputs: React.FC<{
  siaga: number;
  penggalang: number;
  penegak: number;
  pandega: number;
  onChange: (f: any) => void;
}> = (p) => (
  <div className="p-3 bg-stone-50 border border-stone-200 rounded-2xl space-y-2">
    <span className="font-bold text-stone-900 block text-[11px]">Demografi Peserta Didik Aktif</span>
    <div className="grid grid-cols-4 gap-2">
      <div>
        <label className="text-[10px] text-emerald-800 font-bold">Siaga</label>
        <input type="number" value={p.siaga} onChange={(e) => p.onChange({ siaga: parseInt(e.target.value) || 0 })} className="w-full px-2 py-1 border border-stone-300 rounded text-xs bg-white" />
      </div>
      <div>
        <label className="text-[10px] text-rose-800 font-bold">Penggalang</label>
        <input type="number" value={p.penggalang} onChange={(e) => p.onChange({ penggalang: parseInt(e.target.value) || 0 })} className="w-full px-2 py-1 border border-stone-300 rounded text-xs bg-white" />
      </div>
      <div>
        <label className="text-[10px] text-amber-800 font-bold">Penegak</label>
        <input type="number" value={p.penegak} onChange={(e) => p.onChange({ penegak: parseInt(e.target.value) || 0 })} className="w-full px-2 py-1 border border-stone-300 rounded text-xs bg-white" />
      </div>
      <div>
        <label className="text-[10px] text-purple-800 font-bold">Pandega</label>
        <input type="number" value={p.pandega} onChange={(e) => p.onChange({ pandega: parseInt(e.target.value) || 0 })} className="w-full px-2 py-1 border border-stone-300 rounded text-xs bg-white" />
      </div>
    </div>
  </div>
);

export const GudepDemographicsSection: React.FC<GudepDemographicsSectionProps> = (p) => (
  <div className="space-y-3">
    <StudentGridInputs siaga={p.siaga} penggalang={p.penggalang} penegak={p.penegak} pandega={p.pandega} onChange={p.onChange} />
    <div className="grid grid-cols-2 gap-3">
      <div>
        <label className="block text-[11px] font-bold text-stone-900 mb-1">Pembina Gudep</label>
        <input type="text" value={p.pembina} onChange={(e) => p.onChange({ pembina: e.target.value })} className="w-full px-3 py-2 border border-stone-300 rounded-xl bg-stone-50" required />
      </div>
      <div>
        <label className="block text-[11px] font-bold text-stone-900 mb-1">WhatsApp Pembina</label>
        <input type="text" value={p.kontakWa} onChange={(e) => p.onChange({ kontakWa: e.target.value })} className="w-full px-3 py-2 border border-stone-300 rounded-xl bg-stone-50" />
      </div>
    </div>
    <div>
      <label className="block text-[11px] font-bold text-stone-900 mb-1">Alamat Sekolah</label>
      <textarea rows={2} value={p.alamat} onChange={(e) => p.onChange({ alamat: e.target.value })} className="w-full px-3 py-2 border border-stone-300 rounded-xl bg-stone-50" required />
    </div>
  </div>
);
