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
                'name_ps' => 'منل شوی',
                'name_dr' => 'تائید شده',
                'name_en' => 'Approved',
                'code'    => 'approved',
            ],
            [
                'id'      => 2,
                'name_ps' => 'نده منل شوی',
                'name_dr' => 'تائید نشده',
                'name_en' => 'Not Approved',
                'code'    => 'notApproved',
            ],

        ];

        foreach ($data as $row) {
            ApprovelStatus::create($row);
        }
    }
}
