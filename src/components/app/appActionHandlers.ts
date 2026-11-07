import {
  UserProfile, SKUItem, SKKBadge, SKKRequirement, AssessmentSubmission,
  VerificationItem, YouthGolongan
} from '../../types/scout';

export function submitSkuForTestingAction(
  currentUser: UserProfile | null,
  skuList: SKUItem[],
  skuId: string,
  submissionNote: string,
  setAssessmentQueue: React.Dispatch<React.SetStateAction<AssessmentSubmission[]>>,
  setSkuList: React.Dispatch<React.SetStateAction<SKUItem[]>>
) {
  if (!currentUser) return;
  const targetSKU = skuList.find(s => s.id === skuId);
  if (!targetSKU) return;
  const newSub: AssessmentSubmission = {
    id: `sub-${Date.now()}`,
    studentId: currentUser.id,
    studentName: currentUser.name,
    studentGolongan: (currentUser.youthGolongan as YouthGolongan) || 'Penegak',
    studentTingkat: currentUser.youthTingkat || currentUser.tingkatan,
    gudepId: currentUser.gudepId || 'gudep-01',
    gudepName: currentUser.gudepName || 'SMA Negeri 1 Depok',
    itemType: 'SKU',
    itemId: skuId,
    itemTitle: `Butir #${targetSKU.nomor}: ${targetSKU.deskripsi.slice(0, 50)}...`,
    category: targetSKU.kategori,
    submissionNote,
    submittedAt: 'Baru saja',
    status: 'diajukan'
  };
  setAssessmentQueue(prev => [newSub, ...prev]);
  setSkuList(prev => prev.map(s => s.id === skuId ? { ...s, status: 'diajukan', evidenceNote: submissionNote } : s));
  fetch('/api/proficiency/submissions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newSub)
  }).catch(e => console.warn('Sync error:', e));
}

export function submitSkkForApprovalAction(
  currentUser: UserProfile | null,
  skkRequirements: SKKRequirement[],
  skkId: string,
  submissionNote: string,
  setAssessmentQueue: React.Dispatch<React.SetStateAction<AssessmentSubmission[]>>,
  setSkkRequirements: React.Dispatch<React.SetStateAction<SKKRequirement[]>>
) {
  if (!currentUser) return;
  const targetSKK = skkRequirements.find(s => s.id === skkId);
  if (!targetSKK) return;
  const newSub: AssessmentSubmission = {
    id: `sub-${Date.now()}`,
    studentId: currentUser.id,
    studentName: currentUser.name,
    studentGolongan: (currentUser.youthGolongan as YouthGolongan) || 'Penegak',
    studentTingkat: currentUser.youthTingkat || currentUser.tingkatan,
    gudepId: currentUser.gudepId || 'gudep-01',
    gudepName: currentUser.gudepName || 'SMA Negeri 1 Depok',
    itemType: 'SKK',
    itemId: skkId,
    itemTitle: `${targetSKK.nama} (${targetSKK.tingkat})`,
    category: targetSKK.bidang,
    submissionNote,
    submittedAt: 'Baru saja',
    status: 'diajukan'
  };
  setAssessmentQueue(prev => [newSub, ...prev]);
  setSkkRequirements(prev => prev.map(s => s.id === skkId ? { ...s, status: 'diajukan', submissionEvidence: submissionNote } : s));
  fetch('/api/proficiency/submissions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newSub)
  }).catch(e => console.warn('Sync error:', e));
}

export function applyAssessmentDecision(
  sub: AssessmentSubmission,
  decision: 'disahkan' | 'perlu_revisi',
  feedback: string,
  examinerName: string,
  certificateNumber: string | undefined,
  setSkuList: React.Dispatch<React.SetStateAction<SKUItem[]>>,
  setSkkBadges: React.Dispatch<React.SetStateAction<SKKBadge[]>>,
  setSkkRequirements: React.Dispatch<React.SetStateAction<SKKRequirement[]>>
) {
  if (decision === 'disahkan') {
    if (sub.itemType === 'SKU') {
      setSkuList(prev => prev.map(i => i.id === sub.itemId ? { ...i, isPassed: true, status: 'lulus', testedBy: examinerName, testedDate: 'Hari ini', catatan: feedback } : i));
    } else {
      const newBadge: SKKBadge = {
        id: `tkk-${Date.now()}`, skkId: sub.itemId, nama: sub.itemTitle.split(' ')[0] || 'Kecakapan Khusus',
        tingkat: 'Purwa', bidang: 'Keterampilan/Pembangunan', color: '#2E7D32', icon: 'Award',
        earnedDate: 'Hari ini', authorizedBy: examinerName, certificateNumber
      };
      setSkkBadges(prev => [newBadge, ...prev]);
      setSkkRequirements(prev => prev.map(r => r.id === sub.itemId ? { ...r, status: 'disahkan' } : r));
    }
  } else {
    if (sub.itemType === 'SKU') {
      setSkuList(prev => prev.map(i => i.id === sub.itemId ? { ...i, status: 'perlu_revisi', catatan: feedback } : i));
    } else {
      setSkkRequirements(prev => prev.map(r => r.id === sub.itemId ? { ...r, status: 'perlu_revisi', feedbackFromPembina: feedback } : r));
    }
  }
}

export function reviewSubmissionAction(
  currentUser: UserProfile | null,
  assessmentQueue: AssessmentSubmission[],
  submissionId: string,
  decision: 'disahkan' | 'perlu_revisi',
  feedback: string,
  certificateNumber: string | undefined,
  setAssessmentQueue: React.Dispatch<React.SetStateAction<AssessmentSubmission[]>>,
  setSkuList: React.Dispatch<React.SetStateAction<SKUItem[]>>,
  setSkkBadges: React.Dispatch<React.SetStateAction<SKKBadge[]>>,
  setSkkRequirements: React.Dispatch<React.SetStateAction<SKKRequirement[]>>
) {
  if (!currentUser) return;
  setAssessmentQueue(prev => prev.map(s => s.id === submissionId ? { ...s, status: decision, examinerId: currentUser.id, examinerName: currentUser.name, reviewerFeedback: feedback, reviewedAt: 'Baru saja' } : s));
  const targetSub = assessmentQueue.find(s => s.id === submissionId);
  if (!targetSub) return;
  applyAssessmentDecision(targetSub, decision, feedback, currentUser.name, certificateNumber, setSkuList, setSkkBadges, setSkkRequirements);
  const activeAsg = currentUser.assignments.find(a => a.canExamineSKU);
  fetch(`/api/proficiency/submissions/${submissionId}/review`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      decision, feedback, examinerId: currentUser.id, examinerName: currentUser.name,
      examinerRole: currentUser.role, canExamineSKU: true, examinerScopeGudepId: activeAsg?.scopeGudepId || 'gudep-01',
      examinerAssignedGolongan: activeAsg?.assignedGolongan || ['Penegak'], certificateNumber
    })
  }).catch(e => console.warn('Sync error:', e));
}
