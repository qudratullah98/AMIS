<?php
namespace Database\Seeders;

use App\Models\AircraftType;
use Illuminate\Database\Seeder;

class AircraftTypeSeeder extends Seeder
{
    public function run(): void
    {
        $data = [

            // ===== Airbus Narrow Body =====
            ['name' => 'Airbus A318', 'code' => 'A318'],
            ['name' => 'Airbus A319', 'code' => 'A319'],
            ['name' => 'Airbus A320', 'code' => 'A320'],
            ['name' => 'Airbus A320neo', 'code' => 'A20N'],
            ['name' => 'Airbus A321', 'code' => 'A321'],
            ['name' => 'Airbus A321neo', 'code' => 'A21N'],

            // ===== Airbus Wide Body =====
            ['name' => 'Airbus A300-600', 'code' => 'A306'],
            ['name' => 'Airbus A310-300', 'code' => 'A313'],
            ['name' => 'Airbus A330-200', 'code' => 'A332'],
            ['name' => 'Airbus A330-300', 'code' => 'A333'],
            ['name' => 'Airbus A340-300', 'code' => 'A343'],
            ['name' => 'Airbus A350-900', 'code' => 'A359'],

            // ===== Boeing Narrow Body =====
            ['name' => 'Boeing 737-300', 'code' => 'B733'],
            ['name' => 'Boeing 737-400', 'code' => 'B734'],
            ['name' => 'Boeing 737-500', 'code' => 'B735'],
            ['name' => 'Boeing 737-700', 'code' => 'B737'],
            ['name' => 'Boeing 737-800', 'code' => 'B738'],
            ['name' => 'Boeing 737-900', 'code' => 'B739'],
            ['name' => 'Boeing 737 MAX 8', 'code' => 'B38M'],

            // ===== Boeing Wide Body =====
            ['name' => 'Boeing 747-400', 'code' => 'B744'],
            ['name' => 'Boeing 747-8F', 'code' => 'B748'],
            ['name' => 'Boeing 757-200', 'code' => 'B752'],
            ['name' => 'Boeing 767-300', 'code' => 'B763'],
            ['name' => 'Boeing 777-200', 'code' => 'B772'],
            ['name' => 'Boeing 777-300ER', 'code' => 'B77W'],
            ['name' => 'Boeing 787-8', 'code' => 'B788'],
            ['name' => 'Boeing 787-9', 'code' => 'B789'],

            // ===== Regional Jets =====
            ['name' => 'ATR 42-500', 'code' => 'AT45'],
            ['name' => 'ATR 72-500', 'code' => 'AT75'],
            ['name' => 'ATR 72-600', 'code' => 'AT76'],
            ['name' => 'Embraer E170', 'code' => 'E170'],
            ['name' => 'Embraer E175', 'code' => 'E175'],
            ['name' => 'Embraer E190', 'code' => 'E190'],
            ['name' => 'Embraer E195', 'code' => 'E195'],
            ['name' => 'CRJ-200', 'code' => 'CRJ2'],
            ['name' => 'CRJ-700', 'code' => 'CRJ7'],
            ['name' => 'CRJ-900', 'code' => 'CRJ9'],

            // ===== Cargo Aircraft =====
            ['name' => 'Antonov An-12', 'code' => 'AN12'],
            ['name' => 'Antonov An-24', 'code' => 'AN24'],
            ['name' => 'Antonov An-26', 'code' => 'AN26'],
            ['name' => 'Antonov An-72', 'code' => 'AN72'],
            ['name' => 'Antonov An-124', 'code' => 'AN124'],
            ['name' => 'Ilyushin Il-76', 'code' => 'IL76'],
            ['name' => 'Lockheed C-130 Hercules', 'code' => 'C130'],

            // ===== Military / Special =====
            ['name' => 'C-17 Globemaster III', 'code' => 'C17'],
            ['name' => 'MiG-29', 'code' => 'MIG29'],
            ['name' => 'Su-25', 'code' => 'SU25'],

            // ===== Helicopters =====
            ['name' => 'Mi-8', 'code' => 'MI8'],
            ['name' => 'Mi-17', 'code' => 'MI17'],
            ['name' => 'Mi-24', 'code' => 'MI24'],
            ['name' => 'UH-60 Black Hawk', 'code' => 'UH60'],
            ['name' => 'Bell 212', 'code' => 'B212'],
            ['name' => 'Bell 412', 'code' => 'B412'],

            // ===== Business Jets =====
            ['name' => 'Gulfstream G450', 'code' => 'GLF4'],
            ['name' => 'Gulfstream G550', 'code' => 'GLF5'],
            ['name' => 'Bombardier Challenger 600', 'code' => 'CL60'],
            ['name' => 'Dassault Falcon 900', 'code' => 'FA90'],

            // ===== Additional Boeing Variants =====
            ['name' => 'Boeing 737-200', 'code' => 'B732'],
            ['name' => 'Boeing 737-600', 'code' => 'B736'],
            ['name' => 'Boeing 737 MAX 9', 'code' => 'B39M'],
            ['name' => 'Boeing 767-200', 'code' => 'B762'],
            ['name' => 'Boeing 777-8', 'code' => 'B778'],

// ===== Additional Airbus Variants =====
            ['name' => 'Airbus A321-200', 'code' => 'A3212'],
            ['name' => 'Airbus A330-900neo', 'code' => 'A339'],
            ['name' => 'Airbus A340-600', 'code' => 'A346'],

// ===== Regional / Turboprop (Very Realistic for Domestic) =====
            ['name' => 'Dash 8 Q200', 'code' => 'DH8B'],
            ['name' => 'Dash 8 Q300', 'code' => 'DH8C'],
            ['name' => 'Dash 8 Q400', 'code' => 'DH8D'],
            ['name' => 'Saab 340', 'code' => 'SB34'],
            ['name' => 'Fokker 50', 'code' => 'F50'],
            ['name' => 'Fokker 100', 'code' => 'F100'],
            ['name' => 'Yak-40', 'code' => 'YK40'],

// ===== Cargo / UN / Special Flights =====
            ['name' => 'Antonov An-28', 'code' => 'AN28'],
            ['name' => 'Antonov An-32', 'code' => 'AN32'],
            ['name' => 'Ilyushin Il-62', 'code' => 'IL62'],
            ['name' => 'Boeing 737-400F', 'code' => 'B734F'],
            ['name' => 'Boeing 757-200F', 'code' => 'B752F'],

// ===== Light Aircraft (Sometimes Seen in Regional Ops) =====
            ['name' => 'Cessna 208 Caravan', 'code' => 'C208'],
            ['name' => 'Pilatus PC-12', 'code' => 'PC12'],
            ['name' => 'Beechcraft 1900D', 'code' => 'B190'],

// ===== Additional Helicopters =====
            ['name' => 'Mi-35', 'code' => 'MI35'],
            ['name' => 'Eurocopter AS350', 'code' => 'AS50'],
            ['name' => 'Airbus H125', 'code' => 'H125'],

        ];

        foreach ($data as $row) {
            AircraftType::create($row);
        }
    }
}
