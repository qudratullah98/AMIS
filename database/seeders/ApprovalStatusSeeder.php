<?php

namespace Database\Seeders;

use App\Models\ApprovelStatus;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ApprovalStatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
       $data = [
            ['id' => 1, 'status_fa' => 'در حال اجرا', 'status_en' => 'Pending', 'code' => 'PEN'],
            ['id' => 2, 'status_fa' => 'مسترد شده', 'status_en' => 'Denied', 'code' => 'DEN'],
            ['id' => 3, 'status_fa' => 'تائید شده', 'status_en' => 'Approved', 'code' => 'APR'],
        ];

        foreach ($data as $row) {
            ApprovelStatus::create($row);
        }
    }
}
