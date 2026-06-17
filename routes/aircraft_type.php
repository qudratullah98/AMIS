<?php

use App\Http\Controllers\AirCraptController; 
use Illuminate\Support\Facades\Route;

//END MOBILE API ROUTES


Route::middleware(['auth', 'blocked'])->group(function () {
 
 


    //AirCraft Types
    Route::get('airCraftTypes', [AirCraptController::class, 'airCraftTypeindex'])->name('airCraftType.index');


     // Json Data
    Route::get('aircraft_types/json', [AirCraptController::class, 'getAirCraftTypes'])->name('aircraft_types.json');

});
