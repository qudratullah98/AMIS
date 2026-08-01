<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreEducationLevelRequest extends FormRequest
{

    public function authorize(): bool
    {
        return true;
    }



    public function rules(): array
    {
        return [

            'name'=>[
                'required',
                'string',
                'max:255',
                'unique:education_levels,name'
            ],


        ];
    }



    public function messages(): array
    {
        return [

            'name.required'=>'education.education_level_required',

            'name.string'=>'education.education_level_invalid',

            'name.max'=>'education.education_level_max',

            'name.unique'=>'education.education_level_exists',


        ];
    }

}