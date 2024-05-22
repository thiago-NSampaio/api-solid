import { CheckIn } from "@prisma/client"
import { CheckInsRepository } from "@/repositories/check-ins-repository"
import { GymsRepository } from "@/repositories/gyms-repository"
import { ResourceNotFoundError } from "./errors/resource-not-foun-error"
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-coordinates"
import { MaxDistanceError } from "./errors/max-distance-error"
import { MaxNumberOfCheckInsError } from "./errors/max-number-of-check-ins-error"

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

    async execute({userId,gymId,userLatitude,userLongitude}:CheckInUseCaseRequest):Promise<CheckInUseCaseResponse>{
        const gym = await this.gymsRepositoty.findById(gymId)

        if(!gym){
            throw new ResourceNotFoundError()
        }

        // calcular distância entre as o usuário e a academia
        const distance = getDistanceBetweenCoordinates(
            {latitude: userLatitude, longitude: userLongitude},
            {latitude: gym.latitude.toNumber(), longitude: gym.longitude.toNumber()}
        )

        const MAX_DISTANCE_IN_KILOMETERS = 0.1

        if(distance > MAX_DISTANCE_IN_KILOMETERS){
            throw new MaxDistanceError()
        }

        const checkInOnSameDate = await this.checkInsRepository.fyndByUserIdOnDate(userId, new Date)

        if(checkInOnSameDate){
            throw new MaxNumberOfCheckInsError()
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