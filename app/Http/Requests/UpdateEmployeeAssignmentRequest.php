<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;


class UpdateEmployeeAssignmentRequest extends FormRequest
{


    public function authorize(): bool
    {
        return true;
    }



    public function rules(): array
    {

        return [

            'employee_id'=>[
                'required',
                'exists:employees,id'
            ],


            'department_position_id'=>[
                'required',
                'exists:department_positions,id'
            ],


            'start_date'=>[
                'required',
                'date'
            ],


            'end_date'=>[
                'nullable',
                'date',
                'after_or_equal:start_date'
            ],


            'status'=>[
                'required',
                'in:active,inactive'
            ],


            'remarks'=>[
                'nullable',
                'string'
            ],

        ];

    }



    public function messages(): array
    {

        return [

            'employee_id.required'
            =>
            'employee_assignment.employee_required',

            'employee_id.exists'
            =>
            'employee_assignment.employee_invalid',


            'department_position_id.required'
            =>
            'employee_assignment.position_required',


            'department_position_id.exists'
            =>
            'employee_assignment.position_invalid',


            'start_date.required'
            =>
            'employee_assignment.start_date_required',


            'status.required'
            =>
            'employee_assignment.status_required',


            'status.in'
            =>
            'employee_assignment.status_invalid',


        ];

    }

}