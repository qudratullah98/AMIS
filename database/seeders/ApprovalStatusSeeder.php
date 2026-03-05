<?php
namespace Database\Seeders;

use App\Models\ApprovelStatus;
use Illuminate\Database\Seeder;

class ApprovalStatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $data = [

            [
                'id'      => 1,
                'name_ps' => 'فعال',
                'name_dr' => 'فعال',
                'name_en' => 'Active',
                'code'    => 'active',
            ],
            [
                'id'      => 2,
                'name_ps' => 'غیر فعال',
                'name_dr' => 'غیرفعال',
                'name_en' => 'Inactive',
                'code'    => 'inactive',
            ],

        ];

        foreach ($data as $row) {
            ApprovelStatus::create($row);
        }
    }
}
