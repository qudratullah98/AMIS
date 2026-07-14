<?php

namespace App\Http\Controllers;


use App\Models\Employee;
use App\Models\Department;
use App\Models\DepartmentPosition;
use App\Models\EmployeeAssignment;

use Inertia\Inertia;


class TashkilatDashboardController extends Controller
{


    public function index()
    {


        return Inertia::render(
            'Tashkilat/Dashboard',
            [


            'stats'=>[


               

                

                'departments'=>
                    Department::count(),



                'positions'=>
                    DepartmentPosition::count(),



                'filled'=>
                    EmployeeAssignment::where(
                        'approval_status_id',
                        1  
                    )->count(),



                'vacancies'=>
                    DepartmentPosition::sum(
                        'total_positions'
                    )
                    -
                    EmployeeAssignment::where(
                        'approval_status_id',
                        1  
                    )->count(),


            ],




            'employeesByDepartment'=>

                Department::withCount([
                    'departmentPositions'
                ])
                ->get(),




            'recentEmployees'=>

                Employee::latest()
                ->take(10)
                ->get()



            ]

        );


    }


}