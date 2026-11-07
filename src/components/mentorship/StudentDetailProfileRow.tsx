import React from 'react';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';
import { BinaanStudent } from '../../types/scout';

interface StudentDetailProfileRowProps {
  student: BinaanStudent;
  is100Percent: boolean;
}

export const StudentDetailProfileRow: React.FC<StudentDetailProfileRowProps> = ({ student, is100Percent }) => {
  return (
    <div className="flex items-start justify-between gap-3">
      <div className="flex items-center gap-3">
        <img src={student.avatar} alt={student.name} className="w-14 h-14 rounded-2xl object-cover border border-stone-200" />
        <div>
          <div className="flex items-center gap-1.5">
            <h3 className="text-sm font-extrabold text-stone-900">{student.name}</h3>
            <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-amber-100 text-amber-900">{student.golongan}</span>
          </div>
          <p className="text-xs text-stone-700 font-medium">Tingkat Sedang Ditempuh: <strong>{student.currentTingkat || student.tingkat}</strong></p>
          <p className="text-[10px] text-stone-500">Usia: <strong>{student.age} Tahun</strong> (Lahir: {student.birthDate}) • Gudep: {student.gudepName}</p>
        </div>
      </div>
      <div className="text-right space-y-1">
        {student.advancementStatus === 'diverifikasi_layak' ? (
          <span className="px-2.5 py-1 rounded-full bg-blue-100 text-blue-900 font-bold text-[10px] inline-flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-700" /> Diverifikasi Layak
          </span>
        ) : is100Percent ? (
          <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-900 font-bold text-[10px] inline-flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" /> Siap Verifikasi (100%)
          </span>
        ) : (
          <span className="px-2.5 py-1 rounded-full bg-stone-100 text-stone-700 font-bold text-[10px] inline-block">Sedang Menempuh Butir</span>
        )}
      </div>
    </div>
  );
};
