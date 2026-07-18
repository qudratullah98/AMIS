<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreDepartmentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules.
     */
    public function rules(): array
    {
        return [

            'tashkil_id' => [
                'required',
                'exists:tashkils,id',
            ],

            'parent_id' => [
                'nullable',
                'exists:departments,id',
            ],

            'name' => [
                'required',
                'string',
                'max:255', 
            ],

            'code' => [
                'nullable',
                'string',
                'max:50',
                'unique:departments,code',
            ],

            'description' => [
                'nullable',
                'string',
            ],

        ];
    }

    /**
     * Custom validation messages.
     */
    public function messages(): array
    {
        return [

            // Tashkil
            'tashkil_id.required' => 'error.department.tashkil_required',
            'tashkil_id.exists'   => 'error.department.tashkil_not_found',

            // Parent Department
            'parent_id.exists'    => 'error.department.parent_department_not_found',

            // Name
            'name.required' => 'error.department.name_required',
            'name.string'   => 'error.department.name_invalid',
            'name.max'      => 'error.department.name_too_long', 

            // Code
            'code.string' => 'error.department.code_invalid',
            'code.max'    => 'error.department.code_too_long',
            'code.unique' => 'error.department.code_already_exists',

            // Description
            'description.string' => 'error.department.description_invalid',
        ];
    }
}
