<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\OrganizationUnit;
use Illuminate\View\View;

class DirectoryController extends Controller
{
    /**
     * Halaman Publik Detail Kwarran / Ranting
     * URL: /ranting/{slug}
     */
    public function ranting(string $slug): View
    {
        $kwarran = OrganizationUnit::kwarran()
            ->where('slug', $slug)
            ->with(['children' => function ($q) {
                $q->withCount('members');
            }])
            ->firstOrFail();

        $gudepList = $kwarran->children;
        $totalMembers = $gudepList->sum('members_count');

        return view('public.ranting-detail', compact('kwarran', 'gudepList', 'totalMembers'));
    }

    /**
     * Halaman Publik Detail Gugus Depan
     * URL: /gudep/{slug}
     */
    public function gudep(string $slug): View
    {
        $gudep = OrganizationUnit::gudep()
            ->where('slug', $slug)
            ->with('parent')
            ->withCount(['members as verified_members' => function ($q) {
                $q->where('membership_status', 'verified');
            }])
            ->firstOrFail();

        return view('public.gudep-detail', compact('gudep'));
    }
}
