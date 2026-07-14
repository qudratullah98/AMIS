<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;


class UpdateEmployeeRequest extends FormRequest
{


    public function authorize(): bool
    {
        return true;
    }



    public function rules(): array
    {
        return [

            'employee_no'=>[

                'required',
                'string',
                'max:100',

                Rule::unique('employees')
                    ->ignore($this->employee)

            ],


            'first_name'=>[
                'required',
                'string',
                'max:255'
            ],


            'last_name'=>[
                'required',
                'string',
                'max:255'
            ],


            'father_name'=>[
                'nullable',
                'string',
                'max:255'
            ],


            'gender'=>[
                'required',
                'in:Male,Female'
            ],


            'dob'=>[
                'nullable',
                'date'
            ],


            'phone'=>[
                'nullable',
                'string',
            ],


            'email'=>[
                'nullable',
                'email'
            ],


            'national_id'=>[
                'nullable',
                'string'
            ],


            'address'=>[
                'nullable',
                'string'
            ],


            'photo'=>[
                'nullable',
                'image',
                'max:2048'
            ],


            'status'=>[
                'boolean'
            ],

        ];
    }



    public function messages(): array
    {
        return [

            'employee_no.required'=>'employee.employee_no_required',
            'employee_no.unique'=>'employee.employee_no_exists',


            'first_name.required'=>'employee.first_name_required',
            'last_name.required'=>'employee.last_name_required',


            'gender.required'=>'employee.gender_required',
            'gender.in'=>'employee.gender_invalid',


            'email.email'=>'employee.email_invalid',


            'photo.image'=>'employee.photo_invalid',
            'photo.max'=>'employee.photo_too_large',

        ];
    }

}