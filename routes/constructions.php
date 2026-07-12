<?php

use App\Http\Controllers\AirportConstructionController;
use Illuminate\Support\Facades\Route;

//END MOBILE API ROUTES


Route::middleware(['auth', 'blocked'])->group(function () {
    Route::get('constructions', [AirportConstructionController::class, 'index'])->name('constructions.index');

    //constructions
    Route::get('constructions-index', [AirportConstructionController::class, 'constructionsIndex'])->name('constructions');

    //constructions types
    Route::get('constructionsType', [AirportConstructionController::class, 'constructionsTypeIndex'])->name('constructionsType');

    //airportConstructions types
    Route::get('constructions-airport', [AirportConstructionController::class, 'airportConstructionsIndex'])->name('airportConstructions');
});


Route::get('/dashboard-cards', [AirportConstructionController::class, 'getCardStats'])->name('getCardStats');
