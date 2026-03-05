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
        Schema::create('airport_constructions', function (Blueprint $table) {
            $table->id();

            $table->foreignId('airport_id')
                ->constrained('airports')
                ->cascadeOnDelete();

            $table->foreignId('construction_id')
                ->constrained('constructions')
                ->cascadeOnDelete();

            $table->foreignId('construction_type_id')
                ->constrained('construction_types')
                ->cascadeOnDelete();

            $table->decimal('width', 6, 2)->nullable();

            $table->foreignId('width_unit_id')
                ->nullable()
                ->constrained('measurement_units')
                ->nullOnDelete();

            $table->decimal('length', 6, 2)->nullable();

            $table->foreignId('length_unit_id')
                ->nullable()
                ->constrained('measurement_units')
                ->nullOnDelete();

            $table->foreignId('approval_status_id')
                ->nullable()
                ->constrained('approval_statuses')
                ->nullOnDelete();

            $table->foreignId('activity_status_id')
                ->nullable()
                ->constrained('activity_statuses')
                ->nullOnDelete();

            $table->decimal('latitude', 10, 7)->nullable();
            $table->decimal('longitude', 10, 7)->nullable();

            $table->text('weaknesses')->nullable();
            $table->text('requirements')->nullable();
            $table->string('image')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('airport_constructions');
    }
};
