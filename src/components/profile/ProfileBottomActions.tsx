import React from 'react';
import { Download, HelpCircle } from 'lucide-react';

interface ProfileBottomActionsProps {
  onDownloadPdf: () => void;
  onOpenHelp: () => void;
}

export const ProfileBottomActions: React.FC<ProfileBottomActionsProps> = ({ onDownloadPdf, onOpenHelp }) => (
  <div className="grid grid-cols-2 gap-2.5">
    <button
      onClick={onDownloadPdf}
      className="py-3 px-3 rounded-2xl bg-[#5D4037] hover:bg-[#4E342E] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all active:scale-98"
    >
      <Download className="w-4 h-4" />
      <span>Unduh PDF KTA</span>
    </button>
    <button
      onClick={onOpenHelp}
      className="py-3 px-3 rounded-2xl bg-white hover:bg-stone-50 border border-stone-200 text-stone-800 text-xs font-bold flex items-center justify-center gap-1.5 shadow-2xs transition-all active:scale-98"
    >
      <HelpCircle className="w-4 h-4 text-amber-700" />
      <span>Panduan & Bantuan</span>
    </button>
  </div>
);
