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
        Schema::create('flyte_services', function (Blueprint $table) {
            $table->id();

            $table->foreignId('flyte_id')
                ->constrained('flytes')
                ->cascadeOnDelete();

            $table->foreignId('sgha_service_id')
                ->constrained('sgha_services')
                ->cascadeOnDelete();

            $table->integer('count');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('flyte_services');
    }
};
