import React from 'react';
import { Save, RefreshCw, Search, Send } from 'lucide-react';

interface TextCatalogHeaderProps {
  textSearch: string;
  setTextSearch(s: string): void;
  onSave(): void;
  onPublish?(): void;
  onReset(): void;
  isSaving: boolean;
}

export const TextCatalogHeader: React.FC<TextCatalogHeaderProps> = ({
  textSearch,
  setTextSearch,
  onSave,
  onPublish,
  onReset,
  isSaving
}) => (
  <>
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div>
        <h3 className="text-base font-bold text-stone-900">Katalog Teks & Terminologi Antarmuka</h3>
        <p className="text-xs text-stone-500">Sesuaikan teks menu, tombol, status, dan notifikasi tanpa mengubah logika kode.</p>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={onReset}
          type="button"
          className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-100 text-stone-700 hover:bg-stone-200 rounded-xl text-xs font-semibold"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Reset Default
        </button>
        <button
          onClick={onSave}
          disabled={isSaving}
          type="button"
          className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-700 hover:bg-stone-800 text-white rounded-xl text-xs font-bold disabled:opacity-50"
        >
          <Save className="w-3.5 h-3.5" /> Simpan Draf
        </button>
        {onPublish && (
          <button
            onClick={onPublish}
            disabled={isSaving}
            type="button"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold disabled:opacity-50"
          >
            <Send className="w-3.5 h-3.5" /> Publikasikan
          </button>
        )}
      </div>
    </div>
    <div className="relative">
      <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
      <input
        type="text"
        value={textSearch}
        onChange={(e) => setTextSearch(e.target.value)}
        placeholder="Cari kunci teks (contoh: cta.login, status.verified, nav.events)..."
        className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-stone-300 focus:outline-none"
      />
    </div>
  </>
);
