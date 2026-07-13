<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePositionTypeRequest extends FormRequest
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

            'name' => [
                'required',
                'string',
                'max:255',
                'unique:position_types,name',
            ],

            'grade' => [
                'nullable',
                'string',
                'max:100',
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
            'name.required' => 'position_type.name_required',
            'name.string'   => 'position_type.name_invalid',
            'name.max'      => 'position_type.name_too_long',
            'name.unique'   => 'position_type.name_already_exists',

            'grade.string'  => 'position_type.grade_invalid',
            'grade.max'     => 'position_type.grade_too_long',

            'description.string' => 'position_type.description_invalid',
        ];
    }
}
