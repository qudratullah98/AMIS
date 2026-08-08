<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreEmployeeAssignmentRequest extends FormRequest
{


    public function authorize(): bool
    {
        return true;
    }




    public function rules(): array
    {
        return [
            'employee_id' => [
                'required',
                'exists:employees,id',
                Rule::unique('employee_assignments', 'employee_id')
            ],

            'vacancy_id' => [
                'required', 
            ],

            'start_date' => [
                'required',
                'date',
            ],

            'end_date' => [
                'nullable',
                'date',
                'after_or_equal:start_date',
            ],

            'remarks' => [
                'nullable',
                'string',
            ],
        ];
    }


  public function messages(): array
{
    return [
        // Employee
        'employee_id.required' => 'employee_assignment.employee_required',
        'employee_id.exists' => 'employee_assignment.employee_invalid',
        'employee_id.unique' => 'employee_assignment.employee_already_assigned',

        // Vacancy / Position
        'vacancy_id.required' => 'employee_assignment.position_required',
        'vacancy_id.exists' => 'employee_assignment.position_not_available',

        // Start Date
        'start_date.required' => 'employee_assignment.start_date_required',
        'start_date.date' => 'employee_assignment.start_date_invalid',

        // End Date
        'end_date.date' => 'employee_assignment.end_date_invalid',
        'end_date.after_or_equal' => 'employee_assignment.end_date_before_start',

        // Status
        'status.required' => 'employee_assignment.status_required',
        'status.in' => 'employee_assignment.status_invalid',

        // Remarks
        'remarks.string' => 'employee_assignment.remarks_invalid',
    ];
}
}
