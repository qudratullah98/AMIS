<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreTashkilRequest extends FormRequest
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
            'year' => [
                'required',
                'integer',
                'min:1000',
                'max:9999',
                Rule::unique('tashkils')
                    ->where(function ($query) {
                        return $query->where('organization_id', $this->organization_id);
                    }),
            ],

            'reference_number' => 'required|string|max:255|unique:tashkils,reference_number',

            'organization_id' => 'required|exists:organizations,id',

            'description' => 'nullable|string|max:255',
        ];
    }
    public function messages(): array
    {
        return [
            'year.unique' => 'error.tashkil.organization_year_unique',

            'year.required' => 'error.tashkil.year_required',
            'year.integer' => 'error.tashkil.year_integer',
            'year.min' => 'error.tashkil.year_min',
            'year.max' => 'error.tashkil.year_max',

            'reference_number.required' => 'error.tashkil.reference_number_required',
            'reference_number.string' => 'error.tashkil.reference_number_string',
            'reference_number.max' => 'error.tashkil.reference_number_max',
            'reference_number.unique' => 'error.tashkil.reference_number_unique',

            'organization_id.required' => 'error.tashkil.organization_id_required',
            'organization_id.exists' => 'error.tashkil.organization_id_exists',

            'description.string' => 'error.tashkil.description_string',
            'description.max' => 'error.tashkil.description_max',
        ];
    }
}
