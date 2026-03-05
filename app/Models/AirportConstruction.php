<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AirportConstruction extends Model
{
    protected $fillable = [
        'airport_id',
        'construction_id',
        'construction_type_id',
        'width',
        'width_unit_id',
        'length',
        'length_unit_id',
        'approval_status_id',
        'activity_status_id',
        'latitude',
        'longitude',
        'weaknesses',
        'requirements',
        'image',
    ];

    // Relationship to Airport
    public function airport()
    {
        return $this->belongsTo(Airport::class);
    }

    // Relationship to Construction
    public function construction()
    {
        return $this->belongsTo(Construction::class);
    }

    // Relationship to ConstructionType
    public function constructionType()
    {
        return $this->belongsTo(ConstructionType::class);
    }

    // Relationship to Width Unit
    public function widthUnit()
    {
        return $this->belongsTo(MeasurementUnit::class, 'width_unit_id');
    }

    // Relationship to Length Unit
    public function lengthUnit()
    {
        return $this->belongsTo(MeasurementUnit::class, 'length_unit_id');
    }

    // Relationship to Approval Status
    public function approvalStatus()
    {
        return $this->belongsTo(ApprovelStatus::class);
    }

    // Relationship to Activity Status
    public function activityStatus()
    {
        return $this->belongsTo(ActivityStatus::class);
    }
}
