<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Preparation extends Model
{
    use HasFactory;
    protected $fillable = [
        'recipe_id',
        'step',
        'step_description'
    ];
}
