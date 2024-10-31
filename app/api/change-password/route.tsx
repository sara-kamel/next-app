import prisma from '@/prisma/clinet'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import bcrypt from 'bcrypt'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/authOption'

const schema = z.object({
  password: z.string().min(5),
  newPassword: z.string().min(5)
})

export async function PUT (request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'user is not logged in' })
  }
  const body = await request.json()
  const validation = schema.safeParse(body)
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 })
  }
  const user = await prisma.user.findUnique({
    where: { email: session.user?.email! }
  })
  if (!user) {
    return NextResponse.json({ error: 'User is not exist' }, { status: 404 })
  }
  const passwordMatch = await bcrypt.compare(
    body.password,
    user.hashedPassword!
  )
  if (!passwordMatch) {
    return NextResponse.json({ error: 'not valid password' }, { status: 400 })
  }
  const hashedPassword = await bcrypt.hash(body.newPassword, 10)
  const updatedUser = await prisma.user.update({
    where: { id: user.id },
    data: { hashedPassword }
  })
  return NextResponse.json({ name: updatedUser.name, email: updatedUser.email })
}
