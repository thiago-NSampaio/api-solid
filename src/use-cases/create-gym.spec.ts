import {expect, describe, it, beforeEach} from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { CreateGymUseCase } from './create-gym'

let gymsRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe('Create Gym Use Case',()=>{
    beforeEach(()=>{
        gymsRepository = new InMemoryGymsRepository()
        sut = new CreateGymUseCase(gymsRepository)
    })
    it('should be able create gym', async () =>{
        const {gym} = await sut.execute({
            title: 'JS Gym',
            latitude: -2.9930968,
            longitude: -59.9860592,
            phone: null,
            description: null
        })

        expect(gym.id).toEqual(expect.any(String))
    })


})