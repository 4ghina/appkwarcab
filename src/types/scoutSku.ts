import type { YouthGolongan } from './scoutUser';

export const AGE_GUIDELINES: Record<YouthGolongan, { min: number; max: number; label: string; description: string }> = {
  Siaga: { min: 7, max: 10, label: '7 - 10 Tahun', description: 'Usia peserta didik Siaga (Mula, Bantu, Tata)' },
  Penggalang: { min: 11, max: 15, label: '11 - 15 Tahun', description: 'Usia peserta didik Penggalang (Ramu, Rakit, Terap)' },
  Penegak: { min: 16, max: 20, label: '16 - 20 Tahun', description: 'Usia peserta didik Penegak (Bantara, Laksana)' },
  Pandega: { min: 21, max: 25, label: '21 - 25 Tahun', description: 'Usia peserta didik Pandega' },
};

export const TINGKAT_HIERARCHY: Record<YouthGolongan, string[]> = {
  Siaga: ['Mula', 'Bantu', 'Tata'],
  Penggalang: ['Ramu', 'Rakit', 'Terap'],
  Penegak: ['Bantara', 'Laksana'],
  Pandega: ['Pandega'],
};

export type AdvancementEligibilityStatus = 
  | 'sedang_menempuh'
  | 'siap_diverifikasi'
  | 'diverifikasi_layak'
  | 'telah_dilantik';

export interface LevelAchievementRecord {
  id: string;
  golongan: YouthGolongan;
  tingkat: string;
  passedDate: string;
  inauguratedDate?: string;
  decreeNumber?: string;
  examinerName: string;
  examinerNta?: string;
  gudepName: string;
  notes?: string;
}

export interface SKUItem {
  id: string;
  nomor: number;
  golongan: YouthGolongan;
  tingkat: string;
  kategori: 'Spiritual & Agama' | 'Patriotisme & Wawasan' | 'Keterampilan & Sandi' | 'Fisik & Kesehatan' | 'Sosial & Alam';
  deskripsi: string;
  isPassed: boolean;
  status: 'belum' | 'diajukan' | 'perlu_revisi' | 'lulus';
  testedBy?: string;
  testedDate?: string;
  catatan?: string;
  evidenceNote?: string;
}

export interface SKKRequirement {
  id: string;
  nama: string;
  tingkat: 'Purwa' | 'Madya' | 'Utama';
  bidang: 'Agama/Sosial' | 'Patriotisme' | 'Keterampilan/Pembangunan' | 'Ketangkasan/Kesehatan' | 'Sosial/Kemanusiaan';
  color: string;
  icon: string;
  syaratPoin: string[];
  status: 'belum_diambil' | 'sedang_dipenuhi' | 'diajukan' | 'perlu_revisi' | 'disahkan';
  submissionEvidence?: string;
  feedbackFromPembina?: string;
  targetGolongan: YouthGolongan[];
}

export interface SKKBadge {
  id: string;
  skkId?: string;
  nama: string;
  tingkat: 'Purwa' | 'Madya' | 'Utama';
  bidang: 'Agama/Sosial' | 'Patriotisme' | 'Keterampilan/Pembangunan' | 'Ketangkasan/Kesehatan' | 'Sosial/Kemanusiaan';
  color: string;
  icon: string;
  earnedDate?: string;
  authorizedBy?: string;
  certificateNumber?: string;
}

export interface AssessmentSubmission {
  id: string;
  studentId: string;
  studentName: string;
  studentGolongan: YouthGolongan;
  studentTingkat: string;
  gudepId: string;
  gudepName: string;
  itemType: 'SKU' | 'SKK';
  itemId: string;
  itemTitle: string;
  category: string;
  submissionNote: string;
  evidenceUrl?: string;
  submittedAt: string;
  status: 'diajukan' | 'perlu_revisi' | 'disahkan';
  examinerId?: string;
  examinerName?: string;
  reviewerFeedback?: string;
  reviewedAt?: string;
  tkkTingkat?: 'Purwa' | 'Madya' | 'Utama';
}

export interface BinaanStudent {
  id: string;
  userId: string;
  name: string;
  avatar: string;
  gender: 'L' | 'P';
  birthDate: string;
  age: number;
  golongan: YouthGolongan;
  tingkat: string;
  currentTingkat?: string;
  achievedTingkats?: string[];
  achievementHistory?: LevelAchievementRecord[];
  advancementStatus?: AdvancementEligibilityStatus;
  ageAnomalyNotice?: string;
  nta: string | null;
  provisionalNta?: string;
  gudepId: string;
  gudepName: string;
  skuPassed: number;
  skuTotal: number;
  tkkCount: number;
  pendingSubmissionsCount: number;
  lastActive: string;
}
