const TABLE_NAME = 'users_ingredients';

exports.up = function (knex, Promise) {
    return knex.schema.createTable(TABLE_NAME, (table) => {
        table.increments();
        table.integer("user_id").notNullable().references("users.id");
        table.integer("ingredient_id").notNullable().references("ingredients.id");
        table.integer("quantity").notNullable();
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable(TABLE_NAME)
};