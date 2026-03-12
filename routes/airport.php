<?php

use App\Http\Controllers\AirportsController;
use Illuminate\Support\Facades\Route;
  
//END MOBILE API ROUTES
 

Route::middleware(['auth', 'blocked'])->group(function () {
    Route::get('airports', [AirportsController::class, 'index'])
        ->middleware('can:viewAirports')->name('airports.index');
    Route::get('airport/create', [AirportsController::class, 'create'])
        ->middleware('can:manageAirports')->name('airport.create');
    Route::post('airport', [AirportsController::class, 'store'])
        ->middleware('can:manageAirports')->name('airport.store');
    Route::get('airport/{id}/edit', [AirportsController::class, 'edit'])
        ->middleware('can:manageAirports')->name('airport.edit');
    Route::post('airport/update', [AirportsController::class, 'update'])
        ->middleware('can:manageAirports')->name('airport.update');
});
