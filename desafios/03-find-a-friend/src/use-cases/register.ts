import { UsersRepository } from '@/repositories/users-repository'
import { User, Role } from 'generated/prisma'
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
  address: string
  phone: string
  role: Role
}

interface RegisterUseCaseReply {
  user: User
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    email,
    password,
    address,
    phone,
    role,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseReply> {
    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    const password_hash = await hash(password, 6)

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
      address,
      phone,
      role,
    })

    return { user }
  }
}
