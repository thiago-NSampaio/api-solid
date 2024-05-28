import {FastifyRequest, FastifyReply} from "fastify";
import {z} from 'zod'
import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials-error";
import { makeGetUserProfileUseCase } from "@/use-cases/factories/make-get-user-profile-use-case";

export async function profile(req:FastifyRequest,reply:FastifyReply){
    // await req.jwtVerify()
 
    const getUserProfile = makeGetUserProfileUseCase()

    const {user} = await getUserProfile.execute({
        userId: req.user.sub
    })
  
    return reply.status(200).send(user)
}