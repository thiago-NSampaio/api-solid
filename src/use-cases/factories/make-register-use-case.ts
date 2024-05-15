import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repositories"
import { RegisterUseCase } from "../register"

// Centralizador de dependências do caso de uso Register
export function makeRegisterUseCase(){
    const usersRepository = new PrismaUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    return registerUseCase
}