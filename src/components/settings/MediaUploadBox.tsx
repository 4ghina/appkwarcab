import React from 'react';
import { Upload } from 'lucide-react';

interface MediaUploadBoxProps {
  uploadCategory: 'logo' | 'stamp' | 'signature' | 'banner' | 'avatar';
  setUploadCategory(cat: 'logo' | 'stamp' | 'signature' | 'banner' | 'avatar'): void;
  uploadLabel: string;
  setUploadLabel(lbl: string): void;
  isUploading: boolean;
  onFileUpload(e: React.ChangeEvent<HTMLInputElement>): void;
}

export const MediaUploadBox: React.FC<MediaUploadBoxProps> = ({
  uploadCategory,
  setUploadCategory,
  uploadLabel,
  setUploadLabel,
  isUploading,
  onFileUpload,
}) => (
  <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-3">
    <h4 className="text-xs font-bold text-stone-800">Unggah Aset Baru</h4>
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      <div>
        <label className="block text-[11px] font-semibold text-stone-600 mb-1">Kategori:</label>
        <select
          value={uploadCategory}
          onChange={(e) => setUploadCategory(e.target.value as any)}
          className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 bg-white"
        >
          <option value="logo">Logo / Lambang</option>
          <option value="stamp">Cap / Stempel Resmi</option>
          <option value="signature">Tanda Tangan Pimpinan</option>
          <option value="banner">Banner Kegiatan</option>
        </select>
      </div>
      <div>
        <label className="block text-[11px] font-semibold text-stone-600 mb-1">Keterangan Label:</label>
        <input
          type="text"
          value={uploadLabel}
          onChange={(e) => setUploadLabel(e.target.value)}
          placeholder="Contoh: Stempel Kwarcab 2026"
          className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 bg-white"
        />
      </div>
      <div>
        <label className="block text-[11px] font-semibold text-stone-600 mb-1">Pilih Berkas (PNG/SVG):</label>
        <label className="flex items-center justify-center gap-1.5 px-3 py-2 bg-[#5D4037] hover:bg-[#4E342E] text-white rounded-xl text-xs font-bold cursor-pointer">
          <Upload className="w-3.5 h-3.5" />
          <span>{isUploading ? 'Mengunggah...' : 'Pilih Berkas'}</span>
          <input type="file" accept="image/*" onChange={onFileUpload} className="hidden" />
        </label>
      </div>
    </div>
  </div>
);
