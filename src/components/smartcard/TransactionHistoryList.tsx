import React from 'react';
import { CardTapPayload } from './smartCardTypes';
import { Receipt, AlertCircle } from 'lucide-react';
import { TransactionItemRow } from './TransactionItemRow';

export const TransactionHistoryList: React.FC<{ card: CardTapPayload | null }> = ({ card }) => {
  if (!card) {
    return (
      <div className="p-6 bg-stone-50 rounded-2xl border border-dashed border-stone-300 text-center text-xs text-stone-500">
        Tempelkan kartu pintar untuk memuat riwayat transaksi terakhir.
      </div>
    );
  }

  const transactions = card.transactionsData || [];

  if (!card.supportedFeatures?.transactions || transactions.length === 0) {
    return (
      <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 text-xs text-stone-600 space-y-1">
        <div className="flex items-center gap-1.5 font-bold text-stone-800">
          <AlertCircle className="w-4 h-4 text-stone-500" />
          <span>Tidak Ada Riwayat Transaksi Tersimpan</span>
        </div>
        <p className="text-[11px]">
          Chip kartu ini tidak menyimpan log transaksi lokal atau belum pernah digunakan pada merchant terdaftar.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs font-bold text-stone-800 px-1">
        <span className="flex items-center gap-1.5">
          <Receipt className="w-4 h-4 text-[#5D4037]" />
          Log Transaksi Terakhir di Chip
        </span>
        <span className="text-[10px] text-stone-500">{transactions.length} Mutasi</span>
      </div>
      <div className="space-y-1.5">
        {transactions.map((tx) => <TransactionItemRow key={tx.id} tx={tx} />)}
      </div>
    </div>
  );
};
