import { Prisma } from 'generated/prisma'
import { UsersRepository } from '../users-repository'
import { prisma } from '@/lib/prisma'

export class PrismaUsersRepository implements UsersRepository {
  async create(data: Prisma.UserCreateInput) {
    const user = prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password_hash: data.password_hash,
        address: data.address,
        phone: data.phone,
        created_at: new Date(),
        role: data.role ?? 'MEMBER',
      },
    })

    return user
  }

  async findById(id: string) {
    const user = prisma.user.findFirst({
      where: {
        id,
      },
    })

    return user
  }

  async findByEmail(email: string) {
    const user = prisma.user.findFirst({
      where: {
        email,
      },
    })

    return user
  }
}
