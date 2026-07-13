<?php

use App\Models\ApprovelStatus;
use App\Models\Employee;
use App\Models\PositionVacancy;
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
        Schema::create('employee_assignments', function (Blueprint $table) {
            $table->id();

            $table->foreignIdFor(Employee::class, 'employee_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->foreignIdFor(PositionVacancy::class, 'vacancy_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->date('start_date');

            $table->date('end_date')->nullable();

             $table->foreignIdFor(ApprovelStatus::class, 'approval_status_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->text('remarks')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employee_assignments');
    }
};
