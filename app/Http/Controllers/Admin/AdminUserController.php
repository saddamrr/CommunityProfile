<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Inertia\Inertia;

class AdminUserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // return Inertia::render('Admin/Users/Index', [
        //     'users' => User::latest()->paginate(10),
        // ]);

        $users = User::query()
            ->when($request->search, function ($q) use ($request) {
                $q->where(function ($qq) use ($request) {
                    $qq->where('name', 'like', '%' . $request->search . '%')
                    ->orWhere('username', 'like', '%' . $request->search . '%')
                    ->orWhere('email', 'like', '%' . $request->search . '%');
                });
            })
            ->when($request->role, fn ($q) =>
                $q->where('role', $request->role)
            )
            ->when($request->status, fn ($q) =>
                $q->where('is_active', $request->status === 'active')
            )
            ->latest()
            ->paginate(10)
            ->withQueryString(); // 🔥 penting

        return Inertia::render('Admin/Users/Index', [
            'users'   => $users,
            'filters' => $request->only(['search', 'role', 'status']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Users/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string',
            'username' => 'required|string|unique:users',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:8',
            'role' => 'required|in:admin,member',
        ]);

        User::create([
            ...$data,
            'password' => bcrypt($data['password']),
        ]);

        return redirect()->route('admin.users.index')
        ->with('success', 'User created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        return Inertia::render('Admin/Users/Edit', [
            'user' => $user,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        $data = $request->validate([
            'name'     => 'required|string',
            'username' => 'required|string|unique:users,username,' . $user->id,
            'email'    => 'required|email|unique:users,email,' . $user->id,
            'role'     => 'required|in:admin,member',
            'is_active'=> 'boolean',
        ]);

        $user->update($data);

        return redirect()->route('admin.users.index')
        ->with('success', 'User updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        if ($user->id === auth()->user()->id) {
            abort(403, 'You cannot delete yourself.');
        }

        $user->delete();

        return redirect()->route('admin.users.index')
        ->with('success', 'User deleted successfully.');
    }

    public function toggleActive(User $user)
    {
        if ($user->id === auth()->id()){
            abort(403, 'You cannot toggle your own account.');
        }

        $user->update([
            'is_active' => !$user->is_active
        ]);

        return back()->with('Success', 'User status updated successfully.');
    }
}
