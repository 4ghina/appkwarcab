import React from 'react';
import { ChevronRight, AlertCircle } from 'lucide-react';
import { BinaanStudent } from '../../types/scout';
import { StudentCardHeader } from './StudentCardHeader';
import { StudentCardProgressFooter } from './StudentCardProgressFooter';

interface StudentCardProps {
  student: BinaanStudent;
  isAuthorized: boolean;
  onSelect(): void;
}

export const StudentCard: React.FC<StudentCardProps> = ({ student, isAuthorized, onSelect }) => {
  const isEligible = student.skuPassed >= student.skuTotal && student.skuTotal > 0;
  const percent = student.skuTotal > 0 ? Math.round((student.skuPassed / student.skuTotal) * 100) : 0;

  return (
    <div
      onClick={onSelect}
      className={`p-4 bg-white rounded-3xl border transition-all cursor-pointer shadow-xs hover:shadow-md space-y-3 ${
        isEligible ? 'border-emerald-300 ring-1 ring-emerald-200' : 'border-stone-200 hover:border-[#5D4037]'
      }`}
    >
      <StudentCardHeader student={student} />
      <StudentCardProgressFooter
        student={student}
        isAuthorized={isAuthorized}
        isEligible={isEligible}
        percent={percent}
      />
    </div>
  );
};
