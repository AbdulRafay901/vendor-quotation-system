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
        Schema::table('quotation_vendor', function (Blueprint $table) {
          
            $table->decimal('amount', 15, 2)->nullable()->after('vendor_id');
            $table->date('submission_date')->nullable()->after('amount');
            $table->string('status')->default('pending')->after('submission_date'); 
            // status mein 'pending', 'submitted', 'rejected' 
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('quotation_vendor', function (Blueprint $table) {
            $table->dropColumn(['amount', 'submission_date', 'status']);
        });
    }
};
