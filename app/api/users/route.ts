import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

export async function GET() {
  const users = await prisma.user.findMany()
  return NextResponse.json(users)
}

export async function POST(request: Request) {
  const body = await request.json()
  const user = await prisma.user.create({ data: body })
  return NextResponse.json(user)
}

export async function PUT(request: Request) {
  const { id, username } = await request.json()
  const user = await prisma.user.update({
    where: { id },
    data: { username },
  })
  return NextResponse.json(user)
}
