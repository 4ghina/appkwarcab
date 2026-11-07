import React from 'react';
import { SkuItemRow } from './SkuItemRow';
import { ReligionChoice } from './ReligiousBranchSelector';
import { SkuFilterHeader } from './SkuFilterHeader';

interface SkuItemListProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory(cat: string): void;
  searchQuery: string;
  onSearchChange(q: string): void;
  filteredSKU: any[];
  selectedReligion: ReligionChoice;
  onSelectReligion(rel: ReligionChoice): void;
  isAuthorizedExaminer: boolean;
  onSubmittingItem(item: any): void;
  onExaminerDirectPass(item: any): void;
}

export const SkuItemList: React.FC<SkuItemListProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  filteredSKU,
  selectedReligion,
  onSelectReligion,
  isAuthorizedExaminer,
  onSubmittingItem,
  onExaminerDirectPass
}) => (
  <div className="space-y-3">
    <SkuFilterHeader
      categories={categories}
      selectedCategory={selectedCategory}
      onSelectCategory={onSelectCategory}
      searchQuery={searchQuery}
      onSearchChange={onSearchChange}
    />
    <div className="space-y-2">
      {filteredSKU.map((item) => (
        <SkuItemRow
          key={item.id}
          item={item}
          selectedReligion={selectedReligion}
          onSelectReligion={onSelectReligion}
          isAuthorizedExaminer={isAuthorizedExaminer}
          onSubmittingItem={onSubmittingItem}
          onExaminerDirectPass={onExaminerDirectPass}
        />
      ))}
    </div>
  </div>
);
