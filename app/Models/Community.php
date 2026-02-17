<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Community extends Model
{
    protected $fillable = [
        'name',
        'tagline',
        'short_description',
        'description',
        'email',
        'logo',
        'hero_image',
        'skills',
    ];

    protected $casts = [
        'skills' => 'array',
    ];
}
