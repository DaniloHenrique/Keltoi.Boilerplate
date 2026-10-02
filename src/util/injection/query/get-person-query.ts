import { IDbContext } from "@keltoi/hydra-ts";
import { PersonRepository } from "../../../infrastructure/repository/person-repository";
import { GetPersonQuery } from "../../../domain/query";

export default (context:IDbContext)=> new GetPersonQuery(
    new PersonRepository(context)
);