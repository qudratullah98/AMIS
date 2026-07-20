<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePositionTypeRequest;
use App\Http\Requests\UpdatePositionTypeRequest;
use App\Models\PositionType;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PositionTypeController extends Controller
{
    public function index(Request $request)
    {
        $query = PositionType::query();

        if ($request->filled('search')) {

            $query->where('name', 'like', "%{$request->search}%")
                  ->orWhere('grade', 'like', "%{$request->search}%");
        }

        return Inertia::render('Tashkilat/PositionType/Index', [

            'positionTypes' => $query
                ->latest()
                ->paginate(20)
                ->withQueryString(),

            'filters' => [
                'search' => $request->search,
            ]

        ]);
    }

    public function store(StorePositionTypeRequest $request)
    {
        $positionType = PositionType::create($request->validated());


        return response()->json([
            'success' => true,
            'message' => 'Position type created successfully.',
            'data' => $positionType,
        ]);

    }

// json data for useeffect
    public function positionTypes()
    {
        $positionTypes = PositionType::select('id', 'title')->get();
        return response()->json($positionTypes);
    }
}
