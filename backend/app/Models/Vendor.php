<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory; 

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
    ];
}
