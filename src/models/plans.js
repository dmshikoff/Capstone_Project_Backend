const knex = require('../../db/knex');

function getAll(usersId) {
    return knex('plans')
        .where({
            user_id: usersId
        })
        .returning('*')
        .catch(err => {
            console.log(err)
        })
}

function getOne(planId) {
    return knex('plans')
        .where({
            id: planId
        })
        .returning('*')
        .catch(err => {
            console.log(err)
        })
}

function create(body) {
    return knex('plans')
        .insert({
            name: body.name,
            user_id: body.user_id
        })
        .returning("*")
        .catch(err => {
            console.log(err);
        })
}

function update(planId, name) {
    const toUpdate = {}
    if (name) {
        toUpdate.name = name
    }

    return knex('plans')
        .where({
            id: planId
        })
        .update(toUpdate)
        .returning('*')
        .catch(err => {
            console.log(err)
        })
}

function remove(planId) {
    return knex('plans')
        .where({
            id: planId
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