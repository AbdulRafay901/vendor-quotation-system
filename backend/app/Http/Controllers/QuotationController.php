<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreQuotationRequest;
use App\Models\Quotation;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Carbon;

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

    public function getDetails($id)
    {
        // Eager loading use kar rahe hain taake query slow na ho
        $quotation = Quotation::with('vendors')->find($id);

        // Agar quotation nahi milti toh 404 error
        if (!$quotation) {
            return response()->json([
                'success' => false,
                'message' => 'Quotation nahi mili!'
            ], 404);
        }

        // Frontend JS ke liye clean array/JSON 
    

        // Final Response js
        return response()->json([
            'success' => true,
            'data'    => [
                'id'            => $quotation->id,
                'title'         => $quotation->title,
                'description'   => $quotation->description,
                'required_date' => Carbon::parse($quotation->required_date)->format('d M Y'),
                'status'        => $quotation->status,
                'created_at'    => $quotation->created_at->format('d M Y'),
                'vendors'       => $formattedVendors // Saare vendors is array mein honge
            ]
        ], 200);
    }
}