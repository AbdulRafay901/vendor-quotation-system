<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ActivitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\Activity::create([
        'title' => 'New vendor "Tech Solutions" added by Admin',
        'icon' => 'fa-solid fa-plus',
        'badge_color' => 'badge-success'
    ]);

    \App\Models\Activity::create([
        'title' => 'Quotation "QTN-2024-0018" submitted by ABC Traders',
        'icon' => 'fa-solid fa-file-lines',
        'badge_color' => 'badge-primary'
    ]);
    }
}
