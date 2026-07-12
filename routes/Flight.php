<?php

use App\Http\Controllers\FlightController;
use App\Http\Controllers\FlyteServiceController;
use Illuminate\Support\Facades\Route;

//END MOBILE API ROUTES


Route::middleware(['auth', 'blocked'])->group(function () {
   Route::get('flights', [FlightController::class, 'index'])->name('flight.index');
   Route::post('/flights', [FlightController::class, 'store'])
      ->name('flight.store');
   Route::get('/flight/services', [FlyteServiceController::class, 'getFlightServices'])->name('flight.services.index');
   Route::post('/flight-services', [FlyteServiceController::class, 'store'])->name('flight-services.store');


   // Json Data
   Route::get('/flights/json', [FlightController::class, 'getFlights'])
      ->name('flights.json');
});
