<?php

namespace App\Http\Controllers;


use App\Models\EmployeeAssignment;
use App\Models\Employee;
use App\Models\DepartmentPosition;

use App\Http\Requests\StoreEmployeeAssignmentRequest;
use App\Http\Requests\UpdateEmployeeAssignmentRequest;

use Illuminate\Http\Request;
use Inertia\Inertia;



class EmployeeAssignmentController extends Controller
{


    public function index(Request $request)
    {


        $query = EmployeeAssignment::with([

            'employee',

            'departmentPosition.department',

            'departmentPosition.positionType'

        ]);



        if($request->search)
        {

            $query->whereHas(
                'employee',
                function($q) use($request){

                    $q->where(
                        'first_name',
                        'like',
                        '%'.$request->search.'%'
                    )

                    ->orWhere(
                        'last_name',
                        'like',
                        '%'.$request->search.'%'
                    );

                }
            );

        }



        return Inertia::render(
            'EmployeeAssignment/Index',
            [

                'assignments'=>

                    $query
                    ->latest()
                    ->paginate(20)
                    ->withQueryString(),



                'employees'=>

                    Employee::select(
                        'id',
                        'first_name',
                        'last_name'
                    )
                    ->get(),



                'positions'=>

                    DepartmentPosition::with(
                        'department'
                    )
                    ->get(),



                'filters'=>[
                    'search'=>$request->search
                ]

            ]
        );

    }





    public function store(
        StoreEmployeeAssignmentRequest $request
    )
    {


        $position =
        DepartmentPosition::findOrFail(
            $request->department_position_id
        );



        $filled =
        $position
        ->assignments()
        ->where(
            'status',
            'active'
        )
        ->count();



        if($filled >= $position->quantity)
        {

            return back()->withErrors([

                'department_position_id'
                =>
                'department_position.full'

            ]);

        }



        EmployeeAssignment::create(
            $request->validated()
        );



        $this->updateVacancy($position);



        return back()->with(
            'success',
            'employee_assignment.created'
        );


    }





    public function update(
        UpdateEmployeeAssignmentRequest $request,
        EmployeeAssignment $employeeAssignment
    )
    {


        $oldPosition =
        $employeeAssignment
        ->departmentPosition;



        $employeeAssignment->update(
            $request->validated()
        );



        $this->updateVacancy(
            $oldPosition
        );



        $this->updateVacancy(
            $employeeAssignment->departmentPosition
        );



        return back()->with(
            'success',
            'employee_assignment.updated'
        );


    }





    public function destroy(
        EmployeeAssignment $employeeAssignment
    )
    {


        $position =
        $employeeAssignment
        ->departmentPosition;



        $employeeAssignment->delete();



        $this->updateVacancy(
            $position
        );



        return back()->with(
            'success',
            'employee_assignment.deleted'
        );

    }






    private function updateVacancy(
        DepartmentPosition $position
    )
    {


        $filled =
        $position
        ->assignments()
        ->where(
            'status',
            'active'
        )
        ->count();



        $position->vacancy()->updateOrCreate(

            [

                'department_position_id'
                =>
                $position->id

            ],


            [

                'total_positions'
                =>
                $position->quantity,


                'filled_positions'
                =>
                $filled,


                'vacant_positions'
                =>
                $position->quantity-$filled

            ]

        );

    }


}