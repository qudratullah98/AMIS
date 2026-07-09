<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreSghaServiceRequest extends FormRequest
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
        'name_en' => [
            'required',
            'string',
            'max:255',
            'unique:sgha_services,name_en',
        ],

        'name_ps' => [
            'nullable',
            'string',
            'max:255',
        ],

        'name_dr' => [
            'nullable',
            'string',
            'max:255',
        ],

        'sgha_service_unit_id' => [
            'required',
            'exists:sgha_service_units,id',
        ],

        // ---------------- AIRLINE RATES ----------------
        'airline_rates' => [
            'required',
            'array',
            'min:1',
        ],

        'airline_rates.*.airline_id' => [
            'required',
            'exists:airlines,id',
        ],

        'airline_rates.*.complation_rate' => [
            'required',
            'numeric',
            'min:0', 
        ],

    ];
}
}
