<?php

namespace App\Http\Controllers;

use App\Models\DepartmentPosition;
use App\Models\PositionRequiredCertificate;
use App\Models\PositionRequiredCourse;
use App\Models\PositionRequiredEducation;
use App\Models\Certificate;
use App\Models\Course;
use App\Models\EducationLevel;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PositionRequirementController extends Controller
{
    // Show requirement management page for a position
    public function index(DepartmentPosition $position)
    {
        $position->load([
            'requiredCertificates.certificate',
            'requiredCourses.course',
            'requiredEducations.educationLevel',
            'department',
        ]);

        $certificates = Certificate::orderBy('name')->get(['id', 'name', 'level']);
        $courses = Course::orderBy('name')->get(['id', 'name']);
        $educationLevels = EducationLevel::orderBy('name')->get(['id', 'name']);

        return Inertia::render('Tashkilat/DepartmentPosition/Requirements', [
            'position' => $position,
            'requirements' => [
                'certificates' => $position->requiredCertificates,
                'courses' => $position->requiredCourses,
                'educations' => $position->requiredEducations,
            ],
            'available' => [
                'certificates' => $certificates,
                'courses' => $courses,
                'educationLevels' => $educationLevels,
            ],
        ]);
    }

    // Add Certificate Requirement
    public function addCertificate(Request $request, DepartmentPosition $position)
    {
        $validated = $request->validate([
            'certificate_id' => 'required|exists:certificates,id',
            'is_required' => 'boolean',
        ]);

        // Check if already exists
        $exists = $position->requiredCertificates()
            ->where('certificate_id', $validated['certificate_id'])
            ->exists();

        if ($exists) {
            return response()->json([
                'message' => 'This certificate is already required for this position'
            ], 422);
        }

        $requirement = $position->requiredCertificates()->create([
            'certificate_id' => $validated['certificate_id'],
            'is_required' => $validated['is_required'] ?? true,
        ]);

        return response()->json([
            'message' => 'Certificate requirement added successfully',
            'requirement' => $requirement->load('certificate')
        ], 201);
    }

    // Add Course Requirement
    public function addCourse(Request $request, DepartmentPosition $position)
    {
        $validated = $request->validate([
            'course_id' => 'required|exists:courses,id',
            'requirement_type' => 'required|in:mandatory,preferred,optional',
            'validity_months' => 'nullable|integer|min:1',
            'description' => 'nullable|string',
        ]);

        // Check if already exists
        $exists = $position->requiredCourses()
            ->where('course_id', $validated['course_id'])
            ->exists();

        if ($exists) {
            return response()->json([
                'message' => 'This course is already required for this position'
            ], 422);
        }

        $requirement = $position->requiredCourses()->create($validated);

        return response()->json([
            'message' => 'Course requirement added successfully',
            'requirement' => $requirement->load('course')
        ], 201);
    }

    // Add Education Requirement
    public function addEducation(Request $request, DepartmentPosition $position)
    {
        $validated = $request->validate([
            'education_level_id' => 'required|exists:education_levels,id',
            'is_required' => 'boolean',
        ]);

        // Check if already exists
        $exists = $position->requiredEducations()
            ->where('education_level_id', $validated['education_level_id'])
            ->exists();

        if ($exists) {
            return response()->json([
                'message' => 'This education level is already required for this position'
            ], 422);
        }

        $requirement = $position->requiredEducations()->create([
            'education_level_id' => $validated['education_level_id'],
            'is_required' => $validated['is_required'] ?? true,
        ]);

        return response()->json([
            'message' => 'Education requirement added successfully',
            'requirement' => $requirement->load('educationLevel')
        ], 201);
    }

    // Remove Certificate Requirement
    public function removeCertificate(PositionRequiredCertificate $requirement)
    {
        $requirement->delete();

        return response()->json([
            'message' => 'Certificate requirement removed successfully'
        ]);
    }

    // Remove Course Requirement
    public function removeCourse(PositionRequiredCourse $requirement)
    {
        $requirement->delete();

        return response()->json([
            'message' => 'Course requirement removed successfully'
        ]);
    }

    // Remove Education Requirement
    public function removeEducation(PositionRequiredEducation $requirement)
    {
        $requirement->delete();

        return response()->json([
            'message' => 'Education requirement removed successfully'
        ]);
    }

    // Update Course Requirement
    public function updateCourse(Request $request, PositionRequiredCourse $requirement)
    {
        $validated = $request->validate([
            'requirement_type' => 'required|in:mandatory,preferred,optional',
            'validity_months' => 'nullable|integer|min:1',
            'description' => 'nullable|string',
        ]);

        $requirement->update($validated);

        return response()->json([
            'message' => 'Course requirement updated successfully',
            'requirement' => $requirement->load('course')
        ]);
    }

    // Bulk add requirements
    public function bulkAdd(Request $request, DepartmentPosition $position)
    {
        $validated = $request->validate([
            'certificates' => 'array',
            'certificates.*' => 'exists:certificates,id',
            'courses' => 'array',
            'courses.*.course_id' => 'exists:courses,id',
            'courses.*.requirement_type' => 'in:mandatory,preferred,optional',
            'educations' => 'array',
            'educations.*' => 'exists:education_levels,id',
        ]);

        $added = [];

        // Add Certificates
        if (!empty($validated['certificates'])) {
            foreach ($validated['certificates'] as $certificateId) {
                $exists = $position->requiredCertificates()
                    ->where('certificate_id', $certificateId)
                    ->exists();
                
                if (!$exists) {
                    $added['certificates'][] = $position->requiredCertificates()->create([
                        'certificate_id' => $certificateId,
                        'is_required' => true,
                    ]);
                }
            }
        }

        // Add Courses
        if (!empty($validated['courses'])) {
            foreach ($validated['courses'] as $courseData) {
                $exists = $position->requiredCourses()
                    ->where('course_id', $courseData['course_id'])
                    ->exists();
                
                if (!$exists) {
                    $added['courses'][] = $position->requiredCourses()->create([
                        'course_id' => $courseData['course_id'],
                        'requirement_type' => $courseData['requirement_type'] ?? 'mandatory',
                        'validity_months' => $courseData['validity_months'] ?? null,
                        'description' => $courseData['description'] ?? null,
                    ]);
                }
            }
        }

        // Add Educations
        if (!empty($validated['educations'])) {
            foreach ($validated['educations'] as $educationId) {
                $exists = $position->requiredEducations()
                    ->where('education_level_id', $educationId)
                    ->exists();
                
                if (!$exists) {
                    $added['educations'][] = $position->requiredEducations()->create([
                        'education_level_id' => $educationId,
                        'is_required' => true,
                    ]);
                }
            }
        }

        return response()->json([
            'message' => 'Requirements added successfully',
            'added' => $added
        ]);
    }
}