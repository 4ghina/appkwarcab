import { UserProfile } from '../../types/scout';

export interface SessionResult {
  isExisting: boolean;
  user?: UserProfile;
}

/**
 * Tanggung Jawab: Pembentukan sesi keanggotaan.
 * Memeriksa apakah email pengguna sudah terdaftar dan membentuk sesi aktif.
 */
export function establishSession(
  email: string,
  accounts: Record<string, UserProfile>
): SessionResult {
  const normalizedEmail = email.trim().toLowerCase();
  const existingUser = Object.values(accounts).find(
    (acc) => acc.email.toLowerCase() === normalizedEmail
  );

  if (existingUser) {
    return {
      isExisting: true,
      user: existingUser,
    };
  }

  return {
    isExisting: false,
  };
}

/**
 * Generate 6-digit OTP code for secure authentication
 */
export function generateOtpCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}
