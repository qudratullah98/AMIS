<?php

use App\Models\ApprovelStatus;
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
        Schema::create('employee_education', function (Blueprint $table) {
            $table->id();

            $table->foreignId('employee_id')
                ->constrained()
                ->cascadeOnDelete();


            $table->foreignId('education_level_id')
                ->constrained()
                ->cascadeOnDelete();


            $table->string('field_of_study');

            $table->string('institution_name');

            $table->year('graduation_year')->nullable();

            $table->decimal('gpa', 5, 2)->nullable();
            $table->string('document_file')->nullable();
            $table->foreignIdFor(ApprovelStatus::class)->default(2)->constrained()->cascadeOnDelete();


            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employee_education');
    }
};
