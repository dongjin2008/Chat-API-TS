<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    public function index()
    {
        $users = User::all();
        return response()->json($users);
    }

    public function store(Request $request)
    {
        $user = new User();
        $user->username = $request->input('username');
        $user->save();

        return response()->json($user, 201);
    }

    public function update(Request $request, $id) {
        $user = User::findOrFail($id);
        $user->username = $request->input('username');
        $user->save();
        return response()->json(new UserResource($user), 200);
    }

    public function destroy($id)
    {
        $user = User::findOrFail($id);
        if($user) {
            $user->delete();
        } else {
            return response()->json(['error' => 'User not found'], 404);
        }
        return response()->json(null, 204);
    }

}
