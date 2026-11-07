import type { SKKRequirement, SKKBadge } from '../../types/scout';

export const INITIAL_SKK_REQUIREMENTS: SKKRequirement[] = [
  {
    id: 'skk-berkemah',
    nama: 'SKK Berkemah',
    tingkat: 'Madya',
    bidang: 'Keterampilan/Pembangunan',
    color: '#2E7D32',
    icon: 'Tent',
    syaratPoin: [
      'Telah memiliki TKK Berkemah Purwa',
      'Telah mendirikan tenda dome dan bivak mandiri minimal 3 malam',
      'Mengetahui manajemen sanitasi perkemahan dan keamanan bahan pangan'
    ],
    status: 'diajukan',
    submissionEvidence: 'Telah mengikuti Persami mandiri di Bukit Hambalang 3 malam dengan tenda bivak. Foto dan catatan logbook terlampir.',
    targetGolongan: ['Penegak', 'Pandega']
  },
  {
    id: 'skk-p3k',
    nama: 'SKK Pertolongan Pertama Pada Kecelakaan (P3K)',
    tingkat: 'Utama',
    bidang: 'Ketangkasan/Kesehatan',
    color: '#D32F2F',
    icon: 'HeartPulse',
    syaratPoin: [
      'Telah memiliki TKK P3K Madya',
      'Mampu melakukan evakuasi korban kecelakaan patah tulang leher dan pinggul',
      'Menguasai penggunaan AED (Defibrilator Otomatis) dan resusitasi jantung paru (CPR)'
    ],
    status: 'sedang_dipenuhi',
    submissionEvidence: 'Mengikuti pelatihan simulasi medis bersama PMI Cabang dan Saka Bakti Husada.',
    targetGolongan: ['Penegak', 'Pandega']
  },
  {
    id: 'skk-navigasi',
    nama: 'SKK Pengamat & Navigasi Darat',
    tingkat: 'Madya',
    bidang: 'Ketangkasan/Kesehatan',
    color: '#0288D1',
    icon: 'Compass',
    syaratPoin: [
      'Mampu menentukan arah dengan kompas prisma dan bintang biduk',
      'Mampu membuat peta pita kontur medan berbatu sejauh 5 km'
    ],
    status: 'sedang_dipenuhi',
    targetGolongan: ['Penggalang', 'Penegak', 'Pandega']
  },
  {
    id: 'skk-juru-masak',
    nama: 'SKK Juru Masak',
    tingkat: 'Madya',
    bidang: 'Keterampilan/Pembangunan',
    color: '#F57C00',
    icon: 'Utensils',
    syaratPoin: [
      'Mampu memasak makanan bergizi seimbang untuk 1 regu (8 orang) di alam terbuka',
      'Mengetahui cara mengawetkan makanan tanpa kulkas selama 48 jam'
    ],
    status: 'disahkan',
    targetGolongan: ['Penggalang', 'Penegak', 'Pandega']
  }
];

export const INITIAL_TKK_BADGES: SKKBadge[] = [
  {
    id: 'tkk-1',
    skkId: 'skk-berkemah',
    nama: 'Berkemah',
    tingkat: 'Purwa',
    bidang: 'Keterampilan/Pembangunan',
    color: '#2E7D32',
    icon: 'Tent',
    earnedDate: '10 Des 2025',
    authorizedBy: 'Kak Suryono, S.Pd., M.Pd. (Pembina Satuan)',
    certificateNumber: 'SKK/045/TKK-KMP/102/2025'
  },
  {
    id: 'tkk-2',
    skkId: 'skk-p3k',
    nama: 'P3K',
    tingkat: 'Purwa',
    bidang: 'Ketangkasan/Kesehatan',
    color: '#D32F2F',
    icon: 'HeartPulse',
    earnedDate: '18 Jan 2026',
    authorizedBy: 'Kak Dr. Rian (Saka Bakti Husada)',
    certificateNumber: 'SKK/045/TKK-P3K/044/2026'
  },
  {
    id: 'tkk-3',
    skkId: 'skk-juru-masak',
    nama: 'Juru Masak',
    tingkat: 'Purwa',
    bidang: 'Keterampilan/Pembangunan',
    color: '#F57C00',
    icon: 'Utensils',
    earnedDate: '02 Feb 2026',
    authorizedBy: 'Kak Suryono, S.Pd., M.Pd.',
    certificateNumber: 'SKK/045/TKK-MSK/089/2026'
  },
  {
    id: 'tkk-4',
    skkId: 'skk-navigasi',
    nama: 'Pengamat / Navigasi',
    tingkat: 'Purwa',
    bidang: 'Ketangkasan/Kesehatan',
    color: '#0288D1',
    icon: 'Compass',
    earnedDate: '14 Feb 2026',
    authorizedBy: 'Kak Budi Santoso',
    certificateNumber: 'SKK/045/TKK-NVG/112/2026'
  }
];

export const INITIAL_SKK_BADGES = INITIAL_TKK_BADGES;
