<?php

namespace App\Http\Controllers;


use App\Models\EmployeeAssignment;
use App\Models\Employee;
use App\Models\DepartmentPosition;

use App\Http\Requests\StoreEmployeeAssignmentRequest;
use App\Http\Requests\UpdateEmployeeAssignmentRequest;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;



class EmployeeAssignmentController extends Controller
{


    public function index(Request $request)
    {


        $query = EmployeeAssignment::with([

            'employee:id,first_name,last_name,national_id',

            'vacancy:id,vacancy_no',

        ]);



        if ($request->search) {

            $query->whereHas(
                'employee',
                function ($q) use ($request) {

                    $q->where(
                        'first_name',
                        'like',
                        '%' . $request->search . '%'
                    )

                        ->orWhere(
                            'last_name',
                            'like',
                            '%' . $request->search . '%'
                        );
                }
            );
        }



        return Inertia::render(
            'Tashkilat/EmployeeAssignment/Index',
            [

                'employee_assignments' => $query
                    ->latest()
                    ->paginate(20)

            ]
        );
    }







    public function store(StoreEmployeeAssignmentRequest $request)
    {
        $employeeAssignment = DB::transaction(function () use ($request) {

            $data = $request->validated();

            $employee = Employee::with([
                'certificates',
                'educations',
                'trainings',
            ])->findOrFail($data['employee_id']);

            $employeeAssignment = EmployeeAssignment::create($data);

            $departmentPosition = $employeeAssignment
                ->vacancy
                ->departmentPosition;

            /*
        |--------------------------------------------------------------------------
        | Required Certificates
        |--------------------------------------------------------------------------
        */

            $employeeCertificateIds = $employee->certificates->pluck('certificate_id');
           

            $requiredCertificateIds = $departmentPosition->requiredCertificates
                ->pluck('certificate_id'); 

            $missingCertificates = $requiredCertificateIds
                ->diff($employeeCertificateIds);

            if ($missingCertificates->isNotEmpty()) {
                throw new \Exception(
                    'The selected employee does not have all required certificates for this position.'
                );
            }

            /*
        |--------------------------------------------------------------------------
        | Required Educations
        |--------------------------------------------------------------------------
        */

            $requiredEducations = $departmentPosition->requiredEducations;

            $employeeEducationIds = $employee->educations
                ->pluck('id');

            $missingEducations = $requiredEducations
                ->whereNotIn('id', $employeeEducationIds);

            if ($missingEducations->isNotEmpty()) {
                throw new \Exception(
                    'The selected employee does not have all required education qualifications for this position.'
                );
            }

            /*
        |--------------------------------------------------------------------------
        | Required Courses
        |--------------------------------------------------------------------------
        */

            $requiredCourses = $departmentPosition->requiredCourses;

            $employeeCourseIds = $employee->trainings
                ->pluck('id');

            $missingCourses = $requiredCourses
                ->whereNotIn('id', $employeeCourseIds);

            if ($missingCourses->isNotEmpty()) {
                throw new \Exception(
                    'The selected employee does not have all required courses for this position.'
                );
            }

            /*
        |--------------------------------------------------------------------------
        | Occupy Vacancy
        |--------------------------------------------------------------------------
        */

            $updated = $employeeAssignment->vacancy()
                ->where('status', 'Vacant')
                ->update([
                    'status' => 'Occupied',
                ]);

            if ($updated === 0) {
                throw new \Exception(
                    'The selected vacancy is no longer available.'
                );
            }

            return $employeeAssignment;
        });

        return response()->json([
            'success' => 'employee_assignment.created',
            'data' => $employeeAssignment,
        ]);
    }





    public function update(
        UpdateEmployeeAssignmentRequest $request,
        EmployeeAssignment $employeeAssignment
    ) {


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
    ) {


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
    ) {


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
                $position->quantity - $filled

            ]

        );
    }
}
