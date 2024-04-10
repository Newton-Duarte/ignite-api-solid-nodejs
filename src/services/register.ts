import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'

type RegisterServiceRequest = {
  name: string
  email: string
  password: string
}

export async function registerService({
  name,
  email,
  password,
}: RegisterServiceRequest) {
  const passwordHash = await hash(password, 6)

  const userWithSameEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (userWithSameEmail) {
    throw new Error('User with the same email already exist')
  }

  await prisma.user.create({
    data: {
      name,
      email,
      password_hash: passwordHash,
    },
  })
}
