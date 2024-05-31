import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository"
import { SearchgGymsUseCase } from "../search-gyms"

// Centralizador de dependências do caso de uso Search Gyms
export function makeSearchGymsUseCase(){
    const gymsRepository = new PrismaGymsRepository()
    const useCase = new SearchgGymsUseCase(gymsRepository)

    return useCase
}