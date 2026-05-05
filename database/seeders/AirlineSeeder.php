<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Airline;

class AirlineSeeder extends Seeder
{
    public function run(): void
    {
        $data = [

            // ===== Afghan Airlines =====
            [
                'name_ps' => 'آریانا افغان هوایی شرکت',
                'name_dr' => 'شرکت هوایی آریانا افغان ',
                'name_en' => 'Ariana Afghan Airlines',
            ],
            [
                'name_ps' => 'کام ایر',
                'name_dr' => 'کام ایر',
                'name_en' => 'Kam Air',
            ],

            // ===== UAE =====
            [
                'name_ps' => 'فلای دوبۍ',
                'name_dr' => 'فلای دبی',
                'name_en' => 'Flydubai',
            ],
            [
                'name_ps' => 'امارات',
                'name_dr' => 'امارات',
                'name_en' => 'Emirates',
            ],
            [
                'name_ps' => 'ایر عربیا',
                'name_dr' => 'ایر عربیا',
                'name_en' => 'Air Arabia',
            ],

            // ===== Turkey =====
            [
                'name_ps' => 'ترکیش ایرلاینز',
                'name_dr' => 'ترکیش ایرلاینز',
                'name_en' => 'Turkish Airlines',
            ],

            // ===== Qatar =====
            [
                'name_ps' => 'قطر ایرویز',
                'name_dr' => 'قطر ایرویز',
                'name_en' => 'Qatar Airways',
            ],

            // ===== Iran =====
            [
                'name_ps' => 'ایران ایر',
                'name_dr' => 'ایران ایر',
                'name_en' => 'Iran Air',
            ],
            [
                'name_ps' => 'ماهان ایر',
                'name_dr' => 'ماهان ایر',
                'name_en' => 'Mahan Air',
            ],

            // ===== Pakistan =====
            [
                'name_ps' => 'پاکستان نړیوال هوایي شرکت',
                'name_dr' => 'هواپیمایی پاکستان',
                'name_en' => 'Pakistan International Airlines',
            ],
            [
                'name_ps' => 'ایر بلو',
                'name_dr' => 'ایر بلو',
                'name_en' => 'Airblue',
            ],

            // ===== India =====
            [
                'name_ps' => 'ایر اندیا',
                'name_dr' => 'ایر ایندیا',
                'name_en' => 'Air India',
            ],
            [
                'name_ps' => 'ایندیګو',
                'name_dr' => 'ایندیگو',
                'name_en' => 'IndiGo',
            ],

            // ===== Central Asia =====
            [
                'name_ps' => 'ازبکستان ایرویز',
                'name_dr' => 'ازبکستان ایرویز',
                'name_en' => 'Uzbekistan Airways',
            ],
            [
                'name_ps' => 'تاجیک ایر',
                'name_dr' => 'تاجیک ایر',
                'name_en' => 'Tajik Air',
            ],
            [
                'name_ps' => 'سومون ایر',
                'name_dr' => 'سومون ایر',
                'name_en' => 'Somon Air',
            ],
            [
                'name_ps' => 'ایر آستانه',
                'name_dr' => 'ایر آستانه',
                'name_en' => 'Air Astana',
            ],

            // ===== Cargo / Charter =====
            [
                'name_ps' => 'کام ایر کارګو',
                'name_dr' => 'کام ایر کارگو',
                'name_en' => 'Kam Air Cargo',
            ],
            [
                'name_ps' => 'ترکیش کارګو',
                'name_dr' => 'ترکیش کارگو',
                'name_en' => 'Turkish Cargo',
            ],
            [
                'name_ps' => 'قطر کارګو',
                'name_dr' => 'قطر کارگو',
                'name_en' => 'Qatar Airways Cargo',
            ],
            [
                'name_ps' => 'امارات اسکای کارګو',
                'name_dr' => 'امارات اسکای کارگو',
                'name_en' => 'Emirates SkyCargo',
            ],

        ];

        foreach ($data as $row) {
            Airline::create($row);
        }
    }
}
