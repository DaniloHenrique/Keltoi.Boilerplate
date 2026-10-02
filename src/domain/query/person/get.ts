import { IGetPersonQuery } from "../../../ports/query";
import { IGetInputModel } from "../../../ports/input-model";
import { Result, ResultType } from "@keltoi/hydra-ts";

import { Person } from "../../../adapters/entity";
import { PersonModel } from "../../model";
import { IPersonViewModel } from "../../../ports/view-model";
import { IPersonRepository } from "../../../ports/repository/person";

export class GetPersonQuery implements IGetPersonQuery {
    constructor(
        private readonly personRepository: IPersonRepository
    ) {}

    async query(param: IGetInputModel): Promise<Result<IPersonViewModel|ResultType>> {
        const validation = PersonModel
            .buildForGet(param)
            .validateForGet();

        if (validation.isError) return validation;

        const person = validation.ok.data as Person;

        const result = await this.personRepository.get(person);

        if (result.isError) return result;

        const foundPerson = result.ok.data as Person;

        const viewModel = foundPerson
            .toModel()
            .toViewModel();

        return new Result<IPersonViewModel>(200, viewModel);
    }
}