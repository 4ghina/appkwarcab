<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Event;
use App\Models\OrganizationUnit;
use App\Services\ConfigurationService;
use Illuminate\View\View;

class HomeController extends Controller
{
    public function index(ConfigurationService $configService): View
    {
        $identity = $configService->getPublicIdentity();

        $activeEvents = Event::where('status', 'Pendaftaran Dibuka')
            ->where('deadline_pendaftaran', '>=', now())
            ->orderBy('tanggal_mulai', 'asc')
            ->take(4)
            ->get();

        $kwarranList = OrganizationUnit::kwarran()
            ->withCount(['children as total_gudep'])
            ->orderBy('name')
            ->get();

        $stats = [
            'total_kwarran' => OrganizationUnit::kwarran()->count(),
            'total_gudep' => OrganizationUnit::gudep()->count(),
            'total_kegiatan' => Event::count(),
        ];

        return view('public.home', compact('identity', 'activeEvents', 'kwarranList', 'stats'));
    }
}
