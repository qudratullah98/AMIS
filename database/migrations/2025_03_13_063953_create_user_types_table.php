<?php

use App\Models\Bander;
use App\Models\Company;
use App\Models\province;
use App\Models\terminal;
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
        Schema::create('user_types', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(User::class)->onDelete('cascade');
            $table->enum('user_type', ['Admin', 'genral_user', 'Transport_user', 'Report_user', 'Bander_user', 'Company_user']);
            $table->foreignIdFor(province::class)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_types');
    }
};
