<?php

namespace App\Http\Controllers;

use App\Models\Community;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class CommunityController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Community $community)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit()
    {
        return Inertia::render('Admin/Community/Edit', [
            'community' => Community::first(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $community = Community::first();

        $data = $request->validate([
            'name'              => 'required|string|max:255',
            'tagline'           => 'nullable|string|max:255',
            'short_description' => 'nullable|string|max:500',
            'description'       => 'nullable|string',
            'email'             => 'nullable|email',

            'logo'              => 'nullable|image|max:2048',
            'hero_image'        => 'nullable|image|max:2048',

            'skills'            => 'nullable|array',
        ]);

        if ($request->hasFile('logo')) {
            if ($community->logo) {
                Storage::disk('public')->delete($community->logo);
            }
            $data['logo'] = $request->file('logo')->store('community','public');
        } else {
            unset($data['logo']);
        }

        if ($request->hasFile('hero_image')) {
            if ($community->hero_image) {
                Storage::disk('public')->delete($community->hero_image);
            }
            $data['hero_image'] = $request->file('hero_image')->store('community','public');
        } else {
            unset($data['hero_image']);
        }

        $community->update($data);

        return back()->with('success', 'Community settings updated.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Community $community)
    {
        //
    }
}
