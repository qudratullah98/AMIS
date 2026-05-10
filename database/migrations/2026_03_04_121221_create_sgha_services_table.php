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
            $table->foreignId('sgha_service_unit_id')->constrained('sgha_service_units')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sgha_services');
    }
};
