import { PetsRepository } from '@/repositories/pets-repository'
import { UsersRepository } from '@/repositories/users-repository'
import { Genrer, Pet, Portage } from 'generated/prisma'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface CreatePetUseCaseRequest {
  name: string
  genrer: Genrer
  species: string
  age: number
  portage: Portage
  city: string
  description: string | null
  orgId: string
}

interface CreatePetUseCaseReply {
  pet: Pet
}

export class CreatePetUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private usersRepository: UsersRepository,
  ) {}

  async execute({
    name,
    genrer,
    species,
    age,
    portage,
    city,
    description,
    orgId,
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseReply> {
    const org = await this.usersRepository.findById(orgId)

    if (!org) {
      throw new ResourceNotFoundError()
    }

    const pet = await this.petsRepository.create({
      name,
      genrer,
      species,
      age,
      portage,
      city,
      org_id: orgId,
      description,
    })

    return { pet }
  }
}
