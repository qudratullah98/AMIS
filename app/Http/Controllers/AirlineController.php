<?php

namespace App\Http\Controllers;

use App\Http\Requests\AirlineRequest;
use App\Models\AircraftType;
use App\Models\Airline;
use Inertia\Inertia;


class AirlineController extends Controller
{

    //Airlines part
    public function index()
    {
        $search   = request()->input('query');
        $perPage  = request()->input('perPage', 13);

        $airlines  = Airline::when($search, function ($query, $search) {
            return $query->search($search);
        })->latest()->paginate($perPage);

        return Inertia::render('Airlines/Index',['airlines'=>$airlines]);
    }
    public function store(AirlineRequest $request)
    {
        $data = $request->validated();
    
        $airline = Airline::create($data);

        return response()->json(['message' => 'Airline created successfully', 'airline' => $airline], 201);
    }

 


    // Json Data 
    public function getAirlines()
    {
        $airlines = Airline::all();
        return response()->json($airlines);
    }

}
