import React from 'react';
import { X } from 'lucide-react';
import { SKUMasterItem } from '../../data/skuMasterBank';
import { TestMethodSelector } from './TestMethodSelector';

interface DirectTestingModalProps {
  item: SKUMasterItem;
  studentName: string;
  testMethod: 'praktek' | 'pengamatan' | 'wawancara' | 'tertulis';
  onTestMethodChange(m: 'praktek' | 'pengamatan' | 'wawancara' | 'tertulis'): void;
  notes: string;
  onNotesChange(n: string): void;
  onSubmit(): void;
  onClose(): void;
}

export const DirectTestingModal: React.FC<DirectTestingModalProps> = ({
  item,
  studentName,
  testMethod,
  onTestMethodChange,
  notes,
  onNotesChange,
  onSubmit,
  onClose
}) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
    <div className="w-full max-w-md bg-white rounded-3xl p-5 shadow-2xl border border-stone-200 space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-stone-100">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-amber-100 text-amber-950 flex items-center justify-center font-black text-xs">
            {item.nomor}
          </span>
          <div>
            <h4 className="text-xs font-bold text-stone-900">Ujian Langsung Butir SKU</h4>
            <p className="text-[10px] text-stone-500">Peserta: {studentName}</p>
          </div>
        </div>
        <button onClick={onClose} className="p-1 rounded-full text-stone-400"><X className="w-4 h-4" /></button>
      </div>

      <div className="p-3 bg-stone-50 rounded-2xl text-xs space-y-1">
        <span className="text-[9px] font-bold text-amber-800 uppercase">{item.kategori}</span>
        <p className="font-semibold text-stone-900 leading-relaxed">{item.deskripsi}</p>
      </div>

      <TestMethodSelector testMethod={testMethod} onTestMethodChange={onTestMethodChange} />

      <div>
        <label className="block text-[11px] font-bold text-stone-700 mb-1">Catatan Hasil Uji:</label>
        <textarea
          rows={2}
          value={notes}
          onChange={(e) => onNotesChange(e.target.value)}
          placeholder="Catatan kompetensi atau pengamatan..."
          className="w-full p-2.5 text-xs rounded-xl bg-white border border-stone-200 focus:outline-none"
        />
      </div>

      <div className="flex items-center gap-2 pt-1">
        <button onClick={onSubmit} className="flex-1 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold">
          Sahkan Kelulusan Butir Ini
        </button>
        <button onClick={onClose} className="py-2.5 px-4 rounded-xl bg-stone-100 text-stone-700 text-xs font-semibold">
          Batal
        </button>
      </div>
    </div>
  </div>
);
