import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { describe, it, expect, beforeEach } from 'vitest'
import { SearchPetUseCase } from './search-pet'

let petsRepository: InMemoryPetsRepository
let sut: SearchPetUseCase

describe('Get Pet Details Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new SearchPetUseCase(petsRepository)
  })

  it('should be able to get pet details', async () => {
    const createdPet = await petsRepository.create({
      name: 'Pet 1',
      genrer: 'MALE',
      species: 'Dog',
      age: 1,
      portage: 'SMALL',
      city: 'City 1',
      org_id: '123',
    })

    const { pet } = await sut.execute({
      id: createdPet.id,
    })

    expect(pet.id).toEqual(createdPet.id)
  })
})
