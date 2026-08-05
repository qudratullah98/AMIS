<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Trainer extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'type',
        'phone',
        'email',
        'license_number',
        'organization',
        'address',
        'description'
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    // Relationships
    public function trainingPlans(): HasMany
    {
        return $this->hasMany(TrainingPlan::class);
    }

    // Accessors
    public function getFullNameAttribute(): string
    {
        return $this->name;
    }

    public function getTypeLabelAttribute(): string
    {
        $types = [
            'internal' => 'Internal',
            'external' => 'External',
            'consultant' => 'Consultant',
        ];
        return $types[$this->type] ?? $this->type;
    }

    public function getTypeColorAttribute(): string
    {
        $colors = [
            'internal' => 'blue',
            'external' => 'green',
            'consultant' => 'purple',
        ];
        return $colors[$this->type] ?? 'gray';
    }

    // Scopes
    public function scopeInternal($query)
    {
        return $query->where('type', 'internal');
    }

    public function scopeExternal($query)
    {
        return $query->where('type', 'external');
    }

    public function scopeConsultant($query)
    {
        return $query->where('type', 'consultant');
    }

    public function scopeSearch($query, $search)
    {
        return $query->where('name', 'like', "%{$search}%")
                     ->orWhere('email', 'like', "%{$search}%")
                     ->orWhere('phone', 'like', "%{$search}%")
                     ->orWhere('organization', 'like', "%{$search}%");
    }
}