<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAirportRequest;
use App\Models\Airport;
use Inertia\Inertia;

class AirportsController extends Controller
{
    public function index()
    {
        $search   = request()->input('query');
        $perPage  = request()->input('perPage', 10);
        $airports = Airport::with(['province:id,province', 'district:id,district_dr', 'status:id,code'])->where('id', auth()->user()->airport_id)->when($search, function ($query, $search) {
            return $query->search($search);
        })->latest()->paginate($perPage);
        return Inertia::render('Airports/Index', ['airports' => $airports]);
    }
    public function store(StoreAirportRequest $request)
    {
        $airport = Airport::create($request->validated());
        return response()->json([
            'message' => 'Airport created successfully',
            'airport' => $airport->load('province:id,province', 'district:id,district_dr', 'status:id,code'),
        ], 201);
    }
    public function update(StoreAirportRequest $request)
    {
        $airport = Airport::findOrFail($request->id);
        $airport->update($request->validated());
        return response()->json([
            'message' => 'Airport updated successfully',
            'airport' => $airport->load('province:id,province', 'district:id,district_dr', 'status:id,code'),
        ], 200);
    }
    public function activate()
    {
        $airport = Airport::findOrFail(request()->input('airport'))->activate();
        if (!$airport) {
            return response()->json([
                'message' => 'Airport not found or could not be activated',
            ], 404);
        }
        return response()->json([
            'message' => 'Airport activated successfully',
            'airport' => $airport->load('province:id,province', 'district:id,district_dr', 'status:id,code'),
        ], 200);
    }
}
