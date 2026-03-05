<?php
namespace Database\Seeders;

use App\Models\Construction;
use Illuminate\Database\Seeder;

class ConstructionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [

            [
                'name_ps' => 'رنوی (د الوتکې ځغاستلاره)',
                'name_dr' => 'باند پرواز (رنوی)',
                'name_en' => 'Runway',
                'code'    => 'RWY',
            ],

            [
                'name_ps' => 'ټکسي لاره',
                'name_dr' => 'راه تاکسی',
                'name_en' => 'Taxiway',
                'code'    => 'TWY',
            ],

            [
                'name_ps' => 'اپرون (د الوتکو تم ځای)',
                'name_dr' => 'اپرون (محل توقف طیاره‌ها)',
                'name_en' => 'Apron',
                'code'    => 'APR',
            ],

            [
                'name_ps' => 'ترمینل ودانۍ',
                'name_dr' => 'ساختمان ترمینل',
                'name_en' => 'Terminal Building',
                'code'    => 'TER',
            ],

            [
                'name_ps' => 'کنټرول برج',
                'name_dr' => 'برج کنترول',
                'name_en' => 'Control Tower',
                'code'    => 'TWR',
            ],

            [
                'name_ps' => 'هنګر (د الوتکو ګدام)',
                'name_dr' => 'هنگر طیاره',
                'name_en' => 'Hangar',
                'code'    => 'HGR',
            ],

            [
                'name_ps' => 'اور وژنې سټېشن',
                'name_dr' => 'ایستگاه اطفائیه',
                'name_en' => 'Fire Station',
                'code'    => 'FIR',
            ],

            [
                'name_ps' => 'د سون توکو زېرمه',
                'name_dr' => 'ذخیره تیل',
                'name_en' => 'Fuel Storage Facility',
                'code'    => 'FUE',
            ],

            [
                'name_ps' => 'کارګو ترمینل',
                'name_dr' => 'ترمینل کارگو',
                'name_en' => 'Cargo Terminal',
                'code'    => 'CRG',
            ],

            [
                'name_ps' => 'ساتنې کټاره',
                'name_dr' => 'حصار امنیتی',
                'name_en' => 'Perimeter Fence',
                'code'    => 'FEN',
            ],

        ];

        foreach ($data as $row) {
            Construction::create($row);
        }
    }
}
