import { IDbContext } from "@keltoi/hydra-ts";
import { CreatePersonUseCase } from "../../../domain/use-case";
import { PersonRepository } from "../../../infrastructure/repository/person-repository";

export default (context:IDbContext)=> new CreatePersonUseCase(
    new PersonRepository(context)
);