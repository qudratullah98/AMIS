<?php

namespace Database\Seeders;

use App\Models\CourseType;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CourseTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        CourseType::insert([

            [
                'name' => 'Mandatory',
                'description' => 'Required training courses based on aviation regulations and job requirements'
            ],

            [
                'name' => 'Optional',
                'description' => 'Additional professional development courses'
            ]

        ]);
    }
}
