import React from 'react';
import { UserProfile } from '../../types/scout';
import { Shield } from 'lucide-react';

export const ActiveSakaCard: React.FC<{ user: UserProfile }> = ({ user }) => {
  if (!user.saka) return null;
  return (
    <div className="mb-4 p-4 rounded-3xl bg-white border-2 border-blue-600/30 shadow-md">
      <div className="flex items-center justify-between pb-2 border-b border-stone-100">
        <span className="text-[10px] font-extrabold text-blue-700 uppercase tracking-wider">Status Saka Aktif Anda</span>
        <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">Terdaftar Resmi</span>
      </div>
      <div className="flex items-center gap-3 mt-3">
        <div className="w-12 h-12 rounded-2xl bg-blue-700 text-white flex items-center justify-center font-black shadow-md shrink-0">
          <Shield className="w-7 h-7" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-extrabold text-stone-900 leading-tight">{user.saka.nama}</h4>
          <p className="text-xs font-bold text-blue-800 mt-0.5">{user.saka.krida}</p>
          <p className="text-[10px] text-stone-500 mt-0.5">Pangkalan: {user.saka.pangkalanSaka}</p>
        </div>
      </div>
    </div>
  );
};
