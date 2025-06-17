import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from 'generated/prisma'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface SearchPetUseCaseRequest {
  id: string
}

interface SearchPetUseCaseReply {
  pet: Pet
}

export class SearchPetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    id,
  }: SearchPetUseCaseRequest): Promise<SearchPetUseCaseReply> {
    const pet = await this.petsRepository.findById(id)

    if (!pet) {
      throw new ResourceNotFoundError()
    }

    return { pet }
  }
}
