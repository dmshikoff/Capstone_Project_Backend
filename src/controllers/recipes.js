const recipeModel = require('../models/recipes');

function getAll(req, res, next) {
    recipeModel.getAll(req.params.recipeId)
        .then(allRecipes => {
            res.status(200).send({
                allRecipes
            })
        })
}

function getOne(req, res, next) {
    if (!req.params.recipeId) {
        return next({
            status: 400,
            message: 'Bad Request'
        })
    }
    recipeModel.getOne(req.params.recipeId)
        .then(data => {
            delete data.password
            res.status(200).send({
                data
            })
        })
        .catch(next)
}

function create(req, res, next) {
    if (!req.body.name || !req.body.instructions || !req.body.user_id) {
        return next({
            status: 400,
            message: 'Missing recipe creation fields'
        })
    }

    recipeModel.create(req.body)
        .then(function (data) {

            return res.status(201).send({
                data
            })
        })
        .catch(next)
}

function update(req, res, next) {
    if (!req.params.recipeId) {
        return next({
            status: 400,
            message: 'Bad Request'
        })
    }
    recipeModel.update(req.params.recipeId, req.body.name, req.body.instructions)
        .then(recipe => {
            res.status(200).send({
                recipe
            })
        })
        .catch(next)
}

function remove(req, res, next) {
    recipeModel.remove(parseInt(req.params.recipeId))
        .then(function (data) {
            res.status(200).send({
                data
            })
        })
        .catch(next)
}

module.exports = {
    getAll,
    getOne,
    create,
    update,
    remove
}