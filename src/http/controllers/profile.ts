import {FastifyRequest, FastifyReply} from "fastify";
import {z} from 'zod'
import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials-error";
import { makeGetUserProfileUseCase } from "@/use-cases/factories/make-get-user-profile-use-case";

export async function profile(req:FastifyRequest,reply:FastifyReply){
    await req.jwtVerify()
    // const authenticateBodySchema = z.object({
    //     email: z.string().email(),
    //     password: z.string().min(6)
    // })

    // const { email, password} = authenticateBodySchema.parse(req.body)

    // try {
    //     const authenticateUseCase = makeGetUserProfileUseCase()
        
    //     await authenticateUseCase.execute({email,password})
    // } catch (err) {
    //     if(err instanceof InvalidCredentialsError){
    //         return reply.status(400).send({message:err.message})
    //     }

    //     throw err
    // }
  
    return reply.status(200).send()
}