import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface SamplePurgeModalProps {
  impactData: any;
  loading: boolean;
  onClose(): void;
  onConfirm(): void;
}

export const SamplePurgeModal: React.FC<SamplePurgeModalProps> = ({
  impactData,
  loading,
  onClose,
  onConfirm
}) => (
  <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
    <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-stone-200 space-y-4">
      <h4 className="text-base font-extrabold text-stone-900 flex items-center gap-2">
        <AlertTriangle className="w-5 h-5 text-rose-600" />
        Konfirmasi Pembersihan Data Contoh
      </h4>
      <div className="text-xs text-stone-600 space-y-2">
        <p>Rincian entri yang akan dihapus:</p>
        <ul className="list-disc pl-5 space-y-0.5 text-stone-700">
          <li>Anggota binaan contoh: {impactData?.sampleMembersCount ?? 0} data</li>
          <li>Kegiatan & agenda contoh: {impactData?.sampleEventsCount ?? 0} data</li>
          <li>Pengajuan SKU/SKK contoh: {impactData?.sampleSubmissionsCount ?? 0} data</li>
        </ul>
        {impactData?.hasRealConflicts ? (
          <div className="p-3 bg-rose-50 border border-rose-300 rounded-xl text-rose-800 font-semibold text-[11px]">
            Peringatan: Terdapat relasi data riil! Sistem menolak penghapusan untuk melindungi integritas data pengguna riil.
          </div>
        ) : (
          <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-800 text-[11px]">
            Aman: Tidak ada relasi ke data riil. Akun admin dan pengaturan dasar Kwarcab tetap terjaga.
          </div>
        )}
      </div>
      <div className="flex justify-end gap-2 pt-2">
        <button
          onClick={onClose}
          type="button"
          className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold rounded-xl"
        >
          Batal
        </button>
        <button
          onClick={onConfirm}
          disabled={impactData?.hasRealConflicts || loading}
          type="button"
          className="px-4 py-2 bg-rose-600 hover:bg-rose-700 disabled:opacity-40 text-white text-xs font-bold rounded-xl"
        >
          {impactData?.hasRealConflicts ? 'Terhalang Relasi' : 'Ya, Hapus Data Contoh'}
        </button>
      </div>
    </div>
  </div>
);
