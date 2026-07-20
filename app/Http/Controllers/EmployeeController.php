<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreEmployeeRequest;
use App\Models\Employee;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EmployeeController extends Controller
{

    public function index(Request $request)
    {

        $query = Employee::query();


        if($request->search){

            $search = $request->search;


            $query->where(function($q) use($search){

                $q->where('first_name','like',"%$search%")
                ->orWhere('last_name','like',"%$search%")
                ->orWhere('employee_no','like',"%$search%")
                ->orWhere('national_id','like',"%$search%");

            });

        }


        return Inertia::render(
            'Tashkilat/Employee/Index',
            [

                'employees'=>$query
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

    $employee = Employee::create(
        $request->validated()
    );


    return response()->json([

        'success'=>true,

        'message'=>'employee.created',

        'data'=>$employee

    ]);

}



    public function json()
    {
        return response()->json(
            Employee::select(
                'id',
                'employee_no',
                'first_name',
                'last_name'
            )->get()
        );
    }

}
