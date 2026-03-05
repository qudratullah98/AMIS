<?php

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
        Schema::create('flytes', function (Blueprint $table) {
            $table->id();

            $table->foreignId('airport_id')
                ->constrained('airports')
                ->cascadeOnDelete();

            $table->string('flyte_number')->unique();
            $table->enum('pmt_methode', ['CREDIT']);
            $table->enum('flt', ['FAX']);
            $table->string('work_order');
            $table->string('charge_note');

            $table->foreignId('airline_id')
                ->constrained('airlines')
                ->cascadeOnDelete();

            $table->foreignId('aircraft_type_id')
                ->constrained('aircraft_types')
                ->cascadeOnDelete();

            $table->string('aircraft_registration');
            $table->date('arrival_date');
            $table->time('approximate_time_arrival');
            $table->date('departure_date');
            $table->time('approximate_time_departure');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('flytes');
    }
};
