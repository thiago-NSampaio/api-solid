import {expect, describe, it} from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthenticateUseCase } from './authenticate'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

describe('Register Use Case',()=>{
    it('should be able to autenticate', async () =>{
        const usersRepository = new InMemoryUsersRepository()
        const stu = new AuthenticateUseCase(usersRepository)

        await usersRepository.create({
            name: 'Jonh Doe',
            email: 'jonhdoe@example.com',
            password_hash: await hash('123456', 6)
        })

        const {user} = await stu.execute({
            email: 'jonhdoe@example.com',
            password: '123456'
        })
        expect(user.id).toEqual(expect.any(String))
    })

    it('should not be able to autenticate with wrong email', async () =>{
        const usersRepository = new InMemoryUsersRepository()
        const stu = new AuthenticateUseCase(usersRepository)

        expect(() => stu.execute({
            email: 'jonhdoe@example.com',
            password: '123456'
        })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
    })

    it('should not be able to autenticate with wrong password', async () =>{
        const usersRepository = new InMemoryUsersRepository()
        const stu = new AuthenticateUseCase(usersRepository)

        await usersRepository.create({
            name: 'Jonh Doe',
            email: 'jonhdoe@example.com',
            password_hash: await hash('123456',6)
        })

        expect(() => stu.execute({
            email: 'jonhdoe@example.com',
            password: '1tfy23456'
        })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
    })
})