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
        $provinces = [
            ["id" => 1, "province" => "کابل", "province_en" => "Kabul"],
            ["id" => 2, "province" => "کاپیسا", "province_en" => "Kapisa"],
            ["id" => 3, "province" => "پروان", "province_en" => "Parwan"],
            ["id" => 4, "province" => "وردگ", "province_en" => "Wardak"],
            ["id" => 5, "province" => "لوگر", "province_en" => "Logar"],
            ["id" => 6, "province" => "ننگرهار", "province_en" => "Nangarhar"],
            ["id" => 7, "province" => "لغمان", "province_en" => "Laghman"],
            ["id" => 8, "province" => "پنجشیر", "province_en" => "Panjshir"],
            ["id" => 9, "province" => "بغلان", "province_en" => "Baghlan"],
            ["id" => 10, "province" => "بامیان", "province_en" => "Bamyan"],
            ["id" => 11, "province" => "غزنی", "province_en" => "Ghazni"],
            ["id" => 12, "province" => "پکتیکا", "province_en" => "Paktika"],
            ["id" => 13, "province" => "پکتیا", "province_en" => "Paktia"],
            ["id" => 14, "province" => "خوست", "province_en" => "Khost"],
            ["id" => 15, "province" => "کنرها", "province_en" => "Kunar"],
            ["id" => 16, "province" => "نورستان", "province_en" => "Nuristan"],
            ["id" => 17, "province" => "بدخشان", "province_en" => "Badakhshan"],
            ["id" => 18, "province" => "تخار", "province_en" => "Takhar"],
            ["id" => 19, "province" => "کندز", "province_en" => "Kunduz"],
            ["id" => 20, "province" => "سمنگان", "province_en" => "Samangan"],
            ["id" => 21, "province" => "بلخ", "province_en" => "Balkh"],
            ["id" => 22, "province" => "سرپل", "province_en" => "Sar-e Pol"],
            ["id" => 23, "province" => "غور", "province_en" => "Ghor"],
            ["id" => 24, "province" => "دایکندی", "province_en" => "Daykundi"],
            ["id" => 25, "province" => "ارزگان", "province_en" => "Uruzgan"],
            ["id" => 26, "province" => "زابل", "province_en" => "Zabul"],
            ["id" => 27, "province" => "کندهار", "province_en" => "Kandahar"],
            ["id" => 28, "province" => "جوزجان", "province_en" => "Jawzjan"],
            ["id" => 29, "province" => "فاریاب", "province_en" => "Faryab"],
            ["id" => 30, "province" => "هلمند", "province_en" => "Helmand"],
            ["id" => 31, "province" => "بادغیس", "province_en" => "Badghis"],
            ["id" => 32, "province" => "هرات", "province_en" => "Herat"],
            ["id" => 33, "province" => "فراه", "province_en" => "Farah"],
            ["id" => 34, "province" => "نیمروز", "province_en" => "Nimruz"],
        ];

        foreach ($provinces as $key => $value) {
            Province::create($value);
        }
    }
}
