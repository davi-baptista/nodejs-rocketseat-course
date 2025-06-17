import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { describe, it, expect, beforeEach } from 'vitest'
import { FetchPetsAvailableUseCase } from './fetch-pets-availables'

let petsRepository: InMemoryPetsRepository
let sut: FetchPetsAvailableUseCase

describe('Fetch Pets Available Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new FetchPetsAvailableUseCase(petsRepository)
  })

  it('should be to fetch available pets in city', async () => {
    await petsRepository.create({
      name: 'Pet 1',
      genrer: 'MALE',
      species: 'Dog',
      age: 1,
      portage: 'SMALL',
      city: 'City 1',
      org_id: '123',
    })

    await petsRepository.create({
      name: 'Pet 2',
      genrer: 'MALE',
      species: 'Dog',
      age: 1,
      portage: 'SMALL',
      city: 'City 2',
      org_id: '123',
    })

    const { pets } = await sut.execute({
      city: 'City 1',
    })

    expect(pets).toHaveLength(1)
    expect(pets[0].name).toEqual('Pet 1')
  })

  it('should be to fetch pets in city with specify characters', async () => {
    await petsRepository.create({
      name: 'Pet 1',
      genrer: 'MALE',
      species: 'Dog',
      age: 1,
      portage: 'SMALL',
      city: 'City 1',
      org_id: '123',
    })

    await petsRepository.create({
      name: 'Pet 2',
      genrer: 'MALE',
      species: 'Cat',
      age: 1,
      portage: 'SMALL',
      city: 'City 1',
      org_id: '123',
    })

    const { pets } = await sut.execute({
      city: 'City 1',
      species: 'Dog',
    })

    expect(pets).toHaveLength(1)
    expect(pets[0].name).toEqual('Pet 1')
  })
})
