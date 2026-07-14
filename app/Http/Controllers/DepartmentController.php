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

            'tashkils' => Tashkil::orderBy('name')
                ->select('id', 'name')
                ->get(),

            'parentDepartments' => Department::orderBy('name')
                ->select('id', 'name')
                ->get(),

        ]);
    }

    public function store(StoreDepartmentRequest $request)
    {
        Department::create($request->validated());

        return back()->with('success', 'Department created successfully.');
    }

    public function update(UpdateDepartmentRequest $request, Department $department)
    {
        $department->update($request->validated());

        return back()->with('success', 'Department updated successfully.');
    }

    public function destroy(Department $department)
    {
        $department->delete();

        return back()->with('success', 'Department deleted successfully.');
    }
}
