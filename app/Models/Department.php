<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Department extends Model
{
   protected $fillable = [
        'tashkil_id',
        'parent_id',
        'name',
        'code',
        'description',
    ];

    /*
    |--------------------------------------------------------------------------
    | Relationships
    |--------------------------------------------------------------------------
    */

    public function tashkil()
    {
        return $this->belongsTo(Tashkil::class);
    }

    public function parent()
    {
        return $this->belongsTo(Department::class, 'parent_id');
    }

    public function children()
    {
        return $this->hasMany(Department::class, 'parent_id');
    }

    public function departmentPositions()
    {
        return $this->hasMany(DepartmentPosition::class);
    }
    public function positions()
    {
        return $this->hasMany(DepartmentPosition::class);
    }
}
