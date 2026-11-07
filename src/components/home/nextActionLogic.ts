import { UserProfile, SKUItem, AssessmentSubmission } from '../../types/scout';
import { AlertCircle, BookOpen, Sparkles, Building2, Edit3, CheckSquare, ShieldCheck } from 'lucide-react';

export interface ActionConfig {
  badge: string;
  title: string;
  description: string;
  actionLabel: string;
  action: () => void;
  icon: React.ComponentType<{ className?: string }>;
  themeClass: string;
}

interface ActionContext {
  user: UserProfile;
  skuList: SKUItem[];
  assessmentQueue: AssessmentSubmission[];
  pendingVerifCount: number;
  onOpenSKU: () => void;
  onOpenAffiliation: () => void;
  onOpenProfile: () => void;
  onOpenPembinaan: () => void;
  onOpenVerification: () => void;
  onOpenEvents: () => void;
  onOpenVerifyId?: () => void;
}

function checkMembershipStatus(ctx: ActionContext): ActionConfig | null {
  const { user } = ctx;
  if (user.membershipApplication?.status === 'rejected') {
    return {
      badge: 'Perlu Revisi Pengajuan',
      title: 'Pengajuan Pengaitan Gudep Perlu Diperbaiki',
      description: 'Pembina telah mengembalikan berkas pengajuan Anda dengan catatan kelengkapan.',
      actionLabel: 'Perbaiki Pengajuan Sekarang',
      action: ctx.onOpenAffiliation,
      icon: AlertCircle,
      themeClass: 'from-rose-800 via-rose-900 to-stone-900 border-rose-500',
    };
  }
  if (!user.ayoPramukaLinked && user.role !== 'admin_kwarran' && user.role !== 'superadmin_kwarcab') {
    return {
      badge: 'Verifikasi KTA',
      title: 'Verifikasi ID Anggota Ayo Pramuka',
      description: 'Tautkan nomor KTA resmi dari Kwartir Nasional untuk mengaktifkan Kartu Digital SIM-KWARCAB.',
      actionLabel: 'Verifikasi ID Anggota',
      action: ctx.onOpenVerifyId || ctx.onOpenProfile,
      icon: ShieldCheck,
      themeClass: 'from-amber-800 via-amber-900 to-stone-900 border-amber-400',
    };
  }
  if (!user.birthDate || !user.calculatedAge) {
    return {
      badge: 'Langkah Awal',
      title: 'Lengkapi Data Tanggal Lahir & Profil',
      description: 'Tanggal lahir diperlukan untuk menentukan golongan Pramuka dan menerbitkan KTA.',
      actionLabel: 'Lengkapi Profil Sekarang',
      action: ctx.onOpenProfile,
      icon: Edit3,
      themeClass: 'from-blue-800 via-blue-900 to-stone-900 border-blue-400',
    };
  }
  if (user.membershipStatus === 'unregistered' || !user.gudepName || user.gudepName.includes('Belum')) {
    return {
      badge: 'Keanggotaan',
      title: 'Hubungkan Akun ke Gugus Depan Anda',
      description: 'Pilih pangkalan sekolah atau Gudep wilayah agar Pembina dapat memvalidasi keanggotaan.',
      actionLabel: 'Cari & Ajukan Pengaitan Gudep',
      action: ctx.onOpenAffiliation,
      icon: Building2,
      themeClass: 'from-[#5D4037] via-[#4E342E] to-stone-900 border-amber-400',
    };
  }
  return null;
}

function checkDutyStatus(ctx: ActionContext): ActionConfig | null {
  const { user, assessmentQueue, pendingVerifCount } = ctx;
  const pendingAssessments = assessmentQueue.filter((s) => s.status === 'diajukan');
  if (user.role === 'pembina' && pendingAssessments.length > 0) {
    return {
      badge: 'Tugas Pembina',
      title: `${pendingAssessments.length} Pengajuan Uji Siswa Menunggu Pemeriksaan`,
      description: `Peserta didik binaan di ${user.gudepName} telah menyetorkan butir SKU/SKK.`,
      actionLabel: 'Periksa Pengajuan Peserta Didik',
      action: ctx.onOpenPembinaan,
      icon: CheckSquare,
      themeClass: 'from-emerald-800 via-emerald-900 to-stone-900 border-emerald-400',
    };
  }
  if ((user.role === 'admin_kwarran' || user.role === 'superadmin_kwarcab') && pendingVerifCount > 0) {
    return {
      badge: 'Tugas Administrator',
      title: `${pendingVerifCount} Permohonan Pengaitan Masuk Antrean`,
      description: 'Terdapat permohonan keanggotaan dan pengaitan Gudep yang menunggu validasi.',
      actionLabel: 'Buka Antrean Verifikasi Admin',
      action: ctx.onOpenVerification,
      icon: ShieldCheck,
      themeClass: 'from-purple-800 via-purple-900 to-stone-900 border-purple-400',
    };
  }
  return null;
}

function checkYouthSkuStatus(ctx: ActionContext): ActionConfig | null {
  const { user, skuList } = ctx;
  const nextUnfilled = skuList.find((s) => !s.isPassed && s.status !== 'diajukan');
  if (user.memberCategory === 'peserta_didik' && nextUnfilled) {
    return {
      badge: `Progres SKU ${nextUnfilled.tingkat}`,
      title: `Lanjutkan Pemenuhan Butir #${nextUnfilled.nomor}`,
      description: nextUnfilled.deskripsi,
      actionLabel: `Setor Bukti Butir #${nextUnfilled.nomor}`,
      action: ctx.onOpenSKU,
      icon: BookOpen,
      themeClass: 'from-[#5D4037] via-[#4E342E] to-stone-900 border-amber-400/50',
    };
  }
  return null;
}

function getDefaultAction(ctx: ActionContext): ActionConfig {
  return {
    badge: 'Status Terkini',
    title: 'Seluruh Tugas & Pengajuan Telah Terpenuhi',
    description: 'Pertahankan keaktifan kepramukaan Anda. Lihat agenda kegiatan dan materi latihan terbaru.',
    actionLabel: 'Jelajahi Agenda Kegiatan',
    action: ctx.onOpenEvents,
    icon: Sparkles,
    themeClass: 'from-stone-800 via-stone-900 to-black border-stone-700',
  };
}

export function determineNextAction(ctx: ActionContext): ActionConfig {
  return checkMembershipStatus(ctx)
    || checkDutyStatus(ctx)
    || checkYouthSkuStatus(ctx)
    || getDefaultAction(ctx);
}
