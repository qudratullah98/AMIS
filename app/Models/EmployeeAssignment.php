<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class EmployeeAssignment extends Model
{
    protected $fillable = [
        'employee_id',
        'vacancy_id',
        'start_date',
        'end_date',
        'approval_status_id',
        'remarks',
        'status'
    ];

    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
    ];
  /*
    |--------------------------------------------------------------------------
    | Relationships
    |--------------------------------------------------------------------------
    */
   

    public function departmentPosition()
    {
        return $this->belongsTo(DepartmentPosition::class);
    }
        public function employee(): BelongsTo
    {
        return $this->belongsTo(Employee::class, 'employee_id');
    }

    public function vacancy(): BelongsTo
    {
        return $this->belongsTo(PositionVacancy::class, 'vacancy_id');
    }

    public function approvalStatus(): BelongsTo
    {
        return $this->belongsTo(ApprovelStatus::class, 'approval_status_id');
    }
}
