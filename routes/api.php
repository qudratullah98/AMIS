<?php
 
use App\Http\Controllers\OutgoingVehicleController;
use Illuminate\Support\Facades\Route;
  
//END MOBILE API ROUTES

Route::post('login', [OutgoingVehicleController::class, 'apiLogin'])->name('api_login');

Route::get('test', function () {
    return response()->json([
        'message' => 'Hello, this is a api test route!',
    ], 200);
});
