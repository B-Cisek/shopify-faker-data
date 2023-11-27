<?php

use App\Http\Controllers\FakerController;
use App\Http\Middleware\CheckAccessScopes;
use Illuminate\Support\Facades\Route;

Route::middleware(['verify.shopify', CheckAccessScopes::class])->group(function () {
   Route::view('/', 'app')->name('home');
   Route::post('/fake-data', [FakerController::class, 'store']);
   Route::delete('/fake-data', [FakerController::class, 'destroy']);
});
