<?php

use App\Http\Controllers\AirportConstructionController;
use Illuminate\Support\Facades\Route;

//END MOBILE API ROUTES


Route::middleware(['auth', 'blocked'])->group(function () {
    Route::get('constructions', [AirportConstructionController::class, 'index'])->name('constructions.index');

    //constructions
    Route::get('constructions/index', [AirportConstructionController::class, 'constructionsIndex'])->name('constructions');
    Route::post('constructions-store', [AirportConstructionController::class, 'constructionsStore'])->name('constructions.store');
    Route::post('construction/activate', [AirportConstructionController::class, 'constructionsActivate'])->name('construction.activate');



    //constructions types
    Route::get('constructions/types', [AirportConstructionController::class, 'constructionsTypeIndex'])->name('constructionsType');
    Route::post('constructionsType-store', [AirportConstructionController::class, 'constructionsTypeStore'])->name('constructionsType.store');
    Route::post('constructionType/activate', [AirportConstructionController::class, 'constructionTypeActivate'])->name('constructionType.activate');


    //airportConstructions types
    Route::get('constructions-airport', [AirportConstructionController::class, 'airportConstructionsIndex'])->name('airportConstructions');
});


Route::get('/dashboard-cards', [AirportConstructionController::class, 'getCardStats'])->name('getCardStats');
