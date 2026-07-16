<?php

use App\Models\ApprovelStatus;
use App\Models\Organization;
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
            $table->foreignIdFor(Organization::class, "organization_id")->constrained()->cascadeOnDelete();
            $table->year('year'); 
            $table->foreignIdFor(ApprovelStatus::class)->default(2)->constrained()->cascadeOnDelete();
            $table->string('reference_number')->unique();
            $table->unique(['organization_id', 'year']);
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
