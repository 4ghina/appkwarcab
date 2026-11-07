import React from 'react';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import { YouthGolongan } from '../../types/scout';

interface MentorshipHeaderProps {
  user?: any;
  gudepScope: string;
  assignedGolongan?: YouthGolongan[];
  selectedStudentName?: string;
  totalStudents: number;
  pendingCount: number;
  onClose?(): void;
}

export const MentorshipHeader: React.FC<MentorshipHeaderProps> = ({
  gudepScope,
  assignedGolongan = ['Penegak'],
  selectedStudentName,
  totalStudents,
  pendingCount,
  onClose
}) => (
  <div className="p-4 rounded-3xl bg-gradient-to-r from-[#5D4037] to-[#8D6E63] text-white shadow-md relative overflow-hidden">
    <div className="flex items-center justify-between pb-3 border-b border-white/15">
      <div className="flex items-center gap-2.5">
        {onClose && (
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white" title="Kembali">
            <ArrowLeft className="w-4 h-4" />
          </button>
        )}
        <div>
          <div className="flex items-center gap-1.5 text-[10px] text-amber-300 font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Kewenangan Pembina Satuan</span>
          </div>
          <h2 className="text-base font-extrabold text-white">Pembinaan Peserta Didik</h2>
        </div>
      </div>
      <div className="flex items-center gap-1.5">
        <span className="text-[10px] bg-white/20 px-2.5 py-1 rounded-full font-bold">
          {gudepScope.split(' ')[0]} {gudepScope.split(' ')[1] || ''}
        </span>
        <span className="text-[9px] bg-amber-400 text-stone-950 px-2 py-0.5 rounded-full font-extrabold">
          Uji: {assignedGolongan.join(', ')}
        </span>
      </div>
    </div>

    <div className="pt-2.5 flex items-center justify-between text-xs text-white/90">
      <span>{selectedStudentName ? `Binaan Terpilih: ${selectedStudentName}` : `Pilih Peserta Didik Binaan (${totalStudents} Anggota)`}</span>
      <span className="font-mono text-amber-300 text-[11px] font-bold">{pendingCount} Menunggu Uji</span>
    </div>
  </div>
);
