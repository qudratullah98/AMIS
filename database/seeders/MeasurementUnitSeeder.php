<?php

namespace Database\Seeders;

use App\Models\MeasurementUnit;
use Illuminate\Database\Seeder;

class MeasurementUnitSeeder extends Seeder
{
    public function run(): void
    {
        $data = [

            // -------- Length --------
            ['unit_ps' => 'متر', 'unit_dr' => 'متر', 'unit_en' => 'M'],
            ['unit_ps' => 'سانتي متر', 'unit_dr' => 'سانتی متر', 'unit_en' => 'CM'],
            ['unit_ps' => 'ملي متر', 'unit_dr' => 'میلی متر', 'unit_en' => 'MM'],
            ['unit_ps' => 'کیلو متر', 'unit_dr' => 'کیلومتر', 'unit_en' => 'KM'],
            ['unit_ps' => 'فټ', 'unit_dr' => 'فوت', 'unit_en' => 'FT'],
            ['unit_ps' => 'انچ', 'unit_dr' => 'اینچ', 'unit_en' => 'IN'],

            // -------- Area --------
            ['unit_ps' => 'متر مربع', 'unit_dr' => 'متر مربع', 'unit_en' => 'M²'],
            ['unit_ps' => 'کیلو متر مربع', 'unit_dr' => 'کیلومتر مربع', 'unit_en' => 'KM²'],
            ['unit_ps' => 'هکتار', 'unit_dr' => 'هکتار', 'unit_en' => 'HA'],

            // -------- Volume --------
            ['unit_ps' => 'لیتر', 'unit_dr' => 'لیتر', 'unit_en' => 'L'],
            ['unit_ps' => 'ملي لیتر', 'unit_dr' => 'میلی لیتر', 'unit_en' => 'ML'],
            ['unit_ps' => 'متر مکعب', 'unit_dr' => 'متر مکعب', 'unit_en' => 'M³'],
            ['unit_ps' => 'بشکه', 'unit_dr' => 'بشکه', 'unit_en' => 'BARREL'],

            // -------- Weight --------
            ['unit_ps' => 'ګرام', 'unit_dr' => 'گرام', 'unit_en' => 'G'],
            ['unit_ps' => 'کیلو ګرام', 'unit_dr' => 'کیلوگرام', 'unit_en' => 'KG'],
            ['unit_ps' => 'ټن', 'unit_dr' => 'تن', 'unit_en' => 'TON'],
            ['unit_ps' => 'پونډ', 'unit_dr' => 'پوند', 'unit_en' => 'LB'],

            // -------- Count / Package --------
            ['unit_ps' => 'عدد', 'unit_dr' => 'عدد', 'unit_en' => 'PCS'],
            ['unit_ps' => 'بسته', 'unit_dr' => 'بسته', 'unit_en' => 'PACK'],
            ['unit_ps' => 'بکس', 'unit_dr' => 'بکس', 'unit_en' => 'BOX'],
            ['unit_ps' => 'کارتن', 'unit_dr' => 'کارتن', 'unit_en' => 'CARTON'],
            ['unit_ps' => 'پالت', 'unit_dr' => 'پالت', 'unit_en' => 'PALLET'],

            // -------- Time --------
            ['unit_ps' => 'ثانیه', 'unit_dr' => 'ثانیه', 'unit_en' => 'SEC'],
            ['unit_ps' => 'دقیقه', 'unit_dr' => 'دقیقه', 'unit_en' => 'MIN'],
            ['unit_ps' => 'ساعت', 'unit_dr' => 'ساعت', 'unit_en' => 'HR'],
            ['unit_ps' => 'ورځ', 'unit_dr' => 'روز', 'unit_en' => 'DAY'],

            // -------- Aviation / Fuel / Logistics --------
            ['unit_ps' => 'لیتر تیل', 'unit_dr' => 'لیتر تیل', 'unit_en' => 'FUEL L'],
            ['unit_ps' => 'کیلو ګرام بار', 'unit_dr' => 'کیلوگرام بار', 'unit_en' => 'CARGO KG'],
            ['unit_ps' => 'پرواز', 'unit_dr' => 'پرواز', 'unit_en' => 'FLIGHT'],
            ['unit_ps' => 'مسافر', 'unit_dr' => 'مسافر', 'unit_en' => 'PASSENGER'],

        ];

        foreach ($data as $row) {
            MeasurementUnit::create($row);
        }
    }
}
