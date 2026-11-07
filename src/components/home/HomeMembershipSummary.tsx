import React, { useState } from 'react';
import { UserProfile } from '../../types/scout';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { DigitalEKTA } from '../DigitalEKTA';
import { ContextPickerDropdown } from './ContextPickerDropdown';

interface HomeMembershipSummaryProps {
  user: UserProfile;
  activeContextTitle?: string;
  onOpenHelp: (topic: string) => void;
  onChangeActiveContext?: (contextId: string) => void;
  onOpenVerifyId?: () => void;
}

function UnlinkedKtaBanner({ onOpenVerifyId }: { onOpenVerifyId?: () => void }) {
  return (
    <div className="p-3 bg-gradient-to-r from-[#5D4037] via-[#4E342E] to-stone-900 text-white rounded-2xl flex items-center justify-between shadow-md border border-amber-500/40">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-xl bg-amber-400 text-stone-950 flex items-center justify-center font-black shrink-0">
          <span className="text-sm">⚜️</span>
        </div>
        <div>
          <h4 className="text-xs font-bold leading-tight">Belum Menautkan KTA Ayo Pramuka</h4>
          <p className="text-[10px] text-amber-200">Tautkan data resmi untuk Kartu Digital SIM-KWARCAB</p>
        </div>
      </div>
      <button
        type="button"
        onClick={onOpenVerifyId}
        className="px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 text-xs font-black shrink-0 transition-transform active:scale-95 shadow-sm"
      >
        Verifikasi ID Anggota
      </button>
    </div>
  );
}

function LinkedKtaStatus({ nta }: { nta?: string | null }) {
  return (
    <div className="px-3 py-1.5 bg-emerald-50 rounded-xl border border-emerald-200/80 flex items-center justify-between text-[11px]">
      <span className="text-emerald-900 font-bold flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        KTA Ayo Pramuka Terhubung
      </span>
      <span className="font-mono font-bold text-emerald-800">{nta || '-'}</span>
    </div>
  );
}

function MembershipHeader({ user, activeContextTitle }: { user: UserProfile; activeContextTitle?: string }) {
  const active = user.availableContexts?.find((c) => c.id === user.activeContextId) || user.availableContexts?.[0];
  return (
    <div>
      <div className="flex items-center gap-1.5 text-xs text-[#5D4037] font-semibold">
        <span>Salam Pramuka,</span>
        <span className="text-amber-600">⚜️</span>
      </div>
      <h1 className="text-lg font-black text-stone-900 leading-tight">
        {user.name.split(' ')[0]} {user.name.split(' ')[1] || ''}
      </h1>
      <p className="text-[11px] text-stone-600 font-semibold flex items-center gap-1">
        <span className="text-amber-800 font-bold">{activeContextTitle || active?.label || user.roleLabel}</span>
        <span>•</span>
        <span className="truncate max-w-[170px] text-stone-500">{active?.unitName || user.pangkalan || 'Kwarcab Kota Depok'}</span>
      </p>
    </div>
  );
}

function ContextSwitchBtn({ user, onSelect }: { user: UserProfile; onSelect: (id: string) => void }) {
  const [showPicker, setShowPicker] = useState(false);
  if (!user.availableContexts || user.availableContexts.length <= 1) return null;
  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setShowPicker(!showPicker)}
        className="px-2.5 py-1.5 rounded-2xl bg-amber-100/70 border border-amber-300 text-[#5D4037] text-[11px] font-bold flex items-center gap-1 hover:bg-amber-200 transition-all shadow-2xs"
      >
        <span>Ganti Peran</span>
        <ChevronDown className="w-3.5 h-3.5" />
      </button>
      {showPicker && (
        <ContextPickerDropdown
          contexts={user.availableContexts}
          activeContextId={user.activeContextId}
          onSelectContext={(id) => { onSelect(id); setShowPicker(false); }}
        />
      )}
    </div>
  );
}

export const HomeMembershipSummary: React.FC<HomeMembershipSummaryProps> = ({
  user,
  activeContextTitle,
  onOpenHelp,
  onChangeActiveContext,
  onOpenVerifyId,
}) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between px-1 pt-1">
        <MembershipHeader user={user} activeContextTitle={activeContextTitle} />
        <div className="flex items-center gap-1.5">
          <ContextSwitchBtn user={user} onSelect={(id) => onChangeActiveContext?.(id)} />
          <button
            type="button"
            onClick={() => onOpenHelp('panduan_dasar')}
            className="w-8 h-8 rounded-2xl bg-stone-100 hover:bg-stone-200 text-stone-700 flex items-center justify-center transition-all"
            aria-label="Pusat Bantuan"
          >
            <HelpCircle className="w-4 h-4" />
          </button>
        </div>
      </div>

      {!user.ayoPramukaLinked ? (
        <UnlinkedKtaBanner onOpenVerifyId={onOpenVerifyId} />
      ) : (
        <LinkedKtaStatus nta={user.ayoPramukaNta || user.nta} />
      )}

      <DigitalEKTA user={user} showModalTrigger={true} />
    </div>
  );
};

