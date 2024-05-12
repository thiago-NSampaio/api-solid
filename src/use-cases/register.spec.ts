import {expect, describe, it} from 'vitest'
import { compare } from 'bcryptjs'
import { RegisterUseCase } from './register'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

describe('Register Use Case',()=>{
    it('shold be able to register', async () =>{
        const inMemoryUsersRepository = new InMemoryUsersRepository()
        const registerUseCase = new RegisterUseCase(inMemoryUsersRepository)

            const {user} = await registerUseCase.execute({
            name:'Jonh Doe',
            email: 'jonhdoe@email.com',
            password: '123456'
        })
        expect(user.id).toEqual(expect.any(String))
    })

    // Teste unitário para verificar se a senha do usuário é hasheada
    it('shold hash user password upon registration', async () =>{
        const inMemoryUsersRepository = new InMemoryUsersRepository()
        const registerUseCase = new RegisterUseCase(inMemoryUsersRepository)

            const {user} = await registerUseCase.execute({
            name:'Jonh Doe',
            email: 'jonhdoe@email.com',
            password: '123456'
        })

        const isPasswordCorrectlyHashed = await compare('123456', user.password_hash)
        expect(isPasswordCorrectlyHashed).toBe(true)
    })
    
    it('shold not be able to register with same email thice', async () =>{
        const inMemoryUsersRepository = new InMemoryUsersRepository()
        const registerUseCase = new RegisterUseCase(inMemoryUsersRepository)

        const email = 'jonhdoe@email.com'

        await registerUseCase.execute({
            name:'Jonh Doe',
            email,
            password: '123456'
        })

        expect(()=> 
            registerUseCase.execute({
                name:'Jonh Doe',
                email,
                password: '123456'
        })).rejects.toBeInstanceOf(UserAlreadyExistsError)
    })
})