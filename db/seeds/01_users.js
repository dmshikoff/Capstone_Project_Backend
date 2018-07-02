const TABLE_NAME = 'users'

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex(TABLE_NAME).del()
    .then(function () {
      // Inserts seed entries
      return knex(TABLE_NAME).insert([
        {id: 1, first_name: 'Daniel', last_name: 'Shikoff' , email: 'daniel@daniel.com', hashed_password: '$2a$10$X532pikn3.02MoWmdNTEh.nuqRvz7ZCKmdZDo2dnA//ZSWfnwOIVy', admin: true},
        {id: 2, first_name: 'Abe', last_name: 'Queen', email: 'abe@abe.com', hashed_password: '$2a$10$X532pikn3.02MoWmdNTEh.nuqRvz7ZCKmdZDo2dnA//ZSWfnwOIVy', admin: false},
        {id: 3, first_name: 'Roger', last_name: 'Schmidt', email: 'roger@roger.com', hashed_password: '$2a$10$X532pikn3.02MoWmdNTEh.nuqRvz7ZCKmdZDo2dnA//ZSWfnwOIVy', admin: false}
      ]);
    })
    .then(() => {
      // reset sequence
      return knex.raw(`SELECT setval('${TABLE_NAME}_id_seq', (SELECT MAX(id) FROM ${TABLE_NAME}));`)
    })
};
