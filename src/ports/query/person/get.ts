import { IQueryHandler } from "@keltoi/hydra-ts";
import { IPersonViewModel } from "../../view-model";
import { IGetInputModel } from "../../input-model";
import { Result, ResultType } from "@keltoi/hydra-ts";


export interface IGetPersonQuery extends IQueryHandler<IGetInputModel, IPersonViewModel> {
    query(param:IGetInputModel): Promise<Result<IPersonViewModel|ResultType>>;
}
