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

  it('should be able to fetch available pets by categories', async () => {
    const { token, user } = await createAndAuthenticateUser(app, true)

    await prisma.pet.create({
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

    await prisma.pet.create({
      data: {
        name: 'Cat 01',
        species: 'Cat',
        age: 5,
        genrer: 'MALE',
        portage: 'SMALL',
        city: 'Fortaleza',
        description: '',
        org_id: user.id,
      },
    })

    const petResponse = await request(app.server)
      .get('/pets/availables')
      .set('Authorization', `Bearer ${token}`)
      .query({
        city: 'Fortaleza',
        species: 'Cat',
      })

    expect(petResponse.statusCode).toEqual(200)
    expect(petResponse.body.pets).toHaveLength(1)
    expect(petResponse.body.pets[0]).toEqual(
      expect.objectContaining({
        name: 'Cat 01',
      }),
    )
  })
})
