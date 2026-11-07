import { UserProfile } from '../../types/scout';

export interface KtaTheme {
  gradient: string;
  cardAccent: string;
  borderColor: string;
  textColor: string;
  ribbonBg: string;
  badgeTitle: string;
}

const GOLONGAN_THEMES: Record<string, KtaTheme> = {
  Siaga: {
    gradient: 'from-[#065F46] via-[#047857] to-[#022C22]',
    cardAccent: 'bg-emerald-400 text-emerald-950',
    borderColor: 'border-emerald-400/60',
    textColor: 'text-emerald-200',
    ribbonBg: '#10B981',
    badgeTitle: 'Pramuka Siaga',
  },
  Penggalang: {
    gradient: 'from-[#991B1B] via-[#B91C1C] to-[#450A0A]',
    cardAccent: 'bg-rose-400 text-rose-950',
    borderColor: 'border-rose-400/60',
    textColor: 'text-rose-200',
    ribbonBg: '#EF4444',
    badgeTitle: 'Pramuka Penggalang',
  },
  Penegak: {
    gradient: 'from-[#603813] via-[#854D0E] to-[#451A03]',
    cardAccent: 'bg-amber-400 text-amber-950',
    borderColor: 'border-amber-400/60',
    textColor: 'text-amber-200',
    ribbonBg: '#F59E0B',
    badgeTitle: 'Pramuka Penegak',
  },
  Pandega: {
    gradient: 'from-[#4E342E] via-[#3E2723] to-[#1A0E0B]',
    cardAccent: 'bg-amber-200 text-stone-900',
    borderColor: 'border-amber-200/50',
    textColor: 'text-amber-100',
    ribbonBg: '#D7CCC8',
    badgeTitle: 'Pramuka Pandega',
  },
  Pembina: {
    gradient: 'from-[#1E1B4B] via-[#312E81] to-[#0F172A]',
    cardAccent: 'bg-gradient-to-r from-amber-400 to-yellow-500 text-stone-950',
    borderColor: 'border-amber-300/60',
    textColor: 'text-amber-300',
    ribbonBg: '#F59E0B',
    badgeTitle: 'Pembina Pramuka Mahir',
  },
  Pelatih: {
    gradient: 'from-[#1E1B4B] via-[#312E81] to-[#0F172A]',
    cardAccent: 'bg-gradient-to-r from-amber-400 to-yellow-500 text-stone-950',
    borderColor: 'border-amber-300/60',
    textColor: 'text-amber-300',
    ribbonBg: '#F59E0B',
    badgeTitle: 'Pelatih Pembina Pramuka',
  },
};

const DEFAULT_THEME: KtaTheme = {
  gradient: 'from-[#5D4037] via-[#4E342E] to-[#271612]',
  cardAccent: 'bg-amber-400 text-stone-950',
  borderColor: 'border-amber-400/50',
  textColor: 'text-amber-200',
  ribbonBg: '#D97706',
  badgeTitle: 'Gerakan Pramuka',
};

export function getKtaTheme(user: UserProfile): KtaTheme {
  const isVerified = user.membershipStatus === 'verified' && Boolean(user.nta);
  if (!isVerified) {
    const isPending = user.membershipStatus === 'pending_verification';
    return {
      gradient: 'from-[#374151] via-[#1F2937] to-[#111827]',
      cardAccent: 'bg-amber-500 text-stone-950',
      borderColor: 'border-amber-400/50',
      textColor: 'text-amber-300',
      ribbonBg: '#F59E0B',
      badgeTitle: isPending ? 'Menunggu Verifikasi Gudep' : 'Pra-Registrasi (Non-Anggota)',
    };
  }
  const g = user.youthGolongan || user.golongan || '';
  return GOLONGAN_THEMES[g] || DEFAULT_THEME;
}
