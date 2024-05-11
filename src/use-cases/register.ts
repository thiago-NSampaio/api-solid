import { UsersRepository } from "@/repositories/users-repository";
import { hash } from "bcryptjs"

interface registerUseCaseRequest{
    name: string;
    email: string;
    password:string
}
export class RegisterUseCase{
    constructor(private userRepository:UsersRepository){}

     async execute({name, email,password}:registerUseCaseRequest){
        const password_hash = await hash(password,6)
    
        const userWithSameEmail = await this.userRepository.findByEmail(email)
        
        if(userWithSameEmail){
            throw new Error("Email already exists!")
        }
        
        this.userRepository.create({
            name,email,password_hash
        })
    
    }
}
