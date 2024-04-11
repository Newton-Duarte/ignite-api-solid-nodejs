import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { expect, it, describe } from 'vitest'
import { RegisterService } from './register'

describe('Register service', () => {
  it('should be able to create an user', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerService = new RegisterService(usersRepository)
    const { user } = await registerService.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })
})
