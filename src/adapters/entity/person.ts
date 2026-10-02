import { IEntity } from "@keltoi/hydra-ts";
import { PersonModel } from "../../domain/model";
import { IPerson } from "../../ports/entity/person";

export class Person implements IEntity<number>, IPerson {
    constructor(
        public readonly id: number,
        public readonly firstName: string,
        public readonly lastName: string,
        public readonly email: string,
        public readonly createdAt: Date
    ) {}

    static build(data:IPerson): Person {
        return new Person(
            data.id,
            data.firstName,
            data.lastName,
            data.email,
            data.createdAt
        );
    }
    
    toData(): {} {
        return {
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            createdAt: this.createdAt
        }
    }

    toKey(): {} {
        return {
            id: this.id
        }
    }

    toModel(): PersonModel {
        return new PersonModel(
            this.id, 
            this.firstName, 
            this.lastName, 
            this.email, 
            this.createdAt
        );
    }
}