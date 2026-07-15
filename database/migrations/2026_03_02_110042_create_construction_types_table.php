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
        Schema::create('construction_types', function (Blueprint $table) {
            $table->id();
            $table->string('type_ps');
            $table->string('type_dr');
            $table->string('type_en');
            $table->foreignIdFor(ApprovelStatus::class,'approval_status_id')->default(2);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('construction_types');
    }
};
