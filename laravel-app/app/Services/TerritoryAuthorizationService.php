<?php

namespace App\Services;

use App\Models\User;
use App\Models\OrganizationUnit;
use App\Models\MemberProfile;
use App\Models\Event;

class TerritoryAuthorizationService
{
    /**
     * Check if user is authorized to manage a specific organization unit
     */
    public function canManageUnit(User $user, OrganizationUnit $targetUnit): bool
    {
        $assignments = $this->getActiveAdminAssignments($user);
        if ($assignments->isEmpty()) {
            return false;
        }

        foreach ($assignments as $assignment) {
            if ($assignment->level === 'Kwarcab') {
                return true; // Super Admin Cabang can manage all units
            }

            if ($assignment->level === 'Kwarran') {
                // Kwarran admin can manage their own Kwarran unit and child Gudeps
                if ($targetUnit->id === $assignment->organization_unit_id) {
                    return true;
                }
                if ($targetUnit->parent_id === $assignment->organization_unit_id) {
                    return true;
                }
            }

            if ($assignment->level === 'Gudep' && $targetUnit->id === $assignment->organization_unit_id) {
                return true; // Gudep admin can only manage their own Gudep
            }
        }

        return false;
    }

    /**
     * Check if user is authorized to manage a specific member profile
     */
    public function canManageMember(User $user, MemberProfile $member): bool
    {
        if (!$member->organization_unit_id) {
            return $this->isKwarcabAdmin($user);
        }

        $memberUnit = $member->organizationUnit;
        if (!$memberUnit) {
            return $this->isKwarcabAdmin($user);
        }

        return $this->canManageUnit($user, $memberUnit);
    }

    /**
     * Check if user is authorized to manage a specific event
     */
    public function canManageEvent(User $user, Event $event): bool
    {
        if ($this->isKwarcabAdmin($user)) {
            return true;
        }

        $eventOrg = $event->organizationUnit;
        if (!$eventOrg) {
            return false;
        }

        return $this->canManageUnit($user, $eventOrg);
    }

    /**
     * Check if user is a Super Admin Kwarcab
     */
    public function isKwarcabAdmin(User $user): bool
    {
        return $this->getActiveAdminAssignments($user)
            ->where('level', 'Kwarcab')
            ->isNotEmpty();
    }

    private function getActiveAdminAssignments(User $user)
    {
        return $user->assignments()
            ->where('status', 'active')
            ->where(function ($q) {
                $q->where('role_type', 'like', '%Admin%')
                  ->orWhere('role_type', 'like', '%Super Admin%')
                  ->orWhere('role_type', 'like', '%Pengurus%');
            })
            ->get();
    }
}
