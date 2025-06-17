import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { SearchPetUseCase } from '../search-pet'

export function makeSearchPetUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const useCase = new SearchPetUseCase(petsRepository)

  return useCase
}
