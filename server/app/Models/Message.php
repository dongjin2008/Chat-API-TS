<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;

class Message extends Model
{
    protected $connection = 'mongodb';
    protected $fillable = [
        'user_id',
        'username',
        'message'
    ];
}
