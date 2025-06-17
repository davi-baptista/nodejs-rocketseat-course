import fastifyJwt from '@fastify/jwt'
import fastifyCookie from '@fastify/cookie'
import fastify from 'fastify'
import { petsRoutes } from './http/controllers/pets/routes'
import { usersRoutes } from './http/controllers/users/routes'
import { ZodError } from 'zod'
import { env } from './env'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '10m',
  },
})

app.register(fastifyCookie)

app.register(petsRoutes, {
  prefix: 'pets',
})

app.register(usersRoutes, {
  prefix: 'users',
})

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // DogData, etc...
  }

  return reply.status(500).send({ message: 'Internal server error.' })
})
