<?php
namespace Database\Seeders;

use App\Models\Province;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProvincesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $data = [
            ["province" => "کابل", "code" => "90",  "provincial_bank_account"=>"333",  "provincial_income_percentage"=>"3"],
            ["province" => "کاپیسا", "code" => "",  "provincial_bank_account"=>"140",  "provincial_income_percentage"=>"8"],
            ["province" => "پروان", "code" => "",  "provincial_bank_account"=>"293",  "provincial_income_percentage"=>"8"],
            ["province" => "وردگ", "code" => "",  "provincial_bank_account"=>"187",  "provincial_income_percentage"=>"8"],
            ["province" => "لوگر", "code" => "",  "provincial_bank_account"=>"176",  "provincial_income_percentage"=>"8"],
            ["province" => "ننگرهار", "code" => "",  "provincial_bank_account"=>"280",  "provincial_income_percentage"=>"8"],
            ["province" => "لغمان", "code" => "",  "provincial_bank_account"=>"160",  "provincial_income_percentage"=>"8"],
            ["province" => "پنجشیر", "code" => "",  "provincial_bank_account"=>"271",  "provincial_income_percentage"=>"8"],
            ["province" => "بغلان", "code" => "",  "provincial_bank_account"=>"274",  "provincial_income_percentage"=>"8"],
            ["province" => "بامیان", "code" => "",  "provincial_bank_account"=>"257",  "provincial_income_percentage"=>"8"],
            ["province" => "غزنی", "code" => "",  "provincial_bank_account"=>"122",  "provincial_income_percentage"=>"8"],
            ["province" => "پکتیکا", "code" => "",  "provincial_bank_account"=>"270",  "provincial_income_percentage"=>"8"],
            ["province" => "پکتیا", "code" => "",  "provincial_bank_account"=>"152",  "provincial_income_percentage"=>"8"],
            ["province" => "خوست", "code" => "",  "provincial_bank_account"=>"101",  "provincial_income_percentage"=>"8"],
            ["province" => "کنرها", "code" => "",  "provincial_bank_account"=>"244",  "provincial_income_percentage"=>"8"],
            ["province" => "نورستان", "code" => "",  "provincial_bank_account"=>"225",  "provincial_income_percentage"=>"8"],
            ["province" => "بدخشان", "code" => "",  "provincial_bank_account"=>"120",  "provincial_income_percentage"=>"8"],
            ["province" => "تخار", "code" => "",  "provincial_bank_account"=>"287",  "provincial_income_percentage"=>"8"],
            ["province" => "کندز", "code" => "1901",  "provincial_bank_account"=>"155",  "provincial_income_percentage"=>"8"],
            ["province" => "سمنگان", "code" => "",  "provincial_bank_account"=>"114",  "provincial_income_percentage"=>"8"],
            ["province" => "بلخ", "code" => "2101",  "provincial_bank_account"=>"177",  "provincial_income_percentage"=>"8"],
            ["province" => "سرپل", "code" => "",  "provincial_bank_account"=>"109",  "provincial_income_percentage"=>"8"],
            ["province" => "غور", "code" => "",  "provincial_bank_account"=>"306",  "provincial_income_percentage"=>"8"],
            ["province" => "دایکندی", "code" => "",  "provincial_bank_account"=>"221",  "provincial_income_percentage"=>"8"],
            ["province" => "ارزگان", "code" => "",  "provincial_bank_account"=>"142",  "provincial_income_percentage"=>"8"],
            ["province" => "زابل", "code" => "",  "provincial_bank_account"=>"134",  "provincial_income_percentage"=>"8"],
            ["province" => "کندهار", "code" => "2701",  "provincial_bank_account"=>"141",  "provincial_income_percentage"=>"8"],
            ["province" => "جوزجان", "code" => "",  "provincial_bank_account"=>"114",  "provincial_income_percentage"=>"8"],
            ["province" => "فاریاب", "code" => "2901",  "provincial_bank_account"=>"190",  "provincial_income_percentage"=>"8"],
            ["province" => "هلمند", "code" => "3001",  "provincial_bank_account"=>"991",  "provincial_income_percentage"=>"8"],
            ["province" => "بادغیس", "code" => "",  "provincial_bank_account"=>"132",  "provincial_income_percentage"=>"8"],
            ["province" => "هرات", "code" => "3201",  "provincial_bank_account"=>"200",  "provincial_income_percentage"=>"8"],
            ["province" => "فراه", "code" => "3301",  "provincial_bank_account"=>"122",  "provincial_income_percentage"=>"8"],
            ["province" => "نیمروز", "code" => "3401",  "provincial_bank_account"=>"187",  "provincial_income_percentage"=>"8"],
        ];

        foreach ($data as $key => $value) {
            Province::create($value);
        }
    }
}
