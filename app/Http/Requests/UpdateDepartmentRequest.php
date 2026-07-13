<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateDepartmentRequest extends FormRequest
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
            'tashkil_id.required' => 'department.tashkil_required',
            'tashkil_id.exists'   => 'department.tashkil_not_found',

            'parent_id.exists'    => 'department.parent_department_not_found',

            'name.required'       => 'department.name_required',
            'name.string'         => 'department.name_invalid',
            'name.max'            => 'department.name_too_long',

            'code.string'         => 'department.code_invalid',
            'code.max'            => 'department.code_too_long',

            'description.string'  => 'department.description_invalid',
        ];
    }
}
