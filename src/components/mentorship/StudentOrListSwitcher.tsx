import React from 'react';
import { UserProfile, BinaanStudent } from '../../types/scout';
import { MentoredStudentsList } from './MentoredStudentsList';
import { StudentWorkspaceView } from './StudentWorkspaceView';

interface StudentOrListSwitcherProps {
  ws: any;
  user: UserProfile;
  filteredStudents: BinaanStudent[];
}

export const StudentOrListSwitcher: React.FC<StudentOrListSwitcherProps> = ({ ws, user, filteredStudents }) => {
  if (!ws.selectedStudent) {
    return (
      <MentoredStudentsList
        students={filteredStudents} searchQuery={ws.searchQuery} onSearchChange={ws.setSearchQuery}
        categoryFilter={ws.categoryFilter} onCategoryFilterChange={ws.setCategoryFilter}
        onSelectStudent={ws.setSelectedStudent} onOpenReview={ws.handleOpenReview}
      />
    );
  }

  const isAuth = user.role === 'superadmin_kwarcab' || ws.assignedGolongan.includes(ws.selectedStudent.golongan);

  return (
    <StudentWorkspaceView
      selectedStudent={ws.selectedStudent}
      isExaminerAuthorized={isAuth}
      assignedGolongan={ws.assignedGolongan}
      submissions={ws.submissions}
      masterItems={ws.currentStudentMasterItems || []}
      onBack={() => ws.setSelectedStudent(null)}
      onOpenReview={ws.handleOpenReview}
      onStartDirectTest={ws.setTestingItem}
      onOpenAdvancement={() => ws.setShowAdvancementModal(true)}
      onOpenInauguration={() => ws.setShowInaugurationModal(true)}
      onOpenTransfer={() => ws.setShowTransferModal(true)}
    />
  );
};
