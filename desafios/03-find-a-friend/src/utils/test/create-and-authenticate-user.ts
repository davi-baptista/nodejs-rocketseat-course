import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateUser(
  app: FastifyInstance,
  isAdmin = false,
) {
  const user = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'john@example.com',
      password_hash: await hash('123456', 6),
      address: 'Fortaleza',
      phone: '1234567890',
      role: isAdmin ? 'ADMIN' : 'MEMBER',
    },
  })

  const authResponse = await request(app.server).post('/users/sessions').send({
    email: 'john@example.com',
    password: '123456',
  })

  return {
    token: authResponse.body.token,
    cookies: authResponse.get('Set-Cookie') ?? [],
    user,
  }
}
