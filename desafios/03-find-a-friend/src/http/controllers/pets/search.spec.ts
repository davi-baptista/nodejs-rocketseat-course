import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Fetch Availables Pets (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to search pet', async () => {
    const { token, user } = await createAndAuthenticateUser(app, true)

    const petCreated = await prisma.pet.create({
      data: {
        name: 'Dog 01',
        species: 'Dog',
        age: 5,
        genrer: 'MALE',
        portage: 'SMALL',
        city: 'Fortaleza',
        description: '',
        org_id: user.id,
      },
    })

    const searchResponse = await request(app.server)
      .get(`/pets/${petCreated.id}`)
      .set('Authorization', `Bearer ${token}`)

    expect(searchResponse.statusCode).toEqual(200)
    expect(searchResponse.body.pet).toEqual(
      expect.objectContaining({
        name: 'Dog 01',
      }),
    )
  })
})
