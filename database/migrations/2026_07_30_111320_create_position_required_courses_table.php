<?php

use App\Models\DepartmentPosition;
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
        Schema::create('position_required_courses', function (Blueprint $table) {
            $table->id();

            // Position that requires the course
            $table->foreignIdfor(DepartmentPosition::class)->constrained()->cascadeOnDelete();


            // Required course
            $table->foreignId('course_id')
                ->constrained()
                ->cascadeOnDelete();


            // Mandatory or Optional requirement
            $table->enum('requirement_type', [
                'mandatory',
                'optional'
            ])->default('mandatory');


        

            // Notes
            $table->text('description')
                ->nullable();


            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('position_required_courses');
    }
};
