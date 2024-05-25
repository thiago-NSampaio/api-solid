import { FetchUserCheckInsHistoryUseCase } from "../fetch-user-check-ins-history"
import { PrimaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository"

// Centralizador de dependências do caso de uso Fetch User Check-Ins In History
export function makeFetchUserCheckInsInHistoryUseCase(){
    const checkInsRepository = new PrimaCheckInsRepository()
    const useCase = new FetchUserCheckInsHistoryUseCase(checkInsRepository)

    return useCase
}