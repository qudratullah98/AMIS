<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class EmployeeEducationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */

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
        ],

        'education_level_id' => [
            'required',
            'exists:education_levels,id',
        ],

        'field_of_study' => [
            'required',
            'string',
            'max:255',
        ],

        'institution_name' => [
            'required',
            'string',
            'max:255',
        ],

        'graduation_year' => [
            'required',
            'integer',
            'digits:4',
            'between:1900,' . date('Y'),
        ],

        'gpa' => [
            'nullable',
            'numeric',
            'between:0,4',
        ],

    ];
}

public function messages(): array
{
    return [

        'employee_id.required' => 'employee_required',
        'employee_id.exists' => 'employee_invalid',

        'education_level_id.required' => 'education_level_required',
        'education_level_id.exists' => 'education_level_invalid',

        'field_of_study.required' => 'field_of_study_required',
        'field_of_study.max' => 'field_of_study_max',

        'institution_name.required' => 'institution_name_required',
        'institution_name.max' => 'institution_name_max',

        'graduation_year.required' => 'graduation_year_required',
        'graduation_year.integer' => 'graduation_year_invalid',
        'graduation_year.digits' => 'graduation_year_digits',
        'graduation_year.between' => 'graduation_year_range',

        'gpa.numeric' => 'gpa_invalid',
        'gpa.between' => 'gpa_range',

    ];
}
}
