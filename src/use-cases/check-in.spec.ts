import {expect, describe, it, beforeEach, afterEach, vi} from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInUseCase } from './check-in'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { MaxNumberOfCheckInsError } from './errors/max-number-of-check-ins-error'
import { MaxDistanceError } from './errors/max-distance-error'

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe('Check-in Use Case',()=>{
    beforeEach(async()=>{
        checkInsRepository = new InMemoryCheckInsRepository()
        gymsRepository = new InMemoryGymsRepository()
        sut = new CheckInUseCase(checkInsRepository, gymsRepository)

        await gymsRepository.create({
            id: 'gym-01',
            title: 'Js gym',
            description: '',
            phone: '',
            latitude: -2.9930968,
            longitude: -59.9860592,
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
        ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
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

    it('should not be able to check in on distant gym', async () =>{
        gymsRepository.items.push({
            id: 'gym-02',
            title: 'Js gym',
            description: '',
            phone: '',
            latitude: new Decimal(-3.0295326),
            longitude: new Decimal(-59.9744248),
        })

        expect(()=>
            sut.execute({
                gymId:'gym-02',
                userId: 'user-01',
                userLatitude: -3.1453855,
                userLongitude: 59.9862389
              })
        ).rejects.toBeInstanceOf(MaxDistanceError)
    })

})