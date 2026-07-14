<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreAircraftTypeRequest extends FormRequest
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
                'unique:aircraft_types,name',
            ],

            'code' => [
                'required',
                'string',
                'max:10',
                'unique:aircraft_types,code',
            ],
        ];
    }

    public function messages(): array
    {
        return [

            'name.required' => 'error.aircraft_type.name_required',
            'name.unique' => 'error.aircraft_type.name_unique',

            'code.required' => 'error.aircraft_type.code_required',
            'code.unique' => 'error.aircraft_type.code_unique',

        ];
    }
}
