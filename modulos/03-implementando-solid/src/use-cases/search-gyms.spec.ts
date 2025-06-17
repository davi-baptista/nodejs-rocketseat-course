import { describe, it, expect, beforeEach } from 'vitest'
import { SearchGymUseCase } from './search-gyms'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'

let searchGymRepository: InMemoryGymsRepository
let sut: SearchGymUseCase

describe('Search Gym Use Case', () => {
  beforeEach(async () => {
    searchGymRepository = new InMemoryGymsRepository()
    sut = new SearchGymUseCase(searchGymRepository)
  })

  it('should be able to search gym', async () => {
    await searchGymRepository.create({
      title: 'NodeJs Gym',
      description: 'A gym for JavaScript enthusiasts',
      phone: '123456789',
      latitude: -23.5505,
      longitude: -46.6333,
    })

    await searchGymRepository.create({
      title: 'JavaScript Gym',
      description: 'A gym for JavaScript enthusiasts',
      phone: '123456789',
      latitude: -23.5505,
      longitude: -46.6333,
    })

    const { gyms } = await sut.execute({
      query: 'NodeJs',
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'NodeJs Gym' })])
  })

  it('should be able to fetch paginated user check ins history', async () => {
    for (let i = 1; i <= 22; i++) {
      await searchGymRepository.create({
        title: `NodeJs Gym ${i}`,
        description: 'A gym for JavaScript enthusiasts',
        phone: '123456789',
        latitude: -23.5505,
        longitude: -46.6333,
      })
    }

    const { gyms } = await sut.execute({
      query: 'NodeJs Gym',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'NodeJs Gym 21' }),
      expect.objectContaining({ title: 'NodeJs Gym 22' }),
    ])
  })
})
