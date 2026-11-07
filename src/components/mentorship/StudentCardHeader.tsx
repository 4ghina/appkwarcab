import React from 'react';
import { ChevronRight, AlertCircle } from 'lucide-react';
import { BinaanStudent } from '../../types/scout';

interface StudentCardHeaderProps {
  student: BinaanStudent;
}

export const StudentCardHeader: React.FC<StudentCardHeaderProps> = ({ student }) => {
  const getBadgeClass = (golongan: string) => {
    switch (golongan) {
      case 'Penegak': return 'bg-amber-100 text-amber-900';
      case 'Penggalang': return 'bg-rose-100 text-rose-900';
      case 'Siaga': return 'bg-emerald-100 text-emerald-900';
      default: return 'bg-blue-100 text-blue-900';
    }
  };

  return (
    <>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <img src={student.avatar} alt={student.name} className="w-12 h-12 rounded-2xl object-cover border border-stone-200 shrink-0" />
          <div>
            <div className="flex items-center gap-1.5">
              <h4 className="text-xs font-bold text-stone-900">{student.name}</h4>
              <span className={`text-[9px] px-1.5 py-0.2 rounded font-bold ${getBadgeClass(student.golongan)}`}>
                {student.golongan}
              </span>
            </div>
            <p className="text-[11px] font-semibold text-stone-700">
              {student.currentTingkat ? `${student.golongan} ${student.currentTingkat}` : student.tingkat} • {student.age} Th
            </p>
            <p className="text-[10px] font-mono text-stone-400">
              NTA: {student.nta || student.provisionalNta || 'Belum Terbit'}
            </p>
          </div>
        </div>
        <ChevronRight className="w-4 h-4 text-stone-400 shrink-0 mt-1" />
      </div>

      {student.ageAnomalyNotice && (
        <div className="p-2 rounded-xl bg-amber-50 border border-amber-200 text-[10px] text-amber-900 flex items-center gap-1.5">
          <AlertCircle className="w-3.5 h-3.5 text-amber-700 shrink-0" />
          <span className="line-clamp-1">{student.ageAnomalyNotice}</span>
        </div>
      )}
    </>
  );
};
