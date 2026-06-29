<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory; 
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use App\Models\Quotation;


class Vendor extends Model
{
    use HasFactory;

    protected $fillable = [
        'vendor_name',
        'company_name',
        'email',
        'phone',
        'address',
        'status',
        'amount',
    ];

    public function quotations(): BelongsToMany
    {
        return $this->belongsToMany(Quotation::class, 'quotation_vendor')
->withTimestamps();
    }
}
