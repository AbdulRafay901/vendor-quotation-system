<?php

// app/Http/Controllers/Api/ActivityController.php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Activity;
use Illuminate\Http\Request;

class ActivityController extends Controller
{
    public function index()
    {
        // Fetch latest 10 activities
        $activities = Activity::latest()->take(10)->get();

        // Map over data to format the 'created_at' for the frontend
        $formattedActivities = $activities->map(function ($activity) {
            return [
                'id' => $activity->id,
                'title' => $activity->title, // HTML string like: "New vendor <strong>Tech Solutions</strong> added"
                'icon' => $activity->icon,
                'badge_color' => $activity->badge_color,
                'time_ago' => $activity->created_at->diffForHumans(), // Converts timestamp to "2 mins ago"
            ];
        });

        return response()->json([
            'status' => 'success',
            'data' => $formattedActivities
        ]);
    }
}