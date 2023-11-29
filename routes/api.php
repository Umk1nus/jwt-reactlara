<?php

use App\Http\Controllers\User\StoreController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
Route::post('/register', StoreController::class);

Route::namespace('App\Http\Controllers')->controller(AuthController::class)->middleware(['api' ])->prefix('auth')
    ->group(function ($router) {
    Route::post('login', 'login');
    Route::post('logout', 'logout');
    Route::post('me', 'me');
});
