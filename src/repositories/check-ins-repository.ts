import { Prisma, CheckIn } from "@prisma/client"

export interface CheckInsRepository{
    create(data :Prisma.CheckInUncheckedCreateInput) : Promise<CheckIn>
    fyndByUserIdOnDate(userid: string, date: Date): Promise <CheckIn | null>
}