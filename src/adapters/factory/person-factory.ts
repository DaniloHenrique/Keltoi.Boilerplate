import { IEntityFactory } from "@keltoi/hydra-ts";
import { Person } from "../entity/person";
import { IPerson } from "../../ports/entity";

class PersonFactory implements IEntityFactory<number, Person> {

    tableName: string = 'person';

    build(data: IPerson): Person {
        return Person.build(data);
    }
}

export default new PersonFactory();