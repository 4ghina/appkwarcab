import React from 'react';
import { UserProfile } from '../../types/scout';
import { KtaTheme } from './ktaTheme';
import { useApp } from '../../context/AppContext';
import { QrCode } from 'lucide-react';

interface DigitalKtaBackProps {
  user: UserProfile;
  theme: KtaTheme;
}

function KtaRulesNotice() {
  return (
    <div className="space-y-1 text-[8px] text-white/80 leading-relaxed relative z-10">
      <h4 className="font-extrabold uppercase tracking-wider text-amber-300 text-[9px]">
        Ketentuan Pemegang Kartu Tanda Anggota (KTA):
      </h4>
      <ol className="list-decimal pl-3 space-y-0.5">
        <li>Kartu ini adalah identitas resmi anggota Gerakan Pramuka Kwartir Cabang Kota Depok.</li>
        <li>Dilarang memindahtangankan atau memalsukan data dalam kartu ini.</li>
        <li>Kartu ini dapat digunakan untuk absensi kegiatan kepramukaan dan akses layanan digital cabang.</li>
        <li>Jika menemukan kartu ini harap mengembalikan ke Gedung Kwarcab Kota Depok.</li>
      </ol>
    </div>
  );
}

function KtaSignatureSeal({ user, stamp, signature }: { user: UserProfile; stamp?: string; signature?: string }) {
  return (
    <div className="flex items-end justify-between pt-2 border-t border-white/15 relative z-10">
      <div className="space-y-0.5 text-center">
        <p className="text-[8px] text-white/70">Kwartir Cabang Gerakan Pramuka</p>
        <p className="text-[9px] font-extrabold uppercase text-amber-200">Kota Depok</p>
        <div className="relative h-10 w-28 mx-auto flex items-center justify-center">
          {stamp && <img src={stamp} alt="Stempel Kwarcab" className="absolute inset-0 w-full h-full object-contain opacity-85" />}
          {signature && <img src={signature} alt="Tanda Tangan Ketua" className="absolute inset-0 w-full h-full object-contain z-10" />}
        </div>
        <p className="text-[8px] font-bold text-white underline decoration-amber-400">Drs. H. Nina Suzana, S.Sos., M.Si.</p>
        <p className="text-[7px] text-white/70">Ketua Kwartir Cabang</p>
      </div>
      <div className="flex flex-col items-end gap-1 text-right">
        <div className="p-1.5 bg-white rounded-xl shadow-sm">
          <QrCode className="w-12 h-12 text-stone-950" />
        </div>
        <span className="text-[8px] font-mono text-amber-200">{user.qrToken || user.ayoPramukaNta || user.nta || user.provisionalNta || 'VERIFIKASI-SIM'}</span>
      </div>
    </div>
  );
}


export const DigitalKtaBack: React.FC<DigitalKtaBackProps> = ({ user, theme }) => {
  const { config } = useApp();
  return (
    <div className={`relative w-full aspect-[85.6/53.98] rounded-3xl p-4 sm:p-5 text-white shadow-xl bg-gradient-to-br ${theme.gradient} border ${theme.borderColor} overflow-hidden flex flex-col justify-between`}>
      <KtaRulesNotice />
      <KtaSignatureSeal user={user} stamp={config.logos?.stamp} signature={config.logos?.signature} />
    </div>
  );
};
