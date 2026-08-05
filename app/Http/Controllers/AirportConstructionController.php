<?php
namespace App\Http\Controllers;

use App\Http\Requests\Constructions\StoreAirportConstructionsRequest;
use App\Http\Requests\constructions\StoreConstructionRequest;
use App\Http\Requests\Constructions\StoreConstructionTypeRequest;
use App\Models\AirportConstruction;
use App\Models\Construction;
use App\Models\ConstructionType;
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
            'constructions'        => \App\Models\Construction::count(),
            'constructionsType'    => \App\Models\ConstructionType::count(),
            'airportConstructions' => \App\Models\AirportConstruction::where('airport_id', auth()->user()->airport_id)->count(),
            // 'companie'       => \App\Models\Company::count(),
            'terminal'             => 22,
        ]);
    }

    //START CONSTRUCTIONS
    public function constructionsIndex()
    {
        $search  = request()->input('query');
        $perPage = request()->input('perPage', 10);

        $constructions = Construction::with(['approvalStatus:id,code'])->when($search, function ($query, $search) {
            return $query->search($search);
        })->latest()->paginate($perPage);

        return Inertia::render('Constructions/Constructions/Index', ['constructions' => $constructions]);

    }

    public function constructionsStore(StoreConstructionRequest $request)
    {
        $construction = Construction::create($request->validated());

        return response()->json([
            'message'      => 'Airport created successfully',
            'construction' => ($construction),
        ], 201);
    }

    public function constructionsActivate()
    {
        $construction = Construction::findOrFail(request()->input('construction'))->activate();
        if (! $construction) {
            return response()->json([
                'message' => 'Construction not found or could not be activated',
            ], 404);
        }
        return response()->json([
            'message'      => 'Airport activated successfully',
            'construction' => $construction->load('approvalStatus:id,code'),
        ], 200);
    }

    //END CONSTRUCTIONS

    //START CONSTRUCTIONS TYPE
    public function constructionsTypeIndex()
    {
        $search  = request()->input('query');
        $perPage = request()->input('perPage', 10);

        $constructionsType = ConstructionType::with(['approvalStatus:id,code'])->when($search, function ($query, $search) {
            return $query->search($search);
        })->latest()->paginate($perPage);

        return Inertia::render('Constructions/ConstructionTypes/Index', ['constructionsType' => $constructionsType]);
    }

    public function constructionsTypeStore(StoreConstructionTypeRequest $request)
    {
        $constructionType = ConstructionType::create($request->validated());

        return response()->json([
            'message'          => 'Construction Type stored successfully',
            'constructionType' => ($constructionType),
        ], 201);
    }

    public function constructionTypeActivate()
    {
        $constructionType = ConstructionType::findOrFail(request()->input('constructionType'))->activate();
        if (! $constructionType) {
            return response()->json([
                'message' => 'constructionType not found or could not be activated',
            ], 404);
        }
        return response()->json([
            'message'          => 'constructionType activated successfully',
            'constructionType' => $constructionType->load('approvalStatus:id,code'),
        ], 200);
    }

    //END CONSTRUCTIONS TYPE

    //AIRPORT CONSTRUCTIONS
    public function airportConstructionsIndex()
    {
        $search  = request()->input('query');
        $perPage = request()->input('perPage', 10);

        $airportConstructions = AirportConstruction::with([
            'activityStatus:id,status_ps',
            'approvalStatus:id,code,name_ps',
            'construction:id,name_ps',
            'constructionType:id,type_ps',
            'widthUnit:id,unit_en,unit_ps',
            'lengthUnit:id,unit_en,unit_ps',
            'properties' => function ($query) {
                $query->select(
                    'id',
                    'construction_id',
                    'property_name',
                    'property_value',
                    'unit_id'
                )->with('unit:id,unit_ps,unit_en');
            },
        ])
            ->when($search, function ($query, $search) {
                return $query->search($search);
            })
            ->where('airport_id', auth()->user()->airport_id)
            ->latest()
            ->paginate($perPage);

        return Inertia::render(
            'Constructions/AirportConstructions/Index',
            [
                'airportConstructions' => $airportConstructions,
            ]
        );
    }

    public function airportConstructionsStore(StoreAirportConstructionsRequest $request)
    {
        $data = $request->validated();

        $data['airport_id']         = auth()->user()->airport_id;
        $data['approval_status_id'] = 2;

        $properties = $data['constructionProperty'] ?? [];

        unset($data['constructionProperty']);

        $airportConstruction = AirportConstruction::create($data);

        if (! empty($properties)) {
            $airportConstruction->properties()->createMany($properties);
        }

        return response()->json([
            'message'             => 'Airport construction stored successfully',
            'airportConstruction' => $airportConstruction->load('activityStatus:id,status_ps', 'approvalStatus:id,code,name_ps', 'construction:id,name_ps', 'constructionType:id,type_ps'),
        ], 201);
    }

    public function airportConstructionActivate()
    {
        $AirportConstruction = AirportConstruction::findOrFail(request()->input('AirportConstruction'))->activate();
        if (! $AirportConstruction) {
            return response()->json([
                'message' => 'AirportConstruction not found or could not be activated',
            ], 404);
        }
        return response()->json([
            'message'             => 'AirportConstruction activated successfully',
            'airportConstruction' => $AirportConstruction->load('activityStatus:id,status_ps', 'approvalStatus:id,code', 'construction:id,name_ps', 'constructionType:id,type_ps'),
        ], 200);
    }

    //END AIRPORT CONSTRUCTIONS

}
