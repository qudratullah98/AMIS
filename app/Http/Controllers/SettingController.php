<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class SettingController extends Controller
{
    public function index()
    {
        return Inertia::render('Setting/Index',);
    }

    public function getCardStats()
    {
        return response()->json([
            'vehicle_type'   => \App\Models\VehicleType::count(),
            'owner'          => \App\Models\Owner::count(),
            'companie'       => \App\Models\Company::count(),
            'terminal'       => \App\Models\Terminal::count(),
            'large_vehicle'  => \App\Models\company_vehicle::count(),
            'route'          => \App\Models\Route::count(),
            'fare'           => \App\Models\Fare::count(),
            'bander'         => \App\Models\Bander::count(),
        ]);
    }
}
