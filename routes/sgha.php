<?php

use App\Http\Controllers\SGHAServiceController;
use Illuminate\Support\Facades\Route;

//END MOBILE API ROUTES


Route::middleware(['auth', 'blocked'])->group(function () {
   Route::get('sgha', [SGHAServiceController::class, 'index'])->name('sgha.index');


   // sgha Mesurements unit
   Route::get('sgha/services_units', [SGHAServiceController::class, 'SGHAServiceUnit'])->name('sgha.services_units.index');
   Route::post('/sgha-services', [SGHAServiceController::class, 'store'])->name('sgha.services_units.store');
   Route::put('/sgha-services/{sgha_service}', [SGHAServiceController::class, 'update'])->name('sgha.services_units.update');

   // Json Data for sgha services units
   Route::get('sgha/services_units/json', [SGHAServiceController::class, 'getSGHAServiceUnit'])->name('sgha.services_units.json');
});
