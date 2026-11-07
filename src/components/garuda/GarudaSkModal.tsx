import React from 'react';
import { Award, X, Download } from 'lucide-react';
import { GarudaApplication } from '../../types/scout';

interface GarudaSkModalProps {
  app: GarudaApplication;
  onClose: () => void;
}

export const GarudaSkModal: React.FC<GarudaSkModalProps> = ({ app, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="w-full max-w-sm bg-white rounded-3xl p-5 shadow-2xl border border-stone-200 text-stone-900 space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-stone-100">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-600" />
            <h4 className="text-xs font-bold text-stone-900">Salinan Surat Keputusan Garuda</h4>
          </div>
          <button onClick={onClose} className="p-1 rounded-full text-stone-400">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 bg-amber-50/50 rounded-2xl border border-amber-200 text-center space-y-2">
          <span className="text-[10px] font-mono font-bold text-amber-900 block">
            KWARTIR CABANG KOTA DEPOK
          </span>
          <p className="text-xs font-bold text-stone-900 leading-tight">
            PENGANUGERAHAN TANDA PENGHARGAAN PRAMUKA GARUDA
          </p>
          <div className="pt-2 text-[11px] text-stone-700 space-y-1 text-left border-t border-amber-200/60">
            <p><strong>Nama:</strong> {app.applicantName}</p>
            <p><strong>Pangkalan:</strong> {app.gudep}</p>
            <p><strong>Nomor SK:</strong> SK-GARUDA/09.22/2026/042</p>
            <p><strong>Tanggal Terbit:</strong> 14 Agustus 2026</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2 bg-stone-100 text-stone-700 text-xs font-semibold rounded-xl"
        >
          Tutup
        </button>
      </div>
    </div>
  );
};
