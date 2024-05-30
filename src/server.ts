import { app } from "./app";
import { env } from "./env";
import "dotenv/config"
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();
// prisma.user.create({
//   data: {
//     name: "thiago",
//     email: "thiago@email",
//   },
// });
app
  .listen({
    host: "0.0.0.0",
    port: env.PORT,
  })
  .then(() => {
    console.log("Server is running!");
  });
