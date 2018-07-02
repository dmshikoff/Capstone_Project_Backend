const knex = require("../../db/knex");

function getAll(usersId) {
    return knex('ingredients')
        .where({
            user_id: usersId
        })
        .returning('*')
        .catch(err => {
            console.log(err)
        })
}

function getOne(ingredientId) {
    return knex("ingredients")
        .where({
            id: ingredientId
        })
        .first()
        .catch(err => {
            console.log(err);
        })
}

function create(body) {
    return knex('ingredients')
        .insert({
            name: body.name,
            quantity: body.quantity,
            units: body.units,
            user_id: body.user_id
        })
        .returning("*")
        .catch(err => {
            console.log(err);
        })
}

function update(ingredientId, name, quantity, units) {
    const toUpdate = {}
    if (name) {
        toUpdate.name = name
    }
    if (quantity) {
        toUpdate.quantity = quantity
    }
    if (units) {
        toUpdate.units = units
    }

    return knex('ingredients')
        .where({
            id: ingredientId
        })
        .update(toUpdate)
        .returning('*')
        .catch(err => {
            console.log(err)
        })
}

function remove(ingredientId) {
    return knex('ingredients')
        .where({
            id: ingredientId
        })
        .del()
        .returning('*')
        .catch(err => {
            console.log(err)
        })
}

module.exports = {
    getAll,
    getOne,
    create,
    update,
    remove
}