<?php

namespace App\Http\Controllers;

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
            'flight',
            'sghaService',
            'approvalStatus'
        ])
            ->latest()
            ->paginate(10);


        return Inertia::render('Flight/FlightServices/FlightServices', [
            'flightServices' => $flightServices
        ]);
    }

 



    public function store(Request $request)
    {

        $validated = $request->validate([

            'flight_id' => [
                'required',
                'exists:flights,id'
            ],

            'sgha_service_id' => [
                'required',
                'exists:sgha_services,id'
            ],

            'count' => [
                'required',
                'integer',
                'min:1'
            ],

          

        ]);


        $service = FlightService::create($validated);


        return response()->json([
            'message' => 'Flight Service created successfully',
            'data' => $service->load(
                'flight',
                'sghaService',
                'approvalStatus'
            )
        ]);
    }
}
