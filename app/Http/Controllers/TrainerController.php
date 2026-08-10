<?php

namespace App\Http\Controllers;

use App\Models\Trainer;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TrainerController extends Controller
{
    public function index()
    {
        $trainers = Trainer::orderBy('created_at', 'desc')
            ->paginate(10);

        return Inertia::render('Educations/Trainers/Index', [
            'trainers' => $trainers
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|string|in:internal,external,consultant',
            'phone' => 'nullable|string|max:50',
            'email' => 'nullable|email|max:255|unique:trainers,email',
            'organization' => 'nullable|string|max:255',
            'address' => 'nullable|string|max:500',
            'description' => 'nullable|string',
        ]);

        $trainer = Trainer::create($validated);

        return response()->json([
            'message' => 'Trainer created successfully',
            'trainer' => $trainer
        ], 201);
    }

    public function update(Request $request, Trainer $trainer)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|string|in:internal,external,consultant',
            'phone' => 'nullable|string|max:50',
            'email' => 'nullable|email|max:255|unique:trainers,email,' . $trainer->id,
            'organization' => 'nullable|string|max:255',
            'address' => 'nullable|string|max:500',
            'description' => 'nullable|string',
        ]);

        $trainer->update($validated);

        return response()->json([
            'message' => 'Trainer updated successfully',
            'trainer' => $trainer
        ]);
    }

    public function destroy(Trainer $trainer)
    {
        // Check if trainer has any training plans
        if ($trainer->trainingPlans()->exists()) {
            return response()->json([
                'message' => 'Cannot delete trainer because they have assigned training plans'
            ], 422);
        }

        $trainer->delete();

        return response()->json([
            'message' => 'Trainer deleted successfully'
        ]);
    }

    // Get all trainers for dropdown
    public function list()
    {
        return response()->json(
            Trainer::orderBy('name')->get(['id', 'name', 'type', 'email'])
        );
    }

    public function jsonList()
    {
        $trainers = Trainer::select('id', 'name', 'email')->get();
        return response()->json($trainers);
    }
}
