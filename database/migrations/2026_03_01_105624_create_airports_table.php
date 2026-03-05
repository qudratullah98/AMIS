<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('airports', function (Blueprint $table) {
            $table->id();
            $table->string('name_ps');
            $table->string('name_dr');
            $table->string('name_en')->nullable();
            $table->string('IATA_code', 3)->nullable()->unique();
            $table->string('ICAO_code', 4)->nullable()->unique();
            $table->enum('type', [
                'international',
                'domestic',
                'military',
                'cargo',
                'regional',
                'private',
            ])->default('domestic');

            // Approval status
            $table->foreignId('status_id')->nullable()->constrained('approval_statuses')->nullOnDelete();

            // Foreign key to provinces table
            $table->foreignId('province_id')
                ->constrained()      // automatically references provinces.id
                ->cascadeOnDelete(); // optional: deletes airport if province deleted

            // Foreign key to districts table
            $table->foreignId('district_id')
                ->constrained()      // automatically references district.id
                ->cascadeOnDelete(); // optional: deletes airport if district deleted

            $table->decimal('latitude', 10, 7)->nullable();
            $table->decimal('longitude', 10, 7)->nullable();

            $table->decimal('amsl', 8, 2)->nullable();
            // Foreign key to units table
            $table->foreignId('amsl_unit_id')->nullable()->constrained('measurement_units')->nullOnDelete();

            $table->decimal('area', 10, 2);
            // Foreign key to units table
            $table->foreignId('area_unit_id')->nullable()->constrained('measurement_units')->nullOnDelete();

            $table->text('description')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('airports');
    }
};
