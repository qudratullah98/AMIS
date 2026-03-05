<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Airport;
use App\Models\Province;
use App\Models\District;
use App\Models\MeasurementUnit;

class AirportsSeeder extends Seeder
{
    public function run(): void
    {
        // Get units for AMSL and Area
        $meterUnit = MeasurementUnit::where('unit_en', 'M')->first();
        $sqmUnit  = MeasurementUnit::where('unit_en', 'M²')->first();

        // Example provinces and districts (make sure these exist)
        $kabulProvince   = Province::where('province_en', 'Kabul')->first();
        $heratProvince   = Province::where('province_en', 'Herat')->first();
        $kandaharProvince= Province::where('province_en', 'Kandahar')->first();

        // Example districts
        $kabulDistrict    = District::where('name_en', '(Capital) Kabul')->first();
        $heratDistrict    = District::where('name_en', '(Capital) Herat')->first();
        $kandaharDistrict = District::where('name_en', '(Capital) KANDAHAR')->first();

        // Seed Airports
        $airports = [
            [
                'name_ps' => 'د کابل نړیوال هوایې ډګر',
                'name_dr' => 'میدان هوایی بین‌المللی کابل',
                'name_en' => 'Hamid Karzai International Airport',
                'IATA_code' => 'KBL',
                'ICAO_code' => 'OAKB',
                'type' => 'international',
                'status_id' => 1,
                'province_id' => $kabulProvince->id,
                'district_id' => $kabulDistrict->id,
                'latitude' => 34.5658,
                'longitude' => 69.2120,
                'amsl' => 1791,
                'amsl_unit_id' => $meterUnit->id,
                'area' => 3000000,
                'area_unit_id' => $sqmUnit->id,
                'description' => 'Main international airport of Afghanistan.',
            ],
            [
                'name_ps' => 'د هرات هوایي ډګر',
                'name_dr' => 'میدان هوایی هرات',
                'name_en' => 'Herat International Airport',
                'IATA_code' => 'HEA',
                'ICAO_code' => 'OAHR',
                'type' => 'international',
                'status_id' => 1,
                'province_id' => $heratProvince->id,
                'district_id' => $heratDistrict->id,
                'latitude' => 34.2105,
                'longitude' => 62.2288,
                'amsl' => 940,
                'amsl_unit_id' => $meterUnit->id,
                'area' => 500000,
                'area_unit_id' => $sqmUnit->id,
                'description' => 'International airport serving western Afghanistan.',
            ],
            [
                'name_ps'=>'د کندهار هوایي ډګر',
                'name_dr' => 'میدان هوایی کندهار',
                'name_en' => 'Kandahar International Airport',
                'IATA_code' => 'KDH',
                'ICAO_code' => 'OAKN',
                'type' => 'international',
                'status_id' => 1,
                'province_id' => $kandaharProvince->id,
                'district_id' => $kandaharDistrict->id,
                'latitude' => 31.5050,
                'longitude' => 65.8472,
                'amsl' => 1010,
                'amsl_unit_id' => $meterUnit->id,
                'area' => 1200000,
                'area_unit_id' => $sqmUnit->id,
                'description' => 'Main airport in southern Afghanistan.',
            ],
        ];

        foreach ($airports as $airport) {
            Airport::create($airport);
        }
    }
}
