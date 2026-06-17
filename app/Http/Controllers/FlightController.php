<?php

namespace App\Http\Controllers;

use App\Models\Flight;
use Illuminate\Http\Request;

class FlightController extends Controller
{
     public function index()
    {
        $perPage = request()->input('perPage', 10);
        $flights = Flight::with('serviceUnit', 'sghaServicesRate.airline')->latest()->paginate($perPage);
        return inertia('Flight/Index', compact('flights'));
    }

      // Json Data 
    // public function getFlights()
    // {
    //     $flights = Flight::with('serviceUnit', 'sghaServicesRate.airline')->latest()->get();
    //     return response()->json($flights);
    // }
}
