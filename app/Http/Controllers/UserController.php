<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\AddEmailRequest;
use App\Models\User;

class UserController extends Controller
{
	public function index() {
		return response()->json(User::all());
	}

	public function add(AddEmailRequest $request) {
		$user = User::create([
			'name'  => $request->get('name'),
			'email' => $request->get('email'),
			'password' => Hash::make(Str::random(8)),
			'invite_token' => md5(Str::random(8))
		]);

		return response()->json($user);
	}
}
