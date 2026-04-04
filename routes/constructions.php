<?php

use App\Http\Controllers\AirportConstructionController;
use Illuminate\Support\Facades\Route;

//END MOBILE API ROUTES


Route::middleware(['auth', 'blocked'])->group(function () {
    Route::get('constructions', [AirportConstructionController::class, 'index'])->name('constructions.index');
});


Route::get('/dashboard-cards', [AirportConstructionController::class, 'getCardStats'])->name('getCardStats');
