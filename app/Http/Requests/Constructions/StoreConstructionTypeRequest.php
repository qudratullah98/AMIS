<?php

namespace App\Http\Requests\Constructions;

use Illuminate\Foundation\Http\FormRequest;

class StoreConstructionTypeRequest extends FormRequest
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
            'type_ps' => ['required', 'string', 'max:255'],
            'type_dr' => ['required', 'string', 'max:255'],
            'type_en' => ['required', 'string', 'max:255','regex:/^[A-Za-z]+$/'],
        ];
    }

    public function messages(): array
    {
        return [
            'type_ps.required' => 'fieldIsNeeded',
            'type_dr.required' => 'fieldIsNeeded',
            'type_en.required' => 'fieldIsNeeded',
            'type_en.regex' => 'englishString',

        ];
    }
}
