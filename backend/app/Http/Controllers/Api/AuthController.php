<?php

namespace App\Http\Controllers\Api;

use App\Services\AuthService;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;

class AuthController extends Controller
{
    public function __construct(
        protected AuthService $authService
) {
    }

    public function login(
        LoginRequest $request
    ) {
        $result = $this
            ->authService
            ->login(
                $request->validated()
            );

        return response()->json([
            'success' => true,
            'message' => 'Login successful.',
            'token' => $result['token'],
            'user' => $result['user']
        ]);
    }

    public function logout(
        Request $request
    ) {
        $this
            ->authService
            ->logout(
                $request->user()
            );

        return response()->json([
            'success' => true,
            'message' => 'Logout successful.'
        ]);
    }
}