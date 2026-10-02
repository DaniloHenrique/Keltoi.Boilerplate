import { DbContext } from "@keltoi/hydra-ts";
import { Knex } from "knex";

export class PersonContext extends DbContext {
    constructor(db:Knex) {
        super(db)
    }
}