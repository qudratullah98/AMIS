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
        Schema::create('courses', function (Blueprint $table) {

            $table->id();


            // Mandatory / Optional
            $table->foreignId('course_type_id')
                ->constrained()
                ->cascadeOnDelete();


            // Course name
            $table->string('name');


            // Course description
            $table->text('description')
                ->nullable();


            // Course validity period (months)
            // Example: SMS valid for 24 months
            $table->integer('validity_months')
                ->nullable();


            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('courses');
    }
};
