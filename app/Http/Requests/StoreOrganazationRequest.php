<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreOrganazationRequest extends FormRequest
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
            'name' => 'required|string|max:255',
            'code' => 'nullable|string|max:255|unique:organizations',
            'email' => 'nullable|email|unique:organizations',
            'phone' => 'nullable|string|max:20|unique:organizations',
            'website' => 'nullable|url',
            'address' => 'nullable|string|max:255',
        ];
    }
    public function messages(): array
    {
        return [
            'name.required' => 'error.organization.name_is_required',
            'code.unique' => 'error.organization.code_unique',
            'email.unique' => 'error.organization.email_unique',
            'phone.unique' => 'error.organization.phone_unique',
            'website.url' => 'error.organization.website_url',
        ];
    }
}
