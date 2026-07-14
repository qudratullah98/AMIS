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
            // Service Information
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

            'approval_status_id' => [
                'nullable',
                'exists:approval_statuses,id',
            ],

            // Airline Rates
            'airline_rates' => [
                'required',
                'array',
                'min:1',
            ],

            'airline_rates.*.airline_id' => [
                'required',
                'distinct',
                'exists:airlines,id',
            ],

            'airline_rates.*.complation_rate' => [
                'required',
                'numeric',
                'min:0',
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'name_en.required' => 'error.sgha_service.name_en_required',
            'name_en.unique' => 'error.sgha_service.name_en_unique',

            'sgha_service_unit_id.required' => 'error.sgha_service.unit_required',
            'sgha_service_unit_id.exists' => 'error.sgha_service.unit_invalid',

            'airline_rates.required' => 'error.sgha_service.airline_rates_required',
            'airline_rates.array' => 'error.sgha_service.airline_rates_invalid',
            'airline_rates.min' => 'error.sgha_service.airline_rates_min',

            'airline_rates.*.airline_id.required' => 'error.sgha_service.airline_required',
            'airline_rates.*.airline_id.exists' => 'error.sgha_service.airline_invalid',
            'airline_rates.*.airline_id.distinct' => 'error.sgha_service.airline_duplicate',

            'airline_rates.*.complation_rate.required' => 'error.sgha_service.rate_required',
            'airline_rates.*.complation_rate.numeric' => 'error.sgha_service.rate_numeric',
            'airline_rates.*.complation_rate.min' => 'error.sgha_service.rate_min',
        ];
    }
}
