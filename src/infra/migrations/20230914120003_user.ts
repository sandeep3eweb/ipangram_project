import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('user', t => {
        t.increments('id').primary()
        t.string('firstname')
        t.string('lastname')
        t.string('email')
        t.string('password')
        t.string('role')
        t.integer('department_id')
    })
}


export async function down(knex: Knex): Promise<void> {
}

