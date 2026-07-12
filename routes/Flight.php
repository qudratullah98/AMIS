<?php

use App\Http\Controllers\FlightController;  
use Illuminate\Support\Facades\Route;

//END MOBILE API ROUTES


Route::middleware(['auth', 'blocked'])->group(function () {
   Route::get('flights', [FlightController::class, 'index'])->name('flight.index');
   Route::post('/flights', [FlightController::class, 'store'])
    ->name('flight.store');

  // Json Data
   //  Route::get('flights/json', [FlightController::class, 'getFlights'])->name('flights.json'); 
});
