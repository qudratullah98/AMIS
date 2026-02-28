<?php

namespace Database\Seeders;

use App\Models\ActivityStatus;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ActivityStatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
         $data = [
            ['id' => 1, 'name' => 'فعال', 'code' => 'active'],
            ['id' => 2, 'name' => 'غیر فعال', 'code' => 'inactive'],
        ];

        foreach ($data as $row) {
            ActivityStatus::create($row);
        }
    }
}
