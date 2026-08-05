<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PositionRequiredCertificate extends Model
{
    protected $fillable = [
        'position_id',
        'certificate_id',
        'is_required'
    ];

    protected $casts = [
        'is_required' => 'boolean',
    ];

    public function position(): BelongsTo
    {
        return $this->belongsTo(DepartmentPosition::class, 'position_id');
    }

    public function certificate(): BelongsTo
    {
        return $this->belongsTo(Certificate::class);
    }

    // Accessor
    public function getRequirementTypeAttribute(): string
    {
        return 'certificate';
    }
}