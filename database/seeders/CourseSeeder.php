<?php

namespace Database\Seeders;

use App\Models\Course;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CourseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
         Course::insert([

            [
                'course_type_id' => 1,
                'name' => 'GSAT-AVSEC',
                'description' => 'General Security Awareness Training - Aviation Security'
            ],

            [
                'course_type_id' => 1,
                'name' => 'GET-01 Aviation Basic',
                'description' => 'Basic Aviation General Training Course'
            ],

            [
                'course_type_id' => 1,
                'name' => 'Human Factor',
                'description' => 'Human factors training for aviation personnel'
            ],

            [
                'course_type_id' => 1,
                'name' => 'SMS',
                'description' => 'Safety Management System training'
            ],

            [
                'course_type_id' => 1,
                'name' => 'DI Qualification',
                'description' => 'Dangerous Items Qualification Training'
            ],


            // Optional Courses

            [
                'course_type_id' => 2,
                'name' => 'Leadership Training',
                'description' => 'Management and leadership skills development'
            ],

            [
                'course_type_id' => 2,
                'name' => 'Computer Skills',
                'description' => 'Advanced computer and office application training'
            ],

            [
                'course_type_id' => 2,
                'name' => 'English Language Training',
                'description' => 'Professional English communication training'
            ]

        ]);
    }
}
