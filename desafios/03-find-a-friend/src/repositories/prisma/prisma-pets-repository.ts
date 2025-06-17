import { Genrer, Portage, Prisma } from 'generated/prisma'
import { PetsRepository } from '../pets-repository'
import { prisma } from '@/lib/prisma'

export class PrismaPetsRepository implements PetsRepository {
  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = prisma.pet.create({
      data: {
        name: data.name,
        genrer: data.genrer,
        species: data.species,
        age: data.age,
        portage: data.portage,
        city: data.city,
        org_id: data.org_id,
        adopter_id: data.adopter_id ?? null,
        adopted_at: data.adopted_at ? new Date(data.adopted_at) : null,
        description: data.description ?? null,
      },
    })

    return pet
  }

  async searchManyAvailable(
    city: string,
    species?: string,
    age?: number,
    genrer?: Genrer,
    portage?: Portage,
  ) {
    const pets = prisma.pet.findMany({
      where: {
        city: {
          contains: city,
          mode: 'insensitive',
        },

        adopted_at: null,

        ...(portage && { portage }),

        ...(genrer && { genrer }),

        ...(age !== undefined && { age }),

        ...(species && {
          species: {
            contains: species,
            mode: 'insensitive',
          },
        }),
      },
    })

    return pets
  }

  async findById(id: string) {
    const pet = prisma.pet.findFirst({
      where: {
        id,
        adopted_at: null,
      },
    })

    return pet
  }
}
