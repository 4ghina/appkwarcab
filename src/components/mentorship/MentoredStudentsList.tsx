import React from 'react';
import { Info } from 'lucide-react';
import { BinaanStudent } from '../../types/scout';
import { StudentCard } from './StudentCard';
import { MentoredStudentsFilter } from './MentoredStudentsFilter';

interface MentoredStudentsListProps {
  students: BinaanStudent[];
  searchQuery: string;
  onSearchChange(q: string): void;
  categoryFilter: string;
  onCategoryFilterChange(cat: string): void;
  isExaminerAuthorized?(s: BinaanStudent): boolean;
  onSelectStudent(s: BinaanStudent): void;
  onOpenReview?(item: any): void;
}

export const MentoredStudentsList: React.FC<MentoredStudentsListProps> = ({
  students,
  searchQuery,
  onSearchChange,
  categoryFilter,
  onCategoryFilterChange,
  isExaminerAuthorized,
  onSelectStudent
}) => (
  <div className="space-y-3">
    <MentoredStudentsFilter
      searchQuery={searchQuery}
      onSearchChange={onSearchChange}
      categoryFilter={categoryFilter}
      onCategoryFilterChange={onCategoryFilterChange}
    />

    <div className="p-2 bg-amber-50 rounded-2xl border border-amber-200 text-[11px] text-amber-900 flex items-start gap-2">
      <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
      <p>Pilih peserta didik binaan untuk melihat progres SKU, menguji butir, serta mengesahkan kelayakan.</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {students.map((st) => (
        <StudentCard
          key={st.id}
          student={st}
          isAuthorized={isExaminerAuthorized ? isExaminerAuthorized(st) : true}
          onSelect={() => onSelectStudent(st)}
        />
      ))}
    </div>
  </div>
);
