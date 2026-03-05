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
        Schema::create('construction_properties', function (Blueprint $table) {
            $table->id();

            $table->foreignId('construction_id')
                ->constrained('constructions')
                ->cascadeOnDelete();

            $table->string('property_name');
            $table->string('property_value');

            $table->foreignId('unit_id')
                ->nullable()
                ->constrained('measurement_units')
                ->nullOnDelete();


            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('construction_properties');
    }
};
