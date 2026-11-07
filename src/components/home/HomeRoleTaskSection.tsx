import React from 'react';
import { UserProfile, SKUItem, AssessmentSubmission, BinaanStudent } from '../../types/scout';
import { YouthTaskCard } from './YouthTaskCard';
import { PembinaTaskCard } from './PembinaTaskCard';
import { AdminTaskCard } from './AdminTaskCard';

interface HomeRoleTaskSectionProps {
  user: UserProfile;
  skuList: SKUItem[];
  assessmentQueue: AssessmentSubmission[];
  binaanStudents: BinaanStudent[];
  pendingVerifCount: number;
  onOpenSKU: () => void;
  onOpenPembinaan: () => void;
  onOpenVerification: () => void;
}

function getSkuStats(skuList: SKUItem[], youthGolongan: string) {
  const matching = skuList.filter((s) => !s.golongan || s.golongan === youthGolongan);
  const passed = matching.filter((s) => s.isPassed).length;
  const total = matching.length || 23;
  return { passed, total, percent: Math.round((passed / total) * 100) };
}

export const HomeRoleTaskSection: React.FC<HomeRoleTaskSectionProps> = ({
  user,
  skuList,
  assessmentQueue,
  binaanStudents,
  pendingVerifCount,
  onOpenSKU,
  onOpenPembinaan,
  onOpenVerification,
}) => {
  const isYouth = user.memberCategory === 'peserta_didik';
  const isPembina = user.role === 'pembina';
  const isAdmin = user.role === 'admin_kwarran' || user.role === 'superadmin_kwarcab';
  const youthGolongan = user.youthGolongan || 'Penegak';
  const { passed, total, percent } = getSkuStats(skuList, youthGolongan);

  return (
    <div className="space-y-3">
      {isYouth && (
        <YouthTaskCard
          youthGolongan={youthGolongan}
          tingkat={user.youthTingkat || user.tingkatan}
          passedCount={passed}
          totalCount={total}
          percent={percent}
          onOpenSKU={onOpenSKU}
        />
      )}
      {isPembina && (
        <PembinaTaskCard
          gudepName={user.gudepName}
          binaanStudents={binaanStudents}
          assessmentQueue={assessmentQueue}
          onOpenPembinaan={onOpenPembinaan}
        />
      )}
      {isAdmin && (
        <AdminTaskCard
          kwarcab={user.kwarcab}
          pendingVerifCount={pendingVerifCount}
          onOpenVerification={onOpenVerification}
        />
      )}
    </div>
  );
};
