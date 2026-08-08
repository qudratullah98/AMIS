<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\ConstructionType;
class ConstructionTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [

            [
                'type_ps' => 'اسفالتي',
                'type_dr' => 'اسفالتی',
                'type_en' => 'Asphalt',
                'approval_status_id'=>1
            ],
            [
                'type_ps' => 'کانکریټي',
                'type_dr' => 'کانکریتی',
                'type_en' => 'Concrete',
                'approval_status_id'=>1
            ],
            [
                'type_ps' => 'جغل',
                'type_dr' => 'ریگ',
                'type_en' => 'Gravel',
                'approval_status_id'=>1
            ],
            [
                'type_ps' => 'خاورین',
                'type_dr' => 'خاکی',
                'type_en' => 'Dirt / Earth',
                'approval_status_id'=>1
            ],
            [
                'type_ps' => 'شګلنه',
                'type_dr' => 'شنی',
                'type_en' => 'Sand',
                'approval_status_id'=>1
            ],
            [
                'type_ps' => 'واښه لرونکی',
                'type_dr' => 'چمنی',
                'type_en' => 'Grass',
                'approval_status_id'=>1
            ],
            [
                'type_ps' => 'خټه',
                'type_dr' => 'گل',
                'type_en' => 'Clay',
                'approval_status_id'=>1
            ],
            [
                'type_ps' => 'بټومیني سطحه',
                'type_dr' => 'سطح قیری',
                'type_en' => 'Bituminous Surface',
                'approval_status_id'=>1
            ],
            [
                'type_ps' => 'ترکیبي (اسفالت + کانکریټ)',
                'type_dr' => 'ترکیبی (اسفالت + کانکریت)',
                'type_en' => 'Composite (Asphalt + Concrete)',
                'approval_status_id'=>1
            ],

            // Building structures
            [
                'type_ps' => 'فلزي جوړښت',
                'type_dr' => 'ساختمان فلزی',
                'type_en' => 'Steel Structure',
                'approval_status_id'=>1
            ],
            [
                'type_ps' => 'مسلح کانکریټ',
                'type_dr' => 'کانکریت مسلح',
                'type_en' => 'Reinforced Concrete',
                'approval_status_id'=>1
            ],
            [
                'type_ps' => 'خښتې',
                'type_dr' => 'خشت',
                'type_en' => 'Brick Masonry',
                'approval_status_id'=>1
            ],
            [
                'type_ps' => 'ډبرین جوړښت',
                'type_dr' => 'سنگی',
                'type_en' => 'Stone Masonry',
                'approval_status_id'=>1
            ],
            [
                'type_ps' => 'لرګی جوړښت',
                'type_dr' => 'چوبی',
                'type_en' => 'Wooden Structure',
                'approval_status_id'=>1
            ],
            [
                'type_ps' => 'مخکې جوړ شوی',
                'type_dr' => 'پیش‌ساخته',
                'type_en' => 'Prefabricated Structure',
                'approval_status_id'=>1
            ],

        ];

        foreach ($data as $row) {
            ConstructionType::create($row);
        }
    }
}
