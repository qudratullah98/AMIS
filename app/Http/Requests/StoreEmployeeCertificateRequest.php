<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreEmployeeCertificateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
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

            'file' => 'required|file|max:5120', // 5120 KB = 5 MB

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

            'file.required' => 'file_required',
            'file.file' => 'file_invalid',
            'file.max' => 'file_max',

        ];
    }
}
