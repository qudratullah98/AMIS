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
        Schema::create('position_required_certificates', function (Blueprint $table) {
            $table->id();
             $table->foreignIdfor(DepartmentPosition::class)->constrained()->cascadeOnDelete();



            $table->foreignId('certificate_id')
                ->constrained()
                ->cascadeOnDelete();



            $table->boolean('is_required')
                ->default(true);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('position_required_certificates');
    }
};
