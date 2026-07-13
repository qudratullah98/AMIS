<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreDepartmentPositionRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }


    public function rules(): array
    {
        return [

            'department_id' => [
                'required',
                'exists:departments,id',
            ],

            'position_type_id' => [
                'required',
                'exists:position_types,id',
            ],

            'title' => [
                'required',
                'string',
                'max:255',
            ],

            'grade' => [
                'nullable',
                'string',
                'max:100',
            ],

            'quantity' => [
                'required',
                'integer',
                'min:1',
            ],

            'salary' => [
                'nullable',
                'numeric',
                'min:0',
            ],

            'description' => [
                'nullable',
                'string',
            ],

        ];
    }


    public function messages(): array
    {
        return [

            'department_id.required' => 'department_position.department_required',
            'department_id.exists'   => 'department_position.department_invalid',

            'position_type_id.required' => 'department_position.position_type_required',
            'position_type_id.exists'   => 'department_position.position_type_invalid',


            'title.required' => 'department_position.title_required',
            'title.string'   => 'department_position.title_invalid',
            'title.max'      => 'department_position.title_too_long',


            'grade.string' => 'department_position.grade_invalid',
            'grade.max'    => 'department_position.grade_too_long',


            'quantity.required' => 'department_position.quantity_required',
            'quantity.integer'  => 'department_position.quantity_invalid',
            'quantity.min'      => 'department_position.quantity_min',


            'salary.numeric' => 'department_position.salary_invalid',
            'salary.min'     => 'department_position.salary_min',


            'description.string' => 'department_position.description_invalid',

        ];
    }
}