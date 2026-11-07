import React from 'react';
import { Clock, ShieldAlert, CheckCircle, X } from 'lucide-react';

interface PendingReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  claimId?: string;
  nta: string;
  pangkalan?: string;
  kwarran?: string;
}

function PendingReviewHeader({ onClose }: { onClose: () => void }) {
  return (
    <div className="p-4 bg-gradient-to-r from-amber-800 to-amber-700 text-white flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center text-amber-200">
          <Clock className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-sm font-bold">Pengaitan Menunggu Pemeriksaan</h3>
          <p className="text-[10px] text-amber-200">Verifikasi Dokumen & Identitas Kwartir</p>
        </div>
      </div>
      <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

function PendingReviewDetails({ nta, claimId, pangkalan, kwarran }: any) {
  return (
    <div className="grid grid-cols-2 gap-2.5 p-3 bg-stone-50 rounded-2xl border border-stone-200">
      <div>
        <span className="text-[10px] text-stone-400 block font-semibold uppercase">Nomor KTA Ayo Pramuka</span>
        <span className="font-mono font-bold text-stone-900 text-sm">{nta}</span>
      </div>
      <div>
        <span className="text-[10px] text-stone-400 block font-semibold uppercase">ID Pengajuan</span>
        <span className="font-mono text-stone-700">{claimId || 'CLM-2026-092'}</span>
      </div>
      <div>
        <span className="text-[10px] text-stone-400 block font-semibold uppercase">Pangkalan Terdaftar</span>
        <span className="font-semibold text-stone-800">{pangkalan || 'SMA Negeri 1 Depok'}</span>
      </div>
      <div>
        <span className="text-[10px] text-stone-400 block font-semibold uppercase">Wilayah Ranting</span>
        <span className="font-semibold text-stone-800">{kwarran || 'Pancoran Mas'}</span>
      </div>
    </div>
  );
}

export const PendingReviewModal: React.FC<PendingReviewModalProps> = (p) => {
  if (!p.isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-stone-200 flex flex-col">
        <PendingReviewHeader onClose={p.onClose} />
        <div className="p-5 space-y-4 text-xs text-stone-700">
          <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-200/80 space-y-2">
            <div className="flex items-center gap-2 text-amber-900 font-bold">
              <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0" />
              <span>Permohonan Pengaitan Berhasil Didaftarkan</span>
            </div>
            <p className="text-[11px] text-amber-800 leading-relaxed">
              Nomor KTA ditemukan pada pangkalan data resmi. Karena perbedaan email atau perlunya validasi hak akses, klaim diteruskan ke Pembina / Admin Kwartir.
            </p>
          </div>
          <PendingReviewDetails nta={p.nta} claimId={p.claimId} pangkalan={p.pangkalan} kwarran={p.kwarran} />
          <div className="p-3 rounded-2xl bg-stone-100 text-stone-600 text-[11px] space-y-1">
            <span className="font-bold text-stone-800 block">Kebijakan Perlindungan Privasi:</span>
            <p className="leading-relaxed">Data pribadi lengkap tidak dapat diakses sampai permohonan disahkan oleh Admin berwenang.</p>
          </div>
          <button onClick={p.onClose} className="w-full py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold flex items-center justify-center gap-1.5 transition-all">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>Mengerti & Kembali ke Beranda</span>
          </button>
        </div>
      </div>
    </div>
  );
};
