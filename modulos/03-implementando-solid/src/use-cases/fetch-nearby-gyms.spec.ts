import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsUseCase

describe('Fetch Nearby Gym Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsUseCase(gymsRepository)
  })

  it('should be able to fetch nearby gyms', async () => {
    await gymsRepository.create({
      title: 'Nearby Gym',
      description: 'A gym for JavaScript enthusiasts',
      phone: '123456789',
      latitude: -23.5505,
      longitude: -46.6333,
    })

    await gymsRepository.create({
      title: 'Distant Gym',
      description: 'A gym for JavaScript enthusiasts',
      phone: '123456789',
      latitude: -3.7742733,
      longitude: -38.6415236,
    })

    const { gyms } = await sut.execute({
      userLatitude: -23.5505,
      userLongitude: -46.6333,
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Nearby Gym' })])
  })

  it('should be able to fetch paginated nearby gyms', async () => {
    for (let i = 1; i <= 21; i++) {
      await gymsRepository.create({
        title: 'Nearby Gym',
        description: 'A gym for JavaScript enthusiasts',
        phone: '123456789',
        latitude: -23.5505,
        longitude: -46.6333,
      })
    }

    await gymsRepository.create({
      title: 'Distant Gym',
      description: 'A gym for JavaScript enthusiasts',
      phone: '123456789',
      latitude: -3.7742733,
      longitude: -38.6415236,
    })

    const { gyms } = await sut.execute({
      userLatitude: -23.5505,
      userLongitude: -46.6333,
      page: 2,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Nearby Gym' })])
  })
})
