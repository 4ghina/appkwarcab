import React from 'react';
import { CheckSquare } from 'lucide-react';

interface AdminTaskCardProps {
  kwarcab?: string;
  pendingVerifCount: number;
  onOpenVerification: () => void;
}

export const AdminTaskCard: React.FC<AdminTaskCardProps> = ({
  kwarcab,
  pendingVerifCount,
  onOpenVerification,
}) => {
  return (
    <div className="p-4 bg-white rounded-3xl border border-stone-200 shadow-2xs space-y-2.5">
      <div className="flex items-center justify-between pb-2 border-b border-stone-100">
        <div>
          <span className="text-[10px] font-bold text-purple-800 uppercase tracking-wider block">
            Antrean Wilayah ({kwarcab || 'Kwarcab Kota Depok'})
          </span>
          <h4 className="text-xs font-extrabold text-stone-900">
            Verifikasi Berkas Keanggotaan & NTA
          </h4>
        </div>
        <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-900 text-[10px] font-mono font-bold">
          {pendingVerifCount} Permohonan
        </span>
      </div>

      <p className="text-[11px] text-stone-600">
        Validasi permohonan pengaitan pangkalan Gudep baru dan mutasi anggota.
      </p>

      <button
        type="button"
        onClick={onOpenVerification}
        className="w-full py-2.5 px-3 rounded-xl bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
      >
        <CheckSquare className="w-3.5 h-3.5" />
        <span>Buka Antrean Verifikasi Admin ({pendingVerifCount})</span>
      </button>
    </div>
  );
};
