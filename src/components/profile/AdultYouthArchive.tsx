import React, { useState } from 'react';
import { History, ChevronDown } from 'lucide-react';
import { UserProfile } from '../../types/scout';

export const AdultYouthArchive: React.FC<{ user: UserProfile }> = ({ user }) => {
  const [open, setOpen] = useState(false);
  const archive = user.youthArchive;
  if (!archive?.hasYouthRecord) return null;

  return (
    <div className="pt-2 border-t border-stone-100">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-2 rounded-2xl bg-amber-50 hover:bg-amber-100/70 border border-amber-300 text-left transition-all"
      >
        <div className="flex items-center gap-2">
          <History className="w-4 h-4 text-amber-800 shrink-0" />
          <div>
            <h4 className="text-xs font-bold text-amber-950">Arsip Riwayat Masa Muda</h4>
            <p className="text-[9px] text-amber-800">Prestasi kepramukaan saat peserta didik</p>
          </div>
        </div>
        <ChevronDown className={`w-4 h-4 text-amber-800 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="mt-2 p-3 bg-stone-50 rounded-2xl border border-stone-200 text-xs space-y-1.5 animate-in fade-in duration-150">
          <div className="flex items-center justify-between">
            <span className="text-stone-500">Jenjang Tertinggi:</span>
            <span className="font-bold text-stone-900">{archive.highestTingkat}</span>
          </div>
          {archive.garudaYear && (
            <div className="flex items-center justify-between">
              <span className="text-stone-500">Pramuka Garuda Tahun:</span>
              <span className="font-bold text-amber-700">{archive.garudaYear}</span>
            </div>
          )}
          {archive.tkkBadgesCount && (
            <div className="flex items-center justify-between">
              <span className="text-stone-500">Koleksi TKK:</span>
              <span className="font-bold text-stone-900">{archive.tkkBadgesCount} Lencana</span>
            </div>
          )}
          {archive.historicalGudep && (
            <div className="flex items-center justify-between">
              <span className="text-stone-500">Gugus Depan Asal:</span>
              <span className="font-semibold text-stone-800">{archive.historicalGudep}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
