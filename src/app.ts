import fastify from 'fastify'
import { ZodError } from 'zod'
import { register } from './http/controllers/register'
import { listUsers } from './http/controllers/list-users'
import { env } from './env'

export const app = fastify()

app.get('/users', listUsers)
app.post('/users', register)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO: Here we should log to a external tool like DataDog/NewRelic/Sentry
  }

  return reply.status(500).send({ message: 'Internal server error.' })
})
