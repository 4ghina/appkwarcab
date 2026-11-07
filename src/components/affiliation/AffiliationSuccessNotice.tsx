import React from 'react';
import { GudepData } from '../../types/scout';

interface AffiliationSuccessNoticeProps {
  selectedGudep: GudepData;
  appliedRole: string;
}

export const AffiliationSuccessNotice: React.FC<AffiliationSuccessNoticeProps> = ({ selectedGudep, appliedRole }) => (
  <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs space-y-2">
    <div>
      <span className="text-[10px] text-emerald-800 font-bold block uppercase tracking-wider">
        Apa yang berhasil dilakukan:
      </span>
      <p className="text-stone-800 mt-0.5">
        Permohonan peran <strong>{appliedRole}</strong> di pangkalan <strong>{selectedGudep.pangkalan}</strong> telah terdaftar.
      </p>
    </div>
    <div className="pt-1.5 border-t border-emerald-200">
      <span className="text-[10px] text-emerald-800 font-bold block uppercase tracking-wider">
        Status Terbaru:
      </span>
      <p className="font-bold text-amber-800">
        ⏳ Menunggu Pemeriksaan & Validasi Pembina Gudep
      </p>
    </div>
    <div className="pt-1.5 border-t border-emerald-200">
      <span className="text-[10px] text-emerald-800 font-bold block uppercase tracking-wider">
        Langkah Berikutnya:
      </span>
      <ul className="list-disc pl-4 space-y-1 text-stone-700 mt-0.5">
        <li>Pembina Satuan akan memeriksa kesesuaian data anggota.</li>
        <li>Setelah disetujui, NTA resmi Kwarcab akan diterbitkan.</li>
        <li>Sambil menunggu, Anda dapat mengakses materi kecakapan publik.</li>
      </ul>
    </div>
  </div>
);
