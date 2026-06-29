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
    Schema::create('quotation_vendor', function (Blueprint $table) {
        $table->id();

        // 1. Pehle sirf columns banayen (Data type bilkul match karna chahiye)
        $table->unsignedBigInteger('quotation_id');
        $table->unsignedBigInteger('vendor_id');

        // 2. Apne extra columns add kareinphp
        $table->date('submission_date')->nullable();
        $table->string('status')->default('pending');

        $table->timestamps();

        // 3. Aakhir mein inko explicitly Foreign Key declare karein
        $table->foreign('quotation_id')->references('id')->on('quotations')->onDelete('cascade');
        $table->foreign('vendor_id')->references('id')->on('vendors')->onDelete('cascade');
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('quotation_vendor');
    }
};
