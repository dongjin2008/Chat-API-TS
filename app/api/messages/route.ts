import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export async function GET() {
  const messages = await prisma.message.findMany();

  return NextResponse.json(messages);
}

export async function POST(request: Request) {
  const body = await request.json();
  const new_message = await prisma.message.create({ data: body });

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

export async function PUT(request: Request) {
  const { id, message } = await request.json();
  const new_message = await prisma.message.update({
    where: { id },
    data: { message },
  });
  return NextResponse.json(new_message);
}

export async function DELETE(request: Request) {
  const messages = await prisma.message.deleteMany();
  return NextResponse.json(messages);
}