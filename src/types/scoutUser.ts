export type ScoutGolongan = 'Siaga' | 'Penggalang' | 'Penegak' | 'Pandega' | 'Pembina' | 'Pelatih' | 'Umum';

export type MemberCategory = 'peserta_didik' | 'anggota_dewasa' | 'orang_tua' | 'umum' | 'anggota_muda_unaffiliated';

export type YouthGolongan = 'Siaga' | 'Penggalang' | 'Penegak' | 'Pandega';

export type ScoutRole = 
  | 'guest_unverified'
  | 'penegak' 
  | 'penggalang' 
  | 'siaga' 
  | 'pandega' 
  | 'pembina' 
  | 'pembina_satuan'
  | 'pelatih'
  | 'admin_kwarran' 
  | 'superadmin_kwarcab' 
  | 'admin_pusdiklat'
  | 'admin_pusdiklatcab_saka'
  | 'orang_tua';

export type MembershipStatus = 
  | 'unregistered'
  | 'unaffiliated'
  | 'pending_verification'
  | 'verified'
  | 'revision_needed';

export type CourseStatus = 'belum_tercatat' | 'sedang_mengikuti' | 'selesai';
export type DocumentStatus = 'belum_memiliki' | 'aktif' | 'kadaluwarsa' | 'tidak_ada';

export interface AdultCourseItem {
  code: 'KMD' | 'KML' | 'KPD' | 'KPL';
  name: string;
  level: string;
  status: CourseStatus;
  year?: number;
  certNumber?: string;
  golonganFocus?: YouthGolongan;
  organizer?: string;
  notes?: string;
}

export interface AdultAuthorityDocument {
  code: 'SHB' | 'SHL';
  name: string;
  status: DocumentStatus;
  docNumber?: string;
  issuedDate?: string;
  expiryDate?: string;
  issuedBy?: string;
  issuingAuthority?: string;
  targetUnit?: string;
  notes?: string;
}

export type ManagedWard = ChildWardProfile;
export type UserContext = ActiveContext;

export interface AdultCredentials {
  courses: {
    kmd: AdultCourseItem;
    kml: AdultCourseItem;
    kpd: AdultCourseItem;
    kpl: AdultCourseItem;
  };
  documents: {
    shb: AdultAuthorityDocument;
    shl: AdultAuthorityDocument;
  };
}

export interface YouthAchievementArchive {
  hasYouthRecord: boolean;
  highestGolongan?: YouthGolongan;
  highestTingkat?: string;
  garudaYear?: number;
  tkkBadgesCount?: number;
  historicalGudep?: string;
  historicalKwarran?: string;
  notableBadges?: string[];
}

export interface UserAssignment {
  id: string;
  roleType: string;
  title: string;
  organizationUnit: string;
  organizationUnitId?: string;
  level: 'Gudep' | 'Kwarran' | 'Kwarcab';
  approvedBy: string;
  approvedDate: string;
  isPrimary: boolean;
  canExamineSKU?: boolean;
  canAwardTKK?: boolean;
  canManageMembers?: boolean;
  scopeGudepId?: string;
  assignedGolongan?: YouthGolongan[];
}

export interface ActiveContext {
  id: string;
  assignmentId?: string;
  contextType: 'peserta_didik' | 'pembina' | 'pembina_satuan' | 'pelatih' | 'admin_kwarran' | 'superadmin_kwarcab' | 'admin_pusdiklat' | 'orang_tua';
  label: string;
  subLabel: string;
  unitName: string;
  scopeGudepId?: string;
  canExamine: boolean;
  canManageVerification: boolean;
}

export interface MembershipApplication {
  id: string;
  targetGudepId: string;
  targetGudepName: string;
  targetKwarran: string;
  appliedRole: 'Peserta Didik' | 'Pembina Satuan' | 'Pengurus Gudep/Staf' | 'Orang Tua/Wali';
  targetGolongan?: ScoutGolongan;
  claimExistingNTA?: string;
  appliedDate: string;
  status: 'pending' | 'approved' | 'rejected' | 'revision';
  reviewerNotes?: string;
}

export interface ChildWardProfile {
  id: string;
  name: string;
  birthDate: string;
  gender: 'L' | 'P';
  golongan: 'Siaga' | 'Penggalang';
  gudepName: string;
  gudepNomor: string;
  kwarran: string;
  nta: string | null;
  provisionalNta?: string;
  membershipStatus: MembershipStatus;
  avatar: string;
  relation: 'Anak Kandung' | 'Wali Resmi';
  skuProgress?: {
    passed: number;
    total: number;
  };
}

import type { LevelAchievementRecord, AdvancementEligibilityStatus } from './scoutSku';

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  avatar: string;
  birthDate?: string;
  calculatedAge?: number;
  phone?: string;
  gender?: 'L' | 'P';
  emailVerified: boolean;
  membershipStatus: MembershipStatus;
  assignments: UserAssignment[];
  memberCategory?: MemberCategory;
  youthGolongan?: YouthGolongan;
  youthTingkat?: string;
  currentTingkat?: string;
  achievedTingkats?: string[];
  achievementHistory?: LevelAchievementRecord[];
  advancementStatus?: AdvancementEligibilityStatus;
  ageAnomalyNotice?: string;
  adultCredentials?: AdultCredentials;
  youthArchive?: YouthAchievementArchive;
  activeContextId?: string;
  availableContexts?: ActiveContext[];
  nta: string | null;
  provisionalNta?: string;
  golongan: ScoutGolongan;
  tingkatan: string;
  gudepId?: string;
  gudepName: string;
  gudepNomor: string;
  pangkalan: string;
  kwarran: string;
  kwarcab: string;
  kwarda: string;
  isGaruda: boolean;
  garudaYear?: number;
  saka?: {
    nama: string;
    krida: string;
    pangkalanSaka: string;
  };
  bloodType: string;
  masaBerlaku: string;
  role: ScoutRole;
  roleLabel: string;
  membershipApplication?: MembershipApplication;
  isParentAccount?: boolean;
  managedWards?: ChildWardProfile[];
  kursusDewasa?: {
    kmd: boolean;
    kml: boolean;
    kpd: boolean;
    kpl: boolean;
    narakaryaStatus: 'Lulus' | 'Dalam Proses' | 'Belum';
    shbNomor: string;
    shbMasaBerlaku: string;
  };
  ayoPramukaNta?: string;
  ayoPramukaLinked?: boolean;
  ayoPramukaLinkedAt?: string;
  qrToken?: string;
  officialDocUrl?: string;
}

