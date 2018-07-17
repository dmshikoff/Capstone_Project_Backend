const planModel = require('../models/plans');
var mailgun = require("mailgun-js");
var api_key = process.env.APIKEY;
var DOMAIN = process.env.DOMAIN;
var mailgun = require('mailgun-js')({
    apiKey: api_key,
    domain: DOMAIN
});

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
        .then(([data]) => {
            res.status(200).send({
                data
            })
        })
        .catch(next)
}

function create(req, res, next) {
    if (!req.body.name || !req.body.week || !req.body.user_id) {
        return next({
            status: 400,
            message: 'Missing recipe creation fields'
        })
    }

    planModel.create(req.body)
        .then(function ([data]) {

            return res.status(201).send({
                data
            })
        })
        .catch(next)
}

function groceryList(req, res, next) {
    if (!req.params.usersId || !req.params.planId) {
        return next({
            status: 400,
            message: 'Bad Request'
        })
    }
    planModel.groceryList(req.params.usersId, req.params.planId)
        .then(data => {
            res.status(200).send({
                data
            })
        })
        .catch(next)

}

function implementPlan(req, res, next) {
    if (!req.params.usersId || !req.params.planId) {
        return next({
            status: 400,
            message: 'Bad Request'
        })
    }
    planModel.implementPlan(req.params.usersId, req.params.planId)
        .then(data => {
            res.status(200).send({
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

function email(req, res, next) {
    var data = {
        from: 'CICI <me@samples.mailgun.org>',
        to: req.body.email,
        subject: 'CICI Grocery List',
        html: req.body.listString
    };

    mailgun.messages().send(data, function (error, body) {
        console.log(body);
    });
}

module.exports = {
    getAll,
    getOne,
    create,
    groceryList,
    implementPlan,
    update,
    remove,
    email
}