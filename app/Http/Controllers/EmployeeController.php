<?php

namespace App\Http\Controllers;

use App\Http\Requests\EmployeeCertificateRequest;
use App\Http\Requests\EmployeeEducationRequest;
use App\Http\Requests\StoreEmployeeRequest;
use App\Models\Employee;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EmployeeController extends Controller
{

    public function index(Request $request)
    {

        $query = Employee::query();


        if ($request->search) {

            $search = $request->search;


            $query->where(function ($q) use ($search) {

                $q->where('first_name', 'like', "%$search%")
                    ->orWhere('last_name', 'like', "%$search%")
                    ->orWhere('employee_no', 'like', "%$search%")
                    ->orWhere('national_id', 'like', "%$search%");
            });
        }


        return Inertia::render(
            'Tashkilat/Employee/Index',
            [

                'employees' => $query
                    ->latest()
                    ->paginate(20)
                    ->withQueryString(),


                'filters' => [
                    'search' => $request->search
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

            'success' => true,

            'message' => 'employee.created',

            'data' => $employee

        ]);
    }
    public function educations(Employee $employee)
    {
        return Inertia::render('Tashkilat/Employee/EmployeeEducations/EmployeeEducation', ['employee' => $employee]);
    }
    public function storeEducation(EmployeeEducationRequest $request, Employee $employee)
    {
        $education = $employee->educations()->create($request->validated());
        return response()->json([
            'success' => true,
            'message' => 'Education added successfully',
            'data' => $education
        ]);
    }
    public function storeCertificate(EmployeeCertificateRequest $request, Employee $employee)
    {
        $certificate = $employee->certificates()->create($request->validated());
        return response()->json([
            'success' => true,
            'message' => 'Certificate added successfully',
            'data' => $certificate
        ]);
    }

    public function employees()
    {
        return response()->json(
            Employee::when(request('query'), function ($q) {
                $q->where('first_name', 'like', request('query') . '%')->orWhere('national_id', 'like', request('query'));
            })->select(
                'id',
                'national_id',
                'first_name',
                'last_name'
            )->get()
        );
    }

    public function certificatesJson(Employee $employee)
    {
        return response()->json($employee->certificates);
    }
    public function trainingsJson(Employee $employee)
    {
        return response()->json($employee->trainings);
    }
    public function educationsJson(Employee $employee)
    {
        return response()->json($employee->educations);
    }
}
