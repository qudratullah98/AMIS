<?php
namespace Database\Seeders;

use App\Models\Province;
use Illuminate\Database\Seeder;

class ProvincesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $data = [
            ["province" => "کابل", "province_en" => "Kabul"],
            ["province" => "کاپیسا", "province_en" => "Kapisa"],
            ["province" => "پروان", "province_en" => "Parwan"],
            ["province" => "وردگ", "province_en" => "Wardak"],
            ["province" => "لوگر", "province_en" => "Logar"],
            ["province" => "ننگرهار", "province_en" => "Nangarhar"],
            ["province" => "لغمان", "province_en" => "Laghman"],
            ["province" => "پنجشیر", "province_en" => "Panjshir"],
            ["province" => "بغلان", "province_en" => "Baghlan"],
            ["province" => "بامیان", "province_en" => "Bamyan"],
            ["province" => "غزنی", "province_en" => "Ghazni"],
            ["province" => "پکتیکا", "province_en" => "Paktika"],
            ["province" => "پکتیا", "province_en" => "Paktia"],
            ["province" => "خوست", "province_en" => "Khost"],
            ["province" => "کنرها", "province_en" => "Kunar"],
            ["province" => "نورستان", "province_en" => "Nuristan"],
            ["province" => "بدخشان", "province_en" => "Badakhshan"],
            ["province" => "تخار", "province_en" => "Takhar"],
            ["province" => "کندز", "province_en" => "Kunduz"],
            ["province" => "سمنگان", "province_en" => "Samangan"],
            ["province" => "بلخ", "province_en" => "Balkh"],
            ["province" => "سرپل", "province_en" => "Sar-e Pol"],
            ["province" => "غور", "province_en" => "Ghor"],
            ["province" => "دایکندی", "province_en" => "Daykundi"],
            ["province" => "ارزگان", "province_en" => "Uruzgan"],
            ["province" => "زابل", "province_en" => "Zabul"],
            ["province" => "کندهار", "province_en" => "Kandahar"],
            ["province" => "جوزجان", "province_en" => "Jawzjan"],
            ["province" => "فاریاب", "province_en" => "Faryab"],
            ["province" => "هلمند", "province_en" => "Helmand"],
            ["province" => "بادغیس", "province_en" => "Badghis"],
            ["province" => "هرات", "province_en" => "Herat"],
            ["province" => "فراه", "province_en" => "Farah"],
            ["province" => "نیمروز", "province_en" => "Nimruz"],
        ];

        foreach ($data as $key => $value) {
            Province::create($value);
        }
    }
}
