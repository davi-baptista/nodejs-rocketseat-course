import { CheckIn, Prisma } from 'generated/prisma'

export interface CheckInsRepository {
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>

  findById(id: string): Promise<CheckIn | null>

  countByUserId(userId: string): Promise<number>

  findManyCheckInsByUserId(userId: string, page: number): Promise<CheckIn[]>

  findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>

  save(checkIn: CheckIn): Promise<CheckIn>
}
