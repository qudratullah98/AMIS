<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreFareRequest extends FormRequest
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
    public function rules()
    {
      return [
    'route_id' => 'required|exists:routes,id',
    'vehicle_type_id' => [
        'required',
        'exists:vehicle_types,id',
        Rule::unique('fares')->where(function ($query) {
            return $query->where('route_id', request('route_id'))->where('status', '!=', 'disabled');
        })->ignore($this->id),
    ],
    'max_fare' => ['required', 'integer', 'min:10', function ($attribute, $value, $fail) {
        $minFare = request('min_fare');
        if ($minFare !== null && $value < $minFare) {
            $fail('The max fare must be greater than or equal to the min fare.');
        }
    }],
    'min_fare' => 'required|integer|min:10',
    'bel_start_date' => 'required|date',
    'bel_end_date' => 'nullable|date|after:bel_start_date',
];
    }

    public function messages()
    {
        return [
            'route_id.required' => 'مسیر ضروری است.',
            'route_id.exists' => 'مسیر انتخاب شده معتبر نیست.',
            'vehicle_type_id.required' => 'نوع وسیله نقلیه ضروری است.',
            'vehicle_type_id.exists' => 'نوع وسیله نقلیه معتبر نیست.',
            'fare.required' => 'کرایه ضروری است.',
            'fare.integer' => 'کرایه باید عدد باشد.',
            'fare.min' => 'کرایه نباید کمتر  باشد.',
            'bel_start_date.required' => 'تاریخ شروع ضروری است.',
            'bel_start_date.date' => 'تاریخ شروع باید یک تاریخ معتبر باشد.',
            'bel_end_date.date' => 'تاریخ پایان باید یک تاریخ معتبر باشد.',
            'bel_end_date.after' => 'تاریخ پایان باید  بعد از تاریخ شروع باشد.',
            'vehicle_type_id.unique' => 'ترکیب مسیر و نوع واسطه قبلاً ثبت شده است.',
        ];
    }
}
