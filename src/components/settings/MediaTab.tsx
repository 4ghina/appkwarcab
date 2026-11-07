import React from 'react';
import { Trash2 } from 'lucide-react';
import { MediaAssetRecord } from '../../types/config';
import { MediaUploadBox } from './MediaUploadBox';

interface MediaTabProps {
  mediaAssets: MediaAssetRecord[];
  uploadCategory: 'logo' | 'stamp' | 'signature' | 'banner' | 'avatar';
  setUploadCategory(cat: 'logo' | 'stamp' | 'signature' | 'banner' | 'avatar'): void;
  uploadLabel: string;
  setUploadLabel(lbl: string): void;
  isUploading: boolean;
  onFileUpload(e: React.ChangeEvent<HTMLInputElement>): void;
  onDeleteMedia(id: string): void;
}

export const MediaTab: React.FC<MediaTabProps> = ({
  mediaAssets,
  uploadCategory,
  setUploadCategory,
  uploadLabel,
  setUploadLabel,
  isUploading,
  onFileUpload,
  onDeleteMedia
}) => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-base font-bold text-stone-900">Manajemen Berkas & Aset Media Resmi</h3>
        <p className="text-xs text-stone-500">Unggah logo, cap stempel, tanda tangan pimpinan, dan banner kegiatan.</p>
      </div>
    </div>

    <MediaUploadBox
      uploadCategory={uploadCategory}
      setUploadCategory={setUploadCategory}
      uploadLabel={uploadLabel}
      setUploadLabel={setUploadLabel}
      isUploading={isUploading}
      onFileUpload={onFileUpload}
    />

    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {mediaAssets.map((asset) => (
        <div key={asset.id} className="p-3 bg-white rounded-2xl border border-stone-200 text-center space-y-2">
          <div className="w-full h-24 bg-stone-50 rounded-xl flex items-center justify-center p-2 border border-stone-100 overflow-hidden">
            <img src={asset.url} alt={asset.label || asset.originalName} className="max-h-full max-w-full object-contain" />
          </div>
          <div>
            <p className="text-xs font-bold text-stone-900 truncate">{asset.label || asset.originalName}</p>
            <span className="text-[10px] text-stone-500 uppercase">{asset.category}</span>
          </div>
          <button onClick={() => onDeleteMedia(asset.id)} className="text-[10px] text-rose-600 hover:text-rose-800 flex items-center justify-center gap-1 mx-auto">
            <Trash2 className="w-3 h-3" /> Hapus
          </button>
        </div>
      ))}
    </div>
  </div>
);
