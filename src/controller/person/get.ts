import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify'
import { IGetInputModel } from '../../ports/input-model'
import { PersonContext } from '../../adapters/context'

import getPersonQuery from '../../util/injection/query/get-person-query'

export const getPersonController = async (
    request:FastifyRequest<{Params:IGetInputModel}>, 
    reply:FastifyReply, 
    fastify:FastifyInstance
) => {
    const context = fastify.getDecorator<PersonContext>('personContext')

    const result = await getPersonQuery(context)
        .query(request.params);

    if (result.isError) return reply
        .status(result.error.code)
        .send(result.error.message);

    return reply
        .status(200)
        .send(result.ok.data);
}