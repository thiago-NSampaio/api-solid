import {expect, describe, it, beforeEach, afterEach, vi} from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInUseCase } from './check-in'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe('Check-in Use Case',()=>{
    beforeEach(()=>{
        checkInsRepository = new InMemoryCheckInsRepository()
        gymsRepository = new InMemoryGymsRepository()
        sut = new CheckInUseCase(checkInsRepository, gymsRepository)

        gymsRepository.items.push({
            id: 'gym-01',
            title: 'Js gym',
            description: '',
            phone: '',
            latitute: new Decimal(0),
            longitude: new Decimal(0),
        })

        // Mocking de datas
        vi.useRealTimers()
    })

    afterEach(()=>{
        vi.useRealTimers()
    })

    it('should be able to check in', async () =>{

        const {checkIn} = await sut.execute({
          gymId:'gym-01',
          userId: 'user-01',
          userLatitude: -2.9930968,
          userLongitude: -59.9860592
        })

        expect(checkIn.id).toEqual(expect.any(String))
    })

    it('should be able to check in twice in the same day', async () =>{
        vi.setSystemTime(new Date(2022, 0, 20, 4, 0, 0))
        await sut.execute({
            gymId:'gym-01',
            userId: 'user-01',
            userLatitude: -2.9930968,
            userLongitude: -59.9860592
          })

        expect(()=>
            sut.execute({
                gymId: 'gym-01',
                userId: 'user-01',
                userLatitude: -2.9930968,
                userLongitude: -59.9860592
            })
        ).rejects.toBeInstanceOf(Error)
    })

    it('should be able to check in twice but in different days', async () =>{
        vi.setSystemTime(new Date(2022, 0, 20, 4, 0, 0))
        await sut.execute({
            gymId:'gym-01',
            userId: 'user-01',
            userLatitude: -2.9930968,
            userLongitude: -59.9860592
          })

        vi.setSystemTime(new Date(2022, 0, 23, 9, 0, 0))

        const {checkIn} =  await sut.execute({
            gymId:'gym-01',
            userId: 'user-01',
            userLatitude: -2.9930968,
            userLongitude: -59.9860592
          })

        expect(checkIn.id).toEqual(expect.any(String))
    })
})