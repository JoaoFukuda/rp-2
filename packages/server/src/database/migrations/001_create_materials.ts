import Knex from 'knex'

export async function up(knex: Knex) {
  return knex.schema.createTable('materials', table => {
    table.increments('id').primary()
    table.string('title').notNullable()
    table.string('author').notNullable()
    table.string('subject').notNullable()
    table.string('file').notNullable()

    table.integer('userId')
      .notNullable()
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
  })
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('materials')
}
