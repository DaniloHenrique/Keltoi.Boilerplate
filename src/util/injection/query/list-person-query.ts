import { IDbContext } from "@keltoi/hydra-ts";
import { PersonRepository } from "../../../infrastructure/repository";
import { ListPersonQuery } from "../../../domain/query";

export default (context:IDbContext)=> new ListPersonQuery(
    new PersonRepository(context)
);