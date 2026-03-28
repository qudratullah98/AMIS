<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ActivityStatus;
use Illuminate\Http\Request;

class ActivityStatusController extends Controller
{
      public function getStatuses()
    {
        $statuses = ActivityStatus::get(['id', 'status_ps']);
        return response()->json($statuses);
    }
}
