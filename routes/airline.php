<?php

use App\Http\Controllers\AirlineController;
use Illuminate\Support\Facades\Route;

//END MOBILE API ROUTES


Route::middleware(['auth', 'blocked'])->group(function () {
    Route::get('airlines', [AirlineController::class, 'index'])->name('airline.index'); 
    Route::post('airlines', [AirlineController::class, 'store'])->name('airline.store'); 



    // Json Data
    Route::get('airlines/json', [AirlineController::class, 'getAirlines'])->name('airlines.json');

});
