import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { expect, it, describe, beforeEach } from 'vitest'
import { UsersRepository } from '@/repositories/users-repository'
import { GetUserProfileService } from './get-user-profile'
import { hash } from 'bcryptjs'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let usersRepository: UsersRepository
let sut: GetUserProfileService

describe('Get User Profile service', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new GetUserProfileService(usersRepository)
  })

  it('should be able get the user profile', async () => {
    const createdUser = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      userId: createdUser.id,
    })

    expect(user.name).toEqual(createdUser.name)
  })

  it('should not be able to get an non-existing user profile', async () => {
    await expect(() =>
      sut.execute({
        userId: 'non-existing-user-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
