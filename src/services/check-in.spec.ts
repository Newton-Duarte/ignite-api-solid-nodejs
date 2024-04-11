import { expect, it, describe, beforeEach } from 'vitest'
import { CheckInService } from './check-in'
import { CheckInsRepository } from '@/repositories/check-ins-repository'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'

let checkInsRepository: CheckInsRepository
let sut: CheckInService

describe('Check In service', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new CheckInService(checkInsRepository)
  })

  it('should be able to authenticate', async () => {
    const { checkIn } = await sut.execute({
      userId: 'user-1',
      gymId: 'gym-1',
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})
