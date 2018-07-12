const ingredientModel = require('../models/ingredients');

function getAllByRecipe(req, res, next) {
    ingredientModel.getAllByRecipe(req.params.recipeId)
        .then(allIngredients => {
            res.status(200).send({
                allIngredients
            })
        })
        .catch(next)
}

function getAllByUser(req, res, next){
    ingredientModel.getAllByUser(req.params.usersId)
        .then(allIngredients => {
            res.status(200).send({
                allIngredients
            })
        })
        .catch(next)
}

function getAllOnHand(req, res, next){
    ingredientModel.getAllOnHand(req.params.usersId)
        .then(allIngredients => {
            res.status(200).send({
                allIngredients
            })
        })
        .catch(next)
}

function getOne(req, res, next) {
    if (!req.params.ingredientId) {
        return next({
            status: 400,
            message: 'Bad Request'
        })
    }
    ingredientModel.getOne(req.params.ingredientId)
        .then(data => {
            delete data.password
            res.status(200).send({
                data
            })
        })
        .catch(next)
}

function create(req, res, next) {
    if (!req.body.name || !req.body.quantity || !req.body.unit || !req.body.user_id) {
        return next({
            status: 400,
            message: 'Missing ingredient creation fields'
        })
    }
    ingredientModel.create(req.body)
        .then(data => {
            res.status(201).send({
                data
            })
        })
        .catch(next)
}

function update(req, res, next) {
    if (!req.params.ingredientId) {
        return next({
            status: 400,
            message: 'Bad Request'
        })
    }
    ingredientModel.update(parseInt(req.params.ingredientId), req.body.name, req.body.quantity, req.body.units)
        .then(recipe => {
            res.status(200).send({
                recipe
            })
        })
        .catch(next)
}

function removeSome(req, res, next) {
    if (!req.body.name || !req.body.quantity || !req.body.unit || !req.body.user_id || !req.body.id) {
        return next({
            status: 400,
            message: 'Missing ingredient creation fields'
        })
    }
    ingredientModel.removeSome(req.body)
        .then(data => {
            res.status(201).send({
                data
            })
        })
        .catch(next)
}

function remove(req, res, next) {
    ingredientModel.remove(parseInt(req.params.ingredientId))
        .then(function (data) {
            res.status(200).send({
                data
            })
        })
        .catch(next)
}

module.exports = {
    getAllByRecipe,
    getAllByUser,
    getAllOnHand,
    getOne,
    create,
    update,
    removeSome,
    remove
}