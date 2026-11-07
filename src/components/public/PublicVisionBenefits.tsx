import React from 'react';
import { Award, UserCheck, HeartHandshake, Building2 } from 'lucide-react';

export const PublicVisionBenefits: React.FC = () => {
  return (
    <section className="p-6 bg-white rounded-3xl border border-stone-200 shadow-xs space-y-6">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-100 text-amber-900">
          Sistem Informasi Manajemen Terpadu
        </span>
        <h2 className="text-xl sm:text-2xl font-black text-stone-900">
          Modernisasi Tata Kelola & Pembinaan Gerakan Pramuka
        </h2>
        <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
          SIM-KWARCAB menghubungkan Kwartir Cabang, Kwartir Ranting, Gugus Depan, Satuan Karya, Pembina, hingga Orang Tua dalam satu ekosistem digital yang akuntabel.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
        <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80 space-y-2">
          <div className="w-8 h-8 rounded-xl bg-amber-200 text-amber-950 flex items-center justify-center font-bold">
            <Award className="w-4 h-4 text-amber-800" />
          </div>
          <h3 className="text-xs font-black text-stone-900">Bagi Peserta Didik</h3>
          <p className="text-[11px] text-stone-600 leading-relaxed">
            Pelajari butir SKU resmi, ajukan bukti ujian, kumpulkan TKK, dan pantau seleksi Pramuka Garuda secara gamified.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 space-y-2">
          <div className="w-8 h-8 rounded-xl bg-emerald-200 text-emerald-950 flex items-center justify-center font-bold">
            <UserCheck className="w-4 h-4 text-emerald-800" />
          </div>
          <h3 className="text-xs font-black text-stone-900">Bagi Pembina Satuan</h3>
          <p className="text-[11px] text-stone-600 leading-relaxed">
            Kelola buku saku digital regu/perindukan, verifikasi portofolio SKU, dan daftarkan anggota ke kegiatan cabang.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200/80 space-y-2">
          <div className="w-8 h-8 rounded-xl bg-blue-200 text-blue-950 flex items-center justify-center font-bold">
            <HeartHandshake className="w-4 h-4 text-blue-800" />
          </div>
          <h3 className="text-xs font-black text-stone-900">Bagi Orang Tua / Wali</h3>
          <p className="text-[11px] text-stone-600 leading-relaxed">
            Dampingi kemajuan kepanduan anak melalui Portal Perwalian, lihat jadwal latihan, dan sertifikat kecakapan.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-200/80 space-y-2">
          <div className="w-8 h-8 rounded-xl bg-purple-200 text-purple-950 flex items-center justify-center font-bold">
            <Building2 className="w-4 h-4 text-purple-800" />
          </div>
          <h3 className="text-xs font-black text-stone-900">Bagi Pangkalan & Kwarran</h3>
          <p className="text-[11px] text-stone-600 leading-relaxed">
            Sinkronisasi nomor gudep, keabsahan NTA, pemantauan akreditasi pangkalan, dan validasi berkas terintegrasi.
          </p>
        </div>
      </div>
    </section>
  );
};
