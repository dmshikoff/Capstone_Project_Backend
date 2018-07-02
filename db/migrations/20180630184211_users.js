const TABLE_NAME = 'users'

exports.up = function (knex, Promise) {
    return knex.schema.createTable(TABLE_NAME, (table) => {
        table.increments();
        table.string('first_name').notNullable();
        table.string('last_name').notNullable();
        table.string('email').notNullable();
        table.string('hashed_password').notNullable();
        table.boolean('admin').notNullable().defaultsTo(false)
        table.timestamps(true, true)
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable(TABLE_NAME)
};