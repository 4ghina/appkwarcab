<?php

namespace App\Services;

use App\Models\MemberProfile;
use App\Models\OrganizationUnit;
use App\Models\Event;

class OperationalExportService
{
    /**
     * Generate official verified members export dataset
     * Always strictly excludes sample / demo data regardless of sample visibility
     */
    public function exportOfficialMembers(?int $kwarranId = null): array
    {
        $query = MemberProfile::real()
            ->with(['user', 'organizationUnit'])
            ->where('membership_status', 'verified');

        if ($kwarranId) {
            $childGudepIds = OrganizationUnit::where('parent_id', $kwarranId)->pluck('id');
            $query->whereIn('organization_unit_id', $childGudepIds);
        }

        return $query->get()->map(function ($m) {
            return [
                'nta' => $m->nta,
                'nama' => $m->user?->name,
                'golongan' => $m->golongan,
                'tingkatan' => $m->tingkatan,
                'gudep' => $m->organizationUnit?->name,
                'kwarran' => $m->organizationUnit?->parent?->name ?? 'Cabang',
                'is_sample' => false,
            ];
        })->toArray();
    }

    /**
     * Generate official active organization units export dataset
     * Always strictly excludes sample units
     */
    public function exportOfficialUnits(): array
    {
        return OrganizationUnit::real()
            ->where('status', 'Aktif')
            ->get()
            ->map(function ($u) {
                return [
                    'code' => $u->code,
                    'name' => $u->name,
                    'type' => $u->type,
                    'pangkalan' => $u->pangkalan,
                    'status' => $u->status,
                    'is_sample' => false,
                ];
            })->toArray();
    }

    /**
     * Get official infographic summary metrics
     * Guaranteed to match real-only data and never inflated by sample records
     */
    public function getOfficialInfographicMetrics(?int $kwarranId = null): array
    {
        $membersQuery = MemberProfile::real()->where('membership_status', 'verified');
        $gudepQuery = OrganizationUnit::real()->where('type', 'gudep')->where('status', 'Aktif');

        if ($kwarranId) {
            $childGudepIds = OrganizationUnit::where('parent_id', $kwarranId)->pluck('id');
            $membersQuery->whereIn('organization_unit_id', $childGudepIds);
            $gudepQuery->where('parent_id', $kwarranId);
        }

        $activeYouth = (clone $membersQuery)->whereIn('golongan', ['Siaga', 'Penggalang', 'Penegak', 'Pandega'])->count();
        $activePembina = (clone $membersQuery)->whereIn('golongan', ['Pembina', 'Pelatih'])->count();
        $activeGudep = $gudepQuery->count();

        return [
            'peserta_didik_aktif' => $activeYouth,
            'pembina_aktif' => $activePembina,
            'gudep_aktif' => $activeGudep,
            'is_official' => true,
            'contains_sample_data' => false,
        ];
    }
}
