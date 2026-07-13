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
                'vacancy'
            ]);


        if ($request->search) {

            $query->where('title','like','%'.$request->search.'%')
                ->orWhereHas('department',function($q) use($request){

                    $q->where(
                        'name',
                        'like',
                        '%'.$request->search.'%'
                    );

                })
                ->orWhereHas('positionType',function($q) use($request){

                    $q->where(
                        'name',
                        'like',
                        '%'.$request->search.'%'
                    );

                });

        }


        return Inertia::render(
            'DepartmentPosition/Index',
            [

                'positions'=>$query
                    ->latest()
                    ->paginate(20)
                    ->withQueryString(),


                'departments'=>Department::select(
                    'id',
                    'name'
                )
                ->orderBy('name')
                ->get(),


                'positionTypes'=>PositionType::select(
                    'id',
                    'name'
                )
                ->orderBy('name')
                ->get(),


                'filters'=>[
                    'search'=>$request->search
                ]

            ]
        );

    }



    public function store(
        StoreDepartmentPositionRequest $request
    )
    {

        $position = DepartmentPosition::create(
            $request->validated()
        );


        // create vacancy record

        $position->vacancy()->create([

            'total_positions'=>$position->quantity,

            'filled_positions'=>0,

            'vacant_positions'=>$position->quantity,

        ]);


        return back()->with(
            'success',
            'department_position.created'
        );

    }





    public function update(
        UpdateDepartmentPositionRequest $request,
        DepartmentPosition $departmentPosition
    )
    {

        $departmentPosition->update(
            $request->validated()
        );


        // update total vacancy

        if($departmentPosition->vacancy)
        {

            $filled = $departmentPosition
                ->assignments()
                ->where('status','active')
                ->count();


            $departmentPosition->vacancy()->update([

                'total_positions'=>$departmentPosition->quantity,

                'filled_positions'=>$filled,

                'vacant_positions'=>
                    $departmentPosition->quantity - $filled

            ]);

        }



        return back()->with(
            'success',
            'department_position.updated'
        );

    }





    public function destroy(
        DepartmentPosition $departmentPosition
    )
    {

        $departmentPosition->delete();


        return back()->with(
            'success',
            'department_position.deleted'
        );

    }

}