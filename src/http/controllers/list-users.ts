import { prisma } from '@/lib/prisma'

export async function listUsers() {
  const users = await prisma.user.findMany()

  return { users }
}
