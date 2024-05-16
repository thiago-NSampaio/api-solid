import { CheckIn } from "@prisma/client"
import { CheckInsRepository } from "@/repositories/check-ins-repository"

interface CheckinUseCaseRequest {
    userId: string
    gymId: string
}

interface CheckinUseCaseResponse {
    checkIn: CheckIn
}

export class CheckInUseCase{
    constructor(private checkInsRepository:CheckInsRepository){}

    async execute({userId,gymId}:CheckinUseCaseRequest):Promise<CheckinUseCaseResponse>{
        const checkIn = await this.checkInsRepository.create({
            user_id: userId,
            gym_id: gymId
        })

        return {
            checkIn,
        }
    }
}