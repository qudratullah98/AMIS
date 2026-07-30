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
        Schema::create('training_plans', function (Blueprint $table) {

            $table->id();


            // Training plan name
            $table->string('name');


            // Course assigned to this plan
            $table->foreignId('course_id')
                ->nullable()
                ->constrained()
                ->nullOnDelete();


            // Trainer who provides training
            $table->foreignId('trainer_id')
                ->nullable()
                ->constrained()
                ->nullOnDelete();


      

            // Training start date
            $table->date('start_date')
                ->nullable();


            // Training end date
            $table->date('end_date')
                ->nullable();


            // Training location
            $table->string('location')
                ->nullable();


            // Status
            $table->enum('status', [
                'planned',
                'in_progress',
                'completed',
                'cancelled'
            ])->default('planned');


            $table->text('description')
                ->nullable();


            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('training_plans');
    }
};
