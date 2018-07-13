const knex = require("../../db/knex");
const convert = require('convert-units')

function getAllByRecipe(recipe_id) {
    return knex('recipes_ingredients')
        .join("ingredients", "ingredients.id", "recipes_ingredients.ingredient_id")
        .where("recipes_ingredients.recipe_id", recipe_id)
        .select("recipes_ingredients.units as units", "quantity", "name", "ingredients.id as id", "ingredients.units as ingredients_units")
        .catch(err => {
            console.log(err)
        })
}

function getAllByUser(user_id) {
    return knex('users_ingredients')
        .join('ingredients', 'ingredients.id', 'users_ingredients.ingredient_id')
        .where('users_ingredients.user_id', user_id)
        .select("quantity", "name", "ingredients.units as ingredients_units", "users_ingredients.id as id", "ingredients.id as ingredient_id")
        .catch(err => {
            console.log(err)
        })

}

function getAllOnHand(user_id) {
    console.log('here second')
    return knex('ingredients')
        .where({
            user_id
        })
        .returning("*")
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

const create = async function(body) {
    try {
        if(body.id){
            const userIngredients = await getAllByUser(body.user_id)
            ingredientName = userIngredients.find(ele => ele.name === body.name)
            if(!ingredientName){
                return await knex('users_ingredients')
                                    .insert({
                                        user_id: body.user_id,
                                        ingredient_id: body.id,
                                        quantity: body.quantity
                                    })
                                    .returning("*")
            }
            else {
                const allOnHand = await getAllOnHand(body.user_id)
                const ingredient = allOnHand.find(ele => ele.id === body.id)
                const convertedQty = convert(body.quantity).from(body.unit).to(ingredient.units)
                const newQuantity = Number(ingredientName.quantity) + Number(convertedQty)
                return await updateUserIngredients(newQuantity, body.user_id, body.id, ingredientName.id)
            }
        }
        else {
    
            const newIngredient = await createIngredient(body.name, body.unit, body.user_id)
            console.log(newIngredient)
            return await knex('users_ingredients')
                            .insert({
                                user_id: body.user_id,
                                ingredient_id: newIngredient[0].id,
                                quantity: body.quantity
                            })
                            .returning("*")
        }
    }
    catch(e){
        throw e
    }
}

function createIngredient(name, units, user_id) {
    return knex('ingredients')
        .insert({
            name,
            units,
            user_id
        })
        .returning("*")
        .catch(err => {
            console.log(err)
        })
}

function updateUserIngredients(quantity, user_id, ingredient_id, userIngredientId) {
    const toUpdate = {}
    if (quantity) {
        toUpdate.quantity = quantity
    }
    if (user_id) {
        toUpdate.user_id = user_id
    }
    if (ingredient_id) {
        toUpdate.ingredient_id = ingredient_id
    }
    return knex('users_ingredients')
        .where({
            id: userIngredientId
        })
        .update(toUpdate)
        .returning('*')
        .catch(err => {
            console.log(err)
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

const removeSome = async function(body){
    const userIngredients = await getAllByUser(body.user_id)
    const userIngredient = userIngredients.find(ele => ele.name === body.name)
    const convertedQuantity = convert(body.quantity).from(body.unit).to(userIngredient.units)
    const newQuantity = Number(userIngredient.quantity) - (convertedQuantity)
    if(newQuantity <= 0){
        return await removeUserIngredient(userIngredient.id)
    }
    else{
        return await updateUserIngredients(newQuantity, body.user_id, body.id, userIngredient.id)
    }
}

function removeUserIngredient(id) {
    return knex('users_ingredients')
        .where({
            id
        })
        .del()
        .returning('*')
        .catch(err => {
            console.log(err)
        })
}

module.exports = {
    getAllByRecipe,
    getAllByUser,
    getAllOnHand,
    getOne,
    create,
    update,
    removeSome,
    removeUserIngredient,
    updateUserIngredients
}