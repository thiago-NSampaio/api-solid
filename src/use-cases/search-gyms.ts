import { Gym } from '@prisma/client'
import { GymsRepository } from "@/repositories/gyms-repository";

interface SearchgGymsUseCaseRequest{
  query: string
  page: number
}

interface SearchgGymsUseCaseResponse {
  gyms: Gym[]
}

export class SearchgGymsUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    page, query
  }: SearchgGymsUseCaseRequest): Promise<SearchgGymsUseCaseResponse> {
    const gyms = await this.gymsRepository.searchMany(query, page)

    return {
      gyms,
    }
  }
}