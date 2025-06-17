import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { CreatePetUseCase } from '../create-pet'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'

export function makeCreatePetUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const usersRepository = new PrismaUsersRepository()
  const useCase = new CreatePetUseCase(petsRepository, usersRepository)

  return useCase
}
