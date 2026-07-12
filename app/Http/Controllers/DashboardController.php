<?php

namespace App\Http\Controllers;

use App\Models\Flight;
use App\Models\Airport;
use App\Models\Airline;
use App\Models\AircraftType;
use App\Models\Equipment;
use App\Models\Construction;
use App\Models\District;
use App\Models\Province;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Dashboard', [
            'stats' => [
                'flights' => Flight::count(),
                'airports' => Airport::count(),
                'airlines' => Airline::count(),
                'aircraftTypes' => AircraftType::count(), 
                'constructions' => Construction::count(),
                'districts' => District::count(),
                'provinces' => Province::count(),
            ],

            'recentFlights' => Flight::latest()
                ->take(5)
                ->get(),
        ]);
    }
}