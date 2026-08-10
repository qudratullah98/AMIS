<?php

namespace App\Http\Controllers;


use App\Models\Employee;
use App\Models\Department;
use App\Models\DepartmentPosition;
use App\Models\EmployeeAssignment;
use App\Models\PositionVacancy;
use Inertia\Inertia;


class TashkilatDashboardController extends Controller
{


    public function index()
    {
        $filled = EmployeeAssignment::where('status', 'assigned')->count();
        $totalPositions = DepartmentPosition::sum('total_positions');

        // Get all departments with their positions
        $departmentsTree = Department::with([
            'positions:id,department_id,title,grade,total_positions',
            'positions.vacancies',
        ])
            ->select('id', 'tashkil_id', 'parent_id', 'name', 'code', 'description')
            ->get(); 

        return Inertia::render('Tashkilat/Dashboard', [
            'stats' => [
                'departments' => Department::count(),
                'positions' => PositionVacancy::count(),
                'filled' => $filled,
                'vacancies' => $totalPositions - $filled,
                'departmentsTree' => $departmentsTree,
            ],

            'recentEmployees' => Employee::with([
                'assignments:id,vacancy_id,employee_id',
                'assignments.vacancy:id,vacancy_no',
            ])
                ->select('id', 'first_name', 'last_name')
                ->latest()
                ->take(10)
                ->get(),
        ]);
    }
}
