<?php

use App\Http\Controllers\SGHAServiceController;
use Illuminate\Support\Facades\Route;

//END MOBILE API ROUTES


Route::middleware(['auth', 'blocked'])->group(function () {
   Route::get('sgha', [SGHAServiceController::class, 'index'])->name('sgha.index');


   // sgha Mesurements unit
   Route::get('sgha/services_units', [SGHAServiceController::class, 'SGHAServiceUnit'])->name('sgha.services_units.index');

});
