import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { hash } from 'bcryptjs'
import { prisma } from '@/lib/prisma'

describe('Authenticate User (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to authenticate a user', async () => {
    await prisma.user.create({
      data: {
        name: 'John Doe',
        email: 'john@example.com',
        password_hash: await hash('123456', 6),
        address: 'Fortaleza',
        phone: '123456789',
      },
    })

    const authResponse = await request(app.server)
      .post('/users/sessions')
      .send({
        email: 'john@example.com',
        password: '123456',
      })

    expect(authResponse.statusCode).toEqual(200)
    expect(authResponse.body).toEqual({ token: expect.any(String) })
  })
})
