<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PositionRequiredEducation extends Model
{
    protected $fillable = [
        'position_id',
        'education_level_id',
        'is_required'
    ];

    protected $casts = [
        'is_required' => 'boolean',
    ];

    public function position(): BelongsTo
    {
        return $this->belongsTo(DepartmentPosition::class, 'position_id');
    }

    public function educationLevel(): BelongsTo
    {
        return $this->belongsTo(EducationLevel::class);
    }

    public function getRequirementTypeAttribute(): string
    {
        return 'education';
    }
}