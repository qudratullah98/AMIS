<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Morilog\Jalali\Jalalian;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin'       => Route::has('login'),
        'canRegister'    => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion'     => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
    // return redirect('/setting');

})->middleware(['auth', 'verified' , 'blocked'])->name('dashboard');

Route::middleware(['auth', 'blocked'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Users
    Route::get('user/layout', [UserController::class, 'layout'])
        ->middleware('can:viewUsers')->name('user.UserLayout');
    Route::get('users', [UserController::class, 'index'])->middleware('can:viewUsers')->name('user.index');
    Route::get('user/create', [UserController::class, 'create'])
        ->middleware('can:manageUsers')->name('user.create');

    Route::get('user/{id}/edit', [UserController::class, 'Edit'])
        ->middleware('can:manageUsers')->name('user.edit');

    Route::post('user', [UserController::class, 'store'])
        ->middleware('can:manageUsers')->name('user.store');

    Route::post('user/update', [UserController::class, 'update'])
        ->middleware('can:manageUsers')->name('user.update');

    // Roles
    Route::get('user/roles', [RoleController::class, 'index'])
        ->middleware('can:viewUsers')->name('role.index');
    Route::get('roles/create', [RoleController::class, 'create'])
        ->middleware('can:manageUsers')->name('role.create');
    Route::post('role', [RoleController::class, 'store'])
        ->middleware('can:manageUsers')->name('role.store');
    Route::post('role/update', [RoleController::class, 'update'])
        ->middleware('can:manageUsers')->name('role.update');
    Route::get('role/{roleId}', [RoleController::class, 'Edit'])
        ->middleware('can:manageUsers')->name('role.edit');
});

Route::get('/', function () {
    return redirect('/dashboard');
    // return redirect('/setting');
});

Route::get('test', function () {

    $jDate = Jalalian::now();
    $jDate = Jalalian::now();

    // Get start & end of current Jalali month (convert to Carbon)
    $startOfMonth = $jDate->getFirstDayOfMonth()->toCarbon()->format('Y-m-d');

    $endOfMonth = $jDate->getEndDayOfMonth()->toCarbon()->format('Y-m-d');
    return response()->json([
        'startOfMonth' => $startOfMonth,
        'endOfMonth'   => $endOfMonth,
    ]);
});

require __DIR__ . '/auth.php';

require __DIR__ . '/log.php';
require __DIR__ . '/airport.php';
