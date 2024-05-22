import {expect, describe, it, beforeEach} from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { CreateGymUseCase } from './create-gym'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { GetUserMetricsUseCase } from './get-user-metrics'

let checkInsRepository: InMemoryCheckInsRepository
let sut: GetUserMetricsUseCase

describe('Fecth User Check-in History Use Case',()=>{
    beforeEach(()=>{
        checkInsRepository = new InMemoryCheckInsRepository()
        sut = new GetUserMetricsUseCase(checkInsRepository)
    })
    it('should be able fecth check-in history', async () =>{
        await checkInsRepository.create({
            gym_id: 'gym-01',
            user_id: 'user-01'
        })

        await checkInsRepository.create({
            gym_id: 'gym-02',
            user_id: 'user-01'
        })

        const {checkInsCount} = await sut.execute({
            userId:'user-01',
        })

        expect(checkInsCount).toEqual(2)
    })

})