<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateSghaServiceRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $id = $this->route('sgha_service'); // or correct route param

        return [
            'name_en' => [
                'required',
                'string',
                'max:255',
                Rule::unique('sgha_services', 'name_en')->ignore($id),
            ],

            'name_ps' => 'nullable|string|max:255',
            'name_dr' => 'nullable|string|max:255',

            'sgha_service_unit_id' => 'required|exists:sgha_service_units,id',
            'airline_id' => 'required|exists:airlines,id',

            'complation_rate' => 'required|numeric|min:0|max:100',

            'approval_status_id' => 'nullable|exists:approval_statuses,id',
        ];
    }
}
