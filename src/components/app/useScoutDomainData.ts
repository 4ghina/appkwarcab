import { useState } from 'react';
import {
  SKUItem, SKKBadge, SKKRequirement, AssessmentSubmission,
  BinaanStudent, GudepData, GarudaApplication, CabangEvent, VerificationItem
} from '../../types/scout';
import {
  PROFILES_BY_ROLE, INITIAL_SKU_ITEMS_BY_GOLONGAN, INITIAL_SKK_REQUIREMENTS,
  INITIAL_TKK_BADGES, MOCK_BINAAN_STUDENTS, MOCK_ASSESSMENT_SUBMISSIONS,
  MOCK_GUDEP_LIST, MOCK_GARUDA_APPLICATIONS, MOCK_CABANG_EVENTS,
  MOCK_VERIFICATION_QUEUE
} from '../../data/mockData';

export function useScoutDomainData() {
  const initialGolongan = PROFILES_BY_ROLE.penegak.youthGolongan || 'Penegak';
  const [skuList, setSkuList] = useState<SKUItem[]>(INITIAL_SKU_ITEMS_BY_GOLONGAN[initialGolongan]);
  const [skkBadges, setSkkBadges] = useState<SKKBadge[]>(INITIAL_TKK_BADGES);
  const [skkRequirements, setSkkRequirements] = useState<SKKRequirement[]>(INITIAL_SKK_REQUIREMENTS);
  const [assessmentQueue, setAssessmentQueue] = useState<AssessmentSubmission[]>(MOCK_ASSESSMENT_SUBMISSIONS);
  const [binaanStudents] = useState<BinaanStudent[]>(MOCK_BINAAN_STUDENTS);
  const [gudepList] = useState<GudepData[]>(MOCK_GUDEP_LIST);
  const [garudaApplications] = useState<GarudaApplication[]>(MOCK_GARUDA_APPLICATIONS);
  const [eventsList] = useState<CabangEvent[]>(MOCK_CABANG_EVENTS);
  const [verificationQueue, setVerificationQueue] = useState<VerificationItem[]>(MOCK_VERIFICATION_QUEUE);

  return {
    skuList, setSkuList, skkBadges, setSkkBadges, skkRequirements, setSkkRequirements,
    assessmentQueue, setAssessmentQueue, binaanStudents, gudepList, garudaApplications,
    eventsList, verificationQueue, setVerificationQueue
  };
}
