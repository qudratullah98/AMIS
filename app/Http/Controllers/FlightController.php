<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreFlightRequest;
use App\Models\Flight;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FlightController extends Controller
{
    public function index()
    {
        $perPage = request()->input('perPage', 10);
        $flights = Flight::with([
            'airport:id,name_ps',
            'airline:id,name_ps',
            'aircraftType:id,name'
        ])
            ->latest()
            ->paginate($perPage);

        return inertia('Flight/Index', compact('flights'));
    }

    public function store(StoreFlightRequest $request)
    {
        $flight = Flight::create($request->validated());

        return response()->json([
            'flight' => $flight->load([
            'airport',
            'airline',
            'aircraftType'
        ]),
            'message' => 'Flight created successfully'
        ]);
    }


    // Json Data 
  public function getFlights(Request $request)
{
    $query = $request->query('query');

    $flights = Flight::when($query, function ($q) use ($query) {
            $q->where('flight_number', 'like', "%{$query}%");
        })
        ->latest()
        ->get();

    return response()->json($flights);
}
   
}
