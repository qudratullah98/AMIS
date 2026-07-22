<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreFlightServiceRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'flight_id' => ['required', 'exists:flights,id'],
            'sgha_service_id' => ['required', 'exists:sgha_services,id'],
            'count' => ['required', 'integer', 'min:1'],
        ];
    }

    /**
     * Validation messages.
     */
    public function messages(): array
    {
        return [
            'flight_id.required' => __('error.flight_service.flight_required'),
            'flight_id.exists' => __('error.flight_service.flight_exists'),

            'sgha_service_id.required' => __('error.flight_service.service_required'),
            'sgha_service_id.exists' => __('error.flight_service.service_exists'),

            'count.required' => __('error.flight_service.count_required'),
            'count.integer' => __('error.flight_service.count_integer'),
            'count.min' => __('error.flight_service.count_min'),
        ];
    }
}
