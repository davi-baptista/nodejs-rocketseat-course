import { FastifyReply, FastifyRequest } from 'fastify'

export function checkUserAlreadyLogged(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { sessionId } = request.cookies

  if (sessionId) {
    return reply.status(401).send({
      message: 'You already logged',
    })
  }
}
