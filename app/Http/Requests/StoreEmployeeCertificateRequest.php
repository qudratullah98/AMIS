<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class EmployeeCertificateRequest extends FormRequest
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
            ],

            'certificate_id' => [
                'required',
                'exists:certificates,id',
            ],

            'obtained_date' => [
                'required',
                'date',
            ],

            'certificate_number' => [
                'nullable',
                'string',
                'max:100',
            ],

        ];
    }

    public function messages(): array
    {
        return [

            'employee_id.required' => 'employee_required',
            'employee_id.exists' => 'employee_invalid',

            'certificate_id.required' => 'certificate_required',
            'certificate_id.exists' => 'certificate_invalid',

            'obtained_date.required' => 'obtained_date_required',
            'obtained_date.date' => 'obtained_date_invalid',

            'certificate_number.max' => 'certificate_number_max',

        ];
    }
}