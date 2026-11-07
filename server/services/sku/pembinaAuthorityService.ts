export interface ExaminerAuthorityRequest {
  examinerId: string;
  examinerRole?: string;
  assignedGolongan?: string[];
  scopeGudepId?: string;
  canExamineSKU?: boolean;
  studentGolongan: string;
  studentGudepId?: string;
}

export interface ExaminerAuthorityResult {
  isAuthorized: boolean;
  statusCode: number;
  errorMessage?: string;
}

/**
 * Tanggung Jawab: Memeriksa legalitas dan batas kewenangan Pembina dalam menguji butir SKU/SKK.
 * Memastikan pembina hanya menguji peserta didik dalam lingkup golongan yang ditugaskan.
 */
export function validateExaminerAuthority(req: ExaminerAuthorityRequest): ExaminerAuthorityResult {
  const { examinerRole, assignedGolongan, canExamineSKU, studentGolongan } = req;

  // 1. Admin/Tamu tidak otomatis memiliki kewenangan pengujian teknis
  if (canExamineSKU === false) {
    return {
      isAuthorized: false,
      statusCode: 403,
      errorMessage: 'Akses Ditolak: Peran atau akun Anda tidak memiliki kewenangan sebagai Pembina Penguji SKU/SKK.',
    };
  }

  // 2. Batasan golongan binaan (contoh: Pembina Penegak dilarang menguji SKU Penggalang)
  if (assignedGolongan && assignedGolongan.length > 0) {
    const isMatchingGolongan = assignedGolongan.includes(studentGolongan);
    if (!isMatchingGolongan) {
      return {
        isAuthorized: false,
        statusCode: 403,
        errorMessage: `Akses Ditolak: Lingkup penugasan Pembina (${assignedGolongan.join(', ')}) tidak mencakup Golongan peserta didik (${studentGolongan}). Pengujian hanya dapat dilakukan oleh Pembina dengan penugasan yang sah.`,
      };
    }
  }

  return {
    isAuthorized: true,
    statusCode: 200,
  };
}
