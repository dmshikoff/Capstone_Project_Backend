const knex = require('../../db/knex');

function getAll(usersId) {
    return knex('recipes')
        .where({
            user_id: usersId
        })
        .returning('*')
        .catch(err => {
            console.log(err)
        })
}

function getOne(recipeId) {
    return knex('recipes')
        .where({
            id: recipeId
        })
        .returning('*')
        .catch(err => {
            console.log(err)
        })
}

function create(body) {
    console.log(body)
    return knex('recipes')
        .insert({
            name: body.name,
            instructions: body.instructions,
            user_id: body.user_id
        })
        .returning("*")
        .catch(err => {
            console.log(err);
        })
}

function update(recipeId, name, instructions) {
    const toUpdate = {}
    if (name) {
        toUpdate.name = name
    }
    if(instructions) {
        toUpdate.name = name
    }

    return knex('recipes')
        .where({
            id: recipeId
        })
        .update(toUpdate)
        .returning('*')
        .catch(err => {
            console.log(err)
        })
}

function remove(recipeId) {
    return knex('recipes')
        .where({
            id: recipeId
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