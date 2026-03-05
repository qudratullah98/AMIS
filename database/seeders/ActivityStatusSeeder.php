<?php
namespace Database\Seeders;

use App\Models\ActivityStatus;
use Illuminate\Database\Seeder;

class ActivityStatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [

            [
                'id'        => 1,
                'status_ps' => 'د اجرا په حال کې',
                'status_dr' => 'در حال اجرا',
                'status_en' => 'Pending',
                'code'      => 'PEN',
            ],
            [
                'id'        => 2,
                'status_ps' => 'رد شوی',
                'status_dr' => 'مسترد شده',
                'status_en' => 'Denied',
                'code'      => 'DEN',
            ],
            [
                'id'        => 3,
                'status_ps' => 'تایید شوی',
                'status_dr' => 'تائید شده',
                'status_en' => 'Approved',
                'code'      => 'APR',
            ],

        ];

        foreach ($data as $row) {
            ActivityStatus::create($row);
        }
    }
}
