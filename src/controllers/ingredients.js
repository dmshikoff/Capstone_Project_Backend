const ingredientsModel = require('../models/ingredients');

function getAll(req, res, next) {
    ingredientModel.getAll(req.params.ingredientId)
        .then(allIngredients => {
            res.status(200).send({
                allIngredients
            })
        })
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
    if (!req.body.name || !req.body.quantity || !req.body.units || !req.body.user_id) {
        return next({
            status: 400,
            message: 'Missing recipe creation fields'
        })
    }

    ingredientModel.create(req.body)
        .then(function (data) {

            return res.status(201).send({
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
    ingredientModel.update(req.params.ingredientId, req.body.name, req.body.quantity, req.body.units)
        .then(recipe => {
            res.status(200).send({
                recipe
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
    getAll,
    getOne,
    create,
    update,
    remove
}