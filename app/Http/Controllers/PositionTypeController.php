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

        return Inertia::render('PositionType/Index', [

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
        PositionType::create($request->validated());

        return back()->with('success', 'Position Type created successfully.');
    }

    public function update(UpdatePositionTypeRequest $request, PositionType $positionType)
    {
        $positionType->update($request->validated());

        return back()->with('success', 'Position Type updated successfully.');
    }

    public function destroy(PositionType $positionType)
    {
        $positionType->delete();

        return back()->with('success', 'Position Type deleted successfully.');
    }
}