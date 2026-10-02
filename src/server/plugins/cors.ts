import { FastifyInstance } from 'fastify'
import environment from '../../util/injection/environment'

import fp from 'fastify-plugin'
import Cors from '@fastify/cors'

export default fp(async (fastify: FastifyInstance) => {
    fastify.register(Cors, {
        origin: environment.cors.origin,
        methods: environment.cors.methods,
        allowedHeaders: environment.cors.allowedHeaders
    })
})