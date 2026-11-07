import React from 'react';
import { PUSDIKLAT_COURSES } from '../../data/mockData';
import { Calendar, Clock, Check } from 'lucide-react';

export const PusdiklatCourseCard: React.FC<{
  course: typeof PUSDIKLAT_COURSES[0];
  isRegistered: boolean;
  onRegister: (name: string, id: string) => void;
}> = ({ course, isRegistered, onRegister }) => (
  <div className="p-4 rounded-3xl bg-white border border-stone-200/90 shadow-2xs space-y-2.5">
    <div className="flex items-start justify-between gap-2">
      <div>
        <span className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-amber-100 text-[#5D4037]">
          {course.tingkat}
        </span>
        <h4 className="text-xs font-bold text-stone-900 mt-1">{course.nama}</h4>
        <p className="text-[10px] text-stone-500 mt-0.5">{course.tempat}</p>
      </div>
      <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-xl border border-emerald-200 shrink-0">
        {course.biaya}
      </span>
    </div>
    <div className="flex items-center gap-4 text-[11px] text-stone-600 pt-1 border-t border-stone-100">
      <div className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-stone-400" /><span>{course.jadwal}</span></div>
      <div className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-stone-400" /><span>{course.status}</span></div>
    </div>
    <div className="flex items-center justify-between pt-1">
      <span className="text-[10px] text-stone-500">Kuota Tersisa: <strong>{course.kuota - course.terisi} Peserta</strong></span>
      {isRegistered ? (
        <span className="px-3 py-1.5 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1"><Check className="w-3.5 h-3.5" /><span>Terdaftar</span></span>
      ) : (
        <button onClick={() => onRegister(course.nama, course.id)} className="px-3.5 py-1.5 rounded-xl bg-[#5D4037] hover:bg-[#4E342E] text-white text-xs font-bold shadow-xs active:scale-95">Daftar Kursus</button>
      )}
    </div>
  </div>
);
