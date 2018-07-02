const TABLE_NAME = 'plans_recipes';

exports.up = function (knex, Promise) {
    return knex.schema.createTable(TABLE_NAME, (table) => {
        table.increments();
        table.integer("plan_id").notNullable().references("plans.id");
        table.integer("recipe_id").notNullable().references("recipes.id");
        table.string("day").notNullable();
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable(TABLE_NAME)
};