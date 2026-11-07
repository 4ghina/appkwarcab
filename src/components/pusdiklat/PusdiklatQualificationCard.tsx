import React from 'react';
import { UserProfile } from '../../types/scout';
import { FileCheck } from 'lucide-react';

export const PusdiklatQualificationCard: React.FC<{ user: UserProfile }> = ({ user }) => {
  const isAdultLeader = ['pembina', 'superadmin_kwarcab', 'admin_pusdiklatcab_saka'].includes(user.role);
  return (
    <div className="p-4 bg-white rounded-3xl border border-stone-200/90 shadow-sm mb-4">
      <div className="flex items-center justify-between pb-2.5 border-b border-stone-100">
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#5D4037] flex items-center gap-1.5">
          <FileCheck className="w-4 h-4 text-amber-600" />
          Kualifikasi Ijazah & Lisensi Pembina
        </h4>
        <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
          {isAdultLeader ? 'Pembina Terdaftar' : 'Akun Anggota Muda'}
        </span>
      </div>
      <div className="grid grid-cols-4 gap-2 my-3 text-center">
        <div className="p-2 rounded-2xl bg-emerald-50 border border-emerald-200"><span className="text-xs font-black text-emerald-800 block">KMD</span><span className="text-[9px] text-emerald-700 font-semibold">✓ Lulus 2021</span></div>
        <div className="p-2 rounded-2xl bg-emerald-50 border border-emerald-200"><span className="text-xs font-black text-emerald-800 block">KML</span><span className="text-[9px] text-emerald-700 font-semibold">✓ Lulus 2024</span></div>
        <div className="p-2 rounded-2xl bg-stone-50 border border-stone-200 opacity-60"><span className="text-xs font-black text-stone-600 block">KPD</span><span className="text-[9px] text-stone-500 font-semibold">Rencana 2026</span></div>
        <div className="p-2 rounded-2xl bg-stone-50 border border-stone-200 opacity-60"><span className="text-xs font-black text-stone-600 block">KPL</span><span className="text-[9px] text-stone-500 font-semibold">Tahap Lanjut</span></div>
      </div>
      <div className="p-3 bg-amber-50/70 rounded-2xl border border-amber-200/80 text-xs flex items-center justify-between">
        <div>
          <span className="text-[10px] text-amber-800 font-bold block uppercase tracking-wider">Surat Hak Bina (SHB) Aktif</span>
          <span className="font-mono font-bold text-stone-900 text-xs">SHB-2024-KML-0089</span>
        </div>
        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-200/80 text-amber-950">Berlaku s.d. 2027</span>
      </div>
    </div>
  );
};
