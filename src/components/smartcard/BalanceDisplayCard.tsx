import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { CardBalanceData } from './smartCardTypes';

interface BalanceDisplayCardProps {
  uid: string;
  balanceInfo: CardBalanceData;
}

export const BalanceDisplayCard: React.FC<BalanceDisplayCardProps> = ({ uid, balanceInfo }) => {
  return (
    <div className="p-4 bg-gradient-to-br from-emerald-800 to-stone-900 rounded-3xl text-white shadow-md space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-300">
          Saldo Kartu Terbaca
        </span>
        <span className="font-mono text-xs text-white/70">{uid}</span>
      </div>
      <div>
        <span className="text-2xl font-black font-mono">
          Rp {balanceInfo.amount.toLocaleString('id-ID')}
        </span>
        <p className="text-[10px] text-emerald-200 mt-0.5">
          Terakhir diperbarui: {balanceInfo.lastReadTime}
        </p>
      </div>
      <div className="pt-2 border-t border-white/10 text-[10px] text-white/80 flex items-center gap-1.5">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
        <span className="truncate">{balanceInfo.source}</span>
      </div>
    </div>
  );
};
