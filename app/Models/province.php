<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class province extends Model
{
    // Get all airports in this province
    public function airports()
    {
        return $this->hasMany(Airport::class);
    }
}
