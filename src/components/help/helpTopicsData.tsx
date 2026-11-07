import React from 'react';
import { Users, Building2, Award, BookOpen, ShieldCheck, Phone } from 'lucide-react';
import { AppIdentityConfig } from '../../types/config';

export interface HelpTopic {
  id: string;
  title: string;
  category: string;
  icon: any;
  badge: string;
  summary: string;
  content: React.ReactNode;
}

function buildProfileTopic(): HelpTopic {
  return {
    id: 'profil', title: 'Cara Melengkapi Profil', category: 'Akun & Identitas', icon: Users, badge: 'Langkah Awal',
    summary: 'Data pribadi nama, tanggal lahir (usia otomatis), dan biodata kontak.',
    content: (
      <div className="space-y-3 text-xs text-stone-700">
        <p className="leading-relaxed">Profil anggota merupakan dasar penerbitan KTA digital dan penentuan golongan.</p>
        <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200 space-y-1.5">
          <h5 className="font-bold text-stone-900 text-xs">Langkah Pengisian Profil:</h5>
          <ol className="list-decimal pl-4 space-y-1">
            <li>Buka tab <strong>Profil</strong> di navigasi.</li>
            <li>Pastikan <strong>Nama Lengkap</strong> sesuai dokumen resmi.</li>
            <li>Masukkan <strong>Tanggal Lahir</strong> (usia dihitung otomatis).</li>
          </ol>
        </div>
      </div>
    )
  };
}

function buildGudepTopic(config: AppIdentityConfig): HelpTopic {
  return {
    id: 'gudep', title: 'Menghubungkan Akun ke Gudep', category: 'Keanggotaan', icon: Building2, badge: 'Wajib',
    summary: 'Pengajuan pengaitan ke pangkalan sekolah atau Gugus Depan domisili.',
    content: (
      <div className="space-y-3 text-xs text-stone-700">
        <p className="leading-relaxed">Akun anggota baru berstatus Tamu Pra-Registrasi hingga diverifikasi Gudep.</p>
        <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200 space-y-1.5">
          <ol className="list-decimal pl-4 space-y-1">
            <li>Klik tombol <strong>Hubungkan ke Gugus Depan</strong> di Beranda.</li>
            <li>Pilih pangkalan sekolah dari direktori terdaftar di {config.kwarcabName || 'Kwarcab'}.</li>
            <li>Pilih peran dan golongan kecakapan.</li>
          </ol>
        </div>
      </div>
    )
  };
}

function buildSkuTopic(): HelpTopic {
  return {
    id: 'sku', title: 'Panduan Pengujian E-SKU & SKK', category: 'Kecakapan', icon: BookOpen, badge: 'Peserta Didik',
    summary: 'Alur penyerahan bukti dan pengesahan butir SKU/SKK oleh Pembina.',
    content: (
      <div className="space-y-3 text-xs text-stone-700">
        <p className="leading-relaxed">Pengujian SKU dilakukan secara berjenjang oleh Pembina Satuan.</p>
        <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200 space-y-1.5">
          <ol className="list-decimal pl-4 space-y-1">
            <li>Pilih butir SKU yang hendak diujikan.</li>
            <li>Unggah catatan bukti atau tautan dokumentasi.</li>
            <li>Pembina Satuan memvalidasi dan mengesahkan secara digital.</li>
          </ol>
        </div>
      </div>
    )
  };
}

function buildVerifTopic(): HelpTopic {
  return {
    id: 'verifikasi', title: 'Cek Keaslian KTA & Dokumen', category: 'Keabsahan', icon: ShieldCheck, badge: 'Terbuka',
    summary: 'Verifikasi publik dokumen, KTA digital, dan surat keputusan kepramukaan.',
    content: (
      <div className="space-y-3 text-xs text-stone-700">
        <p className="leading-relaxed">Setiap dokumen resmi SIM-KWARCAB dilengkapi tanda tangan digital dan QR code.</p>
        <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200 space-y-1">
          <p>Scan QR code atau masukkan NTA pada modul <strong>Verifikasi Dokumen Publik</strong>.</p>
        </div>
      </div>
    )
  };
}

export function getHelpTopics(config: AppIdentityConfig): HelpTopic[] {
  return [buildProfileTopic(), buildGudepTopic(config), buildSkuTopic(), buildVerifTopic()];
}
