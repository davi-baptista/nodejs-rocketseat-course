import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { describe, it, expect, beforeEach } from 'vitest'
import { CreatePetUseCase } from './create-pet'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let petsRepository: InMemoryPetsRepository
let usersRepository: InMemoryUsersRepository
let sut: CreatePetUseCase

describe('Create Pet Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    usersRepository = new InMemoryUsersRepository()
    sut = new CreatePetUseCase(petsRepository, usersRepository)
  })

  it('should be able to create a pet', async () => {
    const org = await usersRepository.create({
      name: 'John',
      email: 'john@example.com',
      password_hash: '123456',
      address: 'Rua 1',
      phone: '123456789',
      role: 'ADMIN',
    })

    const { pet } = await sut.execute({
      name: 'Pet 1',
      genrer: 'MALE',
      species: 'Dog',
      age: 1,
      portage: 'SMALL',
      city: 'City 1',
      description: '',
      orgId: org.id,
    })

    expect(pet.id).toEqual(expect.any(String))
  })

  it('should not be able to create a pet with non existence org_id', async () => {
    await expect(
      sut.execute({
        name: 'Pet 1',
        genrer: 'MALE',
        species: 'Dog',
        age: 1,
        portage: 'SMALL',
        city: 'City 1',
        description: '',
        orgId: '123',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
