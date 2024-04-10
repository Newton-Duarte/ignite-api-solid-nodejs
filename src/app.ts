import fastify from 'fastify'
import { register } from './http/controllers/register'
import { listUsers } from './http/controllers/list-users'

export const app = fastify()

app.get('/users', listUsers)
app.post('/users', register)
