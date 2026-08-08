<?php

use App\Models\ApprovelStatus;
use App\Models\blood_group;
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
        Schema::create('employees', function (Blueprint $table) {
            $table->id();

            // Personal Information
            $table->string('first_name');
            $table->string('last_name');
            $table->string('father_name')->nullable();

            $table->enum('gender', ['Male', 'Female']);

            $table->date('birth_date')->nullable();

            // Contact Information
            $table->string('phone', 20)->nullable();
            $table->string('email')->nullable()->unique();

            // Government Information
            $table->string('national_id')->unique();
            $table->string('passport_no')->nullable()->unique();

            // Personal Information
            $table->enum('marital_status', [
                'Single',
                'Married',
                'Divorced',
                'Widowed'
            ])->nullable();

            $table->foreignIdFor(blood_group::class)->nullable();

            // Address
            $table->string('province')->nullable();
            $table->string('district')->nullable();
            $table->text('address')->nullable();

            // Photo
            $table->string('photo')->nullable();

            // Approval
            $table->foreignIdFor(ApprovelStatus::class, 'approval_status_id')->default(2);
              

            

            // Audit
            $table->foreignId('created_by')
                ->nullable()
                ->constrained('users')
                ->nullOnDelete();

            $table->foreignId('updated_by')
                ->nullable()
                ->constrained('users')
                ->nullOnDelete();

            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employees');
    }
};
