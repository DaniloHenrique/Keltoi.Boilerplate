import { ICreatePersonUseCase } from "../../../ports/use-case";
import { IPersonViewModel } from "../../../ports/view-model";
import { Result, ResultType } from "@keltoi/hydra-ts";
import { IPersonCreateInputModel } from "../../../ports/input-model";

import { Person } from "../../../adapters/entity";
import { PersonModel } from "../../model";
import { IPersonRepository } from "../../../ports/repository/person";

export class CreatePersonUseCase implements ICreatePersonUseCase {
    constructor(
        private readonly personRepository: IPersonRepository
    ) {}

    async handle(param: IPersonCreateInputModel): Promise<Result<IPersonViewModel|ResultType>> {
        const validation =PersonModel
            .buildForCreate(param)
            .validate();

        if (validation.isError) return validation;

        const person = validation.ok.data as Person;

        const result = await this.personRepository.create(person);

        if (result.isError) return result;

        const newPerson = result.ok.data as Person;

        const viewModel = newPerson
            .toModel()
            .toViewModel();

        return new Result<IPersonViewModel>(201, viewModel);
    }
}