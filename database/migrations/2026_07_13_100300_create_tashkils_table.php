<?php

use App\Models\Airport;
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
        Schema::create('tashkils', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Airport::class, "organization_id")->constrained()->cascadeOnDelete();
            $table->year('year');
            $table->string('name');
            $table->foreignIdFor(ApprovelStatus::class)->constrained()->cascadeOnDelete();
            $table->string('reference_number')->unique();
            $table->text('description')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tashkils');
    }
};
