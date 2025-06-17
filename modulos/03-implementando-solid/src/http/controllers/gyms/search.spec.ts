import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/tests/create-and-authenticate-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Search Gym (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to search a gym', async () => {
    const { token } = await createAndAuthenticateUser(app, true)

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Java Gym',
        description: 'gym',
        phone: '123456789',
        latitude: -23.5505,
        longitude: -46.6333,
      })

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Node Gym',
        description: 'gym',
        phone: '123456789',
        latitude: -23.5505,
        longitude: -46.6333,
      })

    const searchGymResponse = await request(app.server)
      .get('/gyms/search')
      .query({
        q: 'Node',
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(searchGymResponse.statusCode).toEqual(200)
    expect(searchGymResponse.body.gyms).toHaveLength(1)
    expect(searchGymResponse.body.gyms).toEqual([
      expect.objectContaining({ title: 'Node Gym' }),
    ])
  })
})
