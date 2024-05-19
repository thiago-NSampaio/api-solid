import { Prisma, CheckIn } from "@prisma/client"

export interface CheckInsRepository{
    create(data :Prisma.CheckInUncheckedCreateInput) : Promise<CheckIn>
    fyndByUserIdOnDate(userId: string, date: Date): Promise <CheckIn | null>
}