import { makeGetUserMetricsService } from '@/services/factories/make-get-user-metrics-service'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function metrics(request: FastifyRequest, reply: FastifyReply) {
  const getUserMetricsService = makeGetUserMetricsService()
  const userId = request.user.sub

  const { checkInsCount } = await getUserMetricsService.execute({
    userId,
  })

  return reply.send({
    checkInsCount,
  })
}
