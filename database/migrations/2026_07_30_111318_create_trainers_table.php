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
        Schema::create('trainers', function (Blueprint $table) {

            $table->id();

            $table->string('name');

            $table->string('type')->default('individual');
            // individual / organization


            $table->string('phone')
                ->nullable();


            $table->string('email')
                ->nullable();


        

            $table->string('organization')
                ->nullable();


            $table->text('address')
                ->nullable();


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
        Schema::dropIfExists('trainers');
    }
};
