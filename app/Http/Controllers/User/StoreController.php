<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\StoreRequest;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpFoundation\Response;
use Tymon\JWTAuth\Facades\JWTAuth;

class StoreController extends Controller
{
    public function __invoke(StoreRequest $request)
    {
      $data = $request->validated();

      if(preg_match('/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$/', $data['password'])) {
        $data['password'] = Hash::make($data['password']);
      } else {
        return response([
          'message' => 'Password must contain at least 1 number, uppercase and lowercase letter'
        ], Response::HTTP_BAD_REQUEST);
      }

      $email = User::where('email', $data['email'])->first();

      if ($email) return response([
        'message' => 'User with this email already exists'
      ], Response::HTTP_BAD_REQUEST);

      $user = User::create($data);
      $token = JWTAuth::fromUser($user);
      return response()->json([
        'user' => $user,
        'token' => $token,
      ]);
    }
}
