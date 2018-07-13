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

function getOne(recipeId, usersId) {
    return knex('recipes')
        .where({
            id: recipeId,
            user_id: usersId
        })
        .returning('*')
        .catch(err => {
            console.log(err)
        })
}

function getPlannedRecipesByDay(plansId) {
    return knex('plans')
        .join('plans_recipes', 'plans_recipes.plan_id', 'plans.id')
        .join('recipes', 'recipes.id', 'plans_recipes.recipe_id')
        .where('plans_recipes.plan_id', plansId)
        .select("day", "recipes.name as name", "plans.id as plan_id", "recipes.id as recipe_id")
        .catch(err => {
            console.log(err)
        })
}

function create(body) {
    return createRecipe(body)
    .then(response => {
        recipe_id = response.id
        createRecipeIngredient(recipe_id, body)
    })
    
}

function createRecipe(body) {
    return knex('recipes')
        .insert({
            name: body.name,
            instructions: body.instructions,
            user_id: body.user_id
        })
        .returning("*")
        .then(([data])=>data)
        .catch(err => {
            console.log(err);
        })
}

function createRecipeIngredient(recipe_id, body){

    const recipe_ids = body.ingredientsArray.map(ele => {
        if(!ele.id){
            return knex('ingredients')
            .insert({ name: ele.name, units: ele.unit, user_id: body.user_id })
            .returning("*")
            .then(([ingredient]) => ({ingredient_id:ingredient.id, units:ingredient.units, quantity: ele.qty}))
        }
        else {
            return Promise.resolve({ingredient_id:ele.id, units:ele.unit, quantity: ele.qty})
        }
    })

    Promise.all(recipe_ids).then(arr => {
        return knex('recipes_ingredients')
        .insert(arr.reduce((acc, ele) => [...acc, ele],[]).map(ele => ({ recipe_id, ...ele})))
        .returning("*")
        .catch(err => {
            console.log(err)
        })
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
    getPlannedRecipesByDay,
    create,
    update,
    remove
}