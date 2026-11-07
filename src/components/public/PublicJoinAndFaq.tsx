import React, { useState } from 'react';
import { ChevronRight, HelpCircle } from 'lucide-react';

interface PublicJoinAndFaqProps {
  onOpenAuth: () => void;
  config: any;
}

const FAQ_ITEMS = [
  {
    q: 'Apakah semua anggota Pramuka wajib memiliki akun SIM-KWARCAB?',
    a: 'Ya, SIM-KWARCAB adalah pangkalan data keanggotaan terpadu Kwartir Cabang untuk penerbitan E-KTA resmi ber-QR, rekam jejak SKU/SKK, serta pendaftaran kegiatan cabang.'
  },
  {
    q: 'Bagaimana cara peserta didik mengajukan pengujian butir SKU?',
    a: 'Setelah akun terhubung ke Gugus Depan, peserta didik dapat memilih butir SKU yang sedang ditempuh, menyetorkan catatan bukti atau video praktik, dan Pembina Satuan akan memvalidasi secara langsung.'
  },
  {
    q: 'Apakah orang tua/wali murid dapat memantau progres SKU anak?',
    a: 'Bisa. Akun Orang Tua/Wali dapat dikaitkan dengan profil anak melalui menu Perwalian tanpa harus membagikan password anak.'
  },
  {
    q: 'Apakah verifikasi KTA digital dapat dilakukan oleh publik?',
    a: 'Ya, publik dapat memindai QR code pada kartu fisik/digital atau membuka menu Cek KTA untuk memverifikasi keaslian anggota secara transparan.'
  }
];

export const PublicJoinAndFaq: React.FC<PublicJoinAndFaqProps> = ({ onOpenAuth, config }) => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  return (
    <>
      <section id="gabung" className="p-6 bg-gradient-to-br from-[#5D4037] to-[#3E2723] text-white rounded-3xl shadow-md text-center space-y-4">
        <h2 className="text-xl sm:text-2xl font-black">Bergabung Bersama SIM-KWARCAB</h2>
        <p className="text-xs sm:text-sm text-stone-200 max-w-xl mx-auto leading-relaxed">
          Aktifkan akun kepanduan Anda sekarang untuk memperoleh E-KTA resmi ber-QR code dan melacak progres kecakapan SKU/SKK.
        </p>
        <button
          onClick={onOpenAuth}
          className="px-6 py-2.5 bg-amber-400 hover:bg-amber-300 text-stone-950 rounded-xl text-xs font-black shadow-md transition-all active:scale-95"
        >
          Daftar Akun Baru Sekarang
        </button>
      </section>

      <section id="bantuan" className="space-y-4">
        <div>
          <span className="text-[10px] font-black uppercase tracking-wider text-amber-800 block">
            Pertanyaan Umum
          </span>
          <h2 className="text-lg sm:text-xl font-black text-stone-900">Pusat Bantuan & Tanya Jawab</h2>
        </div>

        <div className="space-y-2">
          {FAQ_ITEMS.map((faq, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-2xs">
              <button
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full p-4 text-left flex items-center justify-between gap-3 font-bold text-xs text-stone-900"
              >
                <span>{faq.q}</span>
                <ChevronRight className={`w-4 h-4 text-stone-400 transition-transform ${activeFaq === idx ? 'rotate-90' : ''}`} />
              </button>
              {activeFaq === idx && (
                <div className="px-4 pb-4 pt-1 text-xs text-stone-600 leading-relaxed border-t border-stone-100">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <footer className="pt-6 border-t border-stone-200 text-center text-xs text-stone-500 space-y-2">
        <p>{config?.footerText || '© 2026 Kwartir Cabang Gerakan Pramuka Kota Depok. Terverifikasi Kwarnas.'}</p>
        <p className="text-[10px] text-stone-400">{config?.address}</p>
      </footer>
    </>
  );
};
