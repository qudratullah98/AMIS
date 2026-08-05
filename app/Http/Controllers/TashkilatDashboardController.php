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
    $filled = EmployeeAssignment::where('approval_status_id', 1)->count();
    $totalPositions = DepartmentPosition::sum('total_positions');

    // Get all departments with their positions
    $departmentsTree = Department::with([
        'positions:id,department_id,title,grade,total_positions'
    ])
    ->select('id', 'tashkil_id', 'parent_id', 'name', 'code', 'description')
    ->get();

    return Inertia::render('Tashkilat/Dashboard', [
        'stats' => [
            'departments' => Department::count(),
            'positions' => DepartmentPosition::count(),
            'filled' => $filled,
            'vacancies' => $totalPositions - $filled,
            'departmentsTree' => $departmentsTree,
        ],
        'employeesByDepartment' => Department::withCount('positions')
            ->select('id', 'name')
            ->get(),
        'recentEmployees' => Employee::latest()
            ->take(10)
            ->get(),
    ]);
}
}
