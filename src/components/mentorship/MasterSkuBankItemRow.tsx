import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { SKUMasterItem } from '../../data/skuMasterBank';

interface MasterSkuBankItemRowProps {
  item: SKUMasterItem;
  isPassed: boolean;
  isAuthorized: boolean;
  onStartDirectTest(item: SKUMasterItem): void;
}

export const MasterSkuBankItemRow: React.FC<MasterSkuBankItemRowProps> = ({
  item,
  isPassed,
  isAuthorized,
  onStartDirectTest
}) => (
  <div
    className={`p-3 bg-white rounded-2xl border transition-all space-y-2 ${
      isPassed ? 'border-emerald-200 bg-emerald-50/20' : 'border-stone-200'
    }`}
  >
    <div className="flex items-start justify-between gap-2">
      <div className="flex items-center gap-2">
        <span className={`w-6 h-6 rounded-lg font-black text-xs flex items-center justify-center shrink-0 ${
          isPassed ? 'bg-emerald-600 text-white' : 'bg-stone-100 text-stone-700'
        }`}>
          {item.nomor}
        </span>
        <span className="text-[9px] font-semibold text-amber-800 block">{item.kategori}</span>
      </div>
      <div className="flex items-center gap-1.5">
        <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-stone-100 text-stone-600 border border-stone-200">
          {item.pdfSourceFile} hlm. {item.pdfPage}
        </span>
        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-md bg-stone-100 text-stone-700 border">
          Metode: {item.verificationMethod}
        </span>
      </div>
    </div>
    <p className="text-xs text-stone-800 leading-relaxed font-medium">{item.deskripsi}</p>
    <div className="flex items-center justify-between pt-1 border-t border-stone-100 text-[10px]">
      <span className={isPassed ? 'text-emerald-800 font-bold flex items-center gap-1' : 'text-stone-500'}>
        {isPassed ? (
          <>
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            Telah Disahkan
          </>
        ) : 'Belum diuji'}
      </span>
      {!isPassed && isAuthorized && (
        <button
          onClick={() => onStartDirectTest(item)}
          className="px-2.5 py-1 bg-[#5D4037] hover:bg-[#4E342E] text-white rounded-lg font-bold text-[10px]"
        >
          Uji Langsung
        </button>
      )}
    </div>
  </div>
);
