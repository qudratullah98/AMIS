<?php
namespace App\Http\Controllers;

use App\Http\Requests\constructions\StoreConstructionRequest;
use App\Http\Requests\Constructions\StoreConstructionTypeRequest;
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
            'constructions'         => \App\Models\Construction::count(),
            'constructionsType'     => \App\Models\ConstructionType::count(),
            'airportConstructions'  => \App\Models\AirportConstruction::count(),
            // 'companie'       => \App\Models\Company::count(),
            'terminal' => 22,
        ]);
    }

    //START CONSTRUCTIONS
    public function constructionsIndex()
    {
        $search  = request()->input('query');
        $perPage = request()->input('perPage', 10);

        $constructions = Construction::with(['status:id,code'])->when($search, function ($query, $search) {
            return $query->search($search);
        })->latest()->paginate($perPage);

        return Inertia::render('Constructions/Constructions/Index', ['constructions' => $constructions]);

    }

    public function constructionsStore(StoreConstructionRequest $request)
    {
        $construction = Construction::create($request->validated());

        return response()->json([
            'message' => 'Airport created successfully',
            'construction' => ($construction),
        ], 201);
    }

    public function constructionsActivate()
    {
        $construction = Construction::findOrFail(request()->input('construction'))->activate();
        if (!$construction) {
            return response()->json([
                'message' => 'Construction not found or could not be activated',
            ], 404);
        }
        return response()->json([
            'message' => 'Airport activated successfully',
            'construction' => $construction->load('status:id,code'),
        ], 200);
    }

    //END CONSTRUCTIONS

    //START CONSTRUCTIONS TYPE
    public function constructionsTypeIndex()
    {
        $search  = request()->input('query');
        $perPage = request()->input('perPage', 13);

        $constructionsType = ConstructionType::with(['status:id,code'])->when($search, function ($query, $search) {
            return $query->search($search);
        })->latest()->paginate($perPage);

        return Inertia::render('Constructions/ConstructionTypes/Index', ['constructionsType' => $constructionsType]);
    }

    public function constructionsTypeStore(StoreConstructionTypeRequest $request)
    {
        $constructionType = ConstructionType::create($request->validated());

        return response()->json([
            'message' => 'Construction Type stored successfully',
            'constructionType' => ($constructionType),
        ], 201);
    }

    public function constructionTypeActivate()
    {
        $constructionType = ConstructionType::findOrFail(request()->input('constructionType'))->activate();
        if (!$constructionType) {
            return response()->json([
                'message' => 'constructionType not found or could not be activated',
            ], 404);
        }
        return response()->json([
            'message' => 'constructionType activated successfully',
            'constructionType' => $constructionType->load('status:id,code'),
        ], 200);
    }

    //END CONSTRUCTIONS TYPE

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
