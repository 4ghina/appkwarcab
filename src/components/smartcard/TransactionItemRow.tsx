import React from 'react';
import { ArrowDownLeft, ArrowUpRight } from 'lucide-react';
import { CardTransactionRecord } from './smartCardTypes';

export const TransactionItemRow: React.FC<{ tx: CardTransactionRecord }> = ({ tx }) => {
  const isDebit = tx.type === 'debit';
  return (
    <div className="p-3 bg-white rounded-2xl border border-stone-200 flex items-center justify-between text-xs">
      <div className="flex items-center gap-2.5">
        <div className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 ${isDebit ? 'bg-rose-50 text-rose-700' : 'bg-emerald-50 text-emerald-700'}`}>
          {isDebit ? <ArrowDownLeft className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
        </div>
        <div className="min-w-0">
          <p className="font-bold text-stone-900 truncate">{tx.merchant}</p>
          <p className="text-[10px] text-stone-500">{tx.timestamp}</p>
        </div>
      </div>
      <div className="text-right shrink-0">
        <span className={`font-mono font-bold block ${isDebit ? 'text-rose-700' : 'text-emerald-700'}`}>
          {isDebit ? '-' : '+'} Rp {tx.amount.toLocaleString('id-ID')}
        </span>
        <span className="text-[9px] text-stone-400">Sisa: Rp {tx.balanceAfter.toLocaleString('id-ID')}</span>
      </div>
    </div>
  );
};
