<?php
namespace App\Http\Controllers;

use App\Models\Construction;
use App\Models\ConstructionType;
use App\Models\AirportConstruction;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AirportConstructionController extends Controller
{
    public function index()
    {
        return Inertia::render('Constructions/Index');
    }

    public function getCardStats()
    {
        return response()->json([
            // 'vehicle_type'   => \App\Models\VehicleType::count(),
            // 'owner'          => \App\Models\Owner::count(),
            // 'driver'         => \App\Models\Driver::count(),
            // 'companie'       => \App\Models\Company::count(),
            'terminal' => 22,
        ]);
    }

    public function constructionsIndex()
    {
        $search  = request()->input('query');
        $perPage = request()->input('perPage', 13);

        $constructions = Construction::when($search, function ($query, $search) {
            return $query->search($search);
        })->latest()->paginate($perPage);

        return Inertia::render('Constructions/Constructions/Index', ['constructions' => $constructions]);

    }

    public function constructionsTypeIndex()
    {
        $search  = request()->input('query');
        $perPage = request()->input('perPage', 13);

        $constructionsType = ConstructionType::when($search, function ($query, $search) {
            return $query->search($search);
        })->latest()->paginate($perPage);

        return Inertia::render('Constructions/ConstructionTypes/Index', ['constructionsType' => $constructionsType]);
    }

    public function airportConstructionsIndex()
    {
        $search  = request()->input('query');
        $perPage = request()->input('perPage', 13);

        $airportConstructions = AirportConstruction::when($search, function ($query, $search) {
            return $query->search($search);
        })->latest()->paginate($perPage);

        return Inertia::render('Constructions/AirportConstructions/Index', ['airportConstructions' => $airportConstructions]);

    }

}
