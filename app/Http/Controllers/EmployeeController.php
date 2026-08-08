<?php

namespace App\Http\Controllers;

use App\Http\Requests\EmployeeCertificateRequest;
use App\Http\Requests\EmployeeEducationRequest;
use App\Http\Requests\StoreEmployeeCertificateRequest;
use App\Http\Requests\StoreEmployeeRequest;
use App\Models\Employee;
use App\Models\EmployeeCertificate;
use App\Models\EmployeeEducation;
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
    $validated = $request->validated();


    if($request->hasFile('document_file')){

        $validated['document_file'] =
            $request->file('document_file')
            ->store('educations','public');

    }


    $education = $employee->educations()->create($validated);


    return response()->json([
        'success'=>true,
        'data'=>$education
    ]);
}
    public function storeCertificate(StoreEmployeeCertificateRequest $request, Employee $employee)
    {
        $validated = $request->validated();

        if ($request->hasFile('file')) {
            $validated['document_file'] = $request
                ->file('file')
                ->store('certificates', 'public');
        }

        $certificate = $employee->certificates()->create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Certificate added successfully',
            'data' => $certificate
        ]);
    }

 public function employees()
{
    return response()->json(
        Employee::where('approval_status_id', 1)
            ->when(request('query'), function ($q) {
                $q->where(function ($query) {
                    $query->where('first_name', 'like', request('query') . '%')
                        ->orWhere('national_id', 'like', request('query') . '%');
                });
            })
            ->select(
                'id',
                'national_id',
                'first_name',
                'last_name'
            )
            ->get()
    );
}

    public function certificatesJson($employee)
    {
        $certificates = EmployeeCertificate::with('certificate')
            ->where('employee_id', $employee)
            ->get();
        return response()->json($certificates);
    }
    public function trainingsJson(Employee $employee)
    {
        return response()->json($employee->trainings);
    }
    public function educationsJson( $employee)
    {
        $educations = EmployeeEducation::with('educationLevel')
            ->where('employee_id', $employee)
            ->get();
        return response()->json($educations);
    }
}
