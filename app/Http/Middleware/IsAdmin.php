<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class IsAdmin
{
    public function handle(Request $request, Closure $next): Response
    {
        if (!auth()->check()) {
            abort(403);
        }

        $user = auth()->user();

        if ($user->role !== 'admin') {
            abort(403, 'Unauthorized');
        }

        if (!$user->is_active) {
            abort(403, 'Account inactive');
        }

        // cegah admin masuk dashboard user
        if ($request->routeIs('dashboard')) {
            abort(404);
        }

        return $next($request);
    }
}
