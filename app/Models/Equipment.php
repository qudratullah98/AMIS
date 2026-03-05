<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Equipment extends Model
{
    protected $table = 'equipment';

    protected $fillable = [
        'equipment_type_id',
        'airport_id',
        'approval_status_id',
        'activity_status_id',
        'general_department_id',
        'EOM',
        'YOM',
        'model',
        'serial_number',
        'chasses_number',
        'engine_number',
    ];

    public function equipmentType()
    {
        return $this->belongsTo(EquipmentType::class);
    }

    public function airport()
    {
        return $this->belongsTo(Airport::class);
    }

    public function approvalStatus()
    {
        return $this->belongsTo(ApprovelStatus::class);
    }

    public function activityStatus()
    {
        return $this->belongsTo(ActivityStatus::class);
    }

    public function generalDepartment()
    {
        return $this->belongsTo(GeneralDepartment::class);
    }

    public function equipmentProperty()
    {
        return $this->hasMany(EquipmentProperty::class);
    }
}
