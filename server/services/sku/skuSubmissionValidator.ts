export interface SkuValidationRequest {
  studentGolongan: string;
  studentCurrentTingkat?: string;
  itemGolongan?: string;
  itemTingkat?: string;
  itemNumber?: number;
}

export interface SkuValidationResult {
  isValid: boolean;
  statusCode: number;
  errorMessage?: string;
}

/**
 * Tanggung Jawab: Validasi pengajuan butir SKU/SKK peserta didik.
 * Menegakkan aturan: materi antar-golongan tidak boleh tercampur dan
 * siswa harus menyelesaikan tingkat aktif sebelum menempuh tingkat berikutnya.
 */
export function validateSkuSubmission(req: SkuValidationRequest): SkuValidationResult {
  const { studentGolongan, studentCurrentTingkat, itemGolongan, itemTingkat, itemNumber } = req;

  // 1. Validasi kesesuaian golongan (Siaga vs Penggalang vs Penegak vs Pandega)
  if (itemGolongan && itemGolongan !== studentGolongan) {
    return {
      isValid: false,
      statusCode: 403,
      errorMessage: `Akses Ditolak: Butir SKU #${itemNumber || ''} diperuntukkan bagi Golongan ${itemGolongan}, bukan untuk Golongan aktif Anda (${studentGolongan}). Materi antar-golongan tidak boleh tercampur.`,
    };
  }

  // 2. Validasi urutan penempuhan tingkat dalam golongan yang sama
  // Contoh: Penegak Bantara tidak boleh langsung mengajukan Penegak Laksana
  if (itemTingkat && studentCurrentTingkat) {
    const isPenegakJump = studentCurrentTingkat === 'Bantara' && itemTingkat === 'Laksana';
    const isPenggalangJump = (studentCurrentTingkat === 'Ramu' && (itemTingkat === 'Rakit' || itemTingkat === 'Terap')) ||
                             (studentCurrentTingkat === 'Rakit' && itemTingkat === 'Terap');
    const isSiagaJump = (studentCurrentTingkat === 'Mula' && (itemTingkat === 'Bantu' || itemTingkat === 'Tata')) ||
                        (studentCurrentTingkat === 'Bantu' && itemTingkat === 'Tata');

    if (isPenegakJump || isPenggalangJump || isSiagaJump) {
      return {
        isValid: false,
        statusCode: 403,
        errorMessage: `Akses Ditolak: Butir SKU #${itemNumber || ''} diperuntukkan bagi Tingkat ${itemTingkat}, sedangkan tingkat yang sedang Anda tempuh adalah ${studentCurrentTingkat}. Anda harus menyelesaikan dan dilantik pada tingkat berjalan terlebih dahulu sebelum menempuh tingkat berikutnya.`,
      };
    }
  }

  return {
    isValid: true,
    statusCode: 200,
  };
}
