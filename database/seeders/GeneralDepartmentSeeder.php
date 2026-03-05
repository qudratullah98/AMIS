<?php
namespace Database\Seeders;

use App\Models\GeneralDepartment;
use Illuminate\Database\Seeder;

class GeneralDepartmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [

            [
                'name_ps' => 'د ساتنې او مراقبت آمریت',
                'name_dr' => 'آمریت حفظ و مراقبت',
                'name_en' => 'Maintenance and Protection Directorate',
            ],
            [
                'name_ps' => 'انجنيري آمریت',
                'name_dr' => 'آمریت انجنیری',
                'name_en' => 'Engineering Directorate',
            ],
            [
                'name_ps' => 'د مصؤنیت آمریت',
                'name_dr' => 'آمریت مصونیت',
                'name_en' => 'Safety Directorate',
            ],

        ];

        foreach ($data as $row) {
            GeneralDepartment::create($row);
        }
    }
}
