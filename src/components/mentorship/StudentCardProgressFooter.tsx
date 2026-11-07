import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { BinaanStudent } from '../../types/scout';

interface StudentCardProgressFooterProps {
  student: BinaanStudent;
  isAuthorized: boolean;
  isEligible: boolean;
  percent: number;
}

export const StudentCardProgressFooter: React.FC<StudentCardProgressFooterProps> = ({
  student,
  isAuthorized,
  isEligible,
  percent,
}) => (
  <>
    <div className="space-y-1">
      <div className="flex items-center justify-between text-[10px]">
        <span className="text-stone-500">Progres SKU {student.currentTingkat || student.tingkat}</span>
        <span className="font-mono font-bold text-stone-800">{student.skuPassed} / {student.skuTotal} ({percent}%)</span>
      </div>
      <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${isEligible ? 'bg-emerald-500' : 'bg-[#5D4037]'}`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
    <div className="flex items-center justify-between pt-1 border-t border-stone-100 text-[10px]">
      <div className="flex items-center gap-1.5">
        <span className="font-semibold text-amber-800">{student.tkkCount} TKK</span>
        {student.pendingSubmissionsCount > 0 && (
          <span className="px-1.5 py-0.5 rounded-full bg-rose-500 text-white font-bold text-[9px]">
            {student.pendingSubmissionsCount} Uji
          </span>
        )}
      </div>
      <div className="flex items-center gap-1">
        {isEligible ? (
          <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 font-bold text-[9px] flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-700" /> Siap Verifikasi
          </span>
        ) : (
          <span className="text-stone-500 text-[9px]">Sedang Menempuh</span>
        )}
        {!isAuthorized && (
          <span className="px-1.5 py-0.5 rounded bg-stone-100 text-stone-500 text-[9px]">Di luar lingkup</span>
        )}
      </div>
    </div>
  </>
);
