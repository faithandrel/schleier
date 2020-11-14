<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('users/add', 'App\Http\Controllers\UserController@add');
Route::post('users/disable', 'App\Http\Controllers\UserController@disableUsers');
Route::get('users', 'App\Http\Controllers\UserController@index');
Route::post('invite', 'App\Http\Controllers\UserController@getInvite');
Route::post('profile', 'App\Http\Controllers\UserController@saveProfile');
Route::post('avatar', 'App\Http\Controllers\UserController@saveAvatar');