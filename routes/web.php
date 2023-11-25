<?php

use Illuminate\Support\Facades\Route;


Route::middleware('verify.shopify')->group(function () {
   Route::get('/', fn() => view('welcome'))->name('home');
   Route::get('/me', fn() => response()->json(['name' => auth()->user()->name]));
});
