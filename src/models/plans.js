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
    return createPlan(body.name, body.user_id)
        .then(([response]) => {
            let plan_id = response.id
            return createPlan_Recipe(plan_id, body.week)
        })
}

function createPlan(name, user_id) {
    return knex('plans')
        .insert({
            name,
            user_id
        })
        .returning("*")
        .catch(err => {
            console.log(err)
        })
}

function createPlan_Recipe(plan_id, week) {
    let result = []
    for (let day in week) {
        result = result.concat(week[day].map(ele => {
            if (ele.id) {
                return knex('plans_recipes')
                    .insert({
                        plan_id,
                        recipe_id: Number(ele.id),
                        day: day
                    })
                    .returning("*")
                    .catch(err => {
                        console.log(err)
                    })
            }
        }))
    }
    return Promise.all(result)
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