<?php
namespace App\Http\Controllers;

use App\Http\Requests\StoreAirportRequest;
use App\Models\Airport;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AirportsController extends Controller
{
    public function index()
    {
        $search   = request()->input('query');
        $perPage  = request()->input('perPage', 10);
        $airports = Airport::with(['province:id,province', 'district:id,district_dr', 'status:id,code'])->when($search, function ($query, $search) {
            return $query->search($search);
        })->latest()->paginate($perPage);
        return Inertia::render('Airports/Index', ['airports' => $airports]);
    }
    public function store(StoreAirportRequest $request)
    {
        $airport = Airport::create($request->validated());
        return response()->json([
            'message' => 'Airport created successfully',
            'airport' => $airport->load('province:id,province', 'district:id,district_dr'),
        ], 201);
    }
}
