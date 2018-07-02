const TABLE_NAME = 'ingredients'

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex(TABLE_NAME).del()
    .then(function () {
      // Inserts seed entries
      return knex(TABLE_NAME).insert([
        {id: 1, name: "flour", quantity: 2, units: "pounds", user_id: 1},
        {id: 2, name: "sugar", quantity: 3, units: "pounds", user_id: 2},
        {id: 3, name: "rice", quantity: 4, units: "pounds", user_id: 3}
      ]);
    })
    .then(() => {
      // reset sequence
      return knex.raw(`SELECT setval('${TABLE_NAME}_id_seq', (SELECT MAX(id) FROM ${TABLE_NAME}));`)
    })
};

