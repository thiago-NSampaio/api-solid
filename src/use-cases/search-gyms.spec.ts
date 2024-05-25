import {expect, describe, it, beforeEach} from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { SearchgGymsUseCase } from './search-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: SearchgGymsUseCase

describe('Search Gyms Use Case',()=>{
    beforeEach(()=>{
        gymsRepository = new InMemoryGymsRepository()
        sut = new SearchgGymsUseCase(gymsRepository)
    })
    it('should be able to search for gyms', async () =>{
        await gymsRepository.create({
            title: 'JS Gym',
            latitude: -2.9930968,
            longitude: -59.9860592,
            phone: null,
            description: null
        })

        await gymsRepository.create({
            title: 'Ts Gym',
            latitude: -2.9930968,
            longitude: -59.9860592,
            phone: null,
            description: null
        })

        const {gyms} = await sut.execute({
            query:'JS',
            page: 1
        })

        expect(gyms).toHaveLength(1)
        expect(gyms).toEqual([
            expect.objectContaining({title:'JS Gym'}),
        ])
    })

    it('should be able search paginated gyms', async () =>{
        for (let i=1; i <= 22; i++){
            await gymsRepository.create({
                title: `JS Gym ${i}`,
                latitude: -2.9930968,
                longitude: -59.9860592,
                phone: null,
                description: null
            })
        }
        
        const {gyms} = await sut.execute({
            query:'JS',
            page: 2
        })

        expect(gyms).toHaveLength(2)
        expect(gyms).toEqual([
            expect.objectContaining({title:'JS Gym 21'}),
            expect.objectContaining({title:'JS Gym 22'})
        ])
    })
})