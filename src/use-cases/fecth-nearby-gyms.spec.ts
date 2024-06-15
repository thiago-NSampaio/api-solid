import {expect, describe, it, beforeEach} from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsUseCase

describe('Fecth Nearby Gyms Use Case',()=>{
    beforeEach(()=>{
        gymsRepository = new InMemoryGymsRepository()
        sut = new FetchNearbyGymsUseCase(gymsRepository)
    })
    it('should be able to fetch nearby gyms', async () =>{
        await gymsRepository.create({
            title: 'Near Gym',
            latitude: -3.9930968,
            longitude: -9.9860592,
            phone: null,
            description: null
        })

        await gymsRepository.create({
            title: 'Far Gym',
            latitude: -3.9930968,
            longitude: -9.9860592,
            phone: null,
            description: null
        })

        const {gyms} = await sut.execute({
            userLatitude: -3.9930968,
            userLongitude: -9.9860592 
        })


        expect(gyms).toHaveLength(2)
        expect(gyms).toEqual([
            expect.objectContaining({title:'Near Gym'}),
            expect.objectContaining({title:'Far Gym'}),

        ])
    })

})