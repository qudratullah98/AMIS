<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreEmployeeRequest extends FormRequest
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
                'unique:employees,employee_no'
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
                'max:50'
            ],


            'email'=>[
                'nullable',
                'email',
                'max:255'
            ],


            'national_id'=>[
                'nullable',
                'string',
                'max:100'
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
            'first_name.string'=>'employee.first_name_invalid',

            'last_name.required'=>'employee.last_name_required',
            'last_name.string'=>'employee.last_name_invalid',


            'father_name.string'=>'employee.father_name_invalid',


            'gender.required'=>'employee.gender_required',
            'gender.in'=>'employee.gender_invalid',


            'dob.date'=>'employee.dob_invalid',


            'phone.string'=>'employee.phone_invalid',


            'email.email'=>'employee.email_invalid',


            'national_id.string'=>'employee.national_id_invalid',


            'address.string'=>'employee.address_invalid',


            'photo.image'=>'employee.photo_invalid',
            'photo.max'=>'employee.photo_too_large',


            'status.boolean'=>'employee.status_invalid',

        ];
    }

}