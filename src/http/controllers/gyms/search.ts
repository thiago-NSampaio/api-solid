import { makeSearchGymsUseCase } from "@/use-cases/factories/make-search-gyms-use-case";
import {FastifyRequest, FastifyReply} from "fastify";
import {z} from 'zod'

export async function search(req:FastifyRequest,reply:FastifyReply){
    const searchGymsQueryBodySchema = z.object({
        q: z.string(),
        page: z.coerce.number().min(1).default(1)
    })

    const {q, page} = searchGymsQueryBodySchema.parse(req.query)

    const searchGyms = makeSearchGymsUseCase()
    
    const {gyms} = await searchGyms.execute({query: q, page})
  
    return reply.status(200).send({
        gyms
    })
}