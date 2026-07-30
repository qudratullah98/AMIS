<?php

namespace Database\Seeders;

use App\Models\EducationLevel;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EducationLevelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {

        EducationLevel::insert([

            [
                'name' => 'بکلریا',
                'description' => '12th Grade'
            ],

            [
                'name' => 'فوق بکلریا',
                'description' => 'Technical Diploma'
            ],

            [
                'name' => 'لسانس',
                'description' => 'Undergraduate Degree'
            ],

            [
                'name' => 'ماستر',
                'description' => 'Postgraduate Degree'
            ],

            [
                'name' => 'دکترا',
                'description' => 'Doctorate Degree'
            ]

        ]);
    }
}
