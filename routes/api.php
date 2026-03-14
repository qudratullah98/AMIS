<?php

use App\Http\Controllers\Api\ActivityStatusController;
use App\Http\Controllers\Api\ProvinceController as ApiProvinceController; 
use App\Http\Controllers\Api\UnitController as ApiUnitController;
use Illuminate\Support\Facades\Route;

// END MOBILE API ROUTES

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

Route::get('provinces', [ApiProvinceController::class, 'getProvinces'])->name('api_provinces');
Route::get('province_districts/{province_id}', [ApiProvinceController::class, 'getProvinceDistricts'])->name('api_districts_by_province');
Route::get('units', [ApiUnitController::class, 'getUnits'])->name('api_units');
Route::get('statuses', [ActivityStatusController::class, 'getStatuses'])->name('api_statuses');

/*
|--------------------------------------------------------------------------
| Protected Routes
|--------------------------------------------------------------------------
*/

Route::middleware('auth:sanctum')->group(function () {

    // secure APIs here

});

Route::get('test', function () {
    return response()->json([
        'message' => 'Hello, this is a api test route!',
    ], 200);
});
