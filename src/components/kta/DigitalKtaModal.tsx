import React, { useState } from 'react';
import { UserProfile } from '../../types/scout';
import { KtaTheme } from './ktaTheme';
import { DigitalKtaFront } from './DigitalKtaFront';
import { DigitalKtaBack } from './DigitalKtaBack';
import { X, RotateCcw, Download, Copy, Check, QrCode } from 'lucide-react';

interface DigitalKtaModalProps {
  user: UserProfile;
  theme: KtaTheme;
  isVerified: boolean;
  onClose: () => void;
}

function KtaModalControls({ isFlipped, onToggleFlip, onCopy, copied, onDownload, downloaded }: any) {
  return (
    <div className="grid grid-cols-3 gap-2 text-xs">
      <button type="button" onClick={onToggleFlip} className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 font-bold flex items-center justify-center gap-1.5">
        <RotateCcw className="w-3.5 h-3.5" /><span>{isFlipped ? 'Lihat Depan' : 'Lihat Belakang'}</span>
      </button>
      <button type="button" onClick={onCopy} className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 font-bold flex items-center justify-center gap-1.5">
        {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
        <span>{copied ? 'Tersalin' : 'Salin NTA'}</span>
      </button>
      <button type="button" onClick={onDownload} className="p-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black flex items-center justify-center gap-1.5">
        <Download className="w-3.5 h-3.5" /><span>{downloaded ? 'Tersimpan!' : 'Unduh KTA'}</span>
      </button>
    </div>
  );
}

function KtaModalQrZoom({ nta, onClose }: { nta?: string | null; onClose: () => void }) {
  return (
    <div className="p-4 bg-white rounded-2xl text-stone-950 text-center space-y-2 animate-in zoom-in-95">
      <h4 className="text-xs font-black">QR Kode Verifikasi Keabsahan</h4>
      <div className="w-32 h-32 mx-auto p-2 bg-stone-100 rounded-xl flex items-center justify-center">
        <QrCode className="w-28 h-28 text-stone-900" />
      </div>
      <p className="text-[10px] font-mono text-stone-600">NTA: {nta || '09.22.XX.XXXX'}</p>
      <button type="button" onClick={onClose} className="text-xs font-bold text-amber-800 hover:underline">Tutup QR</button>
    </div>
  );
}

export const DigitalKtaModal: React.FC<DigitalKtaModalProps> = ({ user, theme, isVerified, onClose }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [showQRZoom, setShowQRZoom] = useState(false);
  const [copied, setCopied] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleCopyNTA = () => {
    if (!user.nta) return;
    navigator.clipboard.writeText(user.nta);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-stone-900 rounded-3xl p-5 text-white shadow-2xl space-y-4 border border-stone-700">
        <div className="flex items-center justify-between border-b border-stone-800 pb-2">
          <h3 className="text-xs font-black uppercase tracking-wider text-amber-400">Preview Kartu Tanda Anggota Digital (E-KTA)</h3>
          <button type="button" onClick={onClose} className="p-1 rounded-full hover:bg-stone-800 text-stone-400 hover:text-white"><X className="w-5 h-5" /></button>
        </div>
        <div className="relative">
          {isFlipped ? <DigitalKtaBack user={user} theme={theme} /> : <DigitalKtaFront user={user} theme={theme} isVerified={isVerified} onOpenZoomQR={() => setShowQRZoom(true)} />}
        </div>
        <KtaModalControls isFlipped={isFlipped} onToggleFlip={() => setIsFlipped(!isFlipped)} onCopy={handleCopyNTA} copied={copied} onDownload={() => { setDownloadSuccess(true); setTimeout(() => setDownloadSuccess(false), 3000); }} downloaded={downloadSuccess} />
        {showQRZoom && <KtaModalQrZoom nta={user.nta} onClose={() => setShowQRZoom(false)} />}
      </div>
    </div>
  );
};
