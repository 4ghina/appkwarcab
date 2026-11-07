import React from 'react';
import { ArrowLeft, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { BinaanStudent, YouthGolongan } from '../../types/scout';
import { StudentDetailProfileRow } from './StudentDetailProfileRow';
import { StudentDetailActionBanners } from './StudentDetailActionBanners';

interface StudentDetailHeaderProps {
  student: BinaanStudent;
  isAuthorized: boolean;
  assignedGolongan: YouthGolongan[];
  onBack(): void;
  onOpenTransfer(): void;
  onOpenAdvancement(): void;
  onOpenInauguration(): void;
}

export const StudentDetailHeader: React.FC<StudentDetailHeaderProps> = ({
  student,
  isAuthorized,
  assignedGolongan,
  onBack,
  onOpenTransfer,
  onOpenAdvancement,
  onOpenInauguration
}) => {
  const is100Percent = student.skuPassed >= student.skuTotal && student.skuTotal > 0;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="flex items-center gap-1.5 text-xs font-bold text-[#5D4037] hover:underline">
          <ArrowLeft className="w-4 h-4" /><span>Kembali ke Daftar Binaan</span>
        </button>
        <span className="text-[10px] text-stone-500 font-mono">ID: {student.id}</span>
      </div>

      <div className="p-4 bg-white rounded-3xl border border-stone-200 shadow-xs space-y-3">
        <StudentDetailProfileRow student={student} is100Percent={is100Percent} />
        <StudentDetailActionBanners
          student={student}
          isAuthorized={isAuthorized}
          assignedGolongan={assignedGolongan}
          is100Percent={is100Percent}
          onOpenTransfer={onOpenTransfer}
          onOpenAdvancement={onOpenAdvancement}
          onOpenInauguration={onOpenInauguration}
        />
      </div>
    </div>
  );
};
