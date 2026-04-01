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
            'name'                  => ['required', 'string', 'max:255'],
            'email'                 => [
                'required',
                'string',
                'email',
                'max:255',
                Rule::unique('users')->ignore($this->id),
            ],
            'password'              => [
                $this->id ? 'nullable' : 'required',
                'string',
                'min:4',
                'confirmed',
                Password::min(8)
                    ->mixedCase()
                    ->symbols(),
            ],
            'role_id'               => ['required', 'array'],
            'role_id.*'             => ['exists:roles,id'],
            'airport_id'            => ['required', 'exists:airports,id'],
            'general_department_id' => ['nullable', 'exists:general_departments,id'],
            'position_title'        => ['required', 'string', 'max:255'],
        ];
    }

    public function messages(): array
{
    return [
        'name.required' => 'nameIsNeeded',

        'email.required' => 'emailIsNeeded',
        'email.email' => 'emailIsInvalid',
        'email.unique' => 'emailAlreadyExists',

        'password.required' => 'passwordIsNeeded',
        'password.min' => 'passwordTooShort',
        'password.confirmed' => 'passwordNotMatch',

        'role_id.required' => 'roleIsNeeded',
        'role_id.array' => 'roleInvalid',
        'role_id.*.exists' => 'roleNotFound',

        'airport_id.required' => 'airportIsNeeded',
        'airport_id.exists' => 'airportInvalid',

        'general_department_id.exists' => 'generalDepartmentInvalid',

        'position_title.required' => 'positionTitleIsNeeded',
    ];
}
}
