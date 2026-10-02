import { IListPersonQuery } from "../../../ports/query/person/list";
import { IPersonViewModel } from "../../../ports/view-model/person/view";
import { Result, ResultType, IPaging } from "@keltoi/hydra-ts";
import { IPersonRepository } from "../../../ports/repository/person";
import { Person } from "../../../adapters/entity/person";

export class ListPersonQuery implements IListPersonQuery {
    constructor(
        private readonly personRepository: IPersonRepository
    ) {}

    private toViewModel(person: Person): IPersonViewModel {
        return person.toModel().toViewModel();
    }

    async query(data: IPaging): Promise<Result<Array<IPersonViewModel>|ResultType>> {
        const result = await this.personRepository.pageSearch(data);

        if (result.isError) return result;

        const list = result.ok.data as Array<Person>;

        const viewModel = list.map(this.toViewModel);

        return new Result<Array<IPersonViewModel>>(200, viewModel);
    }
}