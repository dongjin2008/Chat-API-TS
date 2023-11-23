import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";
import { io } from "socket.io-client";

export async function GET() {
  const messages = await prisma.message.findMany();

  return NextResponse.json(messages);
}

export async function POST(request: Request) {
  const body = await request.json();
  const new_message = await prisma.message.create({ data: body });
  io().emit("new_message", new_message);
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
  const { id } = await request.json();
  const message = await prisma.message.delete({
    where: { id },
  });
  return NextResponse.json(message);
}