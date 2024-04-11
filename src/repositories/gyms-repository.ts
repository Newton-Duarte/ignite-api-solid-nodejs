import { Gym, Prisma } from '@prisma/client'

export interface SearchManyParams {
  query: string
  page: number
}
export interface GymsRepository {
  findById(id: string): Promise<Gym | null>
  searchMany(params: SearchManyParams): Promise<Gym[]>
  create(data: Prisma.GymCreateInput): Promise<Gym>
}
