import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Nearby Gyms (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to list nearby gyms', async () => {
    const {token} = await createAndAuthenticateUser(app)
   await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'js gym',
        description: 'Some description',
        phone: '9298888888',
        latitude: -2.9930968,
        longitude: -59.9860592,
      })

      await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Ts gym',
        description: 'Some description',
        phone: '9298888888',
        latitude: -4.6356516,
        longitude: -69.6516165,
      })

      const response = await request(app.server)
      .get('/gyms/nearby')
      .query({
        latitude: -2.9930968,
        longitude: -59.9860592,
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title:'js gym'
      })
    ])

  })
})
