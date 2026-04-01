<?php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreRoleRequest extends FormRequest
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
            'name'          => [
                'required',
                'string',
                'max:255',
                Rule::unique('roles', 'name')->ignore($this->roleId),
            ],
            'permissions'   => 'required|array',
            'permissions.*' => 'exists:permissions,id',
        ];
    }

    public function messages(): array
    {
        return [
            // Name
            'name.required'        => 'nameIsNeeded',
            'name.string'          => 'Role name must be a valid string.',
            'name.max'             => 'Role name must not exceed 255 characters.',
            'name.unique'          => 'nameAlreadyExists',

            // Permissions
            'permissions.required' => 'permissionIsNeeded',
            'permissions.array'    => 'permissionBeList',
            'permissions.*.exists' => 'One or more selected permissions are invalid.',
        ];
    }
}
