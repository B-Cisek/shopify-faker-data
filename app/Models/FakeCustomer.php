<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class FakeCustomer extends Model
{
    use HasFactory;

    protected $casts = [
        'created_at' => 'datetime'
    ];

    protected $fillable = [
        'customer_id'
    ];

    const UPDATED_AT = null;

    public function users(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
