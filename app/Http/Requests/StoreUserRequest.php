<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;

class StoreUserRequest extends FormRequest
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
            'name' => ['required', 'string', 'max:255'],
            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                Rule::unique('users')->ignore($this->id)
            ],
            'password' => [
                $this->id ? 'nullable' : 'required',
                'string',
                'min:4',
                'confirmed',
                 Password::min(8)
        ->mixedCase()   // must contain upper and lower case letters
        ->symbols(),

            ],
            'role_id' => ['required', 'exists:roles,id'],
            'user_type' => ['required'],
            'province_id' => [
                'required_if:user_type,genral_user,Report_user',
                'nullable', // Allow empty value if not required
                'exists:provinces,id'
            ],
            'terminal_id' => [
                'required_if:user_type,Transport_user',
                'nullable',
                'exists:terminals,id'
            ],
            'bander_id' => [
                'required_if:user_type,Bander_user',
                'nullable',
                'exists:banders,id'
            ],
            'company_id' => [
                'required_if:user_type,Company_user',
                'nullable',
                'exists:companies,id'
            ],
        ];
    }
}
