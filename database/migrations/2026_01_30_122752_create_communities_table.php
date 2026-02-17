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
        Schema::create('communities', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('tagline')->nullable();

            $table->text('short_description')->nullable();
            $table->longText('description')->nullable();

            $table->string('email')->nullable();

            $table->string('logo')->nullable();
            $table->string('hero_image')->nullable(); // hero utama

            $table->json('skills')->nullable(); // bidang keahlian
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('communities');
    }
};
