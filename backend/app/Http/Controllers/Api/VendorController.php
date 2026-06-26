<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreVendorRequest;
use App\Services\VendorService;
use Illuminate\Http\JsonResponse;

class VendorController extends Controller
{
    public function __construct(
        protected VendorService $vendorService
    ) {
    }

    public function store(StoreVendorRequest $request): JsonResponse {

        $vendor = $this->vendorService->store(
            $request->validated()
        );

        return response()->json([
            'message' => 'Vendor created successfully.',
            
        ], 201);
    }
}
