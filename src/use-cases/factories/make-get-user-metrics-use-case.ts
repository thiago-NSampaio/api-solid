import { GetUserMetricsUseCase } from "../get-user-metrics"
import { PrimaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository"

// Centralizador de dependências do caso de uso Get User Metrics
export function makeGetUserMetricsUseCase(){
    const checkInsRepository = new PrimaCheckInsRepository()
    const useCase = new GetUserMetricsUseCase(checkInsRepository)

    return useCase
}