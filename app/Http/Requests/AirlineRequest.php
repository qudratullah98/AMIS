<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class AirlineRequest extends FormRequest
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
        $airline = $this->route('airline');

        return [
            'name_en' => [
                'required',
                'string',
                'max:255',
                Rule::unique('airlines', 'name_en')->ignore($airline?->id),
            ],
            'name_dr' => [
                'required',
                'string',
                'max:255',
                Rule::unique('airlines', 'name_dr')->ignore($airline?->id),
            ],
            'name_ps' => [
                'required',
                'string',
                'max:255',
                Rule::unique('airlines', 'name_ps')->ignore($airline?->id),
            ],
        ];
    }
    public function messages(): array
    {
        return [
            'name_en.required' => 'error.airline.name_en_required',
            'name_en.unique'   => 'error.airline.name_en_unique',

            'name_dr.required' => 'error.airline.name_dr_required',
            'name_dr.unique'   => 'error.airline.name_dr_unique',

            'name_ps.required' => 'error.airline.name_ps_required',
            'name_ps.unique'   => 'error.airline.name_ps_unique',
        ];
    }
}
