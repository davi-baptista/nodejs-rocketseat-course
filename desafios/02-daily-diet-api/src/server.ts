import fastify from 'fastify'
import cookie from '@fastify/cookie'

import { userRoutes } from './routes/users'
import { mealsRoutes } from './routes/meals'

const app = fastify()

app.register(cookie)
app.register(userRoutes, {
  prefix: '/users',
})
app.register(mealsRoutes, {
  prefix: '/meals',
})

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('HTTP Server Running! 3333')
  })
