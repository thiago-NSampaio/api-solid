import { $Enums, Prisma, Role, User } from "@prisma/client";
import { UsersRepository } from "../users-repository";
import { randomUUID } from "node:crypto";

export class InMemoryUsersRepository implements UsersRepository{
    public items: User[] = []

    async findById(id: string)  {
        const user = this.items.find(item => item.id == id)

        if (!user){
            return null
        }

        return user
        
    }

    async findByEmail(email: string) {
        const checkEmail = this.items.find(item => item.email == email)

        if (!checkEmail){
            return null
        }

        return checkEmail
    }

    async create(data: Prisma.UserCreateInput) {
        const user: User = {
          id: randomUUID(),
          name: data.name,
          email: data.email,
          password_hash: data.password_hash,
          role: "ADMIN",
          created_at: new Date(),
        };
    
        this.items.push(user);
        return user;
      }

}