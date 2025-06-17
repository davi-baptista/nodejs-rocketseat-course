import { GetUserMetricsUseCase } from '../get-user-metrics'
import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'

export function makeGetUserMetricsUseCase() {
  const checkInsepository = new PrismaCheckInsRepository()
  const UseCase = new GetUserMetricsUseCase(checkInsepository)

  return UseCase
}
