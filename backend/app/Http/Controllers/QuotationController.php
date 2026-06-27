<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreQuotationRequest;
use App\Models\Quotation;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class QuotationController extends Controller
{
    // GET /api/auth/quotations — quotations
    public function index(): JsonResponse
    {
        $quotations = Quotation::with('vendors')
            ->where('user_id', Auth::id())
            ->latest()
            ->get();

        return response()->json([
            'success' => true,
            'data'    => $quotations
        ]);
    }

    // POST /api/auth/quotations — nayi quotation banao
    public function store(StoreQuotationRequest $request): JsonResponse
    {
        // 1. Quotation create karo
        $quotation = Quotation::create([
            'title'         => $request->title,
            'description'   => $request->description,
            'required_date' => $request->date,
            'user_id'       => Auth::id(),
        ]);

        // 2. Vendors attach (pivot table mein)
        $quotation->vendors()->attach($request->vendor_ids);

        
        $quotation->load('vendors');

        return response()->json([
            'success' => true,
            'message' => 'Quotation created successfully.',
            'data'    => $quotation
        ], 201);
    }

    // GET /api/auth/quotations/{id} — single quotation
    public function show(Quotation $quotation): JsonResponse
    {
        // Sirf apni quotation dekh sakta hai
        if ($quotation->user_id !== Auth::id()) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized.'
            ], 403);
        }

        $quotation->load('vendors');

        return response()->json([
            'success' => true,
            'data'    => $quotation
        ]);
    }

    // DELETE /api/auth/quotations/{id}
    public function destroy(Quotation $quotation): JsonResponse
    {
        if ($quotation->user_id !== Auth::id()) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized.'
            ], 403);
        }

        
        $quotation->delete();

        return response()->json([
            'success' => true,
            'message' => 'Quotation deleted.'
        ]);
    }
}