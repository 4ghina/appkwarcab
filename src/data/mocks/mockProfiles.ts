import type { UserProfile } from '../../types/scout';
import { MOCK_PROFILES_YOUTH } from './mockProfilesYouth';
import { MOCK_PROFILES_YOUTH_MEMBERS } from './mockProfilesYouthMembers';
import { MOCK_PROFILES_ADULTS } from './mockProfilesAdults';
import { MOCK_PROFILES_ADMINS } from './mockProfilesAdmins';
import { MOCK_PROFILES_PARENT } from './mockProfilesParent';

export const PROFILES_BY_ROLE: Record<string, UserProfile> = {
  ...MOCK_PROFILES_YOUTH,
  ...MOCK_PROFILES_YOUTH_MEMBERS,
  ...MOCK_PROFILES_ADULTS,
  ...MOCK_PROFILES_ADMINS,
  ...MOCK_PROFILES_PARENT
};
