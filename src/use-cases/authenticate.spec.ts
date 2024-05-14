import {expect, describe, it, beforeEach} from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthenticateUseCase } from './authenticate'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe('Register Use Case',()=>{
    beforeEach(()=>{
        usersRepository = new InMemoryUsersRepository()
        sut = new AuthenticateUseCase(usersRepository)
    })
    it('should be able to autenticate', async () =>{
        

        await usersRepository.create({
            name: 'Jonh Doe',
            email: 'jonhdoe@example.com',
            password_hash: await hash('123456', 6)
        })

        const {user} = await sut.execute({
            email: 'jonhdoe@example.com',
            password: '123456'
        })
        expect(user.id).toEqual(expect.any(String))
    })

    it('should not be able to autenticate with wrong email', async () =>{
       

        expect(() => sut.execute({
            email: 'jonhdoe@example.com',
            password: '123456'
        })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
    })

    it('should not be able to autenticate with wrong password', async () =>{
        

        await usersRepository.create({
            name: 'Jonh Doe',
            email: 'jonhdoe@example.com',
            password_hash: await hash('123456',6)
        })

        expect(() => sut.execute({
            email: 'jonhdoe@example.com',
            password: '1tfy23456'
        })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
    })
})