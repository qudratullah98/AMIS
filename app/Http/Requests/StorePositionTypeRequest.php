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

            'title' => [
                'required',
                'string',
                'max:255',
                'unique:position_types,title',
            ],

            'grade' => [
                'nullable',
                'string',
                'max:100',
            ],

            'code' => [
                'string',
                'max:100',
                'unique:position_types,code',
                'nullable',
                'string',
            ],

        ];
    }
    public function messages(): array
    {
        return [
            'title.required' => 'position_type.title_required',
            'title.string'   => 'position_type.title_invalid',
            'title.max'      => 'position_type.title_too_long',
            'title.unique'   => 'position_type.title_already_exists',

            'grade.string'  => 'position_type.grade_invalid',
            'grade.max'     => 'position_type.grade_too_long',

            'code.string' => 'position_type.code_invalid',
        ];
    }
}
