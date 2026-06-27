<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use App\Models\User;
use App\Models\Vendor;

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
        return $this->belongsToMany(Vendor::class, 'quotation_vendor')->withTimestamps();
    }
}
