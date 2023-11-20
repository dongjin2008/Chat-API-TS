<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Message;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    public function index()
    {
        $messages = Message::all();
        return response()->json($messages);
    }

    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required',
            'username' => 'required',
            'message' => 'required'
        ]);

        $message = Message::create($request->all());

        return response()->json($message, 201);
    }

    public function show(Message $message)
    {
        return response()->json($message);
    }

    public function update(Request $request, Message $message)
    {
        $request->validate([
            'user_id' => 'required',
            'username' => 'required',
            'message' => 'required'
        ]);

        $message->update($request->all());

        return response()->json($message);
    }

    public function destroy(Message $message)
    {
        $message->delete();

        return response()->json(null, 204);
    }
}
