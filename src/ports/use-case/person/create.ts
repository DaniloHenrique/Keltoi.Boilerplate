import { Result, ResultType, IUseCaseHandler } from "@keltoi/hydra-ts";
import { IPersonCreateInputModel } from "../../input-model";
import { IPersonViewModel } from "../../view-model";

export interface ICreatePersonUseCase extends IUseCaseHandler<IPersonCreateInputModel, IPersonViewModel> {
    handle(param:IPersonCreateInputModel): Promise<Result<IPersonViewModel|ResultType>>;
}