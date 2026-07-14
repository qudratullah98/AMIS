<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAircraftTypeRequest;
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


        return Inertia::render('AircraftTypes/Index', ['aircraftTypes' => $aircraftTypes]);
    }
    public function store(StoreAircraftTypeRequest $request)
    {
        $aircraftType = AircraftType::create(
            $request->validated()
        );

        return response()->json([
            'message' => 'Created successfully.',
            'aircraftType' => $aircraftType,
        ]);
    }

    // Json Data 
    public function getAirCraftTypes()
    {
        $aircraftTypes = AircraftType::all();
        return response()->json($aircraftTypes);
    }
}
