import { NextRequest ,NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';
import { z } from 'zod';

const createUserSchema = z.object({
  username: z.string().min(1),
});

export async function POST(req: NextRequest) {
  const body = await req.json()
  const userData = createUserSchema.parse(body)
  const user = await prisma.user.create({ data: userData })
  return NextResponse.json(user)
}
