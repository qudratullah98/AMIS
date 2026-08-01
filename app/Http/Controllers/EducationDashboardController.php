<?php

namespace App\Http\Controllers;


use App\Models\Employee;
use App\Models\EducationLevel;
use App\Models\EmployeeEducation;
use App\Models\PositionRequiredEducation;
use App\Models\Certificate;
use App\Models\Course;
use App\Models\Training;
use App\Models\Trainer;

use Inertia\Inertia;


class EducationDashboardController extends Controller
{


    public function index()
    {


        return Inertia::render(
            'Educations/Dashboard',
            [


                'stats' => [


                    'educationLevels' =>
                        EducationLevel::count(),



                    'certificates' =>
                        Certificate::count(),



                    'courses' =>
                        Course::count(),



                    'trainers' =>
                        Trainer::count(),



                    



                    'employeeEducations' =>
                        EmployeeEducation::count(),


                    'requiredEducations' =>
                        PositionRequiredEducation::count(),


                ],




                'employeesByEducation' =>

                    EducationLevel::withCount([
                        'employeeEducations'
                    ])
                    ->get(),




 



                'recentEmployees' =>

                    Employee::latest()
                    ->take(10)
                    ->get()



            ]

        );


    }


}