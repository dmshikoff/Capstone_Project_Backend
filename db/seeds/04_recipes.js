const TABLE_NAME = 'recipes'

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex(TABLE_NAME).del()
    .then(function () {
      // Inserts seed entries
      return knex(TABLE_NAME).insert([
        {id: 1, name: "apple pie", instructions: "Cupcake ipsum dolor sit amet. Wafer macaroon powder I love bonbon apple pie. Brownie pie danish. Cupcake ice cream tootsie roll ice cream lollipop I love chupa chups. Pudding danish sweet liquorice bear claw tiramisu. Jelly I love donut biscuit brownie bonbon. I love I love candy fruitcake sugar plum cake soufflé sweet jujubes.", user_id: 2},
        {id: 2, name: "pasta", instructions: "Cupcake ipsum dolor sit amet. Wafer macaroon powder I love bonbon apple pie. Brownie pie danish. Cupcake ice cream tootsie roll ice cream lollipop I love chupa chups. Pudding danish sweet liquorice bear claw tiramisu. Jelly I love donut biscuit brownie bonbon. I love I love candy fruitcake sugar plum cake soufflé sweet jujubes.", user_id: 1},
        {id: 3, name: "pot stickers", instructions: "Cupcake ipsum dolor sit amet. Wafer macaroon powder I love bonbon apple pie. Brownie pie danish. Cupcake ice cream tootsie roll ice cream lollipop I love chupa chups. Pudding danish sweet liquorice bear claw tiramisu. Jelly I love donut biscuit brownie bonbon. I love I love candy fruitcake sugar plum cake soufflé sweet jujubes.", user_id: 3}
      ]);
    })
    .then(() => {
      // reset sequence
      return knex.raw(`SELECT setval('${TABLE_NAME}_id_seq', (SELECT MAX(id) FROM ${TABLE_NAME}));`)
    })
};
