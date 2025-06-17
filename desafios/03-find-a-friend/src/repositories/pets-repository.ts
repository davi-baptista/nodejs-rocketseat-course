import { Genrer, Pet, Portage, Prisma } from 'generated/prisma'

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>

  searchManyAvailable(
    city: string,
    species?: string,
    age?: number,
    genrer?: Genrer,
    portage?: Portage,
  ): Promise<Pet[]>

  findById(id: string): Promise<Pet | null>
}
