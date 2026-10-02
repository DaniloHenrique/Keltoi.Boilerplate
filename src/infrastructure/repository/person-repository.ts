import { Result, ResultType, DbRepository, IDbContext, IPaging } from "@keltoi/hydra-ts";

import { IPersonRepository } from "../../ports/repository";
import { Person } from "../../adapters/entity";

import PersonFactory from "../../adapters/factory/person-factory";

export class PersonRepository 
    extends DbRepository<number,Person> 
    implements IPersonRepository 
{
    constructor(context:IDbContext) {
        super(PersonFactory,context);
    }

    pageSearch(paging: IPaging): Promise<Result<Array<Person>|ResultType>> {
        const size = (paging.number-1) * paging.size;

        return this.database
            .select()
            .orderBy('createdAt')
            .limit(paging.size)
            .offset(size)
            .then((result) => new Result<Array<Person>>(200, result.map(this.factory.build)))
            .catch((error) => new Result<ResultType>(500, ResultType.InternalServerError, error.message));
    }
}