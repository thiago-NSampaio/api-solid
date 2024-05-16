import {expect, describe, it, beforeEach} from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInUseCase } from './check-in'

let checkInsRepository: InMemoryCheckInsRepository
let sut: CheckInUseCase

describe('Check-in Use Case',()=>{
    beforeEach(()=>{
        checkInsRepository = new InMemoryCheckInsRepository()
        sut = new CheckInUseCase(checkInsRepository)
    })
    it('should be able to get user check in', async () =>{
        const checkIn = await checkInsRepository.create({
          user_id: 'user-01',
          gym_id: 'gym-01'
        })

        expect(checkIn.id).toEqual(expect.any(String))
    })
})