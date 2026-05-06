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
        Schema::create('sgha_service_rate', function (Blueprint $table) {
            $table->id();

             $table->foreignId('sgha_service_id')
                ->constrained('sgha_services')
                ->cascadeOnDelete();


            $table->foreignId('sgha_service_unit_id')
                ->constrained('sgha_service_units')
                ->cascadeOnDelete();

            $table->foreignId('airline_id')
                ->constrained('airlines')
                ->cascadeOnDelete();

            $table->decimal('complation_rate', 6, 2);

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
        Schema::dropIfExists('sgha_service_rate');
    }
};
