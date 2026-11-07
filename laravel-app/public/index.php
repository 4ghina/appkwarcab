<?php

use Illuminate\Http\Request;

define('LARAVEL_START', microtime(true));

// Periksa apakah aplikasi berada dalam status maintenance mode
if (file_exists($maintenance = __DIR__.'/../storage/framework/maintenance.php')) {
    require $maintenance;
}

// Muat autoloader Composer
if (file_exists(__DIR__.'/../vendor/autoload.php')) {
    require __DIR__.'/../vendor/autoload.php';
}

// Inisialisasi dan tangani HTTP request melalui kernel Laravel
$app = require_once __DIR__.'/../bootstrap/app.php';
$response = $app->handleRequest(Request::capture());

$response->send();
