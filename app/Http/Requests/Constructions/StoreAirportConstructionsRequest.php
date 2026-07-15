<?php
namespace App\Http\Requests\Constructions;

use Illuminate\Foundation\Http\FormRequest;

class StoreAirportConstructionsRequest extends FormRequest
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
            'construction_id'      => ['required', 'exists:constructions,id'],
            'construction_type_id' => ['required', 'exists:construction_types,id'],
            'width'                => ['required', 'decimal:0,2'],
            'width_unit_id'        => ['required', 'exists:measurement_units,id'],
            'length'               => ['required', 'decimal:0,2'],
            'length_unit_id'       => ['required', 'exists:measurement_units,id'],
            'activity_status_id'   => ['required', 'exists:activity_statuses,id'],
            'latitude'             => [
                'required',
                'numeric',
                'between:-90,90',
            ],
            'longitude'            => [
                'required',
                'numeric',
                'between:-180,180',
            ],
            'weaknesses'           => ['nullable'],

            'requirements'         => ['nullable'],

        ];
    }

    public function messages(): array
    {
        return [
            'construction_id.required'      => 'fieldIsNeeded',
            'construction_id.exists'        => 'selectionIsInvalid',

            'construction_type_id.required' => 'fieldIsNeeded',
            'construction_type_id.exists'   => 'selectionIsInvalid',

            'width.required'                => 'fieldIsNeeded',
            'width.decimal'                 => 'shouldBeDecimal',
            'width_unit_id.required'        => 'fieldIsNeeded',
            'width_unit_id.exists'          => 'selectionIsInvalid',

            'length.required'               => 'fieldIsNeeded',
            'length.decimal'                => 'shouldBeDecimal',
            'length_unit_id.required'       => 'fieldIsNeeded',
            'length_unit_id.exists'         => 'selectionIsInvalid',

            'activity_status_id.required'   => 'fieldIsNeeded',
            'activity_status_id.exists'     => 'selectionIsInvalid',

            'latitude.required'             => 'fieldIsNeeded',
            'latitude.numeric'              => 'shouldBeNumber',
            'latitude.between'              => 'latitudeOutOfRange',

            'longitude.required'            => 'fieldIsNeeded',
            'longitude.numeric'             => 'shouldBeNumber',
            'longitude.between'             => 'longitudeOutOfRange',
        ];
    }
}
