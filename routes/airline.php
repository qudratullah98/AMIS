<?php

use App\Http\Controllers\AirlineController;
use Illuminate\Support\Facades\Route;

//END MOBILE API ROUTES


Route::middleware(['auth', 'blocked', 'check_airport'])->group(function () {
    Route::get('airlines', [AirlineController::class, 'index'])->name('airline.index');

});
