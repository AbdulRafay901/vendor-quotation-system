<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\VendorController;

Route::prefix('auth')->group(function () {

    Route::post('/login',[AuthController::class, 'login']);

    
    

    Route::middleware('auth:sanctum')
        ->group(function () {

        Route::post('/vendors',[VendorController::class, 'store']);

            Route::post(
                '/logout',
                [AuthController::class, 'logout']
            );

            
        });
});

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
