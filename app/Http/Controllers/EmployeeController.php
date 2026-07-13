<?php

namespace App\Http\Controllers;


use App\Models\Employee;
use Illuminate\Http\Request;

use App\Http\Requests\StoreEmployeeRequest;
use App\Http\Requests\UpdateEmployeeRequest;

use Inertia\Inertia;


class EmployeeController extends Controller
{


    public function index(Request $request)
    {


        $query = Employee::query();



        if($request->search)
        {

            $query->where(function($q) use($request){

                $q->where(
                    'employee_no',
                    'like',
                    '%'.$request->search.'%'
                )

                ->orWhere(
                    'first_name',
                    'like',
                    '%'.$request->search.'%'
                )

                ->orWhere(
                    'last_name',
                    'like',
                    '%'.$request->search.'%'
                )

                ->orWhere(
                    'national_id',
                    'like',
                    '%'.$request->search.'%'
                );

            });

        }



        return Inertia::render(
            'Employee/Index',
            [

                'employees'=>
                    $query
                    ->with('activeAssignment')
                    ->latest()
                    ->paginate(20)
                    ->withQueryString(),


                'filters'=>[
                    'search'=>$request->search
                ]

            ]
        );

    }





    public function store(StoreEmployeeRequest $request)
    {


        $data=$request->validated();



        if($request->hasFile('photo'))
        {

            $data['photo']
                =
            $request
            ->file('photo')
            ->store('employees','public');

        }



        Employee::create($data);



        return back()->with(
            'success',
            'employee.created'
        );

    }






    public function update(
        UpdateEmployeeRequest $request,
        Employee $employee
    )
    {


        $data=$request->validated();



        if($request->hasFile('photo'))
        {

            $data['photo']
            =
            $request
            ->file('photo')
            ->store('employees','public');

        }



        $employee->update($data);



        return back()->with(
            'success',
            'employee.updated'
        );

    }






    public function destroy(Employee $employee)
    {

        $employee->delete();



        return back()->with(
            'success',
            'employee.deleted'
        );

    }


}