<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreFlightServiceRequest;
use App\Models\ApprovelStatus;
use App\Models\Flight;
use App\Models\FlightService;
use App\Models\SGHA_Service;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FlyteServiceController extends Controller
{
    public function getFlightServices()
    {
        $flightServices = FlightService::with([
            'flight:id,flight_number,airline_id,aircraft_type_id,airport_id',
            'sghaService:id,name_ps',
            'flight.airport:id,name_ps',
            'flight.airline:id,name_ps',
            'flight.aircraftType:id,name',
        ])
            ->latest()
            ->paginate(10);


        return Inertia::render('Flight/FlightServices/FlightServices', [
            'flightServices' => $flightServices
        ]);
    }





    public function store(StoreFlightServiceRequest $request)
    {

        $service = FlightService::create(['created_by'=>auth()->user()->id,...$request->validated()]);
        return response()->json([
            'message' => 'Flight Service created successfully',
            'data' => $service->load(
               [
            'flight:id,flight_number,airline_id,aircraft_type_id,airport_id',
            'sghaService:id,name_ps',
            'flight.airport:id,name_ps',
            'flight.airline:id,name_ps',
            'flight.aircraftType:id,name',
        ]
            )
        ]);
    }
}
