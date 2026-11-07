<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\MemberProfile;
use Illuminate\Http\Request;
use Illuminate\View\View;

class VerificationController extends Controller
{
    /**
     * Halaman Cek dan Verifikasi Keabsahan Dokumen / KTA
     * URL: /verifikasi
     */
    public function index(Request $request): View
    {
        $code = trim($request->get('code', ''));
        $result = null;
        $searched = false;

        if (!empty($code)) {
            $searched = true;
            // Cari berdasarkan NTA atau Provisional NTA
            $profile = MemberProfile::where('nta', $code)
                ->orWhere('provisional_nta', $code)
                ->with(['user', 'organizationUnit.parent'])
                ->first();

            if ($profile) {
                // Saring data demi privasi (jangan sertakan NIK, telepon, atau alamat lengkap)
                $result = [
                    'valid' => true,
                    'nta' => $profile->nta ?? $profile->provisional_nta,
                    'is_official' => $profile->membership_status === 'verified',
                    'name' => $profile->user->name ?? 'Anggota Pramuka',
                    'golongan' => $profile->golongan,
                    'tingkatan' => $profile->tingkatan,
                    'pangkalan' => $profile->organizationUnit->name ?? 'Kwartir Cabang',
                    'kwarran' => $profile->organizationUnit->parent->name ?? 'Kwarcab',
                    'status' => $profile->membership_status === 'verified' ? 'Anggota Sah Terverifikasi' : 'Dalam Proses Verifikasi',
                    'is_garuda' => $profile->is_garuda,
                    'valid_until' => $profile->valid_until ? $profile->valid_until->format('d M Y') : '31 Des 2028',
                    'verified_at' => $profile->updated_at->format('d M Y'),
                ];
            } else {
                $result = [
                    'valid' => false,
                    'message' => 'Dokumen atau Nomor Tanda Anggota (NTA) tidak ditemukan di pangkalan data Kwartir Cabang.',
                ];
            }
        }

        return view('public.verify-document', compact('code', 'result', 'searched'));
    }
}
