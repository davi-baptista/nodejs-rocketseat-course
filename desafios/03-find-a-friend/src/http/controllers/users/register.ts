import { makeRegisterUseCase } from '@/use-cases/factories/make-register-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const createUserBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    address: z.string(),
    phone: z.string(),
    role: z.enum(['ADMIN', 'MEMBER']).optional(),
  })

  const { name, email, password, address, phone, role } =
    createUserBodySchema.parse(request.body)

  const useCase = makeRegisterUseCase()

  await useCase.execute({
    name,
    email,
    password,
    address,
    phone,
    role: role ?? 'MEMBER',
  })

  return reply.status(201).send()
}
