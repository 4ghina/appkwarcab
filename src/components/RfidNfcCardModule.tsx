import React, { useState } from 'react';
import { UserProfile, CabangEvent } from '../types/scout';
import { CardTapPayload, SmartCardAttendanceLog, TEST_SMART_CARDS } from './smartcard/smartCardTypes';
import { simulateRandomCardScan } from './smartcard/CardIdentificationService';
import { AttendanceRecordModule } from './smartcard/AttendanceRecordModule';
import { CardBalanceReader } from './smartcard/CardBalanceReader';
import { TransactionHistoryList } from './smartcard/TransactionHistoryList';
import { SmartCardSimulatorBar } from './smartcard/SmartCardSimulatorBar';
import { SmartCardTabsHeader } from './smartcard/SmartCardTabsHeader';

export type { CardTapPayload, SmartCardAttendanceLog };
export { TEST_SMART_CARDS };

interface RfidNfcCardModuleProps {
  currentUser?: UserProfile | null;
  events?: CabangEvent[];
  onClose?: () => void;
}

const INITIAL_ATTENDANCE: SmartCardAttendanceLog[] = [
  {
    id: 'att-1',
    timestamp: 'Hari ini, 08:30 WIB',
    cardUid: '04:A2:3B:5C:8D',
    cardType: 'emoney_cobrand',
    nta: '09.22.01.00421',
    name: 'Dimas Arya Pratama',
    gudep: 'SMA Negeri 1 Depok (01.001)',
    eventName: 'LT-III Regu Prestasi Kwarcab Kota Depok 2026',
    status: 'Hadir Tepat Waktu',
    verifiedVia: 'RFID/NFC Tap',
  },
];

export const RfidNfcCardModule: React.FC<RfidNfcCardModuleProps> = ({ events = [], onClose }) => {
  const [activeTab, setActiveTab] = useState<'absensi' | 'saldo' | 'transaksi'>('absensi');
  const [currentCard, setCurrentCard] = useState<CardTapPayload | null>(TEST_SMART_CARDS[0]);
  const [isScanning, setIsScanning] = useState(false);
  const [logs, setLogs] = useState<SmartCardAttendanceLog[]>(INITIAL_ATTENDANCE);

  const handleSimulateTap = () => {
    setIsScanning(true);
    setTimeout(() => {
      setCurrentCard(simulateRandomCardScan());
      setIsScanning(false);
    }, 400);
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 sm:p-5 bg-white rounded-3xl border border-stone-200 shadow-xl space-y-4 animate-in fade-in duration-200">
      <SmartCardTabsHeader activeTab={activeTab} onTabChange={setActiveTab} onClose={onClose} />
      <SmartCardSimulatorBar currentCard={currentCard} isScanning={isScanning} onSimulateTap={handleSimulateTap} />

      {activeTab === 'absensi' && (
        <AttendanceRecordModule
          activeCard={currentCard}
          events={events}
          attendanceLogs={logs}
          onRecordAttendance={(l) => setLogs((prev) => [l, ...prev])}
        />
      )}
      {activeTab === 'saldo' && <CardBalanceReader card={currentCard} />}
      {activeTab === 'transaksi' && <TransactionHistoryList card={currentCard} />}
    </div>
  );
};
