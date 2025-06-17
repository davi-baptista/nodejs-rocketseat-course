import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Create Pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a pet', async () => {
    const { token } = await createAndAuthenticateUser(app, true)

    const petResponse = await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Teste',
        species: 'Dog',
        age: 10,
        genrer: 'MALE',
        portage: 'SMALL',
        city: 'Fortaleza',
        description: '',
      })

    expect(petResponse.statusCode).toEqual(201)
  })
})
