import { describe, it, expect, afterEach, beforeEach, vi } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInUseCase } from './check-in'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from 'generated/prisma/runtime/library'
import { MaxDistanceError } from './errors/max-distance-error'
import { MaxNumberOfCheckInsError } from './errors/max-number-of-check-ins-error'

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe('Check In Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(checkInsRepository, gymsRepository)

    await gymsRepository.create({
      id: 'gym-1',
      title: 'Academia 1',
      description: '',
      phone: '',
      latitude: new Decimal(-3.7421056),
      longitude: new Decimal(-38.5155072),
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-1',
      userId: 'user-1',
      UserLatitude: -3.7421056,
      UserLongitude: -38.5155072,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2025, 0, 1, 8, 0, 0))
    await sut.execute({
      gymId: 'gym-1',
      userId: 'user-1',
      UserLatitude: -3.7421056,
      UserLongitude: -38.5155072,
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-1',
        userId: 'user-1',
        UserLatitude: -3.7421056,
        UserLongitude: -38.5155072,
      }),
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
  })

  it('should be able to check in twice but in different days', async () => {
    vi.setSystemTime(new Date(2025, 0, 1, 8, 0, 0))
    await sut.execute({
      gymId: 'gym-1',
      userId: 'user-1',
      UserLatitude: -3.7421056,
      UserLongitude: -38.5155072,
    })

    vi.setSystemTime(new Date(2025, 0, 2, 8, 0, 0))
    const { checkIn } = await sut.execute({
      gymId: 'gym-1',
      userId: 'user-1',
      UserLatitude: -3.7421056,
      UserLongitude: -38.5155072,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in on distant academys', async () => {
    await expect(
      sut.execute({
        gymId: 'gym-1',
        userId: 'user-1',
        UserLatitude: -3.7955795,
        UserLongitude: -38.5430032,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError)
  })
})
