import { FastifyInstance } from "fastify";
import request from 'supertest'

export async function createAndAuthenticateUser(app:FastifyInstance) {
    await request(app.server).post('/users').send({
        name: 'Jonh Doe',
        email: 'jonhdoe@example.com',
        password: '123456'
    })

    const authresponse = await request(app.server).post('/sessions').send({
        email: 'jonhdoe@example.com',
        password: '123456'
    })

    const {token} = authresponse.body

    return{
        token
    }
    
}