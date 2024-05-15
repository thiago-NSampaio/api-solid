import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repositories"
import { AuthenticateUseCase } from "../authenticate"

// Centralizador de dependências do caso de uso Authenticate
export function makeAuthenticateUseCase(){
    const usersRepository = new PrismaUsersRepository()
    const authenticateUseCase = new AuthenticateUseCase(usersRepository)

    return authenticateUseCase
}