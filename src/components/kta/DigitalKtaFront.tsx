import React from 'react';
import { UserProfile } from '../../types/scout';
import { KtaTheme } from './ktaTheme';
import { DynamicAssetImage } from '../DynamicAssetImage';
import { Award, QrCode, User } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface DigitalKtaFrontProps {
  user: UserProfile;
  theme: KtaTheme;
  isVerified: boolean;
  onOpenZoomQR: () => void;
}

function KtaFrontHeader({ isVerified, theme, kwarcabName, kwardaName, logo, appName, cardTitle }: any) {
  return (
    <div className="flex items-center justify-between relative z-10">
      <div className="flex items-center gap-2">
        <div className="w-9 h-9 rounded-2xl bg-amber-400 p-1 flex items-center justify-center shadow-sm shrink-0">
          <DynamicAssetImage src={logo} alt={appName} fallbackType="logo" className="w-full h-full" />
        </div>
        <div>
          <span className="text-[8px] font-extrabold uppercase tracking-widest text-amber-300 block">
            {cardTitle || 'KARTU ANGGOTA DIGITAL SIM-KWARCAB'}
          </span>
          <h3 className="text-[11px] font-black tracking-tight text-white uppercase">{kwarcabName || 'KWARCAB KOTA DEPOK'}</h3>
          <p className="text-[8px] text-white/70">{kwardaName || 'Kwarda Jawa Barat'}</p>
        </div>
      </div>
      <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider ${theme.cardAccent}`}>
        {theme.badgeTitle}
      </span>
    </div>
  );
}

function KtaFrontBody({ user }: { user: UserProfile }) {
  const isAdult = user.memberCategory === 'anggota_dewasa' || user.role === 'pembina' || user.role === 'pelatih';
  const memberCategoryLabel = isAdult ? 'Pembina' : 'Peserta Didik';
  const ayoPramukaKta = user.ayoPramukaNta || user.nta || user.provisionalNta || 'Belum Terhubung';
  const simKwarcabId = user.id.startsWith('user-') ? user.id.replace('user-', 'SK-').toUpperCase() : user.id;

  return (
    <div className="flex items-center gap-3 relative z-10 my-1">
      <div className="relative w-16 h-20 sm:w-20 sm:h-24 rounded-2xl overflow-hidden border-2 border-white/40 shadow-md shrink-0 bg-stone-800">
        {user.avatar ? (
          <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white/50"><User className="w-8 h-8" /></div>
        )}
      </div>
      <div className="min-w-0 flex-1 space-y-0.5">
        <div className="flex items-center justify-between gap-1">
          <span className="text-[9px] font-mono text-amber-300 tracking-wider font-bold truncate">
            KTA Ayo Pramuka: {ayoPramukaKta}
          </span>
          <span className="text-[8px] px-1 rounded bg-white/20 text-white shrink-0 font-semibold">
            {memberCategoryLabel}
          </span>
        </div>
        <h2 className="text-xs sm:text-sm font-black text-white leading-tight truncate">{user.name}</h2>
        <p className="text-[9px] font-mono text-white/75">ID SIM-KWARCAB: {simKwarcabId}</p>
        <p className="text-[9px] text-white/80 truncate">Unit/Gudep: {user.gudepNomor ? `Gudep ${user.gudepNomor}` : (user.pangkalan || 'Kwarcab')}</p>
        <p className="text-[8px] text-amber-200/90 truncate">Pangkalan: {user.pangkalan || 'Kwartir Cabang'} · {user.kwarran || 'Pancoran Mas'}</p>
      </div>
    </div>
  );
}


function KtaFrontFooter({ masaBerlaku, onOpenZoomQR }: { masaBerlaku?: string; onOpenZoomQR: () => void }) {
  return (
    <div className="flex items-center justify-between pt-1 border-t border-white/15 relative z-10 text-[9px] text-white/80">
      <div><span>Berlaku s.d: </span><strong className="text-white">{masaBerlaku || 'Seumur Hidup'}</strong></div>
      <button type="button" onClick={(e) => { e.stopPropagation(); onOpenZoomQR(); }} className="p-1 rounded-lg bg-white/20 hover:bg-white/30 text-white flex items-center gap-1 transition-all">
        <QrCode className="w-3.5 h-3.5" /><span className="text-[8px] font-bold">QR Validasi</span>
      </button>
    </div>
  );
}

export const DigitalKtaFront: React.FC<DigitalKtaFrontProps> = ({ user, theme, isVerified, onOpenZoomQR }) => {
  const { config } = useApp();
  return (
    <div className={`relative w-full aspect-[85.6/53.98] rounded-3xl p-4 sm:p-5 text-white shadow-xl bg-gradient-to-br ${theme.gradient} border ${theme.borderColor} overflow-hidden flex flex-col justify-between`}>
      <div className="absolute right-[-20px] bottom-[-20px] opacity-10 pointer-events-none"><Award className="w-56 h-56 text-white" /></div>
      <KtaFrontHeader isVerified={isVerified} theme={theme} kwarcabName={config.kwarcabName} kwardaName={config.kwardaName} logo={config.logos?.primary} appName={config.appName} />
      <KtaFrontBody user={user} />
      <KtaFrontFooter masaBerlaku={user.masaBerlaku} onOpenZoomQR={onOpenZoomQR} />
    </div>
  );
};
