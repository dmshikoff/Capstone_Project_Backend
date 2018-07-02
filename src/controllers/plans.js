const planModel = require('../models/plans');

function getAll(req, res, next) {
    planModel.getAll(req.params.usersId)
        .then(allPlans => {
            res.status(200).send({
                allPlans
            })
        })
}

function getOne(req, res, next) {
    if (!req.params.planId) {
        return next({
            status: 400,
            message: 'Bad Request'
        })
    }
    planModel.getOne(req.params.planId)
        .then(data => {
            delete data.password
            res.status(200).send({
                data
            })
        })
        .catch(next)
}

function create(req, res, next) {
    if (!req.body.name || !req.body.user_id) {
        return next({
            status: 400,
            message: 'Missing recipe creation fields'
        })
    }

    planModel.create(req.body)
        .then(function (data) {

            return res.status(201).send({
                data
            })
        })
        .catch(next)
}

function update(req, res, next) {
    if (!req.params.planId) {
        return next({
            status: 400,
            message: 'Bad Request'
        })
    }
    planModel.update(parseInt(req.params.planId), req.body.name)
        .then(recipe => {
            res.status(200).send({
                recipe
            })
        })
        .catch(next)
}

function remove(req, res, next) {
    planModel.remove(parseInt(req.params.planId))
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