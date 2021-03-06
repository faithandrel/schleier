<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Carbon\Carbon;
use Intervention\Image\ImageManager;
use App\Http\Requests\AddEmailRequest;
use App\Http\Requests\ProfileRequest;
use App\Models\User;
use App\Mail\UserInvite;
use App\Mail\WelcomeEmail;

class UserController extends Controller
{
	public function index() {
		return response()->json(User::all());
	}

	public function add(AddEmailRequest $request) {
		$user = User::create([
			'name' => $request->get('name'),
			'email' => $request->get('email'),
			'password' => Hash::make(Str::random(8)),
			'invite_token' => md5(Str::random(8))
		]);

		Mail::to($user->email)->send(new UserInvite($user));

		return response()->json($user);
	}

	public function getInvite(Request $request) {
		$token = $request->get('token');

		$user = User::where('invite_token', $token)->first();

		if (!$user) {
			abort(404);
		}

		return response()->json([
			'name' => $user->name,
			'email' => $user->email,
			'status' => $user->status,
			'avatar' => $user->avatar
		]);
	}

	public function saveProfile(ProfileRequest $request) {
		$user = User::where('email', $request->get('email'))->first();
		$invite = $request->get('invite');

		if($invite != $user->invite_token) {
			abort(403, 'Invalid invite.');
		}

		$user->name = $request->get('name');
		$user->password = Hash::make($request->get('name'));
		$user->status = config('users.status.accepted');
		$user->signed_up_at = Carbon::now();
		$user->save();

		Mail::to($user->email)->later(Carbon::now()->addMinutes(5), new WelcomeEmail());

		return response()->json($user);
	}

	public function saveAvatar(Request $request) {
		$user = User::where('email', $request->get('email'))->first();
		$avatarFilename = 'avatar.'.$request->file->getClientOriginalExtension();
		$thumbnailFilename = 'thumbnail.'.$request->file->getClientOriginalExtension();

		$request->file->move(public_path('avatars/'.$user->id), $avatarFilename);
		
		$manager = new ImageManager(array('driver' => 'imagick'));
		$avatarFile = public_path('avatars/'.$user->id).'/'.$avatarFilename;
		
		$image = $manager->make($avatarFile)->resize(256, 256);
		$image->save(public_path('avatars/'.$user->id).'/'.$avatarFilename);

		$image = $manager->make($avatarFile)->resize(64, 64);
		$image->save(public_path('avatars/'.$user->id).'/'.$thumbnailFilename);

		$user->avatar = 'avatars/'.$user->id.'/'.$avatarFilename;
		$user->save();

		return response()->json([$user->avatar]);
	}

	public function disableUsers(Request $request) {
		$userIds = $request->get('users');

		$result = User::whereIn('id', $userIds)
        			  ->update(['status' => 2]);

		return response()->json($userIds);
	}
}
