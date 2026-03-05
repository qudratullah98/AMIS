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
        Schema::create('equipments', function (Blueprint $table) {
            $table->id();

            $table->foreignId('equipment_type_id')
                ->constrained('equipment_types')
                ->cascadeOnDelete();

            $table->foreignId('airport_id')
                ->constrained('airports')
                ->cascadeOnDelete();

            $table->foreignId('approval_status_id')
                ->nullable()
                ->constrained('approval_statuses')
                ->nullOnDelete();

            $table->foreignId('activity_status_id')
                ->nullable()
                ->constrained('activity_statuses')
                ->nullOnDelete();

            $table->foreignId('general_department_id')
                ->nullable()
                ->constrained('general_departments')
                ->nullOnDelete();

            $table->string('EOM')->comment('Engine or Equipment Manufacturer');
            $table->string('YOM')->comment('Year of Manufacture');
            $table->string('model');
            $table->string('serial_number');
            $table->string('chasses_number');
            $table->string('engine_number');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('equipment');
    }
};
