import { Gym, Prisma } from '@prisma/client'
import { GymsRepository, SearchManyParams } from '../gyms-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryGymsRepository implements GymsRepository {
  public gyms: Gym[] = []

  async findById(id: string) {
    const gym = this.gyms.find((gym) => gym.id === id)

    return gym || null
  }

  async searchMany(params: SearchManyParams) {
    return this.gyms
      .filter((item) => item.title.includes(params.query))
      .slice((params.page - 1) * 20, params.page * 20)
  }

  async create(data: Prisma.GymCreateInput) {
    const gym = {
      id: data.id ?? randomUUID(),
      title: data.title,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
      created_at: new Date(),
    }

    this.gyms.push(gym)

    return gym
  }
}
