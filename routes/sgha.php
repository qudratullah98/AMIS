<?php

use App\Http\Controllers\SGHAServiceController;
use Illuminate\Support\Facades\Route;

//END MOBILE API ROUTES


Route::middleware(['auth', 'blocked', 'check_airport'])->group(function () {
   Route::get('sgha', [SGHAServiceController::class, 'index'])->middleware('can:manageSgha')->name('sgha.index');

});
