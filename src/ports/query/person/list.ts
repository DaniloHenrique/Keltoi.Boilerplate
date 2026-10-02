import { IPaging, IQueryHandler } from "@keltoi/hydra-ts";
import { IPersonViewModel } from "../../view-model";
import { Result, ResultType } from "@keltoi/hydra-ts";

export interface IListPersonQuery extends IQueryHandler<IPaging, Array<IPersonViewModel>> {
    query(data:IPaging): Promise<Result<Array<IPersonViewModel>|ResultType>>;
}