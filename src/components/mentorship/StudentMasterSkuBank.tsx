import React from 'react';
import { BookOpen } from 'lucide-react';
import { SKUMasterItem } from '../../data/skuMasterBank';
import { MasterSkuBankItemRow } from './MasterSkuBankItemRow';

interface StudentMasterSkuBankProps {
  golongan: string;
  tingkat: string;
  items: SKUMasterItem[];
  passedCount: number;
  isAuthorized: boolean;
  onStartDirectTest(item: SKUMasterItem): void;
}

export const StudentMasterSkuBank: React.FC<StudentMasterSkuBankProps> = ({
  golongan,
  tingkat,
  items,
  passedCount,
  isAuthorized,
  onStartDirectTest
}) => (
  <div className="space-y-2">
    <div>
      <h4 className="text-xs font-bold uppercase tracking-wider text-[#5D4037] flex items-center gap-1.5">
        <BookOpen className="w-3.5 h-3.5 text-[#5D4037]" />
        <span>Materi & Butir SKU {golongan} {tingkat} ({items.length} Butir Resmi)</span>
      </h4>
      <p className="text-[10px] text-stone-500">
        Bersumber dari Lampiran SK Kwarnas No. 198/2011 khusus tingkat {tingkat}.
      </p>
    </div>

    <div className="space-y-2">
      {items.map((item) => (
        <MasterSkuBankItemRow
          key={item.id}
          item={item}
          isPassed={item.nomor <= passedCount}
          isAuthorized={isAuthorized}
          onStartDirectTest={onStartDirectTest}
        />
      ))}
    </div>
  </div>
);
