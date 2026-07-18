<?php

namespace Database\Seeders;

use App\Models\blood_group;
use Illuminate\Database\Seeder;
use App\Models\BloodGroup;

class BloodGroupSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $bloodGroups = [
            ['name' => 'A+'],
            ['name' => 'A-'],
            ['name' => 'B+'],
            ['name' => 'B-'],
            ['name' => 'AB+'],
            ['name' => 'AB-'],
            ['name' => 'O+'],
            ['name' => 'O-'],
        ];

        foreach ($bloodGroups as $bloodGroup) {
            blood_group::firstOrCreate($bloodGroup);
        }
    }
}