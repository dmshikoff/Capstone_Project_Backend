const express = require('express')
const ingredientsRouter = require('./ingredients')
const recipesRouter = require('./recipes')
const plansRouter = require('./plans')
const controller = require('../controllers/users')

const router = express.Router({mergeParams:true})

router.get('/:usersId/', controller.getOne)
router.post('/', controller.create)
router.delete('/:usersId', controller.remove)

router.use('/:usersId/recipes/:recipeId/ingredients', ingredientsRouter)
router.use('/:usersId/recipes', recipesRouter)
router.use('/:usersId/plans', plansRouter)



module.exports = router