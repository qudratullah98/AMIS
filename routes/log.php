<?php

use App\Http\Controllers\LogController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function () {
  
    
    Route::get('/log', [LogController::class, 'index'])->middleware('can:manageActivityLog')->name('log.index');


});
