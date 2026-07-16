<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreOrganazationRequest;
use App\Models\Organization;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrganizationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $organizations = Organization::paginate(10);
        return Inertia::render('Tashkilat/Organizations/Index', [
            'organizations' => $organizations
        ]);
        
    }
    public function store(StoreOrganazationRequest $request)
    {
        $validatedData = $request->validated();

        // Create a new organization using the validated data
        $organization = Organization::create($validatedData);

        // Return a response, e.g., redirect or JSON response
        return response()->json([
            'message' => 'Organization created successfully',
            'organization' => $organization,
        ], 201);
    }


    // json data for useEffect
    public function organizations()
    {
        $organizations = Organization::select('id', 'name')->get();
        return response()->json($organizations);
    }
}
