<?php

use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;

Route::middleware('verify.shopify')->group(function () {
   Route::view('/', 'app')->name('home');
   Route::post('/products', [ProductController::class, 'store']);
});
