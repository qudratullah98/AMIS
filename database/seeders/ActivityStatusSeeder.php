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

            // Activity statuses
            [
                'id'        => 4,
                'status_ps' => 'فعال',
                'status_dr' => 'فعال',
                'status_en' => 'Active',
                'code'      => 'ACT',
            ],
            [
                'id'        => 5,
                'status_ps' => 'غیرفعال',
                'status_dr' => 'غیرفعال',
                'status_en' => 'Inactive',
                'code'      => 'INA',
            ],
            [
                'id'        => 6,
                'status_ps' => 'د جوړېدو په حال کې',
                'status_dr' => 'در حال ساخت',
                'status_en' => 'Under Construction',
                'code'      => 'UCN',
            ],
            [
                'id'        => 7,
                'status_ps' => 'د ترمیم لاندې',
                'status_dr' => 'تحت ترمیم',
                'status_en' => 'Under Maintenance',
                'code'      => 'UMT',
            ],
            [
                'id'        => 8,
                'status_ps' => 'په موقتي ډول تړل شوی',
                'status_dr' => 'موقتاً بسته',
                'status_en' => 'Temporarily Closed',
                'code'      => 'TMP',
            ],
            [
                'id'        => 9,
                'status_ps' => 'دایمي تړل شوی',
                'status_dr' => 'دایماً بسته',
                'status_en' => 'Permanently Closed',
                'code'      => 'CLS',
            ],
            [
                'id'        => 10,
                'status_ps' => 'د کارونې وړ نه دی',
                'status_dr' => 'غیر قابل استفاده',
                'status_en' => 'Out of Service',
                'code'      => 'OOS',
            ],

        ];

        foreach ($data as $row) {
            ActivityStatus::create($row);
        }
    }
}
