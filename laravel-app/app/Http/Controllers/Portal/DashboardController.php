<?php

namespace App\Http\Controllers\Portal;

use App\Http\Controllers\Controller;
use App\Models\Event;
use App\Models\SkuItem;
use App\Models\MemberSkuProgress;
use Illuminate\Http\Request;
use Illuminate\View\View;

class DashboardController extends Controller
{
    /**
     * Portal Anggota Utama
     * URL: /portal
     */
    public function index(Request $request): View
    {
        $user = $request->user()->load(['profile.organizationUnit.parent', 'assignments.organizationUnit', 'wards']);
        $profile = $user->profile;

        // Hitung progres SKU
        $totalSku = SkuItem::where('golongan', $profile->golongan)->count();
        $passedSku = MemberSkuProgress::where('user_id', $user->id)
            ->where('is_passed', true)
            ->count();

        // Agenda Terdekat
        $upcomingEvents = Event::where('status', 'Pendaftaran Dibuka')
            ->orderBy('tanggal_mulai', 'asc')
            ->take(3)
            ->get();

        // Active Assignment
        $activeAssignment = $user->activeAssignment();

        return view('portal.dashboard', compact(
            'user',
            'profile',
            'totalSku',
            'passedSku',
            'upcomingEvents',
            'activeAssignment'
        ));
    }
}
