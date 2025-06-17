import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Refresh Token (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to refresh a token', async () => {
    const { cookies } = await createAndAuthenticateUser(app)

    const registerResponse = await request(app.server)
      .patch('/users/refresh')
      .set('Cookie', cookies)

    expect(registerResponse.statusCode).toEqual(200)
    expect(registerResponse.body).toEqual({ token: expect.any(String) })
    expect(registerResponse.get('Set-Cookie')).toEqual([
      expect.stringContaining('refreshToken='),
    ])
  })
})
