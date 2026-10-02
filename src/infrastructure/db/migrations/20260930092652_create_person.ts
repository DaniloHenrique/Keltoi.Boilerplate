import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema
        .createTable('person', (table) => {
            table
                .bigIncrements('id')
                .unsigned()
                .primary();

            table
                .string('firstName', 255)
                .notNullable();

            table
                .string('lastName', 255)
                .notNullable();

            table
                .string('email', 255)
                .notNullable();

            table
                .timestamp('createdAt')
                .notNullable()
                .defaultTo(knex.fn.now());
            
        })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists('person')
}

