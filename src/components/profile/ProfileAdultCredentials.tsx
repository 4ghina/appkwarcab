import React, { useState } from 'react';
import { UserProfile } from '../../types/scout';
import { GraduationCap, History, ChevronDown } from 'lucide-react';

const AdultCoursesGrid: React.FC<{ user: UserProfile }> = ({ user }) => (
  <div className="space-y-1.5 text-xs">
    <p className="text-[10px] font-bold uppercase text-stone-400">Pendidikan & Kursus Pembina / Pelatih:</p>
    <div className="grid grid-cols-2 gap-2">
      <div className="p-2 rounded-xl bg-stone-50 border border-stone-200">
        <span className="font-bold text-stone-800 block text-[11px]">KMD (Mahir Dasar)</span>
        <span className="text-[10px] text-stone-600">
          {user.adultCredentials?.courses?.kmd?.status === 'selesai'
            ? `✓ Lulus (${user.adultCredentials.courses.kmd.year || 2012})`
            : 'Belum Tercatat'}
        </span>
      </div>
      <div className="p-2 rounded-xl bg-stone-50 border border-stone-200">
        <span className="font-bold text-stone-800 block text-[11px]">KML (Mahir Lanjutan)</span>
        <span className="text-[10px] text-stone-600">
          {user.adultCredentials?.courses?.kml?.status === 'selesai'
            ? `✓ Lulus (${user.adultCredentials.courses.kml.golonganFocus || 'Penegak'})`
            : 'Belum Tercatat'}
        </span>
      </div>
      <div className="p-2 rounded-xl bg-stone-50 border border-stone-200">
        <span className="font-bold text-stone-800 block text-[11px]">KPD (Pelatih Dasar)</span>
        <span className="text-[10px] text-stone-600">
          {user.adultCredentials?.courses?.kpd?.status === 'selesai'
            ? '✓ Lulus'
            : user.adultCredentials?.courses?.kpd?.status === 'sedang_mengikuti'
            ? 'Sedang Mengikuti'
            : 'Belum'}
        </span>
      </div>
      <div className="p-2 rounded-xl bg-stone-50 border border-stone-200">
        <span className="font-bold text-stone-800 block text-[11px]">KPL (Pelatih Lanjutan)</span>
        <span className="text-[10px] text-stone-600">
          {user.adultCredentials?.courses?.kpl?.status === 'selesai' ? '✓ Lulus' : 'Belum'}
        </span>
      </div>
    </div>
  </div>
);

const AdultLicensesList: React.FC<{ user: UserProfile }> = ({ user }) => (
  <div className="space-y-1.5 pt-2 border-t border-stone-100 text-xs">
    <p className="text-[10px] font-bold uppercase text-stone-400">Lisensi & Kewenangan Resmi:</p>
    <div className="space-y-1.5">
      <div className="flex items-center justify-between p-2 rounded-xl bg-emerald-50/60 border border-emerald-200">
        <div>
          <p className="font-bold text-emerald-950 text-[11px]">Surat Hak Bina (SHB)</p>
          <p className="text-[9px] font-mono text-emerald-800">
            {user.adultCredentials?.documents?.shb?.docNumber || 'Belum Diterbitkan'}
          </p>
        </div>
        <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-200 text-emerald-900">
          {user.adultCredentials?.documents?.shb?.status === 'aktif' ? 'Aktif' : 'Tidak Aktif'}
        </span>
      </div>
      {user.adultCredentials?.documents?.shl?.status === 'aktif' && (
        <div className="flex items-center justify-between p-2 rounded-xl bg-blue-50/60 border border-blue-200">
          <div>
            <p className="font-bold text-blue-950 text-[11px]">Surat Hak Latih (SHL Pelatih)</p>
            <p className="text-[9px] font-mono text-blue-800">{user.adultCredentials.documents.shl.docNumber}</p>
          </div>
          <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-blue-200 text-blue-900">Aktif</span>
        </div>
      )}
    </div>
  </div>
);

import { AdultYouthArchive } from './AdultYouthArchive';

export const ProfileAdultCredentials: React.FC<{ user: UserProfile }> = ({ user }) => {
  return (
    <div className="p-4 bg-white rounded-3xl border border-stone-200/90 shadow-sm space-y-3">
      <h3 className="text-xs font-bold uppercase tracking-wider text-[#5D4037] pb-2 border-b border-stone-100 flex items-center gap-1.5">
        <GraduationCap className="w-4 h-4 text-[#5D4037]" />
        Kualifikasi Kursus & Dokumen Kewenangan
      </h3>
      <AdultCoursesGrid user={user} />
      <AdultLicensesList user={user} />
      <AdultYouthArchive user={user} />
    </div>
  );
};
