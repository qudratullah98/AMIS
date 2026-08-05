<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\CourseType;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CourseController extends Controller
{
    public function index()
    {
        $courses = Course::with('courseType')
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return Inertia::render('Educations/Courses/Index', [
            'courses' => $courses
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'course_type_id' => 'required|exists:course_types,id',
            'name' => 'required|string|max:255',  
            'description' => 'nullable|string',
            'validity_months' => 'required|integer|min:1',
        ]);

        $course = Course::create($validated);

        return response()->json([
            'message' => 'Course created successfully',
            'course' => $course->load('courseType')
        ], 201);
    }

    public function update(Request $request, Course $course)
    {
        $validated = $request->validate([
            'course_type_id' => 'required|exists:course_types,id',
            'name' => 'required|string|max:255',
            'code' => 'required|string|max:50|unique:courses,code,' . $course->id,
            'duration_hours' => 'required|integer|min:1',
            'description' => 'nullable|string',
            'validity_months' => 'required|integer|min:1',
        ]);

        $course->update($validated);

        return response()->json([
            'message' => 'Course updated successfully',
            'course' => $course->load('courseType')
        ]);
    }

    public function destroy(Course $course)
    {
        $course->delete();

        return response()->json([
            'message' => 'Course deleted successfully'
        ]);
    }
}