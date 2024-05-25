import { PrimaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository"
import { ValidateCheckInUseCase } from "../validate-check-in"

// Centralizador de dependências do caso de uso Search Gyms
export function makeSearchGymsUseCase(){
    const checkInsRepository = new PrimaCheckInsRepository()
    const useCase = new ValidateCheckInUseCase(checkInsRepository)

    return useCase
}