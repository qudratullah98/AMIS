<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTashkilRequest;
use App\Models\Tashkil;
use Inertia\Inertia;

class TashkilController extends Controller
{
    public function index()
    {
        return Inertia::render('Tashkilat/Tashkil/Index', [

            'tashkils' => Tashkil::with('organization:id,name')->orderBy('year')->paginate()

        ]);
    }
    public function store(StoreTashkilRequest $request)
    {
        $validatedData = $request->validated();

        $tashkil = Tashkil::create($validatedData);

        return response()->json([
            'success' => true,
            'message' => 'success.tashkil_stored_successfully',
            'tashkil' => $tashkil->load('organization:id,name'),
        ]);
    }


    // json data for useeffect
    public function tashkils()
    {
        $tashkils = Tashkil::with('organization:id,name')
            ->select('id', 'organization_id', 'year')
            ->orderBy('year')
            ->get();

        return response()->json($tashkils);
    }
}
