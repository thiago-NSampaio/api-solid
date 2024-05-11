import "dotenv/config";
import { z } from "zod";

const envScherma = z.object({
  NODE_ENV: z.enum(["dev", "test", "production"]).default("dev"),
  PORT: z.coerce.number().default(3333),
});

const _env = envScherma.safeParse(process.env);

if (_env.success === false) {
  console.error("Invalid environment variarable", _env.error.format());

  throw new Error("Invalid environment variables");
}

export const env = _env.data;
