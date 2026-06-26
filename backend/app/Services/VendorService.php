<?php

namespace App\Services;

use App\Models\Vendor;

class VendorService
{
    public function store(array $data): Vendor
    {
        return Vendor::create($data);
    }
    public function index(){
        return Vendor::all();
    }

}