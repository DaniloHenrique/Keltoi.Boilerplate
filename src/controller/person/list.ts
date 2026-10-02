import { IPaging } from "@keltoi/hydra-ts";
import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify'
import { PersonContext } from '../../adapters/context'

import listPersonQuery from '../../util/injection/query/list-person-query'

export const listPersonController = async (
    request:FastifyRequest<{Querystring:IPaging}>, 
    reply:FastifyReply, 
    fastify:FastifyInstance
) => {
    const context = fastify.getDecorator<PersonContext>('personContext')

    const result = await listPersonQuery(context).query(request.query);

    if (result.isError) return reply
        .status(result.error.code)
        .send(result.error.message);

    return reply
        .status(200)
        .send(result.ok.data);
}