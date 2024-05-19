import { CheckIn } from "@prisma/client"
import { CheckInsRepository } from "@/repositories/check-ins-repository"
import { GymsRepository } from "@/repositories/gyms-repository"
import { ResourceNotFoundError } from "./errors/resource-not-foun-error"

interface CheckInUseCaseRequest {
    userId: string
    gymId: string
    userLatitude: number
    userLongitude: number
}

interface CheckInUseCaseResponse {
    checkIn: CheckIn
}

export class CheckInUseCase{
    constructor(private checkInsRepository:CheckInsRepository,
        private gymsRepositoty: GymsRepository
    ){}

    async execute({userId,gymId}:CheckInUseCaseRequest):Promise<CheckInUseCaseResponse>{
        const gym = await this.gymsRepositoty.findById(gymId)

        if(!gym){
            throw new ResourceNotFoundError()
        }

        // calcular distância entre as academias

        const checkInOnSameDate = await this.checkInsRepository.fyndByUserIdOnDate(userId, new Date)

        if(checkInOnSameDate){
            throw new Error()
        }

        const checkIn = await this.checkInsRepository.create({
            user_id: userId,
            gym_id: gymId
        })

        return {
            checkIn,
        }
    }
}