import { makeFetchPetsAvailableUseCase } from '@/use-cases/factories/make-fetch-pets-available'
import { FastifyReply, FastifyRequest } from 'fastify'
import { Genrer, Portage } from 'generated/prisma'
import { z } from 'zod'

export async function fetchPetsAvailable(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const fetchAvailableQuerySchema = z.object({
    city: z.string(),
    species: z.string().optional(),
    age: z.coerce.number().optional(),
    genrer: z.nativeEnum(Genrer).optional(),
    portage: z.nativeEnum(Portage).optional(),
  })
  const { city, species, age, genrer, portage } =
    fetchAvailableQuerySchema.parse(request.query)

  const useCase = makeFetchPetsAvailableUseCase()

  const { pets } = await useCase.execute({
    city,
    species,
    age,
    genrer,
    portage,
  })

  return reply.status(200).send({ pets })
}
