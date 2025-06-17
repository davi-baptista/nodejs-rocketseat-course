import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { RegisterUseCase } from './register'

let usersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(usersRepository)
  })

  it('should be able to register a user', async () => {
    const { user } = await sut.execute({
      name: 'John',
      email: 'John@example.com',
      password: '123456',
      address: 'Rua 1',
      phone: '123456789',
      role: 'MEMBER',
    })

    expect(user.id).toEqual(expect.any(String))
    expect(user.role).toEqual('MEMBER')
  })

  it('should be able to register a org', async () => {
    const { user } = await sut.execute({
      name: 'John',
      email: 'John@example.com',
      password: '123456',
      address: 'Rua 1',
      phone: '123456789',
      role: 'ADMIN',
    })

    expect(user.id).toEqual(expect.any(String))
    expect(user.role).toEqual('ADMIN')
  })
})
