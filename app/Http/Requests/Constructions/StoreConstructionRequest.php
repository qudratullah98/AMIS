<?php

namespace App\Http\Requests\Constructions;

use Illuminate\Foundation\Http\FormRequest;

class StoreConstructionRequest extends FormRequest
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
            'name_ps' => ['required','string' , 'max:255'],
            'name_dr' => ['required', 'string', 'max:255'],
            'name_en' => ['required', 'string', 'max:255','regex:/^[A-Za-z]+$/'],
            'code'    => ['required', 'string', 'max:15','uppercase','regex:/^[A-Z]+$/'],
        ];
    }

    public function messages(): array
    {
        return [
            'name_ps.required' => 'fieldIsNeeded',
            'name_dr.required' => 'fieldIsNeeded',
            'name_en.required' => 'fieldIsNeeded',
            'name_en.regex' => 'englishString',

            'code.required'    => 'fieldIsNeeded',
            'code.uppercase' => 'upperCase',
            'code.regex' => 'upperCase'
        ];
    }
}
