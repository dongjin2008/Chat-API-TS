import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";
import { z } from "zod";

const createMessageSchema = z.object({
  username: z.string().min(1),
  message: z.string().min(1),
});

export async function GET() {
  const messages = await prisma.message.findMany();

  return NextResponse.json(messages);
}

export async function POST(request: Request) {
  const body = await request.json();
  const messageData = createMessageSchema.parse(body);
  const new_message = await prisma.message.create({ data: messageData });

  const Pusher = require("pusher");

  const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.NEXT_PUBLIC_PUSHER_KEY,
    secret: process.env.PUSHER_SECRET,
    cluster: 'eu',
    useTLS: true,
  });
  pusher.trigger("messages", "inserted", new_message);
  return NextResponse.json(new_message);
}
