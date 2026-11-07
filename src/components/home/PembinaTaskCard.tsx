import React from 'react';
import { Users, ChevronRight } from 'lucide-react';
import { AssessmentSubmission, BinaanStudent } from '../../types/scout';

interface PembinaTaskCardProps {
  gudepName?: string;
  binaanStudents: BinaanStudent[];
  assessmentQueue: AssessmentSubmission[];
  onOpenPembinaan(): void;
}

export const PembinaTaskCard: React.FC<PembinaTaskCardProps> = ({
  gudepName,
  binaanStudents,
  assessmentQueue,
  onOpenPembinaan,
}) => {
  const pending = assessmentQueue.filter((s) => s.status === 'diajukan');
  const revision = assessmentQueue.filter((s) => s.status === 'perlu_revisi');

  return (
    <div
      onClick={onOpenPembinaan}
      className="p-4 rounded-3xl bg-gradient-to-r from-[#5D4037] to-[#8D6E63] text-white shadow-sm cursor-pointer hover:shadow-md transition-all space-y-2.5"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-2xl bg-white/20 flex items-center justify-center text-amber-300 font-bold shrink-0">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[9px] uppercase font-bold tracking-wider text-amber-200 block">
              Wewenang Pembina Satuan
            </span>
            <h3 className="text-xs font-black">
              Pembinaan Peserta Didik ({gudepName || 'SMAN 1 Depok'})
            </h3>
          </div>
        </div>
        <ChevronRight className="w-4 h-4 text-amber-200" />
      </div>

      <div className="grid grid-cols-3 gap-2 text-center text-xs pt-1 border-t border-white/20">
        <div className="p-2 rounded-xl bg-black/20">
          <span className="block font-black font-mono text-sm">{binaanStudents.length}</span>
          <span className="text-[9px] text-white/80">Peserta Binaan</span>
        </div>
        <div className="p-2 rounded-xl bg-amber-400 text-stone-950 font-bold">
          <span className="block font-black font-mono text-sm">{pending.length}</span>
          <span className="text-[9px]">Menunggu Uji</span>
        </div>
        <div className="p-2 rounded-xl bg-black/20">
          <span className="block font-black font-mono text-sm text-rose-300">{revision.length}</span>
          <span className="text-[9px] text-white/80">Revisi</span>
        </div>
      </div>
    </div>
  );
};
