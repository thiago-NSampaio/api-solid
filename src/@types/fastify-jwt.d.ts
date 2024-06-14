import "@fastify/jwt"

// Definição da propriedade user no módulo fastify

declare module "@fastify/jwt" {
  export interface FastifyJWT {
    user: {
      sub: string,
      role:"ADMIN" |"MEMBER"

      } 
  }
}