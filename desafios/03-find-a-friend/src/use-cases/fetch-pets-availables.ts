import { PetsRepository } from '@/repositories/pets-repository'
import { Pet, Portage, Genrer } from 'generated/prisma'

interface FetchPetsAvailableUseCaseRequest {
  city: string
  species?: string
  age?: number
  genrer?: Genrer
  portage?: Portage
}

interface FetchPetsAvailableUseCaseReply {
  pets: Pet[]
}

export class FetchPetsAvailableUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    city,
    species,
    age,
    genrer,
    portage,
  }: FetchPetsAvailableUseCaseRequest): Promise<FetchPetsAvailableUseCaseReply> {
    const pets = await this.petsRepository.searchManyAvailable(
      city,
      species,
      age,
      genrer,
      portage,
    )

    return { pets }
  }
}
