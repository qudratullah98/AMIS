<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreFlightRequest extends FormRequest
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
            'airport_id' => ['required', 'exists:airports,id'],
            'airline_id' => ['required', 'exists:airlines,id'],
            'aircraft_type_id' => ['required', 'exists:aircraft_types,id'],

            'aircraft_registration' => ['required', 'string'],
            'flight_number' => ['required', 'string', 'unique:flights,flight_number'],

            'work_order' => ['required', 'string'],
            'charge_note' => ['required', 'string'],

            'arrival_date' => ['required', 'date'],
            'approximate_time_arrival' => ['required'],

            'departure_date' => ['required', 'date'],
            'approximate_time_departure' => ['required'],
        ];
    }
    public function messages(): array
    {
        return [
            'airport_id.required' => 'airport_id_required',
            'airport_id.exists' => 'airport_id_invalid',

            'airline_id.required' => 'airline_id_required',
            'airline_id.exists' => 'airline_id_invalid',

            'aircraft_type_id.required' => 'aircraft_type_id_required',
            'aircraft_type_id.exists' => 'aircraft_type_id_invalid',

            'aircraft_registration.required' => 'aircraft_registration_required',

            'flight_number.required' => 'flight_number_required',
            'flight_number.unique' => 'flight_number_unique',

            'work_order.required' => 'work_order_required',
            'charge_note.required' => 'charge_note_required',

            'arrival_date.required' => 'arrival_date_required',
            'departure_date.required' => 'departure_date_required',

            'approximate_time_arrival.required' => 'approximate_time_arrival_required',
            'approximate_time_departure.required' => 'approximate_time_departure_required',
        ];
    }
}
