import { IModel, Result, ResultType } from "@keltoi/hydra-ts";
import { IPersonCreateInputModel } from "../../ports/input-model";
import { IPersonViewModel } from "../../ports/view-model";
import { IGetInputModel } from "../../ports/input-model";
import { Person } from "../../adapters/entity";

export class PersonModel implements IModel<number,Person> {
    constructor(
        private readonly id: number,
        private readonly firstName: string,
        private readonly lastName: string,
        private readonly email: string,
        private readonly createdAt: Date
    ) {}

    validate(): Result<Person|ResultType> {
        if (this.firstName.length < 3) 
            return new Result<ResultType>(400,ResultType.BadRequest, 'First name must be at least 3 characters');

        if (this.lastName.length < 3) 
            return new Result<ResultType>(400,ResultType.BadRequest, 'Last name must be at least 3 characters');

        if (this.email.length < 3) 
            return new Result<ResultType>(400,ResultType.BadRequest, 'Email must be at least 3 characters');

        const person = new Person(this.id, this.firstName, this.lastName, this.email, this.createdAt);

        return new Result<Person>(200, person);
    }

    validateForGet(): Result<Person|ResultType> {
        if (this.id < 0) 
            return new Result<ResultType>(400,ResultType.BadRequest, 'Id must be greater than 0');

        const person = new Person(this.id, this.firstName, this.lastName, this.email, this.createdAt);

        return new Result<Person>(200, person);
    }

    toViewModel(): IPersonViewModel {
        return {
            id: this.id,
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            createdAt: this.createdAt
        }
    }

    static buildForCreate(input:IPersonCreateInputModel): PersonModel {
        return new PersonModel(0, input.firstName, input.lastName, input.email,new Date());
    }

    static buildForGet(input:IGetInputModel): PersonModel {
        return new PersonModel(input.id, '', '', '', new Date());
    }
}