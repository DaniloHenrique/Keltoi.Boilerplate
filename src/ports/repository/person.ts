import { IDbRepository, IPaging, IPagingRepository } from "@keltoi/hydra-ts";
import { IPerson } from "../entity";

export interface IPersonRepository extends IDbRepository<IPerson>, IPagingRepository<IPerson,IPaging> {}