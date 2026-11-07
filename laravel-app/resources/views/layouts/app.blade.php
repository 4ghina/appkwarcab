<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>@yield('title', 'SIM-KWARCAB') - Sistem Informasi Manajemen Kwartir Cabang</title>
    
    <!-- Tailwind CSS (Vite / CDN fallback) -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        scout: {
                            brown: '#5D4037',
                            brownDark: '#3E2723',
                            brownLight: '#8D6E63',
                            cream: '#FAF8F5',
                            creamSurface: '#F3EFEA',
                            green: '#2E7D32',
                            gold: '#F59E0B',
                            siaga: '#16A34A',
                            penggalang: '#DC2626',
                            penegak: '#D97706',
                            pandega: '#78350F',
                        }
                    }
                }
            }
        }
    </script>
    <!-- Lucide Icons -->
    <script src="https://unpkg.com/lucide@latest"></script>
    <!-- Alpine.js -->
    <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
    <style>
        [x-cloak] { display: none !important; }
        body { background-color: #FAF8F5; color: #2D2422; font-family: system-ui, -apple-system, sans-serif; }
    </style>
</head>
<body class="min-h-screen flex flex-col justify-between selection:bg-amber-200">
    <!-- Main Shell Container (Mobile-First Viewport Max 480px on desktop, fluid on phone) -->
    <div class="w-full max-w-md mx-auto min-h-screen bg-white shadow-xl flex flex-col relative pb-20">
        <!-- Top App Bar -->
        <header class="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-stone-200 px-4 py-3 flex items-center justify-between">
            <a href="{{ url('/') }}" class="flex items-center gap-2.5">
                <div class="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center font-black shadow-sm text-sm">
                    SK
                </div>
                <div>
                    <h1 class="text-sm font-bold tracking-tight text-stone-900 leading-tight">SIM-KWARCAB</h1>
                    <p class="text-[10px] text-stone-500 font-medium">Kwarcab Gerakan Pramuka</p>
                </div>
            </a>
            <div class="flex items-center gap-2">
                <a href="{{ route('public.verify') }}" class="px-2.5 py-1 text-xs font-semibold rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                    <i data-lucide="shield-check" class="w-3.5 h-3.5"></i>
                    <span>Cek KTA</span>
                </a>
                @auth
                    <a href="{{ route('portal.dashboard') }}" class="w-8 h-8 rounded-full bg-stone-100 border border-stone-200 flex items-center justify-center text-xs font-bold text-stone-700">
                        {{ substr(auth()->user()->name, 0, 1) }}
                    </a>
                @else
                    <a href="{{ route('login') }}" class="px-3 py-1.5 text-xs font-bold rounded-xl bg-amber-600 text-white shadow-sm hover:bg-amber-700">
                        Masuk
                    </a>
                @endauth
            </div>
        </header>

        <!-- Main Body Content -->
        <main class="flex-1 p-4">
            @yield('content')
        </main>

        <!-- Floating Bottom Navigation -->
        <nav class="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md z-40 bg-white/95 backdrop-blur-md border-t border-stone-200 px-3 py-2 flex items-center justify-around">
            <a href="{{ url('/') }}" class="flex flex-col items-center gap-1 text-[10px] font-semibold {{ request()->is('/') ? 'text-amber-700' : 'text-stone-500 hover:text-stone-800' }}">
                <i data-lucide="home" class="w-5 h-5"></i>
                <span>Beranda</span>
            </a>
            <a href="{{ route('public.verify') }}" class="flex flex-col items-center gap-1 text-[10px] font-semibold {{ request()->is('verifikasi*') ? 'text-amber-700' : 'text-stone-500 hover:text-stone-800' }}">
                <i data-lucide="qr-code" class="w-5 h-5"></i>
                <span>Cek Dokumen</span>
            </a>
            <a href="{{ url('/#kegiatan') }}" class="flex flex-col items-center gap-1 text-[10px] font-semibold {{ request()->is('kegiatan*') ? 'text-amber-700' : 'text-stone-500 hover:text-stone-800' }}">
                <i data-lucide="calendar" class="w-5 h-5"></i>
                <span>Kegiatan</span>
            </a>
            @auth
                <a href="{{ route('portal.dashboard') }}" class="flex flex-col items-center gap-1 text-[10px] font-semibold {{ request()->is('portal*') ? 'text-amber-700' : 'text-stone-500 hover:text-stone-800' }}">
                    <i data-lucide="user" class="w-5 h-5"></i>
                    <span>Portal</span>
                </a>
            @else
                <a href="{{ route('login') }}" class="flex flex-col items-center gap-1 text-[10px] font-semibold text-stone-500 hover:text-stone-800">
                    <i data-lucide="log-in" class="w-5 h-5"></i>
                    <span>Akun</span>
                </a>
            @endauth
        </nav>
    </div>

    <script>
        document.addEventListener('DOMContentLoaded', () => {
            if (window.lucide) lucide.createIcons();
        });
    </script>
</body>
</html>
