import React from 'react';
import { UserProfile, SKKBadge, SKKRequirement } from '../../types/scout';
import { SkuItemList } from './SkuItemList';
import { SkkCatalogTab } from './SkkCatalogTab';
import { TkkBadgesTab } from './TkkBadgesTab';
import { SkuAchievementHistoryTab } from './SkuAchievementHistoryTab';
import { ReligionChoice } from './ReligiousBranchSelector';

const CATEGORIES = ['Semua', 'Spiritual & Agama', 'Patriotisme & Wawasan', 'Keterampilan & Sandi', 'Fisik & Kesehatan', 'Sosial & Alam'];

interface SkuTabRouterProps {
  activeTab: 'sku' | 'skk' | 'tkk' | 'riwayat';
  user: UserProfile;
  progressData: any;
  skkBadges: SKKBadge[];
  skkCatalog?: SKKRequirement[];
  selectedReligion: ReligionChoice;
  onSelectReligion(r: ReligionChoice): void;
  isExaminer: boolean;
  onExaminerDirectPass(item: any): void;
  onSubmittingItem(item: { type: 'SKU' | 'SKK'; item: any }): void;
}

export const SkuTabRouter: React.FC<SkuTabRouterProps> = ({
  activeTab, user, progressData: d, skkBadges, skkCatalog,
  selectedReligion, onSelectReligion, isExaminer,
  onExaminerDirectPass, onSubmittingItem
}) => {
  if (activeTab === 'sku') {
    return (
      <SkuItemList
        filteredSKU={d.filteredSKU}
        selectedReligion={selectedReligion}
        onSelectReligion={onSelectReligion}
        selectedCategory={d.selectedCategory}
        onSelectCategory={d.setSelectedCategory}
        categories={CATEGORIES}
        searchQuery={d.searchQuery}
        onSearchChange={d.setSearchQuery}
        isAuthorizedExaminer={isExaminer}
        onExaminerDirectPass={onExaminerDirectPass}
        onSubmittingItem={(item: any) => onSubmittingItem({ type: 'SKU', item })}
      />
    );
  }

  if (activeTab === 'skk') {
    return (
      <SkkCatalogTab
        skkCatalog={skkCatalog || []}
        onSubmittingItem={(item: any) => onSubmittingItem({ type: 'SKK', item })}
      />
    );
  }

  if (activeTab === 'tkk') {
    return <TkkBadgesTab skkBadges={skkBadges} />;
  }

  return (
    <SkuAchievementHistoryTab
      user={user}
      targetGolongan={d.targetGolongan}
      targetTingkat={d.targetTingkat}
    />
  );
};
