import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('department', t => {
        t.increments('id').primary()
        t.string('department_name')
        t.string('category_name')
        t.string('location')
        t.string('salary')
    })
}


export async function down(knex: Knex): Promise<void> {
}

