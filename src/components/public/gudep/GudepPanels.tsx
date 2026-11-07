import React from 'react';
import { GudepData } from '../../../types/scout';
import { MapPin, Phone, Mail } from 'lucide-react';

export const GudepInfoPanel: React.FC<{ gudep: GudepData }> = ({ gudep }) => (
  <div className="md:col-span-2 bg-white p-5 rounded-3xl border border-stone-200 shadow-xs space-y-4">
    <h2 className="text-sm font-black text-stone-900 uppercase tracking-wider">Informasi Pangkalan & Kepengurusan</h2>
    <div className="space-y-3 text-xs text-stone-700">
      <div>
        <span className="text-stone-400 block text-[11px]">Ketua Majelis Pembimbing Gugus Depan (Ka Mabigus)</span>
        <strong className="text-stone-900 text-sm font-bold">{gudep.kamabigus || 'Kepala Sekolah Pangkalan'}</strong>
      </div>
      <div>
        <span className="text-stone-400 block text-[11px]">Ketua Gugus Depan (Ka Gudep)</span>
        <strong className="text-stone-900 text-sm font-bold">{gudep.pembina || 'Kak Pembina Mahir'}</strong>
      </div>
      <div className="flex items-center gap-2 pt-2 border-t border-stone-100"><MapPin className="w-4 h-4 text-stone-400 shrink-0" /><span>{gudep.alamat}</span></div>
      {gudep.koordinat && (
        <div className="flex items-center justify-between text-[11px] text-stone-500 bg-stone-50 p-2 rounded-xl border border-stone-200/60 font-mono">
          <span>GPS: {gudep.koordinat.lat}, {gudep.koordinat.lng}</span>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${gudep.koordinat.lat},${gudep.koordinat.lng}`}
            target="_blank"
            rel="noreferrer"
            className="text-emerald-700 font-bold hover:underline"
          >
            Buka Peta Google
          </a>
        </div>
      )}
      <div className="flex items-center gap-2"><Phone className="w-4 h-4 text-stone-400 shrink-0" /><span>{gudep.telepon || '(021) 775-1234'}</span></div>
      <div className="flex items-center gap-2"><Mail className="w-4 h-4 text-stone-400 shrink-0" /><span>{gudep.email || 'gudep@sekolah.sch.id'}</span></div>
    </div>
  </div>
);

export const GudepActionSidePanel: React.FC<{
  onApplyAffiliation?: () => void;
  onOpenAuth?: () => void;
}> = ({ onApplyAffiliation, onOpenAuth }) => (
  <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-xs space-y-4 flex flex-col justify-between">
    <div className="space-y-2">
      <h3 className="text-xs font-black text-stone-900 uppercase tracking-wider">Bergabung dengan Gudep Ini</h3>
      <p className="text-[11px] text-stone-600 leading-relaxed">
        Peserta didik dan pembina dapat mengajukan pengaitan keanggotaan digital ke pangkalan ini secara langsung melalui sistem.
      </p>
    </div>
    <div className="space-y-2 pt-3 border-t border-stone-100">
      {onApplyAffiliation && (
        <button onClick={onApplyAffiliation} className="w-full py-2.5 px-3 rounded-xl bg-[#2E7D32] hover:bg-[#1B5E20] text-white text-xs font-bold transition-all shadow-xs">
          Ajukan Pengaitan Gudep
        </button>
      )}
      {onOpenAuth && (
        <button onClick={onOpenAuth} className="w-full py-2.5 px-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold">
          Masuk Akun Pramuka
        </button>
      )}
    </div>
  </div>
);
