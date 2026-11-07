import { useState } from 'react';
import { UserProfile, BinaanStudent, AssessmentSubmission, YouthGolongan } from '../../types/scout';
import { SKUMasterItem } from '../../data/skuMasterBank';
import {
  submitReviewApi, directEndorseApi, verifyEligibilityApi, inaugurateApi, transferGolonganApi
} from './mentorshipApiActions';

export function useMentorshipWorkspace(
  user: UserProfile,
  initialStudents: BinaanStudent[],
  initialSubmissions: AssessmentSubmission[],
  onReviewSubmission: (id: string, dec: any, fb: string, cert?: string) => void
) {
  const [students, setStudents] = useState<BinaanStudent[]>(initialStudents);
  const [submissions, setSubmissions] = useState<AssessmentSubmission[]>(initialSubmissions);
  const [selectedStudent, setSelectedStudent] = useState<BinaanStudent | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('Semua');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [activeReviewItem, setActiveReviewItem] = useState<AssessmentSubmission | null>(null);
  const [reviewDecision, setReviewDecision] = useState<'disahkan' | 'perlu_revisi'>('disahkan');
  const [reviewerFeedback, setReviewerFeedback] = useState('');

  const [testingItem, setTestingItem] = useState<SKUMasterItem | null>(null);
  const [testMethod, setTestMethod] = useState<'praktek' | 'pengamatan' | 'wawancara' | 'tertulis'>('praktek');
  const [testNotes, setTestNotes] = useState('');

  const [showAdvancementModal, setShowAdvancementModal] = useState(false);
  const [advancementNotes, setAdvancementNotes] = useState('');
  const [showInaugurationModal, setShowInaugurationModal] = useState(false);
  const [skNumber, setSkNumber] = useState('');
  const [inaugurationDate, setInaugurationDate] = useState('Hari ini');
  const [inaugurationNotes, setInaugurationNotes] = useState('');
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [transferTargetGolongan, setTransferTargetGolongan] = useState<YouthGolongan>('Penegak');
  const [transferDecreeNumber, setTransferDecreeNumber] = useState('');

  const activeAssignment = user.assignments.find(a => a.canExamineSKU || a.roleType.includes('Pembina'));
  const gudepScope = activeAssignment?.organizationUnit || user.gudepName || 'Gudep 01.001 SMAN 1 Depok';
  const assignedGolongan: YouthGolongan[] = activeAssignment?.assignedGolongan || ['Penegak'];

  const showToast = (msg: string) => { setToastMessage(msg); setTimeout(() => setToastMessage(null), 3500); };

  const handleOpenReview = (sub: AssessmentSubmission, dec: 'disahkan' | 'perlu_revisi') => {
    setActiveReviewItem(sub); setReviewDecision(dec);
    setReviewerFeedback(dec === 'disahkan' ? 'Pemenuhan butir telah diuji.' : 'Perlu melengkapi foto.');
  };

  const handleSubmitReview = async () => {
    if (!activeReviewItem) return;
    await submitReviewApi(activeReviewItem.id, reviewDecision, reviewerFeedback, user, assignedGolongan);
    onReviewSubmission(activeReviewItem.id, reviewDecision, reviewerFeedback);
    setSubmissions(prev => prev.map(s => s.id === activeReviewItem.id ? { ...s, status: reviewDecision, reviewerFeedback } : s));
    showToast(`Penilaian dicatat: ${reviewDecision}.`);
    setActiveReviewItem(null);
  };

  const handleDirectPointEndorse = async () => {
    if (!selectedStudent || !testingItem) return;
    await directEndorseApi(selectedStudent.userId, testingItem.id, user, testNotes, testMethod, assignedGolongan);
    const newPassed = Math.min(selectedStudent.skuPassed + 1, selectedStudent.skuTotal);
    const updated = { ...selectedStudent, skuPassed: newPassed } as BinaanStudent;
    setSelectedStudent(updated);
    setStudents(prev => prev.map(s => s.id === updated.id ? updated : s));
    showToast(`Butir #${testingItem.nomor} berhasil diuji dan disahkan!`);
    setTestingItem(null);
  };

  return {
    students, setStudents, submissions, setSubmissions, selectedStudent, setSelectedStudent,
    searchQuery, setSearchQuery, categoryFilter, setCategoryFilter, toastMessage, showToast,
    activeReviewItem, setActiveReviewItem, reviewDecision, setReviewDecision, reviewerFeedback, setReviewerFeedback,
    testingItem, setTestingItem, testMethod, setTestMethod, testNotes, setTestNotes,
    showAdvancementModal, setShowAdvancementModal, advancementNotes, setAdvancementNotes,
    showInaugurationModal, setShowInaugurationModal, skNumber, setSkNumber, inaugurationDate, setInaugurationDate,
    inaugurationNotes, setInaugurationNotes, showTransferModal, setShowTransferModal,
    transferTargetGolongan, setTransferTargetGolongan, transferDecreeNumber, setTransferDecreeNumber,
    gudepScope, assignedGolongan, handleOpenReview, handleSubmitReview, handleDirectPointEndorse
  };
}
