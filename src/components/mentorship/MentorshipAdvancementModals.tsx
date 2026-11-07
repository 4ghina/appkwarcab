import React from 'react';
import { BinaanStudent, YouthGolongan } from '../../types/scout';
import { AdvancementEligibilityModal } from './AdvancementEligibilityModal';
import { InaugurationModal } from './InaugurationModal';
import { TransferGolonganModal } from './TransferGolonganModal';

interface MentorshipAdvancementModalsProps {
  selectedStudent: BinaanStudent | null;
  showAdvancementModal: boolean;
  advancementNotes: string;
  onAdvancementNotesChange(n: string): void;
  onSubmitAdvancement(): void;
  onCloseAdvancement(): void;
  showInaugurationModal: boolean;
  skNumber: string;
  onSkNumberChange(n: string): void;
  inaugurationDate: string;
  onInaugurationDateChange(d: string): void;
  inaugurationNotes: string;
  onInaugurationNotesChange(n: string): void;
  onSubmitInauguration(): void;
  onCloseInauguration(): void;
  showTransferModal: boolean;
  transferTargetGolongan: YouthGolongan;
  onTransferTargetGolonganChange(g: YouthGolongan): void;
  transferDecreeNumber: string;
  onTransferDecreeNumberChange(n: string): void;
  onSubmitTransfer(): void;
  onCloseTransfer(): void;
}

export const MentorshipAdvancementModals: React.FC<MentorshipAdvancementModalsProps> = (p) => (
  <>
    {p.showAdvancementModal && p.selectedStudent && (
      <AdvancementEligibilityModal
        student={p.selectedStudent}
        notes={p.advancementNotes}
        onNotesChange={p.onAdvancementNotesChange}
        onSubmit={p.onSubmitAdvancement}
        onClose={p.onCloseAdvancement}
      />
    )}
    {p.showInaugurationModal && p.selectedStudent && (
      <InaugurationModal
        student={p.selectedStudent}
        skNumber={p.skNumber}
        onSkNumberChange={p.onSkNumberChange}
        inaugurationDate={p.inaugurationDate}
        onInaugurationDateChange={p.onInaugurationDateChange}
        notes={p.inaugurationNotes}
        onNotesChange={p.onInaugurationNotesChange}
        onSubmit={p.onSubmitInauguration}
        onClose={p.onCloseInauguration}
      />
    )}
    {p.showTransferModal && p.selectedStudent && (
      <TransferGolonganModal
        student={p.selectedStudent}
        targetGolongan={p.transferTargetGolongan}
        onTargetGolonganChange={p.onTransferTargetGolonganChange}
        decreeNumber={p.transferDecreeNumber}
        onDecreeNumberChange={p.onTransferDecreeNumberChange}
        onSubmit={p.onSubmitTransfer}
        onClose={p.onCloseTransfer}
      />
    )}
  </>
);
