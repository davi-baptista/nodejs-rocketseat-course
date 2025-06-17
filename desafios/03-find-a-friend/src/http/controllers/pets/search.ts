import { makeSearchPetUseCase } from '@/use-cases/factories/make-search-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function searchPet(request: FastifyRequest, reply: FastifyReply) {
  const searchPetParamsSchema = z.object({
    petId: z.string(),
  })
  const { petId } = searchPetParamsSchema.parse(request.params)

  const useCase = makeSearchPetUseCase()

  const { pet } = await useCase.execute({
    id: petId,
  })

  return reply.status(200).send({ pet })
}
