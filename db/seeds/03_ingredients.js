const TABLE_NAME = 'ingredients'

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex(TABLE_NAME).del()
    .then(function () {
      // Inserts seed entries
      return knex(TABLE_NAME).insert([
        {id: 1, name: "flour", units: "pounds", user_id: 1},
        {id: 2, name: "sugar", units: "pounds", user_id: 1},
        {id: 3, name: "rice", units: "pounds", user_id: 1},
        {id: 4, name: "flour", units: "pounds", user_id: 2},
        {id: 5, name: "sugar", units: "pounds", user_id: 2},
        {id: 6, name: "rice", units: "pounds", user_id: 2},
        {id: 7, name: "flour", units: "pounds", user_id: 3},
        {id: 8, name: "sugar", units: "pounds", user_id: 3},
        {id: 9, name: "rice", units: "pounds", user_id: 3}
      ]);
    })
    .then(() => {
      // reset sequence
      return knex.raw(`SELECT setval('${TABLE_NAME}_id_seq', (SELECT MAX(id) FROM ${TABLE_NAME}));`)
    })
};

