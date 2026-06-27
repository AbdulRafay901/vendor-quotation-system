<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Http\Controllers\Api\VendorController;

class Quotation extends Model
{
    protected $fillable = [
        'title',
        'description',
        'required_date',
        'status',
        'user_id'
    ];

    
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

   
    public function vendors(): BelongsToMany
    {
        return $this->belongsToMany(VendorController::class, 'quotation_vendor')->withTimestamps();
    }
}
