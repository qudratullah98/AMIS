<?php

namespace Database\Seeders;

use App\Models\PositionType;
use Illuminate\Database\Seeder;

class PositionTypeSeeder extends Seeder
{
    public function run(): void
    {
        $positionTypes = [
            
                [
                    'title' => 'ملکی',
                    'grade' => 1,
                    'code' => 'CIV',
                ],
                [
                    'title' => 'نظامی',
                    'grade' => 2,
                    'code' => 'MIL',
                ],
                [
                    'title' => 'قراردادی',
                    'grade' => 3,
                    'code' => 'CTR',
                ],
                [
                    'title' => 'اجیر',
                    'grade' => 4,
                    'code' => 'HIR',
                ],
                [
                    'title' => 'موقت',
                    'grade' => 5,
                    'code' => 'TMP',
                ],
                [
                    'title' => 'مشاور',
                    'grade' => 6,
                    'code' => 'CON',
                ],
                [
                    'title' => 'متقاعد',
                    'grade' => 7,
                    'code' => 'RET',
                ],
                [
                    'title' => 'کارآموز',
                    'grade' => 8,
                    'code' => 'INT',
                ],
                [
                    'title' => 'خدماتی',
                    'grade' => 9,
                    'code' => 'SRV',
                ],
                [
                    'title' => 'روز مزد',
                    'grade' => 10,
                    'code' => 'DLY',
                ],
            
        ];

        foreach ($positionTypes as $positionType) {
            PositionType::updateOrCreate(
                ['code' => $positionType['code']],
                $positionType
            );
        }
    }
}
