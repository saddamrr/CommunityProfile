<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        // $community = Community::with('galleries')->first();

        return Inertia::render('Welcome');
    }
}
