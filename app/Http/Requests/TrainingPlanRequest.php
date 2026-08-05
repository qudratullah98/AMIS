<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class TrainingPlanRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $rules = [
            'name' => ['required', 'string', 'max:255'],
            'course_id' => ['required', 'exists:courses,id'],
            'trainer_id' => ['required', 'exists:trainers,id'],
            'start_date' => ['required', 'date', 'after_or_equal:today'],
            'end_date' => ['required', 'date', 'after_or_equal:start_date'],
            'location' => ['nullable', 'string', 'max:500'],
            'status' => ['required', Rule::in(['planned', 'in_progress', 'completed', 'cancelled'])],
            'description' => ['nullable', 'string'],
        ];

        // Add unique validation for update
        if ($this->isMethod('PUT') || $this->isMethod('PATCH')) {
            $rules['name'] = [
                'required', 
                'string', 
                'max:255',
                Rule::unique('training_plans')->ignore($this->route('training_plan'))
            ];
        } else {
            $rules['name'][] = Rule::unique('training_plans');
        }

        return $rules;
    }

    public function messages(): array
    {
        return [
            'name.required' => 'The training plan name is required.',
            'name.unique' => 'A training plan with this name already exists.',
            'course_id.required' => 'Please select a course.',
            'course_id.exists' => 'The selected course is invalid.',
            'trainer_id.required' => 'Please select a trainer.',
            'trainer_id.exists' => 'The selected trainer is invalid.',
            'start_date.required' => 'The start date is required.',
            'start_date.after_or_equal' => 'The start date must be today or a future date.',
            'end_date.required' => 'The end date is required.',
            'end_date.after_or_equal' => 'The end date must be after or equal to the start date.',
            'status.required' => 'The status is required.',
            'status.in' => 'The selected status is invalid.',
        ];
    }

    protected function prepareForValidation()
    {
        // Convert empty strings to null for nullable fields
        $this->merge([
            'location' => $this->location ?: null,
            'description' => $this->description ?: null,
        ]);
    }
}