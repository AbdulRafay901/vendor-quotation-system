<?php

namespace App\Http\Controllers;

use App\Models\Vendor;
use App\Models\Quotation;
use App\Models\Activity;

class DashboardController extends Controller
{
    public function index()
    {
        $data = [
            'totalVendors' => Vendor::count(),
            'activeQuotations' => Quotation::where('status', 'active')->count(),
            'pendingQuotations' => Quotation::where('status', 'pending')->count(),
            'approvedQuotations' => Quotation::where('status', 'approved')->count(),
            'recentActivities' => Activity::latest()->take(5)->get(),
        ];

        return view('dashboard', $data);
    }
}