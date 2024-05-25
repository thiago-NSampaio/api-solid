import { PrimaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository"
import { ValidateCheckInUseCase } from "../validate-check-in"

// Centralizador de dependências do caso de uso Validate Check-In
export function makeValidateCheckInUseCase(){
    const checkInsRepository = new PrimaCheckInsRepository()
    const useCase = new ValidateCheckInUseCase(checkInsRepository)

    return useCase
}