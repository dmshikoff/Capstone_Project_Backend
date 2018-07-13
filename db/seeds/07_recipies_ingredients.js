const TABLE_NAME = 'recipes_ingredients';

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex(TABLE_NAME).del()
    .then(function () {
      // Inserts seed entries
      return knex(TABLE_NAME).insert([
        {id: 1, ingredient_id: 2, recipe_id: 3, quantity: 4, units: "cup"},
        {id: 2, ingredient_id: 3, recipe_id: 2, quantity: 2, units: "cup"},
        {id: 3, ingredient_id: 1, recipe_id: 1, quantity: 3, units: "Tbs"}
      ]);
    })
    .then(() => {
      // reset sequence
      return knex.raw(`SELECT setval('${TABLE_NAME}_id_seq', (SELECT MAX(id) FROM ${TABLE_NAME}));`)
    })
};
