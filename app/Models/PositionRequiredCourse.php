<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PositionRequiredCourse extends Model
{
    protected $fillable = [
        'position_id',
        'course_id',
        'requirement_type',
        'validity_months',
        'description'
    ];

    protected $casts = [
        'validity_months' => 'integer',
    ];

    public function position(): BelongsTo
    {
        return $this->belongsTo(DepartmentPosition::class, 'position_id');
    }

    public function course(): BelongsTo
    {
        return $this->belongsTo(Course::class);
    }

    public function getRequirementTypeAttribute(): string
    {
        return 'course';
    }
}