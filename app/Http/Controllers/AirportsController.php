<?php
namespace App\Http\Controllers;

use App\Http\Requests\StoreAirportRequest;
use App\Models\Airport;
use App\Models\AirportConstruction;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class AirportsController extends Controller
{
    public function index()
    {
        $search  = request()->input('query');
        $perPage = request()->input('perPage', 13);

        $airports = Airport::with(['province:id,province', 'district:id,district_dr', 'status:id,code'])->when($search, function ($query, $search) {
            return $query->search($search);
        })->latest()->paginate($perPage);

        return Inertia::render('Airports/Index', ['airports' => $airports]);
    }
    // public function store(StoreAirportRequest $request)
    // {
    //     $airport = Airport::create($request->validated());
    //     return response()->json([
    //         'message' => 'Airport created successfully',
    //         'airport' => $airport->load('province:id,province', 'district:id,district_dr', 'status:id,code'),
    //     ], 201);
    // }
    public function store(StoreAirportRequest $request)
    {
        $airport = DB::transaction(function () use ($request) {

            // Create airport
            $airport = Airport::create($request->validated());

            // Create airport construction
            AirportConstruction::create([
                'airport_id'           => $airport->id,
                'construction_id'      => 1,
                'construction_type_id' => $request->construction_type_id,
                'width'                => $request->width,
                'width_unit_id'        => $request->width_unit_id,
                'length'               => $request->length,
                'length_unit_id'       => $request->length_unit_id,
                'activity_status_id'   => $request->activity_status_id,
                'approval_status_id'  => 2,
            ]);

            return $airport;
        });

        return response()->json([
            'message' => 'Airport created successfully',
            'airport' => $airport->load(
                'province:id,province',
                'district:id,district_dr',
                'status:id,code'
            ),
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
        if (! $airport) {
            return response()->json([
                'message' => 'Airport not found or could not be activated',
            ], 404);
        }
        return response()->json([
            'message' => 'Airport activated successfully',
            'airport' => $airport->load('province:id,province', 'district:id,district_dr', 'status:id,code'),
        ], 200);
    }

    // Json Data
    public function getAirports()
    {
        $airports = Airport::all();
        return response()->json($airports);
    }
}
