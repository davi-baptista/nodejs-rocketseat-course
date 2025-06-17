import { Gym, Prisma } from 'generated/prisma'

export interface FindManyNearbyParams {
  latitude: number
  longitude: number
}

export interface GymsRepository {
  create(data: Prisma.GymCreateInput): Promise<Gym>

  searchMany(query: string, page: number): Promise<Gym[]>

  findManyNearby(params: FindManyNearbyParams, page: number): Promise<Gym[]>

  findById(id: string): Promise<Gym | null>
}
