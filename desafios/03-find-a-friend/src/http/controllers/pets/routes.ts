import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { create } from './create'
import { FastifyInstance } from 'fastify'
import { verifyUserRole } from '@/http/middlewares/verify-user-role'
import { fetchPetsAvailable } from './fetch-availables'
import { searchPet } from './search'

export function petsRoutes(app: FastifyInstance) {
  app.get('/availables', fetchPetsAvailable)

  app.get('/:petId', searchPet)

  app.post('/', { onRequest: [verifyJWT, verifyUserRole('ADMIN')] }, create)
}
