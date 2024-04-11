import { Prisma, User } from '@prisma/client'
import { UsersRepository } from '../users-repository'

export class InMemoryUsersRepository implements UsersRepository {
  public users: User[] = []

  async findByEmail(email: string) {
    const user = this.users.find((user) => user.email === email)

    return user || null
  }

  async create({ name, email, password_hash }: Prisma.UserCreateInput) {
    const user = {
      id: 'user-1',
      name,
      email,
      password_hash,
      created_at: new Date(),
    }

    this.users.push(user)

    return user
  }
}
