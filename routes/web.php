<?php

use App\Http\Controllers\CommunityController;
use App\Http\Controllers\LandingController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
Use App\Http\Controllers\Admin\AdminUserController;
Use App\Http\Controllers\HomeController;
Use App\Http\Controllers\Admin\AdminProfileController;

// Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/', [LandingController::class, 'index'])->name('landing');

Route::middleware(['auth', 'admin'])
    ->prefix('admin')
    ->name('admin.')
    ->group(function () {
    
    Route::get('/', fn () =>
            Inertia::render('Admin/Dashboard')
        )->name('dashboard');

        Route::resource('users', AdminUserController::class);
        Route::patch('/users/{user}/toggle-active', [AdminUserController::class, 'toggleActive'])
        ->name('users.toggle-active');


        Route::get('/profile', [AdminProfileController::class, 'edit'])
            ->name('profile.edit');

        Route::patch('/profile', [AdminProfileController::class, 'update'])
            ->name('profile.update');

        Route::patch('/profile/password', [AdminProfileController::class, 'updatePassword'])
            ->name('profile.password');

        Route::get('/community', [CommunityController::class, 'edit'])
            ->name('community.edit');

        Route::post('/community', [CommunityController::class, 'update'])
            ->name('community.update');

        Route::get('/gallery', fn () =>
            Inertia::render('Admin/Gallery')
        )->name('gallery');
    });


Route::middleware(['auth', 'member'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
