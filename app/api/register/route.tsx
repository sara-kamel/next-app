import prisma from '@/prisma/clinet'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import bcrypt from 'bcrypt'
const schema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters long' }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(5, { message: 'Password must be at least 5 characters long' })
})
export async function POST (request: NextRequest) {
  const body = await request.json()
  const validation = schema.safeParse(body)
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 })

  const user = await prisma.user.findUnique({
    where: { email: body.email }
  })
  if (user) {
    return NextResponse.json({ error: 'User arleady exist' }, { status: 400 })
  }
  const hashedPassword = await bcrypt.hash(body.password, 10)
  const newUser = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
      hashedPassword
    }
  })
  return NextResponse.json({ email: newUser.email, name: newUser.name })
}
