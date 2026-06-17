<?php

namespace App\Http\Controllers;

use App\Models\AircraftType;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AirCraptController extends Controller
{
       // AirCraft Types part
    public function airCraftTypeindex()
    {
        $search   = request()->input('query');
        $perPage  = request()->input('perPage', 13);

        $aircraftTypes  = AircraftType::when($search, function ($query, $search) {
            return $query->search($search);
        })->latest()->paginate($perPage);


        return Inertia::render('AircraftTypes/Index',['aircraftTypes'=>$aircraftTypes]);

    }

      // Json Data 
    public function getAirCraftTypes()
    {
        $aircraftTypes = AircraftType::all();
        return response()->json($aircraftTypes);
    }
}
