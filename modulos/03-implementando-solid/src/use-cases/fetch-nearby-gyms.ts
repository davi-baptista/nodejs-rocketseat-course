import { GymsRepository } from '@/repositories/gyms-repository'
import { Gym } from 'generated/prisma'

interface CreateGymUseCaseRequest {
  userLatitude: number
  userLongitude: number
  page: number
}

interface CreateGymUseCaseResponse {
  gyms: Gym[]
}

export class FetchNearbyGymsUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    userLatitude,
    userLongitude,
    page,
  }: CreateGymUseCaseRequest): Promise<CreateGymUseCaseResponse> {
    const gyms = await this.gymsRepository.findManyNearby(
      {
        latitude: userLatitude,
        longitude: userLongitude,
      },
      page,
    )

    return { gyms }
  }
}
