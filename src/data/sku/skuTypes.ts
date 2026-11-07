export type SkuGolongan = 'Siaga' | 'Penggalang' | 'Penegak' | 'Pandega';

export type SkuTingkat = 
  | 'Mula' | 'Bantu' | 'Tata' 
  | 'Ramu' | 'Rakit' | 'Terap' 
  | 'Bantara' | 'Laksana' 
  | 'Pandega';

export type SkuKategoriArea = 
  | 'Spiritual & Agama' 
  | 'Patriotisme & Wawasan' 
  | 'Keterampilan & Sandi' 
  | 'Fisik & Kesehatan' 
  | 'Sosial & Alam';

export type VerificationMethod = 'praktek' | 'pengamatan' | 'wawancara' | 'tertulis';

export interface ReligiousBranchItem {
  religion: 'Islam' | 'Katolik' | 'Kristen Protestan' | 'Hindu' | 'Buddha';
  title: string;
  points: string[];
}

export interface SKUMasterItem {
  id: string;
  golongan: SkuGolongan;
  tingkat: SkuTingkat;
  nomor: number;
  kategori: SkuKategoriArea;
  deskripsi: string;
  subItems?: string[];
  religiousBranches?: ReligiousBranchItem[];
  verificationMethod: VerificationMethod;
  sourceDocument: string;
  pdfSourceFile: string;
  pdfPage: number;
  flaggedForReview?: boolean;
  reviewNote?: string;
}
