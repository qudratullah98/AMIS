<?php

use App\Models\route;
use App\Models\User;
use App\Models\VehicleType;
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
        Schema::create('fares', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(route::class);
            $table->foreignIdFor(VehicleType::class,'vehicle_type_id');
            $table->integer('max_fare');
            $table->integer('min_fare');
            $table->date('bel_start_date');
            $table->date('bel_end_date')->nullable();
            $table->enum('status', ['approved','notapproved','disabled'])->default('notapproved');
            $table->foreignIdFor(User::class);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('fares');
    }
};
