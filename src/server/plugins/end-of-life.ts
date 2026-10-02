import { FastifyInstance } from 'fastify'

import fp from 'fastify-plugin'
import { PersonContext } from '../../adapters/context'

export default fp(async (fastify: FastifyInstance) => {
    fastify.addHook('onClose', async () => {
        fastify
            .getDecorator<PersonContext>('personContext')
            .db
            .destroy()
    })
})