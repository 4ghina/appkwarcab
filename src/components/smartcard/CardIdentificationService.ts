import { CardTapPayload, TEST_SMART_CARDS } from './smartCardTypes';

export interface CardIdentificationResult {
  found: boolean;
  payload: CardTapPayload;
  statusMessage: string;
}

/**
 * Tanggung Jawab: Identifikasi kartu fisik RFID/NFC berdasarkan UID dan pemetaan ke anggota terdaftar.
 */
export function identifyCardByUid(uid: string): CardIdentificationResult {
  const normalizedUid = uid.trim().toUpperCase();
  const matched = TEST_SMART_CARDS.find(
    (c) => c.uid.toUpperCase() === normalizedUid
  );

  if (matched) {
    return {
      found: true,
      payload: matched,
      statusMessage: `Kartu ${matched.cardType.toUpperCase()} berhasil diidentifikasi atas nama ${matched.associatedMember?.name}.`,
    };
  }

  // Fallback unrecognized card
  const unrecognized: CardTapPayload = {
    uid: normalizedUid,
    cardType: 'mifare_classic',
    supportedFeatures: { identity: false, balance: false, transactions: false },
  };

  return {
    found: false,
    payload: unrecognized,
    statusMessage: `UID ${normalizedUid} terbaca, namun belum ditautkan ke akun anggota terdaftar.`,
  };
}

/**
 * Simulasi scan acak untuk pengujian di lingkungan emulator / browser
 */
export function simulateRandomCardScan(): CardTapPayload {
  const index = Math.floor(Math.random() * TEST_SMART_CARDS.length);
  return TEST_SMART_CARDS[index];
}
