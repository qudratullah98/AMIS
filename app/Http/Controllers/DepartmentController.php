<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreDepartmentRequest;
use App\Http\Requests\UpdateDepartmentRequest;
use App\Models\Department;
use App\Models\Tashkil;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DepartmentController extends Controller
{
    public function index()
    {
        return Inertia::render('Tashkilat/Department/Index', [

            'departments' => Department::with([
                'tashkil:id,year',
                'parent:id,name'
            ])
                ->latest()
                ->paginate(20),


        ]);
    }

    public function store(StoreDepartmentRequest $request)
    {
        $department = Department::create($request->validated());

        return response()->json([
            'success' => true,
            'message' => 'Department created successfully.',
            'data' => $department->load([
                'tashkil:id,year',
                'parent:id,name'
            ]),
        ], 201);
    }



    // json data for useeffect
    public function departments()
    {
        $departments = Department::orderBy('name')->select('id', 'name')->get();

        return response()->json($departments);
    }
}
