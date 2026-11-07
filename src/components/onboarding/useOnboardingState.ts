import React, { useState } from 'react';
import { UserProfile, ScoutGolongan } from '../../types/scout';
import { MOCK_GUDEP_LIST } from '../../data/mockData';
import confetti from 'canvas-confetti';
import { buildParentUser, buildGudepUser, buildNoneUser, OnboardingBuildParams } from './onboardingUserBuilder';

export function useOnboardingState(email: string, onComplete: (user: UserProfile) => void) {
  const [step, setStep] = useState<1 | 2>(1);
  const [fullName, setFullName] = useState('');
  const [birthDate, setBirthDate] = useState('2008-04-12');
  const [gender, setGender] = useState<'L' | 'P'>('L');
  const [phone, setPhone] = useState('');
  const [affiliationType, setAffiliationType] = useState<'none' | 'gudep' | 'parent'>('none');
  const [selectedGudepId, setSelectedGudepId] = useState(MOCK_GUDEP_LIST[0].id);
  const [appliedRole, setAppliedRole] = useState<'Peserta Didik' | 'Pembina Satuan' | 'Pengurus Gudep/Staf'>('Peserta Didik');
  const [appliedGolongan, setAppliedGolongan] = useState<ScoutGolongan>('Penegak');
  const [claimOldNta, setClaimOldNta] = useState('');
  const [childName, setChildName] = useState('');
  const [childBirthDate, setChildBirthDate] = useState('2016-05-10');
  const [childGolongan, setChildGolongan] = useState<'Siaga' | 'Penggalang'>('Siaga');

  const handleFinish = (e: React.FormEvent) => {
    e.preventDefault();
    const params: OnboardingBuildParams = {
      email, fullName, birthDate, gender, phone, affiliationType, selectedGudepId,
      appliedRole, appliedGolongan, claimOldNta, childName, childBirthDate, childGolongan
    };
    let newUser: UserProfile;
    if (affiliationType === 'parent') newUser = buildParentUser(params);
    else if (affiliationType === 'gudep') newUser = buildGudepUser(params);
    else newUser = buildNoneUser(params);

    try { confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 }, colors: ['#5D4037', '#2E7D32', '#F59E0B'] }); } catch (err) {}
    onComplete(newUser);
  };

  return {
    step, setStep, fullName, setFullName, birthDate, setBirthDate, gender, setGender,
    phone, setPhone, affiliationType, setAffiliationType, selectedGudepId, setSelectedGudepId,
    appliedRole, setAppliedRole, appliedGolongan, setAppliedGolongan, claimOldNta, setClaimOldNta,
    childName, setChildName, childBirthDate, setChildBirthDate, childGolongan, setChildGolongan, handleFinish
  };
}
