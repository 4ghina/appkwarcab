import React from 'react';
import { UserProfile, SKUItem, AssessmentSubmission } from '../../types/scout';
import { ArrowRight } from 'lucide-react';
import { determineNextAction } from './nextActionLogic';

interface HomeNextActionCardProps {
  user: UserProfile;
  skuList: SKUItem[];
  assessmentQueue: AssessmentSubmission[];
  pendingVerifCount: number;
  onOpenSKU: () => void;
  onOpenAffiliation: () => void;
  onOpenProfile: () => void;
  onOpenPembinaan: () => void;
  onOpenVerification: () => void;
  onOpenEvents: () => void;
  onOpenVerifyId?: () => void;
}

/**
 * Tanggung Jawab: Menampilkan kartu satu tindakan prioritas tertinggi (Next Action Hero).
 */
export const HomeNextActionCard: React.FC<HomeNextActionCardProps> = (props) => {
  const action = determineNextAction(props);
  const Icon = action.icon;

  return (
    <div className={`p-4 rounded-3xl bg-gradient-to-br ${action.themeClass} text-white shadow-lg border relative overflow-hidden space-y-3`}>
      <div className="flex items-center justify-between">
        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-white/20 text-white">
          {action.badge}
        </span>
        <Icon className="w-5 h-5 opacity-80" />
      </div>

      <div className="space-y-1">
        <h3 className="text-sm font-extrabold leading-snug">{action.title}</h3>
        <p className="text-xs text-white/80 line-clamp-2">{action.description}</p>
      </div>

      <button
        type="button"
        onClick={action.action}
        className="w-full py-2.5 px-4 rounded-2xl bg-white text-stone-950 hover:bg-stone-100 text-xs font-black flex items-center justify-center gap-1.5 shadow-md transition-all active:scale-95"
      >
        <span>{action.actionLabel}</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};
