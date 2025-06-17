import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Register User (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register a user', async () => {
    const registerResponse = await request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'john@example.com',
      password: '123456',
      address: 'Street 1',
      phone: '123456789',
    })

    expect(registerResponse.statusCode).toEqual(201)
  })
})
