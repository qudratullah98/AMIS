<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GeneralDepartment extends Model
{
    public function equipment()
    {
        return $this->hasMany(Equipment::class);
    }

    public function user()
    {
        return $this->hasMany(User::class);
    }
}
