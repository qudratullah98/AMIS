<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreFlightRequest;
use App\Models\Flight;
use Illuminate\Http\Request;

class FlightController extends Controller
{
     public function index()
    {
        $perPage = request()->input('perPage', 10);
        $flights = Flight::with([
    'airport',
    'airline',
    'aircraftType'
])
->latest()
->paginate($perPage);

return inertia('Flight/Index', compact('flights'));
    }

public function store(StoreFlightRequest $request)
{
    $flight = Flight::create($request->validated());

    return response()->json([
        'flight' => $flight,
        'message' => 'Flight created successfully'
    ]);
}

      // Json Data 
    // public function getFlights()
    // {
    //     $flights = Flight::with('serviceUnit', 'sghaServicesRate.airline')->latest()->get();
    //     return response()->json($flights);
    // }
}
