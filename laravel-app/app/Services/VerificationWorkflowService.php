<?php

namespace App\Services;

use App\Models\MembershipApplication;
use App\Models\MemberProfile;
use App\Models\UserAssignment;
use App\Models\AuditLog;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class VerificationWorkflowService
{
    /**
     * Approve Gudep affiliation & membership application
     */
    public function approveApplication(int $applicationId, User $reviewer, ?string $notes = null): MemberProfile
    {
        return DB::transaction(function () use ($applicationId, $reviewer, $notes) {
            $application = MembershipApplication::where('id', $applicationId)
                ->where('status', 'pending')
                ->lockForUpdate()
                ->firstOrFail();

            $officialNta = $this->generateOfficialNta($application, $application->targetOrganization);
            return $this->executeApproval($application, $reviewer, $officialNta, $notes);
        });
    }

    private function generateOfficialNta(MembershipApplication $application, $targetOrg): string
    {
        if ($application->claim_existing_nta) {
            return $application->claim_existing_nta;
        }
        $kwarcabCode = '11.23';
        $kwarranCode = str_pad((string) ($targetOrg->parent_id ?? '01'), 2, '0', STR_PAD_LEFT);
        $randomSuffix = str_pad((string) random_int(10000, 99999), 5, '0', STR_PAD_LEFT);
        return "{$kwarcabCode}.{$kwarranCode}.{$randomSuffix}";
    }

    private function executeApproval(MembershipApplication $application, User $reviewer, string $officialNta, ?string $notes): MemberProfile
    {
        $targetOrg = $application->targetOrganization;
        $applicantUser = $application->user;
        $profile = $applicantUser->profile;
        $oldProfile = $profile->toArray();

        $profile->update([
            'organization_unit_id' => $targetOrg->id,
            'membership_status' => 'verified',
            'nta' => $officialNta,
            'golongan' => $application->target_golongan ?: $profile->golongan,
            'tingkatan' => ($application->target_golongan ?: $profile->golongan) . ' (Terverifikasi)',
            'valid_until' => now()->addYears(3),
        ]);

        UserAssignment::create([
            'user_id' => $applicantUser->id,
            'organization_unit_id' => $targetOrg->id,
            'role_type' => $application->applied_role,
            'title' => "{$application->applied_role} di {$targetOrg->name}",
            'level' => 'Gudep',
            'is_primary' => true,
            'approved_by_user_id' => $reviewer->id,
            'approved_at' => now(),
            'status' => 'active',
        ]);

        $application->update([
            'status' => 'approved',
            'reviewer_user_id' => $reviewer->id,
            'reviewer_notes' => $notes ?? 'Permohonan keanggotaan dan KTA resmi telah disetujui.',
            'reviewed_at' => now(),
        ]);

        AuditLog::create([
            'user_id' => $reviewer->id,
            'action' => 'approve_membership',
            'auditable_type' => MemberProfile::class,
            'auditable_id' => $profile->id,
            'old_values' => $oldProfile,
            'new_values' => $profile->fresh()->toArray(),
            'summary' => "Persetujuan KTA Resmi {$officialNta} untuk {$applicantUser->name} di {$targetOrg->name}",
        ]);

        return $profile;
    }

    /**
     * Request revision for application
     */
    public function requestRevision(int $applicationId, User $reviewer, string $notes): void
    {
        $application = MembershipApplication::findOrFail($applicationId);
        $application->update([
            'status' => 'revision',
            'reviewer_user_id' => $reviewer->id,
            'reviewer_notes' => $notes,
            'reviewed_at' => now(),
        ]);

        if ($application->user && $application->user->profile) {
            $application->user->profile->update([
                'membership_status' => 'revision_needed',
                'notes' => $notes,
            ]);
        }
    }
}
