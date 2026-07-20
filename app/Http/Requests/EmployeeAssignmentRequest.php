<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class EmployeeAssignmentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'employee_id' => ['required', 'exists:employees,id'],
            'vacancy_id' => ['required', 'exists:position_vacancies,id'],
            'start_date' => ['required', 'date', 'before_or_equal:end_date'],
            'end_date' => ['nullable', 'date', 'after_or_equal:start_date'],
            'approval_status_id' => ['required', 'exists:approvel_statuses,id'],
            'remarks' => ['nullable', 'string', 'max:1000'],
        ];
    }

    public function messages(): array
    {
        return [
            'employee_id.required' => 'employee_is_required',
            'employee_id.exists' => 'employee_invalid',

            'vacancy_id.required' => 'vacancy_is_required',
            'vacancy_id.exists' => 'vacancy_invalid',

            'start_date.required' => 'start_date_is_required',
            'start_date.date' => 'start_date_invalid',
            'start_date.before_or_equal' => 'start_date_must_be_before_or_equal_to_end_date',

            'end_date.date' => 'end_date_invalid',
            'end_date.after_or_equal' => 'end_date_must_be_after_or_equal_to_start_date',

            'approval_status_id.required' => 'approval_status_is_required',
            'approval_status_id.exists' => 'approval_status_invalid',

            'remarks.max' => 'remarks_max_length',
        ];
    }
}