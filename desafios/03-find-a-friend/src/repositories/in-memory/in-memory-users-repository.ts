import { User, Prisma } from 'generated/prisma'
import { randomUUID } from 'node:crypto'
import { UsersRepository } from '../users-repository'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      address: data.address,
      phone: data.phone,
      created_at: new Date(),
      role: data.role ?? 'MEMBER',
    }

    this.items.push(user)

    return user
  }

  async findById(id: string) {
    const user = this.items.find((item) => item.id === id)

    return user ?? null
  }

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email)

    return user ?? null
  }
}
