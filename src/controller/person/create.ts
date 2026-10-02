import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify'
import { PersonContext } from '../../adapters/context'

import createPersonUseCase  from '../../util/injection/use-case/create-person-use-case'
import { IPersonCreateInputModel } from '../../ports/input-model'

export const createPersonController = async (
    request:FastifyRequest<{Body:IPersonCreateInputModel}>, 
    reply:FastifyReply, 
    fastify:FastifyInstance
) => {
    const context = fastify.getDecorator<PersonContext>('personContext')
    const useCase = createPersonUseCase(context)

    const result = await useCase.handle(request.body);

    if (result.isError) return reply
        .status(result.error.code)
        .send(result.error.message);

    return reply
        .status(201)
        .send(result.ok.data);
}