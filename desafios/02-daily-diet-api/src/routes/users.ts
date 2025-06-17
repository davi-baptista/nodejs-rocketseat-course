import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { randomUUID } from 'node:crypto'
import { knex } from '../database'
import { checkSessionIdExists } from '../middlewares/check_session_id_exists'
import { checkUserAlreadyLogged } from '../middlewares/check_user_already_logged'

export async function userRoutes(app: FastifyInstance) {
  app.post(
    '/',
    { preHandler: [checkUserAlreadyLogged] },
    async (request, reply) => {
      const userSchema = z.object({
        name: z.string(),
        email: z.string(),
        password: z.string(),
      })

      const { name, email, password } = userSchema.parse(request.body)

      await knex('users').insert({
        id: randomUUID(),
        name,
        email,
        password,
      })
      return reply.status(201).send()
    },
  )

  app.post(
    '/login',
    { preHandler: [checkUserAlreadyLogged] },
    async (request, reply) => {
      const loginSchema = z.object({
        email: z.string(),
        password: z.string(),
      })

      const { email, password } = loginSchema.parse(request.body)

      const user = await knex('users').select('*').where('email', email).first()

      if (!user) {
        return reply.status(401).send({ message: 'User not found' })
      }

      if (user.password !== password) {
        return reply.status(401).send({ message: 'Incorrect password' })
      }

      reply.setCookie('sessionId', user.id, {
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 days
      })
    },
  )

  app.get(
    '/logout',
    {
      preHandler: [checkSessionIdExists],
    },
    async (request, reply) => {
      reply.clearCookie('sessionId')
      return reply.status(200).send({ message: 'Logout sucessful' })
    },
  )
}
