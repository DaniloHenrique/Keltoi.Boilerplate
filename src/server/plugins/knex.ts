import { FastifyInstance } from 'fastify'
import { PersonContext } from '../../adapters/context'

import knexfile from '../../infrastructure/db/knexfile'
import environment from '../../util/injection/environment'

import fp from 'fastify-plugin'
import knex from 'knex'

export default fp(async (fastify: FastifyInstance) => {
    const config = knexfile[environment.environment]!

    if (!config) throw new Error(`No configuration found for environment: ${environment.environment}`);


    fastify.decorate('personContext', new PersonContext(knex(config)))
})