import React from 'react';
import { UserProfile } from '../../types/scout';
import { Briefcase } from 'lucide-react';

interface ProfileAssignmentsCardProps {
  assignments: UserProfile['assignments'];
}

export const ProfileAssignmentsCard: React.FC<ProfileAssignmentsCardProps> = ({ assignments }) => {
  return (
    <div className="p-4 bg-white rounded-3xl border border-stone-200/90 shadow-sm space-y-2.5">
      <h3 className="text-xs font-bold uppercase tracking-wider text-[#5D4037] pb-2 border-b border-stone-100 flex items-center gap-1.5">
        <Briefcase className="w-4 h-4 text-stone-600" />
        Daftar Penugasan Resmi
      </h3>

      <div className="space-y-2">
        {assignments.length === 0 ? (
          <p className="text-xs text-stone-400 italic">Belum ada penugasan resmi tercatat.</p>
        ) : (
          assignments.map((asg) => (
            <div 
              key={asg.id}
              className="p-2.5 rounded-2xl bg-stone-50 border border-stone-200 text-xs space-y-1"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-stone-900">{asg.title}</span>
                <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-stone-200 text-stone-700">
                  Tingkat {asg.level}
                </span>
              </div>
              <p className="text-[10px] text-stone-600">{asg.organizationUnit}</p>
              <div className="flex items-center justify-between text-[9px] text-stone-400 pt-0.5">
                <span>Disahkan: {asg.approvedBy}</span>
                <span>{asg.approvedDate}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
