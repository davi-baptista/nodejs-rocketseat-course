import { FastifyInstance } from 'fastify'
import { verifyJWT } from '../../middlewares/verify-jwt'
import { history } from './history'
import { metrics } from './metrics'
import { validate } from './validate'
import { verifyUserRole } from '@/http/middlewares/verify-user-role'

export function checkInsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.get('/history', history)
  app.get('/metrics', metrics)

  app.patch(
    '/:checkInId/validate',
    { onRequest: [verifyUserRole('ADMIN')] },
    validate,
  )
}
