import { Gym, Prisma } from '@prisma/client'

export interface SearchManyParams {
  query: string
  page: number
}

export interface FindManyNearbyParams {
  latitude: number
  longitude: number
}
export interface GymsRepository {
  findById(id: string): Promise<Gym | null>
  findManyNearby(params: FindManyNearbyParams): Promise<Gym[]>
  searchMany(params: SearchManyParams): Promise<Gym[]>
  create(data: Prisma.GymCreateInput): Promise<Gym>
}
