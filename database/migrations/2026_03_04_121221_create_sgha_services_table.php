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
        Schema::create('sgha_services', function (Blueprint $table) {
            $table->id();
            $table->string('name_en')->unique();
            $table->string('name_ps')->nullable();
            $table->string('name_dr')->nullable();

            $table->foreignId('sgha_service_unit_id')
                ->constrained('sgha_service_units')
                ->cascadeOnDelete();

            $table->foreignId('airline_id')
                ->constrained('airlines')
                ->cascadeOnDelete();

            $table->decimal('complation_rate',6,2);

            $table->foreignId('approval_status_id')
                ->nullable()
                ->constrained('approval_statuses')
                ->nullOnDelete();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('s_g_h_a__services');
    }
};
