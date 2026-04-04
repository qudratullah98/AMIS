<?php

use App\Http\Controllers\AirlineController;
use App\Http\Controllers\AirportsController;
use Illuminate\Support\Facades\Route;

//END MOBILE API ROUTES


Route::middleware(['auth', 'blocked'])->group(function () {
    Route::get('airports', [AirportsController::class, 'index'])->middleware('can:viewAirports')->name('airports.index');
    Route::get('airport/create', [AirportsController::class, 'create'])->middleware('can:manageAirports')->name('airport.create');
    Route::post('/airports', [AirportsController::class, 'store'])->middleware('can:manageAirports')->name('airport.store')->name('airports.store');
    Route::get('airport/{id}/edit', [AirportsController::class, 'edit'])->middleware('can:manageAirports')->name('airport.edit');
    Route::post('airport/update', [AirportsController::class, 'update'])->middleware('can:manageAirports')->name('airport.update');





    //Airlines
    Route::get('airlines', [AirlineController::class, 'index'])->name('airline.index');


    //AirCraft Types
    Route::get('airCraftTypes', [AirlineController::class, 'airCraftTypeindex'])->name('airCraftType.index');

});
