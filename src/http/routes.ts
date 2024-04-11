import { FastifyInstance } from 'fastify'
import { listUsers } from './controllers/list-users'
import { register } from './controllers/register'
import { authenticate } from './controllers/authenticate'

export async function appRoutes(app: FastifyInstance) {
  app.get('/users', listUsers)
  app.post('/users', register)
  app.post('/sessions', authenticate)
}
