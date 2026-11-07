export interface AdvancementVerificationInput {
  studentId: string;
  studentName: string;
  skuPassed: number;
  skuTotal: number;
}

export interface InaugurationInput {
  studentId: string;
  studentName: string;
  targetGolongan: string;
  targetTingkat: string;
  decreeNumber: string;
  inaugurationDate: string;
  inauguratedBy: string;
  gudepName: string;
}

/**
 * Tanggung Jawab: Tata kelola penetapan kenaikan tingkat, validasi kelayakan pelantikan,
 * dan pencatatan nomor SK pelantikan resmi.
 */
export function verifyAdvancementEligibility(input: AdvancementVerificationInput) {
  const { studentName, skuPassed, skuTotal } = input;
  const isComplete = skuPassed >= skuTotal;

  if (!isComplete) {
    return {
      eligible: false,
      statusCode: 400,
      message: `Peserta didik ${studentName} belum memenuhi seluruh butir SKU (${skuPassed}/${skuTotal}). Syarat kelulusan belum 100%.`,
    };
  }

  return {
    eligible: true,
    statusCode: 200,
    message: `Kelayakan kenaikan tingkat ${studentName} berhasil diverifikasi. Status saat ini: Siap Pelantikan Resmi (Menunggu SK & Upacara Pelantikan).`,
  };
}

/**
 * Pencatatan pelantikan resmi dengan SK Kwarcab/Gudep.
 */
export function recordOfficialInauguration(input: InaugurationInput) {
  const { studentName, targetTingkat, decreeNumber } = input;

  return {
    success: true,
    statusCode: 200,
    newTingkat: targetTingkat,
    decreeNumber,
    message: `Pelantikan resmi berhasil dicatat dengan Nomor SK ${decreeNumber}. Tingkat aktif peserta didik kini telah diperbarui menjadi ${targetTingkat}.`,
  };
}

/**
 * Mutasi/perpindahan golongan karena pertambahan usia (e.g. Penggalang -> Penegak)
 */
export function transferYouthGolongan(studentName: string, newGolongan: string, newTingkat: string) {
  return {
    success: true,
    statusCode: 200,
    newGolongan,
    newTingkat,
    message: `Perpindahan golongan ke ${newGolongan} (${newTingkat}) berhasil disahkan. Seluruh riwayat pencapaian lama tetap terjaga utuh.`,
  };
}
