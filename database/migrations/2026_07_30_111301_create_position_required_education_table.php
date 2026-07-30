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
        Schema::create('position_required_education', function (Blueprint $table) {
            $table->id();
            $table->foreignId('department_position_id')
                ->constrained()
                ->cascadeOnDelete();


            $table->foreignId('education_level_id')
                ->constrained()
                ->cascadeOnDelete();



            $table->boolean('is_required')
                ->default(true);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('position_required_education');
    }
};
