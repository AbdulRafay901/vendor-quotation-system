<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\VendorController;
use App\Http\Controllers\QuotationController;

Route::prefix('auth')->group(function () {

    Route::post('/login',[AuthController::class, 'login']);

    
    

    Route::middleware('auth:sanctum')
        ->group(function () {

        Route::post('/vendors',[VendorController::class, 'store']);
        Route::get('/vendors', [VendorController::class, 'index']);

         

         // Quotations
        Route::get('/quotations',       [QuotationController::class, 'index']);
        Route::post('/quotations',      [QuotationController::class, 'store']);
        Route::get('/quotations/{id}',  [QuotationController::class, 'show']);
        Route::delete('/quotations/{id}',[QuotationController::class, 'destroy']);

        // Quotation Details 

       Route::get('/quotations/{id}/details', [QuotationController::class, 'getDetails']);

        Route::post('/logout', [AuthController::class, 'logout']);


            
        });
});

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
