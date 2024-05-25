import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository"
import { CreateGymUseCase } from "../create-gym"

// Centralizador de dependências do caso de uso Fetch Nearby Gyms
export function makeFetchNearbyGymsUseCase(){
    const gymsRepository = new PrismaGymsRepository()
    const useCase = new CreateGymUseCase(gymsRepository)

    return useCase
}