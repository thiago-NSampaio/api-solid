import { app } from './app'
import { env } from './env'
import 'dotenv/config'

app
  .listen({
    host: '0.0.0.0',
    port: env.PORT,
  })
  .then(() => {
    console.log('Server is running!')
  })
