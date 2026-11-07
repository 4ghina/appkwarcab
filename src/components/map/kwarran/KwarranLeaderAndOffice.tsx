import React from 'react';

export const KwarranLeaderAndOffice: React.FC<{
  ketuaKwarran: string;
  warnaTema: string;
  alamatKantor: string;
  onChange: (f: any) => void;
}> = (p) => (
  <>
    <div className="grid grid-cols-2 gap-3">
      <div>
        <label className="block text-[11px] font-bold text-stone-900 mb-1">Ketua Kwarran</label>
        <input type="text" value={p.ketuaKwarran} onChange={(e) => p.onChange({ ketuaKwarran: e.target.value })} className="w-full px-3 py-2 border border-stone-300 rounded-xl bg-stone-50" />
      </div>
      <div>
        <label className="block text-[11px] font-bold text-stone-900 mb-1">Warna Label</label>
        <input type="color" value={p.warnaTema} onChange={(e) => p.onChange({ warnaTema: e.target.value })} className="w-full h-9 p-1 border border-stone-300 rounded-xl bg-stone-50 cursor-pointer" />
      </div>
    </div>
    <div>
      <label className="block text-[11px] font-bold text-stone-900 mb-1">Alamat Kantor Kwarran</label>
      <textarea rows={2} value={p.alamatKantor} onChange={(e) => p.onChange({ alamatKantor: e.target.value })} className="w-full px-3 py-2 border border-stone-300 rounded-xl bg-stone-50" />
    </div>
  </>
);
