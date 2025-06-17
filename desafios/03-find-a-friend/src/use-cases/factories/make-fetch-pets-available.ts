import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { FetchPetsAvailableUseCase } from '../fetch-pets-availables'

export function makeFetchPetsAvailableUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const useCase = new FetchPetsAvailableUseCase(petsRepository)

  return useCase
}
