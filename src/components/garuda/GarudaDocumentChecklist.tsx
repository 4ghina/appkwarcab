import React from 'react';
import { Check, Clock, FileText } from 'lucide-react';

interface GarudaDocumentChecklistProps {
  checklist: {
    skuLengkap: boolean;
    skkMinimal: boolean;
    portofolioBakti: boolean;
    suratRekomendasiGudep: boolean;
    suratRekomendasiKwarran: boolean;
  };
  onToggleDoc: (key: any) => void;
  onDownloadSK: () => void;
  canDownloadSK: boolean;
}

const DOCS = [
  { key: 'skuLengkap', label: 'Buku Saku SKU Tingkat Tertinggi Tuntas 100%' },
  { key: 'skkMinimal', label: 'Memiliki 10 TKK (5 Wajib + 5 Pilihan Tingkat Utama/Madya)' },
  { key: 'portofolioBakti', label: 'Portofolio Pengabdian Masyarakat & Hasta Karya Mandiri' },
  { key: 'suratRekomendasiGudep', label: 'Surat Keputusan Rekomendasi Pembina Gugus Depan' },
  { key: 'suratRekomendasiKwarran', label: 'Surat Keterangan Verifikasi Kwartir Ranting' }
] as const;

export const GarudaDocumentChecklist: React.FC<GarudaDocumentChecklistProps> = ({
  checklist,
  onToggleDoc,
  onDownloadSK,
  canDownloadSK
}) => {
  return (
    <div className="p-4 bg-white rounded-3xl border border-stone-200 shadow-xs space-y-3">
      <h4 className="text-xs font-bold text-stone-900 uppercase">Kelengkapan Berkas Portofolio</h4>
      <div className="space-y-2">
        {DOCS.map((doc) => {
          const isDone = checklist[doc.key];
          return (
            <div
              key={doc.key}
              onClick={() => onToggleDoc(doc.key)}
              className="p-3 bg-stone-50 rounded-2xl border border-stone-200 flex items-center justify-between cursor-pointer hover:bg-stone-100 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <div className={`w-5 h-5 rounded-lg flex items-center justify-center ${isDone ? 'bg-emerald-600 text-white' : 'border border-stone-300'}`}>
                  {isDone && <Check className="w-3.5 h-3.5" />}
                </div>
                <span className="text-xs text-stone-800 font-medium">{doc.label}</span>
              </div>
              <span className={`text-[10px] font-bold ${isDone ? 'text-emerald-700' : 'text-stone-400'}`}>
                {isDone ? 'Lengkap' : 'Belum'}
              </span>
            </div>
          );
        })}
      </div>

      {canDownloadSK && (
        <button
          onClick={onDownloadSK}
          className="w-full py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-xs mt-2"
        >
          <FileText className="w-4 h-4" />
          <span>Lihat Surat Keputusan & Piagam Garuda</span>
        </button>
      )}
    </div>
  );
};
