import { UserProfile, VerificationItem } from '../../types/scout';

export function submitAffiliationAction(
  currentUser: UserProfile,
  data: {
    targetGudepId: string;
    targetGudepName: string;
    targetKwarran: string;
    appliedRole: any;
    targetGolongan?: any;
    claimExistingNTA?: string;
  },
  setCurrentUser: (u: UserProfile) => void,
  handleRegisterAccount: (u: UserProfile) => void,
  setVerificationQueue: React.Dispatch<React.SetStateAction<VerificationItem[]>>,
  setShowAffiliationModal: (v: boolean) => void
) {
  const updatedUser: UserProfile = {
    ...currentUser,
    membershipStatus: 'pending_verification',
    gudepName: data.targetGudepName,
    pangkalan: data.targetGudepName,
    kwarran: data.targetKwarran,
    golongan: data.targetGolongan || currentUser.golongan,
    tingkatan: `Calon ${data.targetGolongan || currentUser.golongan} (Menunggu Validasi)`,
    roleLabel: `Pemohon ${data.appliedRole}`,
    membershipApplication: {
      id: `app-${Date.now()}`,
      targetGudepId: data.targetGudepId,
      targetGudepName: data.targetGudepName,
      targetKwarran: data.targetKwarran,
      appliedRole: data.appliedRole,
      targetGolongan: data.targetGolongan,
      claimExistingNTA: data.claimExistingNTA,
      appliedDate: 'Hari ini, baru saja',
      status: 'pending'
    }
  };
  setCurrentUser(updatedUser);
  handleRegisterAccount(updatedUser);

  const newQueueItem: VerificationItem = {
    id: `verif-app-${Date.now()}`,
    jenis: 'Pengaitan Gudep & Keanggotaan',
    pengaju: currentUser.name,
    instansi: data.targetGudepName,
    tanggal: 'Baru saja',
    status: 'Pending',
    keterangan: `Permohonan pengaitan peran ${data.appliedRole} di ${data.targetGudepName}. Golongan: ${data.targetGolongan || '-'}. ${
      data.claimExistingNTA ? `Klaim NTA Lama: ${data.claimExistingNTA}` : 'Pendaftar Baru Tanpa NTA'
    }`,
    catatan: 'Menunggu persetujuan Pembina Satuan / Pengurus Gudep.'
  };
  setVerificationQueue(prev => [newQueueItem, ...prev]);
  setShowAffiliationModal(false);
}

export function approveVerificationAction(
  currentUser: UserProfile | null,
  id: string,
  setCurrentUser: (u: UserProfile) => void,
  handleRegisterAccount: (u: UserProfile) => void,
  setVerificationQueue: React.Dispatch<React.SetStateAction<VerificationItem[]>>
) {
  setVerificationQueue(prev => {
    const item = prev.find(i => i.id === id);
    if (item) {
      const rawNta = item.claimNta ? item.claimNta.split(' ')[0] : '09.22.01.00998';
      fetch('/api/membership/approve-claim', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nta: rawNta,
          userId: item.userId || currentUser?.id,
          reviewerName: currentUser?.name || 'Admin Kwartir Cabang',
          notes: 'Disetujui dari Antrean Verifikasi Otoritas Admin'
        })
      }).catch(() => {});
    }
    return prev.map(i => i.id === id ? { ...i, status: 'Disetujui' } : i);
  });

  if (currentUser?.membershipApplication) {
    const approvedNTA = currentUser.membershipApplication.claimExistingNTA || `09.22.01.${Math.floor(10000 + Math.random() * 90000)}`;
    const verifiedUser: UserProfile = {
      ...currentUser,
      membershipStatus: 'verified',
      nta: approvedNTA,
      ayoPramukaNta: approvedNTA,
      ayoPramukaLinked: true,
      ayoPramukaLinkedAt: new Date().toISOString(),
      tingkatan: `${currentUser.golongan} (Terverifikasi)`,
      roleLabel: currentUser.membershipApplication.appliedRole,
      masaBerlaku: '31 Des 2028',
      membershipApplication: { ...currentUser.membershipApplication, status: 'approved' }
    };
    setCurrentUser(verifiedUser);
    handleRegisterAccount(verifiedUser);
  }
}

export function rejectVerificationAction(
  currentUser: UserProfile | null,
  id: string,
  alasan: string,
  setCurrentUser: (u: UserProfile) => void,
  handleRegisterAccount: (u: UserProfile) => void,
  setVerificationQueue: React.Dispatch<React.SetStateAction<VerificationItem[]>>
) {
  setVerificationQueue(prev => prev.map(i => i.id === id ? { ...i, status: 'Direvisi', catatan: `Perlu Revisi: ${alasan}` } : i));
  if (currentUser?.membershipApplication) {
    const revisedUser: UserProfile = {
      ...currentUser,
      membershipStatus: 'unregistered',
      membershipApplication: { ...currentUser.membershipApplication, status: 'rejected' }
    };
    setCurrentUser(revisedUser);
    handleRegisterAccount(revisedUser);
  }
}
