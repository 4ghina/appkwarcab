export interface CardBalanceData {
  amount: number;
  currency: string;
  lastReadTime: string;
  source: string;
}

export interface CardTransactionRecord {
  id: string;
  timestamp: string;
  merchant: string;
  type: 'debit' | 'credit';
  amount: number;
  balanceAfter: number;
}

export interface CardTapPayload {
  uid: string;
  cardType: 'mifare_classic' | 'desfire' | 'felica' | 'emoney_cobrand';
  supportedFeatures: {
    identity: boolean;
    balance: boolean;
    transactions: boolean;
  };
  associatedMember?: {
    userId: string;
    nta: string;
    name: string;
    golongan: string;
    tingkat: string;
    gudep: string;
  };
  balanceData?: CardBalanceData;
  transactionsData?: CardTransactionRecord[];
}

export interface SmartCardAttendanceLog {
  id: string;
  timestamp: string;
  cardUid: string;
  cardType: string;
  nta: string;
  name: string;
  gudep: string;
  eventName: string;
  status: 'Hadir Tepat Waktu' | 'Terlambat';
  verifiedVia: 'RFID/NFC Tap' | 'Manual PIN' | 'QR Backup';
}

export const TEST_SMART_CARDS: CardTapPayload[] = [
  {
    uid: '04:A2:3B:5C:8D',
    cardType: 'emoney_cobrand',
    supportedFeatures: { identity: true, balance: true, transactions: true },
    associatedMember: {
      userId: 'user-penegak-1',
      nta: '09.22.01.00421',
      name: 'Dimas Arya Pratama',
      golongan: 'Penegak',
      tingkat: 'Penegak Bantara',
      gudep: 'SMA Negeri 1 Depok (01.001)',
    },
    balanceData: {
      amount: 145000,
      currency: 'IDR',
      lastReadTime: '03 Nov 2026, 09:15 WIB',
      source: 'Sektor Co-Branding Chip KTA Multi-Fungsi Kwarcab Kota Depok',
    },
    transactionsData: [
      { id: 'tx-101', timestamp: '02 Nov 2026, 14:30 WIB', merchant: 'Kantin Kemah Kwarcab', type: 'debit', amount: 25000, balanceAfter: 145000 },
      { id: 'tx-102', timestamp: '01 Nov 2026, 10:12 WIB', merchant: 'Koperasi Kedai Pramuka', type: 'debit', amount: 50000, balanceAfter: 170000 },
      { id: 'tx-103', timestamp: '28 Okt 2026, 16:45 WIB', merchant: 'Merchant Transportasi Bus Kwarcab', type: 'debit', amount: 15000, balanceAfter: 220000 },
    ],
  },
  {
    uid: '04:F8:1C:99:21',
    cardType: 'mifare_classic',
    supportedFeatures: { identity: true, balance: true, transactions: false },
    associatedMember: {
      userId: 'user-penggalang-1',
      nta: '09.22.02.01289',
      name: 'Nabila Putri Azzahra',
      golongan: 'Penggalang',
      tingkat: 'Penggalang Rakit',
      gudep: 'SMP Negeri 2 Depok (02.015)',
    },
    balanceData: {
      amount: 50000,
      currency: 'IDR',
      lastReadTime: '03 Nov 2026, 08:30 WIB',
      source: 'Internal Secure Sector (Koperasi Sekolah)',
    },
    transactionsData: [],
  },
  {
    uid: '04:77:E3:4A:10',
    cardType: 'desfire',
    supportedFeatures: { identity: true, balance: false, transactions: false },
    associatedMember: {
      userId: 'user-siaga-1',
      nta: '09.22.01.09012',
      name: 'Rizky Al-Fatih',
      golongan: 'Siaga',
      tingkat: 'Siaga Tata',
      gudep: 'SD Negeri Anyelir 1 Depok (01.011)',
    },
  },
];
