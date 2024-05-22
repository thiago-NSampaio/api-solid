import { Gym, Prisma } from "@prisma/client";
import { GymsRepository } from "../gyms-repository";
import { Decimal } from "@prisma/client/runtime/library";
import { randomUUID } from "crypto";
import { title } from "process";

export class InMemoryGymsRepository implements GymsRepository{
    public items: Gym[] = []
    async findById(id: string)  {
        const gym = this.items.find(item => item.id == id)

        if (!gym){
            return null
        }

        return gym
        
    }

    async searchMany(query: string, page: number) {
        return this.items.filter((item) => item.title.includes(query))
        .slice((page - 1) * 20, page * 20)
    }

    async create(data: Prisma.GymCreateInput) {
        const gym = {
            id: data.id ?? randomUUID(),
            description: data.description ?? null,
            title: data.title,
            phone: data.phone  ?? null,
            latitude: new Prisma.Decimal(data.latitude.toString()),
            longitude: new Prisma.Decimal(data.longitude.toString()),
            created_at: new Date()
        }

        this.items.push(gym)

        return gym
    }

}