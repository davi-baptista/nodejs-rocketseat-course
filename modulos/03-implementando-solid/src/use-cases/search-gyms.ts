import { GymsRepository } from '@/repositories/gyms-repository'
import { Gym } from 'generated/prisma'

interface CreateGymUseCaseRequest {
  query: string
  page: number
}

interface CreateGymUseCaseResponse {
  gyms: Gym[]
}

export class SearchGymUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    query,
    page,
  }: CreateGymUseCaseRequest): Promise<CreateGymUseCaseResponse> {
    const gyms = await this.gymsRepository.searchMany(query, page)

    return { gyms }
  }
}
