<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class AirportConstructionController extends Controller
{
    public function index()
    {
        return Inertia::render('Constructions/Index');
    }

     public function getCardStats()
    {
        return response()->json([
            // 'vehicle_type'   => \App\Models\VehicleType::count(),
            // 'owner'          => \App\Models\Owner::count(),
            // 'driver'         => \App\Models\Driver::count(),
            // 'companie'       => \App\Models\Company::count(),
            'terminal'       => 22,
        ]);
    }
}
