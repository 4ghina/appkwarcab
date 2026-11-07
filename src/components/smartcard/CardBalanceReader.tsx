import React from 'react';
import { CardTapPayload } from './smartCardTypes';
import { CreditCard, AlertCircle, Info } from 'lucide-react';
import { BalanceDisplayCard } from './BalanceDisplayCard';

export const CardBalanceReader: React.FC<{ card: CardTapPayload | null }> = ({ card }) => {
  if (!card) {
    return (
      <div className="p-6 bg-stone-50 rounded-2xl border border-dashed border-stone-300 text-center text-xs text-stone-500 space-y-1">
        <CreditCard className="w-8 h-8 text-stone-400 mx-auto" />
        <p className="font-bold text-stone-700">Belum Ada Kartu Ditempelkan</p>
        <p>Dekatkan KTA Multi-Fungsi / kartu chip e-Money ke sensor NFC untuk membaca saldo.</p>
      </div>
    );
  }

  const supportsBalance = card.supportedFeatures?.balance;
  const balanceInfo = card.balanceData;

  return (
    <div className="space-y-3.5">
      {supportsBalance && balanceInfo ? (
        <BalanceDisplayCard uid={card.uid} balanceInfo={balanceInfo} />
      ) : (
        <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-amber-900 text-xs space-y-1">
          <div className="flex items-center gap-1.5 font-bold">
            <AlertCircle className="w-4 h-4 text-amber-700" />
            <span>Fitur Saldo Tidak Didukung pada Tipe Kartu Ini</span>
          </div>
          <p className="text-[11px] text-amber-800">
            Kartu berjenis <strong>{card.cardType.toUpperCase()}</strong> hanya mendukung identifikasi keanggotaan dan absensi kehadiran.
          </p>
        </div>
      )}

      <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200 text-xs text-stone-600 flex items-start gap-2">
        <Info className="w-4 h-4 text-stone-500 shrink-0 mt-0.5" />
        <p className="text-[11px]">
          Pembacaan saldo dilakukan secara offline langsung melalui SAM/SE chip tanpa menyimpan PIN di server.
        </p>
      </div>
    </div>
  );
};
