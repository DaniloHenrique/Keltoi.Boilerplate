import fb from 'fastify-plugin'
import createPersonSchema from './schema/create-person'
import getPersonSchema from './schema/get-person'
import listPersonSchema from './schema/list-person'

import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'
import { IPersonCreateInputModel, IGetInputModel } from '../../../ports/input-model'
import { createPersonController, getPersonController, listPersonController } from '../../../controller/person'
import { IPaging } from "@keltoi/hydra-ts";

export default fb(async (fastify: FastifyInstance) => {
    fastify.post('/person', {
        schema: createPersonSchema,
        handler: (request:FastifyRequest<{Body:IPersonCreateInputModel}>, reply:FastifyReply) => 
            createPersonController(request, reply, fastify)
    })

    fastify.get('/person/:id', {
        schema: getPersonSchema,
        handler: (request:FastifyRequest<{Params:IGetInputModel}>, reply:FastifyReply) => 
            getPersonController(request, reply, fastify)
    })

    fastify.get('/person', {
        schema: listPersonSchema,
        handler: (request:FastifyRequest<{Querystring:IPaging}>, reply:FastifyReply) => 
            listPersonController(request, reply, fastify)
    })
})