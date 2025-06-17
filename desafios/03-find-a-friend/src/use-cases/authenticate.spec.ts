import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthenticateUseCase } from './authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(usersRepository)
  })

  it('should be able to authenticate', async () => {
    await usersRepository.create({
      name: 'John',
      email: 'john@example.com',
      password_hash: await hash('123456', 6),
      address: 'Rua 1',
      phone: '123456789',
      role: 'ADMIN',
    })

    const { user } = await sut.execute({
      email: 'john@example.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    await usersRepository.create({
      name: 'John',
      email: 'john@example.com',
      password_hash: await hash('123456', 6),
      address: 'Rua 1',
      phone: '123456789',
      role: 'ADMIN',
    })

    await expect(() =>
      sut.execute({
        email: 'wrong_email@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await usersRepository.create({
      name: 'John',
      email: 'john@example.com',
      password_hash: await hash('123456', 6),
      address: 'Rua 1',
      phone: '123456789',
      role: 'ADMIN',
    })

    await expect(() =>
      sut.execute({
        email: 'john@example.com',
        password: 'wrong_password',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
