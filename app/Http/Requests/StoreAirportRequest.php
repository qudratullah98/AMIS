<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreAirportRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [

            'name_ps' => ['required', 'string', 'max:255'],
            'name_dr' => ['required', 'string', 'max:255'],
            'name_en' => ['nullable', 'string', 'max:255'],

            'IATA_code' => ['nullable', 'string', 'size:3', 'unique:airports,IATA_code'],
            'ICAO_code' => ['nullable', 'string', 'size:4', 'unique:airports,ICAO_code'],

            'type' => [
                'required',
                'in:international,domestic,military,cargo,regional,private'
            ],

            'status_id' => ['nullable', 'exists:approval_statuses,id'],

            'province_id' => ['required', 'exists:provinces,id'],
            'district_id' => ['required', 'exists:districts,id'],

            'latitude' => ['nullable', 'numeric', 'between:-90,90'],
            'longitude' => ['nullable', 'numeric', 'between:-180,180'],

            'amsl' => ['nullable', 'numeric'],
            'amsl_unit_id' => ['nullable', 'exists:measurement_units,id'],

            'area' => ['required', 'numeric'],
            'area_unit_id' => ['nullable', 'exists:measurement_units,id'],

            'description' => ['nullable', 'string'],
        ];
    }

    public function messages(): array
    {
        return [

            'name_ps.required' => 'airport_ps_name_is_required',
            'name_dr.required' => 'airport_dr_name_is_required',

            'name_ps.max' => 'airport_ps_name_max_length',
            'name_dr.max' => 'airport_dr_name_max_length',

            'IATA_code.size' => 'airport_iata_code_must_be_3_characters',
            'IATA_code.unique' => 'airport_iata_code_already_exists',

            'ICAO_code.size' => 'airport_icao_code_must_be_4_characters',
            'ICAO_code.unique' => 'airport_icao_code_already_exists',

            'province_id.required' => 'airport_province_is_required',
            'province_id.exists' => 'airport_province_invalid',

            'district_id.required' => 'airport_district_is_required',
            'district_id.exists' => 'airport_district_invalid',

            'latitude.between' => 'airport_latitude_invalid',
            'longitude.between' => 'airport_longitude_invalid',

            'area.required' => 'airport_area_is_required',
            'area.numeric' => 'airport_area_must_be_number',

            'amsl.numeric' => 'airport_amsl_must_be_number',

        ];
    }
}