const TABLE_NAME = 'plans';

exports.up = function (knex, Promise) {
    return knex.schema.createTable(TABLE_NAME, (table) => {
        table.increments();
        table.string("name").notNullable();
        table.integer("user_id").notNullable().references("users.id");
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable(TABLE_NAME)
};
