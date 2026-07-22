<?php

use App\Models\ApprovelStatus;
use App\Models\User;
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
        Schema::create('flight_services', function (Blueprint $table) {
            $table->id();

            $table->foreignId('flight_id')
                ->constrained('flights')
                ->cascadeOnDelete();

            $table->foreignId('sgha_service_id')
                ->constrained('sgha_services')
                ->cascadeOnDelete();

            $table->integer('count');
            $table->foreignIdFor(User::class,'created_by')->nullable()->constrained('users')->nullOnDelete();
            $table->foreignIdFor(User::class,'updated_by')->nullable()->constrained('users')->nullOnDelete();
            $table->foreignIdFor(ApprovelStatus::class,'approval_status')->default(2)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('flight_services');
    }
};
