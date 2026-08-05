<?php

namespace App\Http\Controllers;

use App\Models\TrainingPlan;
use App\Models\Course;
use App\Models\Trainer;
use App\Http\Requests\TrainingPlanRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TrainingPlanController extends Controller
{
    public function index()
    {
        $trainingPlans = TrainingPlan::with(['course', 'trainer'])
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return Inertia::render('Educations/TrainingPlans/Index', [
            'trainingPlans' => $trainingPlans
        ]);
    }

    public function create()
    {
        $courses = Course::orderBy('name')->get(['id', 'name', 'code']);
        $trainers = Trainer::orderBy('name')->get(['id', 'name', 'email']);
        $statuses = TrainingPlan::getStatuses();

        return Inertia::render('TrainingPlans/Create', [
            'courses' => $courses,
            'trainers' => $trainers,
            'statuses' => $statuses,
        ]);
    }

    public function store(TrainingPlanRequest $request)
    {
        $trainingPlan = TrainingPlan::create($request->validated());

        return redirect()
            ->route('training-plans.index')
            ->with('success', 'Training plan created successfully.');
    }

    public function edit(TrainingPlan $trainingPlan)
    {
        $courses = Course::orderBy('name')->get(['id', 'name', 'code']);
        $trainers = Trainer::orderBy('name')->get(['id', 'name', 'email']);
        $statuses = TrainingPlan::getStatuses();

        return Inertia::render('TrainingPlans/Edit', [
            'trainingPlan' => $trainingPlan->load(['course', 'trainer']),
            'courses' => $courses,
            'trainers' => $trainers,
            'statuses' => $statuses,
        ]);
    }

    public function update(TrainingPlanRequest $request, TrainingPlan $trainingPlan)
    {
        $trainingPlan->update($request->validated());

        return redirect()
            ->route('training-plans.index')
            ->with('success', 'Training plan updated successfully.');
    }

    public function destroy(TrainingPlan $trainingPlan)
    {
        $trainingPlan->delete();

        return redirect()
            ->route('training-plans.index')
            ->with('success', 'Training plan deleted successfully.');
    }

    // API endpoints for dropdowns
    public function getCourses()
    {
        return response()->json(
            Course::orderBy('name')->get(['id', 'name', 'code'])
        );
    }

    public function getTrainers()
    {
        return response()->json(
            Trainer::orderBy('name')->get(['id', 'name', 'email'])
        );
    }

    public function getStatusesList()
    {
        return response()->json(TrainingPlan::getStatuses());
    }
}