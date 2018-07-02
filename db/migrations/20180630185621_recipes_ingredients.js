const TABLE_NAME = 'recipes_ingredients';

exports.up = function (knex, Promise) {
    return knex.schema.createTable(TABLE_NAME, (table) => {
        table.increments();
        table.integer("ingredient_id").notNullable().references("ingredients.id");
        table.integer("recipe_id").notNullable().references("recipes.id");
        table.integer("quantity").notNullable();
        table.string("units").notNullable();
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable(TABLE_NAME)
};