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
                'tashkil',
                'parent'
            ])
                ->latest()
                ->paginate(20),
 

        ]);
    }

    public function store(StoreDepartmentRequest $request)
    {
        Department::create($request->validated());

        return back()->with('success', 'Department created successfully.');
    }

   

    // json data for useeffect
    public function departments()
    {
        $departments = Department::orderBy('name')->select('id', 'name')->get();

        return response()->json($departments);
    }

    

}
