import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('department_employees', t => {
        t.increments('id')
        t.integer('employee_id')
        t.integer('department_id')
    })
}


export async function down(knex: Knex): Promise<void> {
}

