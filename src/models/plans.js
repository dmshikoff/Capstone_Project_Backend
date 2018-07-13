const knex = require('../../db/knex');
const recipeModel = require('../models/recipes');
const ingredientModel = require('../models/ingredients');
const convert = require('convert-units')

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

const groceryList = async function(userId, planId){
    const recipesByDay = await recipeModel.getPlannedRecipesByDay(planId)

    const ingredients = recipesByDay.map(async (ele) => {
        const ingredient = await ingredientModel.getAllByRecipe(ele.recipe_id)
        return ingredient
    })
    let recipeIngredients = await Promise.all(ingredients)
    recipeIngredients = [].concat.apply([], recipeIngredients)

    recipeIngredients = recipeIngredients.reduce((acc,ele) => {
        if(acc.hasOwnProperty(ele.name)){
            acc[ele.name].quantity = parseFloat(acc[ele.name].quantity) + parseFloat(ele.quantity)
        }
        else{
            acc[ele.name] = ele
        }
        
        return acc
    }, {})

    recipeIngredients = Object.values(recipeIngredients)

    const usersIngredients = await ingredientModel.getAllByUser(userId)

    const converted = recipeIngredients.map(rIngredient => {
        const userIngredient = usersIngredients.find(ele => ele.name === rIngredient.name)
        const convertedIngredient = convert(rIngredient.quantity).from(rIngredient.units).to(rIngredient.ingredients_units)
        const newQuantity = Number(userIngredient.quantity) - Number(convertedIngredient)
        return {quantity: newQuantity, user_id: userId, ingredient_id: userIngredient.ingredient_id, userIngredientId: userIngredient.id, name: userIngredient.name, unit: rIngredient.units}
    })
    return converted    
}

const implementPlan = async function(userId, planId){
    const recipesByDay = await recipeModel.getPlannedRecipesByDay(planId)

    const ingredients = recipesByDay.map(async (ele) => {
        const ingredient = await ingredientModel.getAllByRecipe(ele.recipe_id)
        return ingredient
    })
    let recipeIngredients = await Promise.all(ingredients)
    recipeIngredients = [].concat.apply([], recipeIngredients)

    const usersIngredients = await ingredientModel.getAllByUser(userId)

    const converted = recipeIngredients.map(rIngredient => {
        const userIngredient = usersIngredients.find(ele => ele.name === rIngredient.name)
        const convertedIngredient = convert(rIngredient.quantity).from(rIngredient.units).to(userIngredient.units)
        const newQuantity = Number(userIngredient.quantity) - Number(convertedIngredient)
        return {quantity: newQuantity, user_id: userId, ingredient_id: userIngredient.ingredient_id, userIngredientId: userIngredient.id, name: userIngredient.name, unit: userIngredient.units}
    })
    let newUserIngredients = converted.map(async(ele) => {
        return await ingredientModel.updateUserIngredients(ele.quantity, ele.user_id, ele.ingredient_id, ele.userIngredientId)
    })
    newUserIngredients = await Promise.all(newUserIngredients)
    newUserIngredients = [].concat.apply([], newUserIngredients)
    return newUserIngredients
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
    groceryList,
    implementPlan,
    update,
    remove
}