import { authenticate } from './authenticate'
import { refresh } from './refresh'
import { register } from './register'
import { FastifyInstance } from 'fastify'

export function usersRoutes(app: FastifyInstance) {
  app.patch('/refresh', refresh)
  app.post('/', register)
  app.post('/sessions', authenticate)
}
