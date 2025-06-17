import { Genrer, Pet, Portage, Prisma } from 'generated/prisma'
import { PetsRepository } from '../pets-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: randomUUID(),
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
    }

    this.items.push(pet)

    return pet
  }

  async searchManyAvailable(
    city: string,
    species?: string,
    age?: number,
    genrer?: Genrer,
    portage?: Portage,
  ) {
    const pets = this.items.filter((item) => {
      if (item.city.toLowerCase() !== city.toLowerCase()) return false
      if (item.adopted_at !== null) return false
      if (
        species &&
        !item.species.toLowerCase().includes(species.toLowerCase())
      )
        return false
      if (age !== undefined && item.age !== age) return false
      if (genrer && item.genrer !== genrer) return false
      if (portage && item.portage !== portage) return false

      return true
    })
    return pets
  }

  async findById(id: string) {
    return (
      this.items.find((item) => item.id === id && item.adopted_at === null) ??
      null
    )
  }
}
