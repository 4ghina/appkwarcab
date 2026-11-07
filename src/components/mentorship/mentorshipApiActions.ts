import { BinaanStudent } from '../../types/scout';

export async function submitReviewApi(
  subId: string,
  decision: 'disahkan' | 'perlu_revisi',
  feedback: string,
  user: any,
  assignedGolongan: string[]
) {
  try {
    await fetch(`/api/proficiency/submissions/${subId}/review`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ decision, feedback, examinerId: user.id, examinerName: user.name, examinerRole: user.role, examinerAssignedGolongan: assignedGolongan, canExamineSKU: true })
    });
  } catch (e) {}
}

export async function directEndorseApi(
  userId: string,
  skuId: string,
  user: any,
  notes: string,
  testMethod?: string,
  assignedGolongan?: string[]
) {
  try {
    await fetch('/api/sku/endorse', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, skuId, isPassed: true, examinerName: user.name, examinerRole: user.role, canExamineSKU: true, notes, testMethod, examinerAssignedGolongan: assignedGolongan })
    });
  } catch (e) {}
}

export async function verifyEligibilityApi(studentId: string, user: any, notes: string) {
  try {
    await fetch('/api/advancement/verify-eligibility', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ studentId, examinerName: user.name, examinerRole: user.role, canExamineSKU: true, notes })
    });
  } catch (e) {}
}

export async function inaugurateApi(studentId: string, skNumber: string, date: string, user: any, notes: string) {
  try {
    const res = await fetch('/api/advancement/inaugurate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ studentId, skNumber, inaugurationDate: date, examinerName: user.name, notes })
    });
    return await res.json();
  } catch (e) {
    return null;
  }
}

export async function transferGolonganApi(studentId: string, targetGolongan: string, decreeNumber: string) {
  try {
    const res = await fetch('/api/advancement/transfer-golongan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ studentId, targetGolongan, decreeNumber })
    });
    return await res.json();
  } catch (e) {
    return null;
  }
}
