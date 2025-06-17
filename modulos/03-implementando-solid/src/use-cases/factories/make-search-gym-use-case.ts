import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import {} from '../fetch-nearby-gyms'
import { SearchGymUseCase } from '../search-gyms'

export function makeSearchGymUseCase() {
  const gymsRepository = new PrismaGymsRepository()
  const UseCase = new SearchGymUseCase(gymsRepository)

  return UseCase
}
