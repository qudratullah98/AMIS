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
        Schema::create('position_vacancies', function (Blueprint $table) {
            $table->id();

            $table->foreignIdFor(DepartmentPosition::class)
                ->constrained()
                ->cascadeOnDelete();
            $table->string('vacancy_no');
            $table->enum('status', [
                'Vacant',
                'Reserved',
                'Occupied',
                'Frozen',
                'Deleted'
            ])->default('Vacant');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.  
     */
    public function down(): void
    {
        Schema::dropIfExists('position_vacancies');
    }
};
