import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repositories"
import { GetUserProfileUseCase } from "../get-user-profile"

// Centralizador de dependências do caso de uso Get User Profile
export function makeGetUserProfileUseCase(){
    const usersRepository = new PrismaUsersRepository()
    const useCase = new GetUserProfileUseCase(usersRepository)

    return useCase
}