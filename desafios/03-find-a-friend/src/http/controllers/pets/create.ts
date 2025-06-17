import { makeCreatePetUseCase } from '@/use-cases/factories/make-create-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createPetBodySchema = z.object({
    name: z.string(),
    species: z.string(),
    age: z.number(),
    genrer: z.enum(['MALE', 'FEMALE']),
    portage: z.enum(['SMALL', 'MEDIUM', 'LARGE']),
    city: z.string(),
    description: z.string().nullable(),
  })

  const { name, species, age, genrer, portage, city, description } =
    createPetBodySchema.parse(request.body)

  const useCase = makeCreatePetUseCase()

  await useCase.execute({
    name,
    species,
    age,
    genrer,
    portage,
    city,
    description,
    orgId: request.user.sub,
  })

  return reply.status(201).send()
}
