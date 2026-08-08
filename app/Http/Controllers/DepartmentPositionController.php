<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreDepartmentPositionRequest;
use App\Http\Requests\UpdateDepartmentPositionRequest;
use App\Models\DepartmentPosition;
use App\Models\Department;
use App\Models\PositionType;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DepartmentPositionController extends Controller
{

    public function index(Request $request)
    {

        $query = DepartmentPosition::query()
            ->with([
                'department',
                'positionType',
                'vacancies'
            ]);


        if ($request->search) {

            $query->where('title', 'like', '%' . $request->search . '%')
                ->orWhereHas('department', function ($q) use ($request) {

                    $q->where(
                        'name',
                        'like',
                        '%' . $request->search . '%'
                    );
                })
                ->orWhereHas('positionType', function ($q) use ($request) {

                    $q->where(
                        'title',
                        'like',
                        '%' . $request->search . '%'
                    );
                });
        }


        return Inertia::render(
            'Tashkilat/DepartmentPosition/Index',
            [

                'positions' => $query
                    ->latest()
                    ->paginate(20)
                    ->withQueryString(),


                'departments' => Department::select(
                    'id',
                    'name'
                )
                    ->orderBy('name')
                    ->get(),


                'positionTypes' => PositionType::select(
                    'id',
                    'title'
                )
                    ->orderBy('title')
                    ->get(),


                'filters' => [
                    'search' => $request->search
                ]

            ]
        );
    }



    public function store(StoreDepartmentPositionRequest $request)
    {
        $position = DepartmentPosition::create([
            'title' => $request->title,
            'department_id' => $request->department_id,
            'position_type_id' => $request->position_type_id,
            'total_positions' => $request->total_positions,
            'description' => $request->description,
            'grade' => $request->grade,
        ]);



        for ($i = 1; $i <= $request->total_positions; $i++) {
            $position->vacancies()->create([
                'vacancy_no' => 'VAC-' . time(),
                'status' => 'Vacant',
            ]);
        }
     


        return response()->json([

            'success' => true,

            'message' => 'Position created successfully.',

            'data' => $position->load([
                'department',
                'positionType',
                'vacancies'
            ])

        ]);
    }





    public function requirements(DepartmentPosition $departmentPosition)
    {
        return Inertia::render(
            'Tashkilat/DepartmentPosition/RequirementsList',
            [
                'position' => $departmentPosition->load([
                    'd'
                ])
            ]
        );
    }
}
