<?php

namespace Database\Seeders;

use App\Models\Certificate;
use Illuminate\Database\Seeder;

class CertificateSeeder extends Seeder
{
    public function run(): void
    {
        Certificate::insert([

            [
                'name' => 'GSAT-AVSEC Certificate',
                'level' => 'Basic'
            ],

            [
                'name' => 'GET-01 Aviation Basic Certificate',
                'level' => 'Basic'
            ],

            [
                'name' => 'Human Factor Certificate',
                'level' => 'Advanced'
            ],

            [
                'name' => 'SMS Certificate',
                'level' => 'Level 2'
            ],

            [
                'name' => 'DI Qualification Certificate',
                'level' => 'Category 3'
            ],

            [
                'name' => 'Leadership Certificate',
                'level' => 'Professional'
            ],

            [
                'name' => 'English Language Certificate',
                'level' => 'Intermediate'
            ]

        ]);
    }
}