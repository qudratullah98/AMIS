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
                'title' => 'Director',
                'grade' => 1,
                'code' => 'DIR',
            ],
            [
                'title' => 'Manager',
                'grade' => 2,
                'code' => 'MGR',
            ],
            [
                'title' => 'Engineer',
                'grade' => 3,
                'code' => 'ENG',
            ],
            [
                'title' => 'Officer',
                'grade' => 4,
                'code' => 'OFC',
            ],
            [
                'title' => 'Assistant',
                'grade' => 5,
                'code' => 'AST',
            ],
            [
                'title' => 'Worker',
                'grade' => 6,
                'code' => 'WRK',
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