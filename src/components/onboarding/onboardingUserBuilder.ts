import { UserProfile, ScoutGolongan, ManagedWard, UserAssignment } from '../../types/scout';
import { calculateAge, MOCK_GUDEP_LIST } from '../../data/mockData';

export interface OnboardingBuildParams {
  email: string;
  fullName: string;
  birthDate: string;
  gender: 'L' | 'P';
  phone: string;
  affiliationType: 'none' | 'gudep' | 'parent';
  selectedGudepId: string;
  appliedRole: 'Peserta Didik' | 'Pembina Satuan' | 'Pengurus Gudep/Staf';
  appliedGolongan: ScoutGolongan;
  claimOldNta: string;
  childName: string;
  childBirthDate: string;
  childGolongan: 'Siaga' | 'Penggalang';
}

function createParentAssignment(): UserAssignment[] {
  return [{
    id: `asg-parent-${Date.now()}`,
    roleType: 'Orang Tua / Wali',
    title: 'Wali Pendamping Anggota Muda',
    organizationUnit: 'Gugus Depan Mitra Keluarga',
    level: 'Gudep',
    approvedBy: 'Sistem Terverifikasi Mandiri',
    approvedDate: 'Hari ini',
    isPrimary: true,
    canExamineSKU: false,
    canAwardTKK: false,
    canManageMembers: false
  }];
}

function createParentWard(p: OnboardingBuildParams, gudep: any): ManagedWard[] {
  return [{
    id: `ward-${Date.now()}`,
    name: p.childName.trim() || 'Ananda Pramuka',
    birthDate: p.childBirthDate,
    gender: 'L',
    golongan: p.childGolongan,
    gudepName: gudep.pangkalan,
    gudepNomor: gudep.nomorPa,
    kwarran: gudep.kwarran,
    nta: null,
    provisionalNta: `PRA-ANAK-${Date.now().toString().slice(-4)}`,
    membershipStatus: 'pending_verification',
    avatar: 'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=150&auto=format&fit=crop&q=80',
    relation: 'Anak Kandung',
    skuProgress: { passed: 0, total: 8 }
  }];
}

export function buildParentUser(p: OnboardingBuildParams): UserProfile {
  const gudep = MOCK_GUDEP_LIST.find(g => g.id === p.selectedGudepId) || MOCK_GUDEP_LIST[0];
  const age = calculateAge(p.birthDate);
  const avatar = p.gender === 'L'
    ? 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
    : 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80';

  return {
    id: `user-parent-${Date.now()}`, email: p.email, name: p.fullName.trim(), avatar,
    birthDate: p.birthDate, calculatedAge: age, phone: p.phone, gender: p.gender,
    emailVerified: true, membershipStatus: 'verified', memberCategory: 'orang_tua',
    assignments: createParentAssignment(), nta: null, provisionalNta: `WALI-${Date.now().toString().slice(-4)}`,
    golongan: 'Umum', tingkatan: 'Orang Tua / Wali Pendamping', gudepName: gudep.pangkalan,
    gudepNomor: `${gudep.nomorPa} - ${gudep.nomorPi}`, pangkalan: gudep.pangkalan,
    kwarran: gudep.kwarran, kwarcab: 'Kwartir Cabang Kota Depok', kwarda: 'Kwarda Jawa Barat',
    isGaruda: false, bloodType: 'O+', masaBerlaku: 'Pendamping Aktif', role: 'orang_tua',
    roleLabel: 'Orang Tua / Wali Murid', isParentAccount: true, managedWards: createParentWard(p, gudep)
  };
}

export function buildGudepUser(p: OnboardingBuildParams): UserProfile {
  const gudep = MOCK_GUDEP_LIST.find(g => g.id === p.selectedGudepId) || MOCK_GUDEP_LIST[0];
  const age = calculateAge(p.birthDate);
  const randomProvisional = `PRA-2026-${Math.floor(1000 + Math.random() * 9000)}`;
  const avatar = p.gender === 'L'
    ? 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'
    : 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80';

  return {
    id: `user-new-${Date.now()}`, email: p.email, name: p.fullName.trim(), avatar,
    birthDate: p.birthDate, calculatedAge: age, phone: p.phone, gender: p.gender,
    emailVerified: true, membershipStatus: 'pending_verification',
    memberCategory: p.appliedRole === 'Peserta Didik' ? 'peserta_didik' : 'anggota_dewasa',
    youthGolongan: p.appliedRole === 'Peserta Didik' ? (p.appliedGolongan as any) : undefined,
    youthTingkat: p.appliedRole === 'Peserta Didik' ? `Calon ${p.appliedGolongan}` : undefined,
    assignments: [], nta: null, provisionalNta: randomProvisional, golongan: p.appliedGolongan,
    tingkatan: `Calon ${p.appliedGolongan} (Menunggu Validasi)`, gudepName: gudep.pangkalan,
    gudepNomor: `${gudep.nomorPa} - ${gudep.nomorPi}`, pangkalan: gudep.pangkalan, kwarran: gudep.kwarran,
    kwarcab: 'Kwartir Cabang Kota Depok', kwarda: 'Kwarda Jawa Barat', isGaruda: false, bloodType: 'O+',
    masaBerlaku: 'Menunggu Pengesahan Gudep', role: 'guest_unverified',
    roleLabel: `Pemohon ${p.appliedRole} (${p.appliedGolongan})`,
    membershipApplication: {
      id: `app-${Date.now()}`, targetGudepId: gudep.id, targetGudepName: gudep.pangkalan,
      targetKwarran: gudep.kwarran, appliedRole: p.appliedRole, targetGolongan: p.appliedGolongan,
      claimExistingNTA: p.claimOldNta.trim() || undefined, appliedDate: 'Hari ini', status: 'pending'
    }
  };
}

export function buildNoneUser(p: OnboardingBuildParams): UserProfile {
  const age = calculateAge(p.birthDate);
  const randomProvisional = `PRA-2026-${Math.floor(1000 + Math.random() * 9000)}`;
  const avatar = p.gender === 'L'
    ? 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'
    : 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80';

  return {
    id: `user-new-${Date.now()}`, email: p.email, name: p.fullName.trim(), avatar,
    birthDate: p.birthDate, calculatedAge: age, phone: p.phone, gender: p.gender,
    emailVerified: true, membershipStatus: 'unaffiliated', memberCategory: 'anggota_muda_unaffiliated',
    assignments: [], nta: null, provisionalNta: randomProvisional, golongan: 'Umum',
    tingkatan: 'Tamu Terdaftar (Belum Pengaitan Gudep)', gudepName: 'Belum Terdaftar',
    gudepNomor: '-', pangkalan: 'Pendaftaran Mandiri Kwarcab', kwarran: 'Kota Depok',
    kwarcab: 'Kwartir Cabang Kota Depok', kwarda: 'Kwarda Jawa Barat', isGaruda: false,
    bloodType: 'O+', masaBerlaku: 'Menunggu Pengaitan', role: 'guest_unverified',
    roleLabel: 'Tamu Terdaftar'
  };
}
