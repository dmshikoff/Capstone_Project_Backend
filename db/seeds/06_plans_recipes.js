const TABLE_NAME = 'plans_recipes'

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex(TABLE_NAME).del()
    .then(function () {
      // Inserts seed entries
      return knex(TABLE_NAME).insert([
        {id: 1, plan_id: 2, recipe_id: 1, day: "monday"},
        {id: 2, plan_id: 1, recipe_id: 3, day: "tuesday"},
        {id: 3, plan_id: 3, recipe_id: 2, day: "friday"}
      ]);
    })
    .then(() => {
      // reset sequence
      return knex.raw(`SELECT setval('${TABLE_NAME}_id_seq', (SELECT MAX(id) FROM ${TABLE_NAME}));`)
    })
};
